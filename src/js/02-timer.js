import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtnEl = document.querySelector('[data-start]')
const stopBtnEl = document.querySelector('[data-stop]')
const daysEl = document.querySelector('[data-days]')
const hoursEl = document.querySelector('[data-hours]')
const minutesEl = document.querySelector('[data-minutes]')
const secondsEl = document.querySelector('[data-seconds]')

startBtnEl.disabled = true;
stopBtnEl.disabled = true;

let timerId = null;
let chosenDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0]);
      if (selectedDates[0] < new Date()) {
          Notify.failure("Please choose a date in the future");
          startBtnEl.disabled = true;
      };
      if (selectedDates[0] > new Date()) {
          startBtnEl.disabled = false;
          chosenDate = selectedDates[0]
      }
  },
};

flatpickr('#date-selector', options)

startBtnEl.addEventListener('click', startTimeCount)
stopBtnEl.addEventListener('click', stopTimeCount)

function startTimeCount() {
    startBtnEl.disabled = true;
    stopBtnEl.disabled = false;

    timerId = setInterval(() => {
        const timeToDate = convertMs(chosenDate - new Date())
        
        daysEl.textContent = addLeadingZero(timeToDate.days)
        hoursEl.textContent = addLeadingZero(timeToDate.hours)
        minutesEl.textContent = addLeadingZero(timeToDate.minutes)
        secondsEl.textContent = addLeadingZero(timeToDate.seconds)
        
        if (timeToDate.days === 0 && timeToDate.hours === 0 && timeToDate.minutes === 0 && timeToDate.seconds === 0) {
            clearInterval(timerId)
        }
    }, 1000)
}


function stopTimeCount() {
    startBtnEl.disabled = false;
    stopBtnEl.disabled = true;

    clearInterval(timerId)
}

function addLeadingZero(value) {
    return String(value).padStart(2,'0')
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}