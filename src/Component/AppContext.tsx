import React, { createContext, useContext, useState, useEffect, useMemo, PropsWithChildren, Dispatch, SetStateAction } from 'react';

type AppContextType = {
    setItemHighlight: Dispatch<SetStateAction<string[]>>
    itemHighlight: string[]
    setTimelineHighlight: Dispatch<SetStateAction<string[]>>
    timelineHighlight: string[]
}

//@ts-ignore
export const AppContext = createContext<AppContextType>({});

export const AppContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [itemHighlight, setItemHighlight] = useState<string[]>([]);
    const [timelineHighlight, setTimelineHighlight] = useState<string[]>([]);

    return (
        <AppContext.Provider value={{ itemHighlight, setItemHighlight,timelineHighlight, setTimelineHighlight }}>{children}</AppContext.Provider>
    )
}

export const useApp = () => useContext(AppContext);
