"use strict"; // включаем строгий синтаксис

let chosenData = JSON.parse(sessionStorage.session); // получаем данные из sessionStorage и сохраняем в переменную

fetch("https://jscp-diplom.netoserver.ru/", { // отправляем запрос на сервер
	method: "POST",
	headers: { // добавляем заголовки запроса
		'Content-Type': 'application/x-www-form-urlencoded' // указываем тип запроса, в формат формы
	},
	body: `event=sale_add&timestamp=${chosenData.timestamp}&hallId=${chosenData.hallId}&seanceId=${chosenData.seanceId}&hallConfiguration=${chosenData.hallConfig}` // отправляем данные
});

// выбираем элементы на странице и сохраняем в переменные
let ticketTitle = document.querySelector('.ticket__title'),
	ticketChairs = document.querySelector('.ticket__chairs'),
	ticketHall = document.querySelector('.ticket__hall'),
	ticketStart = document.querySelector('.ticket__start'),

	date = new Date(chosenData.timestamp * 1000), 		// получаем текущую дату
	dateString = date.toLocaleString().slice(0, -3); 	// вырезаем подстроку со временем

ticketTitle.innerHTML = chosenData.filmName; 		// выводим название фильма
let hallName = chosenData.hallName.split('Зал').join(''); // выводим зал и преобразуем в строку
ticketHall.innerHTML = hallName;	// выводим зал
ticketStart.innerHTML = dateString;	// выводим время начала сеанса


let ticketsPlacesArray = [], // создаем пустой массив
	cost = 0, // создаем переменную для стоимости
	arr = chosenData.selectedPlaces; // выбираем все элементы с классом conf-step__chair

for (let i = 0; i < arr.length; i++) { // запускаем цикл
	ticketsPlacesArray.push(`${arr[i].row}/${arr[i].place}`);	// добавляем в массив строку
}
ticketChairs.textContent = ticketsPlacesArray.join(', ');	// преобразуем в строку и выводим выбранные места

// сохраняем в переменную фильм, зал и время начало сеанса, места 
let qrContent = `Билет в кино 
На сеанс: "${chosenData.filmName}"
Начало сеанса: ${dateString}
Зал: ${hallName}
Ряд/Место: ${ticketChairs.textContent}
`;

let qr = document.getElementById('qrcode'); 	// выбираем элемент
qr.append(QRCreator(qrContent).result);				// добавляем в контейнер
qr.querySelector('canvas').style.display = 'block';	// показываем картинку
qr.querySelector('canvas').style.margin = '0 auto'; // центрируем картинку