import Slider from 'rc-slider';
import './style.css'
import { Button, Icon } from "semantic-ui-react"
import { cloneElement, useEffect, useState } from 'react';
import { getColor } from '../../Utils/Color';

type ItemProps = {
    type: string
    time: number;
    max: number;
    user: number;
    offset: number
    tooltip: string
}

const getTop = (type: string) => {
    switch (type) {
        case 'Exames': return "20%";
        case 'Anamnese': return "40%";
        case 'Diagnóstico': return "60%";
        case 'Tratamento': return "80%";
    }
    return "50%"
}

const Item = ({ time, max, user, type, tooltip, offset }: ItemProps) => {
    // console.log(time, max);
    return (
        <div className="item" style={{ left: ((time - offset) / max * 100).toFixed(2) + "%", borderColor: getColor(user), top: getTop(type) }}>
            <div className="content" data-tooltip={tooltip}>
                <Icon name="play circle" />
            </div>
            <time>{convertTime(time)}</time>
        </div>
    )
}

const convertTime = (time: number) => {
    const text = [];
    let minutes = Math.floor((time % (60 * 60)) / 60)
    if (minutes < 10) text.push('0' + minutes);
    else text.push(minutes);
    let seconds = Math.floor(time % 60);
    if (seconds < 10) text.push('0' + seconds);
    else text.push(seconds);

    return text.join(':');
}

const Timeline = ({ list }: { list: Station[] }) => {
    const [play, setPlay] = useState(false);
    const [zoom, setZoom] = useState(1);
    const [time, setTime] = useState(0);
    const [start, setStart] = useState(0);
    const [max, setMax] = useState(0);

    useEffect(() => {
        setStart(() => Math.min(0, ...list.map((item) => item.start).filter((item) => item)));
        const max = Math.max(0, ...list.map((item) => item.end - item.start).filter((item) => item));
        setMax(max);
    }, [list]);

    useEffect(() => {
        if (play) {
            setTime(0);
            const interval = setInterval(() => {
                setTime((time) => {
                    if (time + 1 >= max - zoom * max) {
                        setPlay(false);
                        return time;
                    }
                    return time + 1;
                });
            }, 1000 / (zoom * 10));
            return () => clearInterval(interval);
        }
    }, [play]);

    const maxTimeline = Math.min(max, max * zoom);
    const diff = max - zoom * max;
    console.log(diff)
    return (
        <>
            <div style={{ width: "100%", height: 400 }}>
                <div className="timeline">
                    <div className='container'>
                        {list.map((station, user) => (
                            <>
                                {station.rating.map((rating) => (
                                    <>
                                        {rating.checks.map((check) => <Item tooltip={check.name} type={rating.name} offset={time} time={check.time - station.start} max={maxTimeline} user={user} />)}
                                    </>
                                ))}
                            </>
                        )
                        )}
                    </div>
                </div>
            </div>
            <div style={{ marginTop: "1em", marginLeft: "1em", marginBottom: "2em" }}>
                <Slider
                    onChange={(nextValues) => {
                        setTime(nextValues as number);
                    }}
                    value={time}
                    activeHandleRender={(children, props) => cloneElement(children, {}, <div className='current'>{convertTime(props.value / diff * max)}</div>)}
                    min={0}
                    max={max - zoom * max}
                    marks={{
                        0: convertTime(0),
                        [max - zoom * max]: convertTime(max),
                    }}
                />
            </div>
            <Button icon="plus" onClick={() => setZoom(Math.min(1, zoom - 0.1))} />
            <Button icon="minus" onClick={() => setZoom(Math.max(0.1, zoom + 0.1))} />
            <span>{Math.round(zoom * -10 + 11)}x</span>
            <Button icon={play ? "pause" : "play"} onClick={() => setPlay(!play)} />
        </>
    )
}

export default Timeline;