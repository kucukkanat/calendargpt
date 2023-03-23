import { Options } from "@toast-ui/calendar";

export const settings: Options = {
  usageStatistics: false,
  defaultView: "week",
  theme: {
    common: {
      backgroundColor: "rgba(0,0,0,0.6)",
      dayName: {
        color: "#fff",
      },
    },
    week: {
      dayName: {
        color: "#fff",
      },
    },
  },
  isReadOnly: false,
  useFormPopup: true,
  useDetailPopup: true,
  week: {
    startDayOfWeek: 1,
    hourStart: 8,
    hourEnd: 24,
    taskView: [],
    workweek: true,
  },
  month: {
    startDayOfWeek: 1,
    workweek: true,
  },
  calendars: [
    {
      id: "rootCalendar",
      name: "My Calendar",
      // color: "#fff",
      borderColor: "#9e5fff",
    },
  ],
  template: {
    weekDayName(model) {
      return `<span>${model.dayName}</span>`;
    },
    timegridNowIndicatorLabel({ time }) {
      return `NOW`;
    },
  },
};
