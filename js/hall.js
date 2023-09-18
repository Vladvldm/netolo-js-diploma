"use strict";	// включаем строгий синтаксис

let chosenData = JSON.parse(sessionStorage.session); 	// получаем данные из sessionStorage и сохраняем в переменную
let updateRequest = `event=get_hallConfig&timestamp=${chosenData.timestamp}&hallId=${chosenData.hallId}&seanceId=${chosenData.seanceId}`;
// формируем запрос на сервер c выбранным началом сеанса, зал и ID сеанса и сохраняем в переменную

// выбираем элементы на странице
let buyingInfoTitle = document.querySelector('.buying__info-title'); 	// выбираем название
let buyingInfoStart = document.querySelector('.buying__info-start');	// выбираем время
let buyingInfoHall = document.querySelector('.buying__info-hall');		// выбираем зал
let priceStandart = document.querySelector('.price-standart');				// выбираем обычную стоимость
let priceVip = document.querySelector('.price-vip');			// выбираем vip стоимость


buyingInfoTitle.innerHTML = chosenData.filmName; 		// выводим название фильма
buyingInfoStart.innerHTML = `Начало сеанса ${chosenData.seanceTime}`; 	// выводим время начала сеанса
buyingInfoHall.innerHTML = chosenData.hallName.split('Зал').join('Зал '); 	// выводим зал
priceStandart.innerHTML = chosenData.priceStandart; 	// выводим стоимость
priceVip.innerHTML = chosenData.priceVip; 		// выводим стоимость vip

let configHall = document.querySelector('.conf-step__wrapper'); 	// выбираем контейнер с информацией
let buttonAcception = document.querySelector('.acceptin-button'); 	// выбираем нажатую кнопку
buttonAcception.setAttribute('disabled', true); 		// отключаем кнопку

createRequest(updateRequest, (response) => { 	// отправляем запрос
	if (response) { 		// если получили ответ
		chosenData.hallConfig = response; 	// сохраняем конфигурацию зала
	}
	configHall.innerHTML = chosenData.hallConfig; 	// выводим конфигурацию выбранного зала


	let places = document.querySelectorAll('.conf-step__chair'); 	// выбираем все элементы с классом conf-step__chair
	places.forEach(el => { // запускаем цикл для каждого элемента
		el.addEventListener('click', (event) => { // при клике выбираем элемент
			// event.preventDefault();
			let target = event.target; 		// получаем элемент который кликнули
			// console.log(target)
			if (target.closest('.conf-step__legend-price') || target.classList.contains('conf-step__chair_taken') || target.classList.contains('conf-step__chair_disabled')) { 		// если элемент выбран
				return 		// выходим из функции
			} else { 		// если элемент не выбран
				target.classList.toggle('conf-step__chair_selected'); 	// добавляем класс или удаляем
				checkButton(); 	// проверяем кнопку
			}
		})
	});

	function checkButton() { 	// функция проверяем кнопку на нажатие
		let chosenPlaces = Array.from(document.querySelectorAll('.conf-step__row .conf-step__chair_selected'));
		// выбираем все элементы с классом conf-step__chair
		if (chosenPlaces.length > 0) { 			// если выбрано больше 0
			buttonAcception.removeAttribute('disabled'); 	// отключаем кнопку
		} else {	// если выбрано 0
			buttonAcception.setAttribute('disabled', true); 	// отключаем кнопку
		}
	};

	buttonAcception.addEventListener('click', () => { 	// при нажатии на кнопку
		let selectedPlaces = Array.from(document.querySelectorAll('.conf-step__row .conf-step__chair_selected'));
		// выбираем все элементы с классом conf-step__chair
		let selectedFeature = []; 	// создаем пустой массив
		selectedPlaces.forEach((chair) => { 	// запускаем цикл для каждого элемента
			let row = chair.closest('.conf-step__row'); 	// получаем родительский элемент
			let rowIndex = Array.from(row.parentNode.children).indexOf(row) + 1; 	// получаем индекс родительского элемента (ряд)
			let chairIndex = Array.from(row.children).indexOf(chair) + 1; 	// получаем индекс элемента
			let chairType = (chair.classList.contains('conf-step__chair_standart')) ? 'standart' : 'vip'; 	// получаем тип места
			selectedFeature.push({ 	// добавляем в массив места
				row: rowIndex, 			// ряд
				place: chairIndex, 	// место
				type: chairType			// тип
			});
		});

		chosenData.hallConfig = configHall.innerHTML; 	// сохраняем конфигурацию зала
		chosenData.selectedPlaces = selectedFeature;		// сохраняем выбранные места
		sessionStorage.setItem('session', JSON.stringify(chosenData));	// сохраняем данные сеанса в sessionStorage
		window.location.href = 'payment.html';		// переходим на страницу платежа
	});
});

let zoomBuying = document.querySelector('.buying'); // выбираем контейнер с информацией
zoomBuying.addEventListener('dblclick', ()=>{	 			// при двойном клике
	zoomBuying.classList.toggle('zooming');						// добавляем или удаляем класс zooming
	if (zoomBuying.classList.contains('zooming')){ 		// если класс zooming
		zoomBuying.style.transform = "scale(1.5) translate(0%, 10%)"	 // увеличиваем
	} else{ // если нет
		zoomBuying.style.transform = "scale(1)" 	// уменьшаем
	}
});