import * as d3 from 'd3';
import { useEffect, useRef } from "react";

const width = 640;
const height = 400;
const marginLeft = 40;
const marginBottom = 40;
const marginTop = 20;
const marginRight = 20;

const data: Record<string, number[]> = {
    "Estação 1": [10, 20, 30,40,50,-10]
} //d3.ticks(-2, 2, 5).map(Math.sin);
const Timeline = () => {
    const gx = useRef<any>(null);
    const gy = useRef<any>(null);
    const x = d3.scaleLinear(
        [0, 10],//Object.values(data)[0].length - 1],
        [marginLeft, width - marginRight]
    );

    const y = d3.scaleLinear(d3.extent(Object.values(data)[0]), [height - marginBottom, marginTop]);
    const line = d3.line((d, i) => x(i), y);
    useEffect(() => void d3.select(gx.current).call(d3.axisBottom(x)), [gx, x]);
    useEffect(() => void d3.select(gy.current).call(d3.axisLeft(y)), [gy, y]);
    return (
        <svg width={width} height={height}>
            <g ref={gx} transform={`translate(0,${height - marginBottom})`} />
            <g ref={gy} transform={`translate(${marginLeft},0)`} />
            <path
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                d={line(Object.values(data)[0]) as string}
            />
            <g fill="white" stroke="currentColor" stroke-width="1.5">
                {Object.values(data)[0].map((d, i) => (
                    <g key={i}>
                        <path
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1.5"
                            d={d3.line()([[x(i), 0], [x(i), height - marginBottom]]) as string}
                        />
                        {/*<text x={x(i)} y={y(d)} dy="-.5em">
                            {d} | {i}
                        </text>*/}
                        <circle key={i} cx={x(i)} cy={y(d)} r="2.5" />
                    </g>
                ))}
            </g>
        </svg>
    )
}

export default Timeline;