import Slider from 'rc-slider';
import '../timeline.css'
import { Button, Icon, SemanticICONS } from "semantic-ui-react"
import { cloneElement, useEffect, useState } from 'react';
import { getColor } from '../../Utils/Color';
import { useApp } from '../AppContext';

type ItemProps = {
    type: string
    uuid: string
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

const getIcon = (type: string): SemanticICONS => {
    switch (type) {
        case 'play': return 'play circle';
        case 'pause': return 'pause circle';
        case 'stop': return 'stop circle';
        case 'Exames': return 'stethoscope';
        case 'Anamnese': return 'clipboard';
        case 'Diagnóstico': return 'hospital';
        case 'Tratamento': return 'medkit';
    }
    return 'question circle';
}

const Item = ({ time, max, user, type, tooltip, offset, uuid }: ItemProps) => {
    const { setItemHighlight, timelineHighlight } = useApp();
    // console.log(time, max);
    const handleMouseEnter = () => {
        setItemHighlight((old) => [...old, uuid]);
    }
    const handleMouseLeave = () => {
        setItemHighlight((old) => old.filter((item) => item !== uuid));
    }

    return (
        <div className="item" style={{ left: ((time - offset) / max * 100).toFixed(2) + "%", borderColor: getColor(user), top: getTop(type), opacity: timelineHighlight.length == 0 || timelineHighlight.includes(uuid) ? 1 : 0.2 }}>
            <div className="content" data-tooltip={tooltip} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <Icon name={getIcon(type)} />
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
            const diff = max - zoom * max;
            if (time == diff) setTime(0);
            const interval = setInterval(() => {
                setTime((time) => {
                    if (time + 1 >= diff) {
                        setPlay(false);
                        return time;
                    }
                    return time + 1;
                });
            }, 1000 / (zoom * 30));
            return () => clearInterval(interval);
        }
    }, [play]);

    const maxTimeline = Math.min(max, max * zoom);
    const diff = Math.max(1, max - zoom * max);
    return (
        <>
            <div style={{ width: "100%", height: 400 }}>
                <div className="timeline">
                    <div className='container'>
                        {list.map((station, user) => (
                            <>
                                {station.rating.map((rating) => (
                                    <>
                                        {rating.checks.map((check) => <Item uuid={check.uuid} tooltip={check.name} type={rating.name} offset={time} time={check.time - station.start} max={maxTimeline} user={user} />)}
                                    </>
                                ))}
                            </>
                        )
                        )}
                    </div>
                </div>
            </div>
            <div style={{ marginTop: "1.3em", marginLeft: "1em", marginBottom: "2em" }}>
                <Slider
                    onChange={(nextValues) => {
                        setTime(nextValues as number);
                    }}
                    value={diff == 1 ? 1 : time}
                    activeHandleRender={(children, props) => cloneElement(children, {}, <div className='current'>{convertTime(diff == 1 ? max : props.value / diff * max)}</div>)}
                    min={0}
                    max={diff}
                    marks={{
                        0: convertTime(0),
                        [diff]: convertTime(max),
                    }}
                />
            </div>
            <Button disabled={zoom <= 0.1} icon="plus" onClick={() => setZoom(Math.max(0.1, zoom - 0.1))} />
            <Button disabled={zoom >= 1} icon="minus" onClick={() => setZoom(Math.max(0.1, zoom + 0.1))} />
            <span>{Math.round(zoom * -10 + 11)}x</span>
            <Button disabled={diff == 1} icon={play ? "pause" : "play"} onClick={() => setPlay(!play)} />
        </>
    )
}

export default Timeline;