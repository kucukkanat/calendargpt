import Calendar, { Options } from "@toast-ui/calendar";
import { LitElement, html, css, unsafeCSS } from "lit";
import toastuiCSS from "@toast-ui/calendar/dist/toastui-calendar.css?inline";
import { settings } from "../lib/calendarSettings";
import { eventbus } from "../lib/eventbus";
import { uuid } from "../lib/uuid";
import { adjustForTimezone } from "../lib/adjustForTimezone";

class Component extends LitElement {
  calendar: Calendar | null;
  constructor() {
    super();
    this.calendar = null;
  }
  static get styles() {
    return css`
      ${unsafeCSS(toastuiCSS)}
      :host {
        font-family: Futura, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
          Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
        display: block;
        max-width: 100vw;
      }

      #wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
      }
      #calendar {
        height: 500px;
        width: 100%;
      }
      .toastui-calendar-day-name__date {
        font-size: 14px;
      }
      .toastui-calendar-template-timegridDisplayPrimaryTime,
      .toastui-calendar-template-weekDayName,
      .toastui-calendar-template-alldayTitle {
        color: #fff;
      }
    `;
  }
  firstUpdated(): void {
    const rootElement = this.shadowRoot.getElementById("calendar");

    this.calendar = new Calendar(rootElement, settings);
    this.startListeningToEvents();

    // Creation
    this.calendar.on("beforeCreateEvent", (event) => {
      console.log(`CreatingEvent`, event);

      // Do not re-create event if it's from AI
      if (event.fromAI) return;
      this.calendar.createEvents([
        {
          id: uuid(),
          calendarId: "rootCalendar",
          title: event.title,
          start: event.start,
          end: event.end,
        },
      ]);
    });

    // Updating
    this.calendar.on("beforeUpdateEvent", ({ event, changes }) => {
      console.log(`Editing`, event, changes);
      this.calendar.updateEvent(event.id, event.calendarId, changes);
    });

    //Deleting
    this.calendar.on("beforeDeleteEvent", (eventObj) => {
      this.calendar.deleteEvent(eventObj.id, eventObj.calendarId);
    });

    window.addEventListener("resize", () => {
      this.calendar.render();
    });
  }
  startListeningToEvents() {
    eventbus.on("calendar:new", (event: any) => {
      console.log(`Creating event:`, { event });
      this.calendar.createEvents([
        {
          id: uuid(),
          calendarId: "rootCalendar",
          title: event.title,
          start: adjustForTimezone(new Date(event.start)),
          end: adjustForTimezone(new Date(event.end)),
        },
      ]);
    });
  }

  changeView(type: "month" | "week") {
    this.calendar.changeView(type);
  }
  toggleWeekends() {
    console.log(`Toggling weekends`);
    this.calendar.setOptions({
      week: {
        workweek: !this.calendar.getOptions().week.workweek,
      },
      month: {
        workweek: !this.calendar.getOptions().month.workweek,
      },
    });
  }
  render() {
    return html`
      <div id="wrapper">
        <div>
          <gpt-button @click=${this.toggleWeekends}>Toggle Weekends</gpt-button>
          <gpt-button @click=${() => this.changeView("month")}
            >Month</gpt-button
          >
          <gpt-button @click=${() => this.changeView("week")}>Week</gpt-button>
          <gpt-button @click=${() => this.calendar.prev()}>Prev</gpt-button>
          <gpt-button @click=${() => this.calendar.today()}>Today</gpt-button>
          <gpt-button @click=${() => this.calendar.next()}>Next</gpt-button>
        </div>
        <div id="calendar"></div>
      </div>
    `;
  }
}

customElements.define("gpt-calendar", Component);
