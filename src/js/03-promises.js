import Notiflix from 'notiflix';

Notiflix.Notify.init({
  fontSize: '24px',
  width: '400px',
  borderRadius: '40px',
  });

const form = document.querySelector('.form');
const firstDelayEl= document.querySelector('input[name="delay"]');
const delayStepEl = document.querySelector('input[name="step"]');
const amountEl = document.querySelector('input[name="amount"]');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise ((resolve, reject) => {
  setTimeout(() => {
    if(shouldResolve) {
        resolve({position, delay})
      } else {
        reject({position, delay});
      }
    }, delay);
  }); 
};

form.addEventListener('submit', onSubmitForm);

function onSubmitForm (evt) {
  evt.preventDefault();

  let delay = Number(firstDelayEl.value);
  let step = Number(delayStepEl.value);
  let amount = Number(amountEl.value);

  for (let position = 1; position <= amount; position ++) {
    createPromise(position, delay)
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms. Can you do it faster?`,)})
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms. 
      I can't make it faster`,)})
    delay += step;
  } 
}



