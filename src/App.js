import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import Navigation from "./components/navbar";
import {BrowserRouter as Router} from "react-router-dom";

const locales = {
  "en-US": require("date-fns/locale/en-US")
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
});

const events = [
  {
    title: "Music Lesson - Guitar",
    allDay: false,
    start: new Date(2022, 8, 24, 13),
    end: new Date(2022, 8, 24, 13)
  },
  {
    title: "Music Lesson - Drums",
    start: new Date(2022, 8, 7,10),
    end: new Date(2022, 8, 7,10)
  },
  {
    title: "Music Lesson - Vocals",
    start: new Date(2022, 8, 20,18),
    end: new Date(2022, 8, 20,18)
  }
];
// Creating App component and Hooks to render evets in calendar with spread operator
function App() {
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState(events);

  function handleAddEvent() {
    // newEvent.end = newEvent.start + 1;
    let endTime = new Date(newEvent.start).getTime() + (1 * 60 * 60 * 1000); // Start Time and increment by 1 hour
    let end = new Date(endTime); // Convert to Date object so it can be stored as 'end'
    setNewEvent({ ...newEvent, end})
    setAllEvents([...allEvents, newEvent]);
  }

  return (
    <Router>
    <div className="App">
      <Navigation/>
      <h1>Lesson Calendar</h1>
      <h2>Add New Event</h2>
      <div>
        <input
          type="text"
          placeholder="Add Title"
          style={{ width: "20%", marginRight: "10px" }}
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        />
        <DatePicker
          placeholderText="Select Lesson"
          style={{ marginRight: "10px" }}
          selected={newEvent.start}
          onChange={(start) => setNewEvent({ ...newEvent, start })}
          showTimeSelect
          timeIntervals={30}
          includeTimes = {[
            setHours(setMinutes(new Date(), 0), 10),
            setHours(setMinutes(new Date(), 30), 11),
            setHours(setMinutes(new Date(), 0), 13),
            setHours(setMinutes(new Date(), 30), 15),
            setHours(setMinutes(new Date(), 0), 17),
            setHours(setMinutes(new Date(), 30), 18)
          ]}

        />
        <button style={{ marginTop: "10px" }} onClick={handleAddEvent}>
          Add Event
        </button>
      </div>
      <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }}
      />
    </div>
    </Router>
  );
}

export default App;
