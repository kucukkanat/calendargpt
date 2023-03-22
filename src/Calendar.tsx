import { useRef, useState } from "react";
import { ActionIcon, Group, Modal, TextInput, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import { DatePickerInput, TimeInput } from "@mantine/dates";
import { IconClock } from "@tabler/icons-react";

export default () => {
  const ref = useRef<HTMLInputElement>();
  const ref2 = useRef<HTMLInputElement>();
  const [eventDetails, setEventDetails] = useState<{
    title: string;
    start: any;
    end: any;
  }>({
    title: "",
    start: null,
    end: null,
  });
  function handleDateClick(info: any) {
    debugger;
    setEventDetails(info.event);
    open();
  }
  function handleEventClick(info: any) {
    setEventDetails(info.event);
    open();
  }
  function eventChange(info: any) {
    console.log(`Event change:`, info);
  }
  const [opened, { open, close }] = useDisclosure(false);
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
        events={[
          {
            title: "event 1",
            start: "2023-03-22T14:11:10.246Z",
            end: "2023-03-22T15:11:10.246Z",
          },
          {
            title: "event 2",
            start: "2023-03-23T13:15:10.246Z",
            end: "2023-03-23T14:00:00.246Z",
          },
        ]}
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
        eventClick={handleEventClick}
        dateClick={handleDateClick}
        eventDrop={eventChange}
        eventResize={eventChange}
      />
      <Modal
        size="500px"
        opened={opened}
        onClose={close}
        title={eventDetails.title}
      >
        <div style={{ minHeight: 600 }}>
          <TextInput
            placeholder="My awesome party"
            label="Event Name"
            withAsterisk
            defaultValue={eventDetails.title}
            maw={500}
          />
          <DatePickerInput
            label="Start date"
            placeholder="Pick date"
            defaultValue={eventDetails.start}
            // onChange={setValue}
            mx="auto"
            maw={500}
          />
          <TimeInput
            label="Start"
            ref={ref}
            defaultValue={eventDetails.start?.toTimeString().split(" ")[0]}
            rightSection={
              <ActionIcon onClick={() => ref.current.showPicker()}>
                <IconClock size="1rem" stroke={1.5} />
              </ActionIcon>
            }
            maw={500}
            mx="auto"
          />
          <DatePickerInput
            label="End date"
            placeholder="Pick date"
            defaultValue={eventDetails.end}
            // onChange={setValue}
            mx="auto"
            maw={500}
          />
          <TimeInput
            label="End"
            ref={ref2}
            defaultValue={eventDetails.end?.toTimeString().split(" ")[0]}
            rightSection={
              <ActionIcon onClick={() => ref2.current.showPicker()}>
                <IconClock size="1rem" stroke={1.5} />
              </ActionIcon>
            }
            maw={500}
            mx="auto"
          />
        </div>
      </Modal>
    </>
  );
};
