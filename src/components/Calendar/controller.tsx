import { useDisclosure } from "@mantine/hooks";
import { useState, useEffect } from "react";

type CalEvent = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  description: string;
};

export function useCalendar() {
  const [events, setEvents] = useState<CalEvent[]>([
    {
      id: "1",
      title: "Event 1",
      start: new Date("2023-03-24"),
      end: new Date("2023-03-25"),
      description: "Event 1 description",
    },
  ]);
  const [activeEvent, setActiveEvent] = useState<Partial<CalEvent> | null>(
    null
  );
  function setDate(event: any, type: "start" | "end") {
    console.log(`Date ${type}`, event);
    const value = event;
    const current = activeEvent?.[type];
    current?.setFullYear(value.getFullYear());
    current?.setMonth(value.getMonth());
    current?.setDate(value.getDate());
    setActiveEvent({
      [type]: current,
    });
  }
  function setTime(event: any, type: "start" | "end") {
    const { value } = event.target;
    const hours = value.split(":")[0];
    const minutes = value.split(":")[1];

    const current = activeEvent?.[type];
    current?.setHours(hours);
    current?.setMinutes(minutes);

    setActiveEvent({
      [type]: current,
    });
  }

  useEffect(() => {
    setEvents((events: any) => {
      console.log("useEffect", activeEvent?.title, activeEvent?.description);
      const newEvents = events.map((event) => {
        if (event.id === activeEvent?.id) {
          return activeEvent;
        }
        return event;
      });
      return [...newEvents];
    });
  }, [
    activeEvent?.start,
    activeEvent?.end,
    activeEvent?.title,
    activeEvent?.description,
  ]);

  function editEvent({ event }: any) {
    setActiveEvent({ ...event });
    open();
  }

  const [isModalOpen, { open, close }] = useDisclosure(false);
  return {
    events,
    setEvents,
    activeEvent,
    setActiveEvent,
    editEvent,
    isModalOpen,
    close,
    setDate,
    setTime,
  };
}
