import React, { createContext, useState, useContext } from 'react'

export class EventsEntry {
    constructor(name: string, message: string, type: "success" | "error" | "info") {
        this.name = name;
        this.message = message;
        this.type = type;
    }

    event_id?: string;
    name: string;
    message: string;
    type: "success" | "error" | "info";
}

interface EventHandlerInterface {
    dialogAlerts: EventsEntry[],
    setDialogAlerts: Function
}

export const EventHandlerContext = createContext(new Object() as EventHandlerInterface)
EventHandlerContext.displayName = 'EventHandlerContext'

export const EventHandlerProvider = ({ children }: any) => {
    const [dialogAlerts, setDialogAlerts] = useState(Array<EventsEntry>());

    return (
        <EventHandlerContext.Provider
            value={{
                dialogAlerts,
                setDialogAlerts
            }}>
            {children}
        </EventHandlerContext.Provider>
    );
}

export const useEventHandlerContext = () => {
    const {
        dialogAlerts,
        setDialogAlerts
    } = useContext<EventHandlerInterface>(EventHandlerContext);


    function addAlertEvent(eventParam: EventsEntry): void {
        eventParam.event_id = "EVENT#" + eventParam.name + "#" + new Date().getTime();
        setDialogAlerts([...dialogAlerts, eventParam]);
    }

    function removeAlertEvent(eventParam: EventsEntry): void {
        setDialogAlerts([...dialogAlerts.filter((event) => { return event.event_id !== eventParam.event_id })]);
    }

    return {
        addAlertEvent,
        removeAlertEvent,
        dialogAlerts
    };
}