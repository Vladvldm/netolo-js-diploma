"use strict"; // включаем строгий синтаксис

let chosenData = JSON.parse(sessionStorage.session), // получаем данные из sessionStorage преобразуем и сохраняем в переменную

// выбираем элементы на странице и сохраняем в переменные
	ticketTitle = document.querySelector('.ticket__title'),
	ticketChairs = document.querySelector('.ticket__chairs'),
	ticketHall = document.querySelector('.ticket__hall'),
	ticketStart = document.querySelector('.ticket__start'),
	ticketCost = document.querySelector('.ticket__cost'),
	buttonAcception = document.querySelector('.acceptin-button'),

	date = new Date(chosenData.timestamp * 1000), 		// получаем текущую дату
	dateString = date.toLocaleString().slice(0, -3);	// вырезаем подстроку с временем

ticketTitle.innerHTML = chosenData.filmName; // выводим название фильма
ticketHall.innerHTML = chosenData.hallName.split('Зал').join(''); // выводим зал и преобразуем в строку
ticketStart.innerHTML = dateString; // выводим время начала сеанса


let ticketPlacesArray = [], // создаем пустой массив
	cost = 0, // создаем переменную для стоимости
	arr = chosenData.selectedPlaces; // выбираем все элементы с классом conf-step__chair

for (let i = 0; i < arr.length; i++) { // запускаем цикл
	ticketPlacesArray.push(`${arr[i].row}/${arr[i].place}`); // добавляем в массив строку
	if (arr[i].type === 'standart') { // если тип зала стандарт
		cost += +chosenData.priceStandart; // добавляем стоимость
	} else { // если тип зала vip
		cost += +chosenData.priceVip; // добавляем стоимость
	}
};

ticketChairs.textContent = ticketPlacesArray.join(', ') // выводим выбранные места
ticketCost.textContent = cost; // выводим стоимость