//import * as flsFunctions from "./modules/functions.js";

//flsFunctions.isWebp();

"use strict"

window.onload = function () {
	const parallax = document.querySelector('.parallax');

	if (parallax) {
		const content = document.querySelector('.parallax__container');
		const clouds = document.querySelector('.images-parallax__clouds');
		const mountains = document.querySelector('.images-parallax__mountains');
		const human = document.querySelector('.images-parallax__human');

		// Кожффициенты
		const forClouds = 40;
		const forMountains = 20;
		const forHuman = 10;

		// Скорость анимации
		const speed = 0.05;

		// Объявления переменных
		let positionX = 0;
		let positionY = 0;
		let coordXprocent = 0;
		let coordYprocent = 0;


		function setMouseParallaxStyle() {
			const distX = coordXprocent - positionX;
			const distY = coordYprocent - positionY;

			positionX = positionX + (distX * speed);
			positionY = positionY + (distY * speed);

			// Передаем стили

			clouds.style.cssText = `transform: translate(${positionX / forClouds}%, ${positionY / forClouds}%);`;
			mountains.style.cssText = `transform: translate(${positionX / forMountains}%, ${positionY / forMountains}%);`;
			human.style.cssText = `transform: translate(${positionX / forClouds}%, ${positionY / forClouds}%);`;

			requestAnimationFrame(setMouseParallaxStyle);
		}

		setMouseParallaxStyle();

		parallax.addEventListener("mousemove", function (e) {
			let parallaxWidth = parallax.offsetWidth;
			let parallaxHeight = parallax.offsetHeight;

			// Вычисляем центр
			let coordX = e.pageX - parallaxWidth / 2;
			let coordY = e.pageY - parallaxHeight / 2;

			// Получаем проценты
			coordXprocent = coordX / parallaxWidth * 100;
			coordYprocent = coordY / parallaxHeight * 100;

		});

		// Parallax при скроле

		let thresholdSets = [];

		for (let i = 0; i <= 1.0; i += 0.0005) {
			thresholdSets.push(i);
		}
		const callback = function (events, observer) {
			const scrollTopProcent = window.pageYOffset / parallax.offsetHeight * 100;
			setParallaxItemsStyle(scrollTopProcent);
		};
		const observer = new IntersectionObserver(callback, {
			threshold: thresholdSets
		});

		observer.observe(document.querySelector('.content'));

		function setParallaxItemsStyle(scrollTopProcent) {
			content.style.cssText = `transform: translate(0%, -${scrollTopProcent / 9}%);`;
			mountains.parentElement.style.cssText = `transform: translate(0%, -${scrollTopProcent / 6}%);`;
			human.parentElement.style.cssText = `transform: translate(0%, -${scrollTopProcent / 3}%);`;
		}


	}
}

// 300 - 1200 / 2 = -300
// 300 / 1200 * 100