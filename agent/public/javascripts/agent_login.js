const signUpButton = document.getElementById('signUp');
const signUpButton_2 =document.getElementById('signUp_2');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => container.classList.add('right-panel-active'));

signInButton.addEventListener('click', () => container.classList.remove('right-panel-active'));

signUpButton_2.addEventListener('click',()=> container.classList.remove('right-panel-active'));