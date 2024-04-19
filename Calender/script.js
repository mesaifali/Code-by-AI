// script.js
const eventForm = document.getElementById('eventForm');
const calendarEl = document.getElementById('calendar');
const darkModeSwitch = document.getElementById('darkModeSwitch');
const eventList = document.getElementById('eventList');
const eventFilter = document.getElementById('eventFilter');

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
    eventDidMount: renderEventAsBox,
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
    title: '',
    start: `${eventDate}T${eventTime}`,
    allDay: false,
  };

  events.push(event);
  calendar.addEvent(event);
  addEventToList(event, eventTitle);

  eventForm.reset();
});

// script.js (continued)

// Handle event click
const handleEventClick = (info) => {
    const eventId = info.event.id;
    const eventIndex = events.findIndex((event) => event.id === eventId);
  
    if (eventIndex !== -1) {
      const confirmDelete = confirm('Are you sure you want to delete this event?');
  
      if (confirmDelete) {
        events.splice(eventIndex, 1);
        info.event.remove();
        removeEventFromList(eventId);
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
  
  // Render event as a box without title
  const renderEventAsBox = (info) => {
    const eventElement = info.el;
    eventElement.innerHTML = '';
    eventElement.style.backgroundColor = getRandomColor();
  };
  
  // Generate random color for event box
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
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
        addEventToList(event);
      });
    }
  };
  
  // Save events to local storage
  const saveEvents = () => {
    localStorage.setItem('events', JSON.stringify(events));
  };
  
  // Add event to the list
  const addEventToList = (event, eventTitle = '') => {
    const listItem = document.createElement('li');
    listItem.classList.add('list-group-item');
    listItem.textContent = `${eventTitle || 'Event'} - ${event.start.toLocaleString().split(',')[0]}`;
    eventList.appendChild(listItem);
  };
  
  // Remove event from the list
  const removeEventFromList = (eventId) => {
    const listItems = eventList.getElementsByTagName('li');
    for (let i = 0; i < listItems.length; i++) {
      const listItem = listItems[i];
      const [title, date] = listItem.textContent.split(' - ');
      const eventTitle = title.trim();
      const eventDate = new Date(date).toLocaleString().split(',')[0];
      const event = events.find((e) => e.title === '' && e.start.toLocaleString().split(',')[0] === eventDate);
      if (event.id === eventId) {
        eventList.removeChild(listItem);
        break;
      }
    }
  };
  
  // Filter events by date
  const filterEvents = () => {
    const filterDate = eventFilter.value;
    const listItems = eventList.getElementsByTagName('li');
    for (let i = 0; i < listItems.length; i++) {
      const listItem = listItems[i];
      const [title, date] = listItem.textContent.split(' - ');
      const eventDate = new Date(date).toLocaleString().split(',')[0];
      if (filterDate === '') {
        listItem.style.display = 'list-item';
      } else {
        listItem.style.display = (eventDate === filterDate) ? 'list-item' : 'none';
      }
    }
  };
  
  // Initialize the calendar and load events
  document.addEventListener('DOMContentLoaded', () => {
    loadEvents();
    initCalendar();
  });
  
  // Save events to local storage when the window is closed
  window.addEventListener('beforeunload', saveEvents);