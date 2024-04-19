// script.js
const eventForm = document.getElementById('eventForm');
const calendarEl = document.getElementById('calendar');
const darkModeSwitch = document.getElementById('darkModeSwitch');

let calendar;
let events = [];

// Initialize the calendar
const initCalendar = () => {
  const calendarOptions = {
    initialView: 'dayGridMonth',
    events: events,
    editable: true,
    eventClick: handleEventClick,
    eventDrop: handleEventDrop,
  };

  calendar = new FullCalendar.Calendar(calendarEl, calendarOptions);
  calendar.render();
};

// Handle event form submission
eventForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const eventTitle = document.getElementById('eventTitle').value;
  const eventDate = document.getElementById('eventDate').value;
  const eventTime = document.getElementById('eventTime').value;

  const event = {
    title: eventTitle,
    start: `${eventDate}T${eventTime}`,
    allDay: false,
  };

  events.push(event);
  calendar.addEvent(event);

  eventForm.reset();
});

// Handle event click
const handleEventClick = (info) => {
  const eventId = info.event.id;
  const eventIndex = events.findIndex((event) => event.id === eventId);

  if (eventIndex !== -1) {
    const confirmDelete = confirm('Are you sure you want to delete this event?');

    if (confirmDelete) {
      events.splice(eventIndex, 1);
      info.event.remove();
    }
  }
};

// Handle event drag and drop
const handleEventDrop = (info) => {
  const eventId = info.event.id;
  const eventIndex = events.findIndex((event) => event.id === eventId);

  if (eventIndex !== -1) {
    events[eventIndex].start = info.event.start;
    events[eventIndex].end = info.event.end;
  }
};

// Handle dark mode switch
darkModeSwitch.addEventListener('change', () => {
  document.body.classList.toggle('dark-mode');
});

// Load events from local storage
const loadEvents = () => {
  const storedEvents = localStorage.getItem('events');

  if (storedEvents) {
    events = JSON.parse(storedEvents);
    events.forEach((event) => {
      calendar.addEvent(event);
    });
  }
};

// Save events to local storage
const saveEvents = () => {
  localStorage.setItem('events', JSON.stringify(events));
};

// Initialize the calendar and load events
document.addEventListener('DOMContentLoaded', () => {
  loadEvents();
  initCalendar();
});

// Save events to local storage when the window is closed
window.addEventListener('beforeunload', saveEvents);