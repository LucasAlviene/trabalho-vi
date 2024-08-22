/// <reference types="vite/client" />

type TimeRecord = {
    start: number
    end: number
}

type Check = {
    uuid: string
    name: string
    value: number
    time: number
}


type Station = {
    uuid: string;
    rating: {
        name: string;
        checks: Check[];
    }[];
} & TimeRecord;



type Simulation = {
    simulation: TimeRecord
    tutorial: TimeRecord
    stations: Station[]
}