'use strict';

const container = document.querySelector('.container');
const imgCounter = document.querySelector('.container__img--counter');
const arrowPrev = document.querySelector('.arrow__prev');
const arrowNext = document.querySelector('.arrow__next');
const descDiv = document.querySelector('.container__img--description');
const dots = document.querySelector('.dots');

const numOfImages = images.length;

const currentImgCounter = (number) => {
    imgCounter.textContent = `${number} / ${images.length}`;
};

const dotHandler = {
    createDot() {
        dots.innerHTML = "";
        for (let i = 0; i < images.length; i += 1) {
            let dot = document.createElement('i');
            dot.classList.add('fas', 'fa-circle');
            dot.dataset.value = i+1;
            dots.appendChild(dot);
            if(dot.dataset.value == imagesHandler.currentImg().num) {
                this.addCurrentClass(dot); 
            }
        }
    },
    currentDot() {
        const dotsArr = [...dots.childNodes];
        const currentDot = dotsArr.find( dot => dot.className.indexOf("current") > 0);
        return currentDot;
    },
    addCurrentClass(item) {
        item.classList.add('current');
    },
    removeCurrentClass(item) {
        item.classList.remove('current');
    },
};

const imagesHandler = {
    currentImg() {
        const img = images.filter(objects => objects.onScreen === true);
        return img[0];
    },
    goToAnotherImg(numOfAnotherImg, dotIndex) {
        const currentImg = imagesHandler.currentImg();
        currentImg.onScreen = false;
        const img = images.filter(objects => objects.num == numOfAnotherImg);
        container.style.backgroundImage = `url('./assets/img/${img[0].value}')`;
        img[0].onScreen = true;

        currentImgCounter(img[0].num);

        descDiv.textContent = imagesHandler.currentImg().description;
        const currentDot = dotHandler.currentDot();
        dotHandler.removeCurrentClass(currentDot);
        const dotsArr = [...dots.childNodes];
        const anotherDot = dotsArr[dotIndex];
        dotHandler.addCurrentClass(anotherDot);
    },
    goToPrevImg() {
        const index = imagesHandler.currentImg().num;
        const numOfPrevImg = index - 1;
        const prevDotIndex = index - 2;
        if (numOfPrevImg <= 0 && prevDotIndex < 0) {
            imagesHandler.goToAnotherImg(numOfImages, numOfImages - 1);
        } else {
            imagesHandler.goToAnotherImg(numOfPrevImg, prevDotIndex);
        }
    },
    goToNextImg() {
        const index = imagesHandler.currentImg().num;
        const numOfNextImg = index + 1;
        if (numOfNextImg > numOfImages) {
            imagesHandler.goToAnotherImg(1, 0);
        } else {
            imagesHandler.goToAnotherImg(numOfNextImg, index);
        }
    }
};

const init = () => {
    container.style.backgroundImage = `url('./assets/img/${images[0].value}')`;
    images[0].onScreen = true;
    currentImgCounter(images[0].num);
    descDiv.textContent = images[0].description;
    dotHandler.createDot();
};

init();

arrowPrev.addEventListener('click', imagesHandler.goToPrevImg);
arrowNext.addEventListener('click', imagesHandler.goToNextImg);

const randomImg = () => {
    const num = event.target.dataset.value;
    imagesHandler.goToAnotherImg(num, num-1);
};

const dotsArr = [...dots.childNodes];
dotsArr.forEach(item => {
    item.addEventListener('click', randomImg);
});

setInterval(imagesHandler.goToNextImg, 5000);

import {images} from './img.js';