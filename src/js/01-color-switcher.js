const startBtnEl = document.querySelector('[data-start]')
const stopBtnEl = document.querySelector('[data-stop]')

stopBtnEl.disabled = true;

startBtnEl.addEventListener('click', startThemeChange)
stopBtnEl.addEventListener('click', stopThemeChange)
intervalId = null;

function startThemeChange() {
    startBtnEl.disabled = true;
    stopBtnEl.disabled = false;

    intervalId = setInterval(themeChanger, 1000)
}

function stopThemeChange() {
    startBtnEl.disabled = false;
    stopBtnEl.disabled = true;
    
    clearInterval(intervalId)
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function themeChanger() {
        document.body.style.backgroundColor = getRandomHexColor();
    }