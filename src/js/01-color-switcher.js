
// Напиши скрипт, который после нажатия кнопки «Start», раз в секунду меняет цвет фона <body> на случайное значение используя 
// инлайн стиль. При нажатии на кнопку «Stop», изменение цвета фона должно останавливаться.                                         +
// Учти, на кнопку «Start» можно нажать бесконечное количество раз. Сделай так, чтобы пока изменение темы запушено, 
// кнопка «Start» была не активна (disabled).                                                                                       +

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function getRandomHexColorTwo() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let intervalId = null;

const startBtnClick = () => {
    console.log('+1 click to startBtn')
    intervalId = setInterval(() => {
        document.body.style.background = `-webkit-linear-gradient(45deg,${getRandomHexColor()},${getRandomHexColorTwo()})`;
    }, 1000);
    startBtn.setAttribute('disabled', 'true');
    stopBtn.removeAttribute('disabled', 'true');
    startBtn.style.background = '#808080';
    stopBtn.style.background = '-webkit-linear-gradient(90deg,#bb056c,#e72d44)';
};

const stopBtnClick = () => {
    console.log('+1 click to stopBtn')
    clearInterval(intervalId);
    startBtn.removeAttribute('disabled', 'true');
    stopBtn.setAttribute('disabled', 'true');
    stopBtn.style.background = '#808080';
    startBtn.style.background = '-webkit-linear-gradient(90deg,#bb056c,#e72d44)';
};

startBtn.addEventListener('click', startBtnClick);
stopBtn.addEventListener("click", stopBtnClick);
