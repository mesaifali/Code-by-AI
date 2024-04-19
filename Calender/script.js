document.addEventListener('DOMContentLoaded', function() {
    const toggleThemeBtn = document.getElementById('toggleThemeBtn');
    const calendarContainer = document.getElementById('calendarContainer');
    const body = document.body;
  
    toggleThemeBtn.addEventListener('click', function() {
      body.classList.toggle('dark-mode');
      const isDarkMode = body.classList.contains('dark-mode');
      toggleThemeBtn.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';
    });
  });
  