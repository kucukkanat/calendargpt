import { useRef } from "react";
import { ActionIcon, Modal, TextInput } from "@mantine/core";

import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import { DatePickerInput, TimeInput } from "@mantine/dates";
import { IconClock } from "@tabler/icons-react";
import { useCalendar } from "./controller";
export default () => {
  const ref = useRef<HTMLInputElement>();
  const ref2 = useRef<HTMLInputElement>();
  const {
    events,
    setEvents,
    activeEvent,
    setActiveEvent,
    isModalOpen,
    editEvent,
    close: closeModal,
    setDate,
    setTime,
  } = useCalendar();

  function eventChange(info: any) {
    console.log(`Event change:`, info);
  }

  return (
    <>
      <FullCalendar
        firstDay={1}
        droppable={true}
        editable={true}
        selectable={true}
        selectMirror={true}
        eventStartEditable={true}
        eventResizableFromStart={true}
        eventDurationEditable={true}
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="Week"
        events={events}
        headerToolbar={{
          start: "",
          center: "Month,Week",
          end: "",
        }}
        views={{
          Week: {
            weekends: true,
            type: "timeGridWeek",
            duration: { days: 7 },
            firstDay: 1,
            titleFormat: { year: "numeric", month: "short" },
          },
          Month: {
            type: "dayGridMonth",
          },
        }}
        footerToolbar={{
          start: "title", // will normally be on the left. if RTL, will be on the right
          end: "today prev,next", // will normally be on the right. if RTL, will be on the left
        }}
        buttonText={{
          today: "Today",
          month: "Month",
          week: "Week",
          day: "Day",
          list: "List",
        }}
        height="calc(100vh - 70px - 15px)"
        eventClick={editEvent}
        dateClick={editEvent}
        eventDrop={eventChange}
        eventResize={eventChange}
      />
      <Modal
        size="500px"
        opened={isModalOpen}
        onClose={closeModal}
        title={activeEvent?.title}
      >
        <div style={{ minHeight: 600 }}>
          <TextInput
            placeholder="My awesome party"
            label="Event Name"
            withAsterisk
            onChange={(e) => {
              setActiveEvent({ ...activeEvent, title: e.currentTarget.value });
            }}
            defaultValue={activeEvent?.title}
            maw={500}
          />
          <DatePickerInput
            label="Start date"
            placeholder="Pick date"
            defaultValue={activeEvent?.start}
            onChange={(e) => setDate(e, "start")}
            mx="auto"
            maw={500}
          />
          <TimeInput
            label="Start"
            ref={ref}
            defaultValue={activeEvent?.start?.toTimeString().split(" ")[0]}
            rightSection={
              <ActionIcon onClick={() => ref.current.showPicker()}>
                <IconClock size="1rem" stroke={1.5} />
              </ActionIcon>
            }
            onChange={(e) => setTime(e, "start")}
            maw={500}
            mx="auto"
          />
          <DatePickerInput
            label="End date"
            placeholder="Pick date"
            defaultValue={activeEvent?.end}
            onChange={(e) => setDate(e, "end")}
            mx="auto"
            maw={500}
          />
          <TimeInput
            label="End"
            ref={ref2}
            defaultValue={activeEvent?.end?.toTimeString().split(" ")[0]}
            rightSection={
              <ActionIcon onClick={() => ref2.current.showPicker()}>
                <IconClock size="1rem" stroke={1.5} />
              </ActionIcon>
            }
            onChange={(e) => setTime(e, "end")}
            maw={500}
            mx="auto"
          />
        </div>
      </Modal>
    </>
  );
};
