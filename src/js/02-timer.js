// import flatpickr from "flatpickr";
// import "flatpickr/dist/flatpickr.min.css";

// const inputDate = document.querySelector('#datetime-picker');

// const options = {
//     enableTime: true,
//     time_24hr: true,
//     defaultDate: new Date(),
//     minuteIncrement: 1,
//     onClose(selectedDates) {
//         console.log(selectedDates[0]);
//     },
// };

// flatpickr(inputDate, options)


// function convertMs(ms) {
//     // Number of milliseconds per unit of time
//     const second = 1000;
//     const minute = second * 60;
//     const hour = minute * 60;
//     const day = hour * 24;

//     // Remaining days
//     const days = Math.floor(ms / day);
//     // Remaining hours
//     const hours = Math.floor((ms % day) / hour);
//     // Remaining minutes
//     const minutes = Math.floor(((ms % day) % hour) / minute);
//     // Remaining seconds
//     const seconds = Math.floor((((ms % day) % hour) % minute) / second);

//     return { days, hours, minutes, seconds };
// }

//   console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
//   console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
//   console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}




// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

// import Notiflix from 'notiflix';

const inputPickerEl = document.querySelector('#datetime-picker');
const btnStartEl = document.querySelector('button[data-start]');
const spanDaysEl = document.querySelector('span[data-days]');
const spanHoursEl = document.querySelector('span[data-hours]');
const spanMinutesEl = document.querySelector('span[data-minutes]');
const spanSecondsEl = document.querySelector('span[data-seconds]');

btnStartEl.addEventListener('click', getSelectedTime);
btnStartEl.setAttribute('disabled', 'true');

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose,
  };
  
function onClose(selectedDates) {
  const currentTime = Date.now();
          const ms = selectedDates[0] - currentTime;
          if (ms < 0) {
            Notiflix.Notify.failure('Please choose a date in the future');
          } else {
            btnStartEl.removeAttribute('disabled', 'true');         
          }
}

flatpickr(inputPickerEl, options);

function getSelectedTime() {   
timerStart();
btnStartEl.setAttribute('disabled', 'false');
}

function timerStart() {
  inputPickerEl.setAttribute('disabled', 'true');
  const selectedDay = new Date(inputPickerEl.value);
  const selectedTimeMs = selectedDay.getTime();  
  const intervalId = setInterval(() => {
  const currentTime = Date.now();
  const deltaTime = selectedTimeMs - currentTime;

  if (deltaTime < 0 && deltaTime > -1000) {
    clearInterval(intervalId);
    inputPickerEl.removeAttribute('disabled', 'true');
  } else {
    updateTime(convertMs(deltaTime));
  }
  }, 1000);

};

function pad(value) {
  return String(value).padStart(2, '0');
}
function padDays(value) {
  if(value < 100) {
  return String(value).padStart(2, '0');
} 
return String(value).padStart(3, '0');
}

function convertMs(time) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = padDays(Math.floor(time / day));
  const hours = pad(Math.floor((time % day) / hour));
  const minutes = pad(Math.floor(((time % day) % hour) / minute));
  const seconds = pad(Math.floor((((time % day) % hour) % minute) / second));

  const getTime = { days, hours, minutes, seconds };
  return getTime;
}

function updateTime({ days, hours, minutes, seconds }) {
  spanDaysEl.innerHTML = days;
  spanHoursEl.innerHTML = hours;
  spanMinutesEl.innerHTML = minutes;
  spanSecondsEl.innerHTML = seconds;
}