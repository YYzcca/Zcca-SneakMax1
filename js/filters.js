const min = document.getElementById('min');
const max = document.getElementById('max');
const container = document.querySelector('.price-container');
const minBody = document.getElementById('body');
let jopa = container.offsetLeft;


function bodyWidth() {
    let maxOffset = max.offsetLeft;
    let minOffset = min.offsetLeft;
    minBody.style.width = (maxOffset - minOffset + 'px');
    minBody.style.left = (minOffset + 'px');
}
bodyWidth();

minBody.addEventListener('dragstart', function(event) {
    event.preventDefault();
});

min.addEventListener('mousedown', (event) => {
    event.preventDefault();
    min.addEventListener('mousemove', offsetCurs);
    min.addEventListener('mousemove', bodyWidth);
});

min.addEventListener('mouseup', () => {
    min.removeEventListener('mousemove', offsetCurs);
});

max.addEventListener('mousedown', (event) => {
    event.preventDefault();
    max.addEventListener('mousemove', offsetCursMax);
    max.addEventListener('mousemove', bodyWidth);
});

max.addEventListener('mouseup', () => {
    max.removeEventListener('mousemove', offsetCursMax);
});

function offsetCurs(e) {
    let maxOffset = max.offsetLeft;
    let minOffset = min.offsetLeft;
    let x = e.clientX;
    min.style.left = (x - jopa + 'px');
    if(x < (jopa)){
        min.style.left = '0px';
        min.removeEventListener('mousemove', offsetCurs);
    }
    if(minOffset >= (maxOffset - 8)){
        min.style.left = (maxOffset - 10 + 'px');
        min.removeEventListener('mousemove', offsetCurs);
    }
}


function offsetCursMax(e) {
    let maxOffset = max.offsetLeft;
    let minOffset = min.offsetLeft;
    let x = e.clientX;
    max.style.left = (x - jopa + 'px');
    if(x > (jopa + 230)){
        max.style.left = '234px';
        max.removeEventListener('mousemove', offsetCurs);
    }
    if(maxOffset <= (minOffset + 8)){
        max.style.left = (minOffset + 10 + 'px');
        max.removeEventListener('mousemove', offsetCursMax);
    }
}

const minPro = document.querySelector('.pole');
const maxPro = document.querySelector('.pole2');
let oneProc = minBody.offsetWidth/25768;
let left = 0;

min.addEventListener('mousemove', minLeft);
max.addEventListener('mousemove', maxLeft);

minPro.addEventListener('input', inMin);
maxPro.addEventListener('input', inMax);

function upMin() {
    const increaseValue = Math.floor((left / oneProc));
    minPro.value = increaseValue + 1850;
}
function minLeft() {
    const newLeft = parseFloat(window.getComputedStyle(min).left);
    if (newLeft !== left) {
      left = newLeft;
      upMin();
    }
}
function upMax() {
    const increaseValue = Math.floor((left / oneProc));
    maxPro.value = increaseValue;
}
function maxLeft() {
    const newLeft = parseFloat(window.getComputedStyle(max).left);
    if (newLeft !== left) {
      left = newLeft;
      upMax();
    }
}

function inMin() {
        let isConfirmed = false;
        const handleKeyPress = function(event) {
          if (event.key === 'Enter') {
            if((parseInt(minPro.value) + 1850) >= parseInt(maxPro.value)){
                minPro.value = maxPro.value - 1850;
            } else {
                minPro.value = minPro.value;
            }
            if (parseInt(minPro.value) < 1850){
                minPro.value = 1850;
            }
            min.style.left = '0px';
          bodyWidth();
          noSmall();
          }
        };
      
    const handleBlur = function() {
          if (!isConfirmed) {
            if((parseInt(minPro.value) + 1850) >= parseInt(maxPro.value)){
                minPro.value = maxPro.value - 1850;
            } else {
                minPro.value = minPro.value;
            }
            if (parseInt(minPro.value) < 1850){
                minPro.value = 1850;
            }
            min.style.left = '0px';
          bodyWidth();
          noSmall();
          }
        minPro.removeEventListener('keypress', handleKeyPress);
        minPro.removeEventListener('blur', handleBlur);
        };
        minPro.addEventListener('keypress', handleKeyPress);
        minPro.addEventListener('blur', handleBlur);
    };



function inMax() {
  let isConfirmed = false;
  const handleKeyPress = function(event) {
    if (event.key === 'Enter') {
      isConfirmed = true;
      maxPro.removeEventListener('keypress', handleKeyPress);
      if(parseInt(maxPro.value) <= (parseInt(minPro.value) + 1850)){
        maxPro.value = parseInt(minPro.value) + 1850;
    } else {
        maxPro.value = maxPro.value;
    }
    if (parseInt(maxPro.value) > 25768){
        maxPro.value = 25768;
    }
    max.style.left = (maxPro.value * oneProc + 'px');
    bodyWidth();
    noSmall();
    }
  };

  const handleBlur = function() {
    if (!isConfirmed) {
        if(parseInt(maxPro.value) <= (parseInt(minPro.value) + 1850)){
            maxPro.value = parseInt(minPro.value) + 1850;
        } else {
            maxPro.value = maxPro.value;
        }
        if (parseInt(maxPro.value) > 25768){
            maxPro.value = 25768;
        }
        max.style.left = (maxPro.value * oneProc + 'px');
        bodyWidth();
        noSmall();
    }
    maxPro.removeEventListener('keypress', handleKeyPress);
    maxPro.removeEventListener('blur', handleBlur);
  };
  maxPro.addEventListener('keypress', handleKeyPress);
  maxPro.addEventListener('blur', handleBlur);
}

minPro.addEventListener('input', bodyWidth);
maxPro.addEventListener('input', bodyWidth);

function noSmall() {
    if (maxPro.value == ''){
        maxPro.value = (parseInt(minPro.value) + 1850);
    }
    max.style.left = (maxPro.value * oneProc + 'px');
    bodyWidth();
}

const resetBtn = document.querySelector('button[type="reset"]');

resetBtn.addEventListener('click', () => {
    min.style.left = '0';
    max.style.right = '0';
    max.style.left = 'auto';
    bodyWidth();
});

const conBtn = document.getElementById('confirmBtn');

conBtn.addEventListener('click', (event) => {
    event.preventDefault();
});

const elCard = document.querySelectorAll('.cross-card');

conBtn.addEventListener('click', elMinFun);


// const cards = crossCards.length;
// console.log(cards);
// if (crossCards.length < 10){
//     moreBtn.style.display = 'none';
// }

function elMinFun(){
    elCard.forEach((e) => {
        
        h = e.querySelector('p');
        const pIn = h.innerText;
        const number = parseInt(pIn.replace(/\s/g, ''), 10);
        console.log(number);
        if (number < parseInt(minPro.value)){
            e.classList.add('hidden-cross-card');
        } else {
            e.classList.remove('hidden-cross-card');
        }
        if (number > parseInt(maxPro.value)){
            e.classList.add('hidden-cross-card');
        }
        if(e.classList.contains('hidden-cross-card')){
            e.classList.add('hidden-cross-card');
        }
    })
}

conBtn.addEventListener('click', qweewq);

function qweewq() {
        moreBtn.style.display = 'none';
}


// const hidCard = document.querySelectorAll('.hidden-cross-card');
// const countHid = hidCard.length;


// function count() {
//     if (countHid < 3){
//         moreBtn.style.display = 'none';
//     }
// }
