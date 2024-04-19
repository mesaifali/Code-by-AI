document.addEventListener('DOMContentLoaded', function() {
    const eventNameInput = document.getElementById('event-name');
    const eventDateInput = document.getElementById('event-date');
    const eventTimeInput = document.getElementById('event-time');
    const startBtn = document.getElementById('start-btn');
    const stopBtn = document.getElementById('stop-btn');
    const warningsDiv = document.getElementById('warnings');
    const countdownDiv = document.getElementById('countdown');
    const monthsSpan = document.getElementById('months');
    const daysSpan = document.getElementById('days');
    const hoursSpan = document.getElementById('hours');
    const minutesSpan = document.getElementById('minutes');
    const secondsSpan = document.getElementById('seconds');

    let countdownInterval;

    const updateCountdown = () => {
        const eventDate = new Date(`${eventDateInput.value}T${eventTimeInput.value || '00:00'}`);
        const currentDate = new Date();
        const difference = eventDate - currentDate;

        if (difference < 0) {
            clearInterval(countdownInterval);
            warningsDiv.textContent = 'Event has already occurred.';
            return;
        }

        const months = Math.floor(difference / (1000 * 60 * 60 * 24 * 30.44));
        const days = Math.floor(difference / (1000 * 60 * 60 * 24)) % 30;
        const hours = Math.floor(difference / (1000 * 60 * 60)) % 24;
        const minutes = Math.floor(difference / (1000 * 60)) % 60;
        const seconds = Math.floor(difference / 1000) % 60;

        monthsSpan.textContent = months;
        daysSpan.textContent = days;
        hoursSpan.textContent = hours;
        minutesSpan.textContent = minutes;
        secondsSpan.textContent = seconds;
    };

    const startCountdown = () => {
        warningsDiv.textContent = '';

        if (!eventNameInput.value) {
            warningsDiv.textContent = 'Please enter an event name.';
            return;
        }

        if (!eventDateInput.value) {
            warningsDiv.textContent = 'Please enter an event date.';
            return;
        }

        const eventDate = new Date(`${eventDateInput.value}T${eventTimeInput.value || '00:00'}`);
        if (isNaN(eventDate.getTime())) {
            warningsDiv.textContent = 'Please enter a valid event date and time.';
            return;
        }

        clearInterval(countdownInterval);
        countdownInterval = setInterval(updateCountdown, 1000);
        stopBtn.disabled = false;
    };

    const stopCountdown = () => {
        clearInterval(countdownInterval);
        stopBtn.disabled = true;
    };

    startBtn.addEventListener('click', startCountdown);
    stopBtn.addEventListener('click', stopCountdown);
        // Event listeners for form inputs
    eventNameInput.addEventListener('input', () => {
        if (eventNameInput.value.trim() === '') {
            warningsDiv.textContent = 'Please enter an event name.';
        } else {
            warningsDiv.textContent = '';
        }
    });

    eventDateInput.addEventListener('change', () => {
        if (!eventDateInput.value) {
            warningsDiv.textContent = 'Please enter an event date.';
        } else {
            warningsDiv.textContent = '';
        }
    });

    eventTimeInput.addEventListener('change', () => {
        const eventDate = new Date(`${eventDateInput.value}T${eventTimeInput.value || '00:00'}`);
        if (isNaN(eventDate.getTime())) {
            warningsDiv.textContent = 'Please enter a valid event date and time.';
        } else {
            warningsDiv.textContent = '';
        }
    });
});