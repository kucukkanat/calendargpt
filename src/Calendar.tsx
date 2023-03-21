import React from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick

export default () => {
  function handleDateClick(arg) {
    console.log(arg);
  }
  return (
    <FullCalendar
      firstDay={1}
      droppable={true}
      editable={true}
      selectable={true}
      selectMirror={true}
      plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
      initialView="Week"
      dateClick={handleDateClick}
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
      height="calc(100vh - 70px - 5px)"
    />
  );
};
