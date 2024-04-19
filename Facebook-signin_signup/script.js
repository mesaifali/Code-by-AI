// Handle navigation between sign-in, sign-up, and forgot password pages
const signInLink = document.querySelector('.create-account');
const signUpLink = document.querySelector('.signin-link');
const forgotPasswordLink = document.querySelector('.forgot-password');

signInLink.addEventListener('click', () => {
  window.location.href = 'index.html';
});

signUpLink.addEventListener('click', () => {
  window.location.href = 'signup.html';
});

forgotPasswordLink.addEventListener('click', () => {
  window.location.href = 'forgot-password.html';
});