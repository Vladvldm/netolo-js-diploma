"use strict"; // включаем строгий синтаксис

let dayNumber = document.querySelectorAll('.page-nav__day-number');
// выбираем все элементы с классом page-nav__day и сохраняем их в переменную
let weekDay = document.querySelectorAll('.page-nav__day-week');
// выбираем все элементы с классом page-nav__day и сохраняем их в переменную
let weekDayArray = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
// создаем массив со списком дней недели
let today = new Date(); // получаем текущую дату
let todayFirstDay = today.setHours(0, 0, 0, 0); // получаем первый (текущий) день

for (let i = 0; i < dayNumber.length; i++) { // запускаем цикл, чтобы получить дату для каждого элемента (число дня)
	let dayNow = new Date(todayFirstDay + (i * (24 * 60 * 60 * 1000))); // получаем текущую дату (сегодня)
	dayNumber[i].textContent = `${dayNow.getDate()}`; // выводим день
	dayNumber[i].parentNode.dataset.timestamp = todayFirstDay + (i * (24 * 60 * 60 * 1000)); // сохраняем текущую дату
	weekDay[i].textContent = `${weekDayArray[dayNow.getDay()]}`; // выводим день недели

	if ((weekDay[i].textContent === 'Вс') || (weekDay[i].textContent === 'Сб')) { // если день недели равен Вс или Сб
		dayNumber[i].parentNode.classList.add('page-nav__day_weekend'); // добавляем класс page-nav__day_weekend
	} else {
		dayNumber[i].parentNode.classList.remove('page-nav__day_weekend'); // иначе убираем
	}
}

let navBtn = document.querySelectorAll('.page-nav__day'); // выбираем все элементы с классом page-nav__day
navBtn.forEach(el => {		// запускаем цикл для каждого элемента
	el.addEventListener('click', () => { // при клике выбираем элемент и добавляем класс
		navBtn.forEach(e => { 	// запускаем цикл для каждого элемента с классом page-nav__day_chosen
			e.classList.remove('page-nav__day_chosen'); // убираем класс page-nav__day_chosen
		})
		el.classList.add('page-nav__day_chosen'); // добавляем класс page-nav__day_chosen
		createRequest(updateRequest, hallConfig); // отправляем запрос с новым параметром
	})
});

let main = document.querySelector("main"); // выбираем элемент с классом main
let updateRequest = 'event=update';	// сохраняем в переменную запрос с новым параметром
createRequest(updateRequest, hallConfig); // отправляем запрос


function hallConfig(response) { // функция, которая обрабатывает ответ
	main.innerHTML = ''; // очищаем содержимое main
	let arr = {}; // создаем пустой объект
	arr.seances = response.seances.result; // заполняем объект сеансами
	arr.films = response.films.result;	// заполняем объект фильмами
	arr.halls = response.halls.result;	// заполняем объект залами
	arr.halls = arr.halls.filter((hall) => hall.hall_open == 1);	// фильтруем залы открытые в данный момент

	arr.films.forEach(film => { // запускаем цикл для каждого фильма
		let addHtml =		// создаем строку с информацией о фильме
			`<section class="movie">
				<div class="movie__info">
					<div class="movie__poster">
						<img class="movie__poster-image" src="${film.film_poster}">
					</div>
					  <div class="movie__description">
						<h2 class="movie__title">${film.film_name}</h2>
						<p class="movie__synopsis">${film.film_description}</p>
						<p class="movie__data">
						  <span class="movie__data-duration">${film.film_duration} мин</span>
						  <span class="movie__data-origin">${film.film_origin}</span>
						</p>
					  </div>
					</div>`;

		arr.halls.forEach((hall) => {	// запускаем цикл для каждого зала
			let seances = arr.seances.filter(seance => ((seance.seance_hallid === hall.hall_id) && (seance.seance_filmid === film.film_id)));
				// фильтруем сеансы по залу и фильму
			if (seances.length > 0) {	// если сеансов больше 0
				addHtml +=	// добавляем строку с информацией о сеансах
					`<div class="movie-seances__hall">
					  <h3 class="movie-seances__hall-title">${hall.hall_name}</h3>
					  <ul class="movie-seances__list">`;
				seances.forEach(seance => // запускаем цикл для каждого сеанса
						// добавляем строку с информацией о сеансах
					addHtml +=
					`<li class="movie-seances__time-block"><a class="movie-seances__time" href="hall.html"
					data-film-name="${film.film_name}" data-film-id="${film.film_id}" data-hall-id="${hall.hall_id}"
					data-hall-name="${hall.hall_name}" data-price-standart="${hall.hall_price_standart}" 
					data-price-vip="${hall.hall_price_vip}" data-seance-id="${seance.seance_id}"
					data-seance-start="${seance.seance_start}" data-seance-time="${seance.seance_time}">
					${seance.seance_time}</a></li>`
				);

				addHtml +=
					`</ul>
					</div>` // закрываем блок с информацией о сеансах
			};
		});
		addHtml +=
			`</section>`; // закрываем блок с информацией о фильме
		main.insertAdjacentHTML("beforeend", addHtml); // добавляем строку с информацией о фильме
	});
	
	let chosenSeance = document.querySelectorAll('.movie-seances__time');
	// выбираем все элементы с классом movie-seances__time
	let chosenDay = document.querySelector('.page-nav__day_chosen');
	// выбираем элемент с классом page-nav__day_chosen
	let chosenDayTimestamp = chosenDay.dataset.timestamp;
	// сохраняем текущую дату в переменную

	chosenSeance.forEach(el => { // запускаем цикл для каждого элемента
		let seanseTimestamp = +chosenDayTimestamp + (+el.dataset.seanceStart * 60 * 1000); // получаем время начала сеанса
		let now = new Date().getTime(); // получаем текущее время

		if (seanseTimestamp < now) { // если время начала сеанса меньше текущего времени
			el.style.background = 'grey' // меняем цвет фона
		}
		el.addEventListener('click', (event) => { // при клике выбираем элемент

			let target = event.target; // получаем элемент который кликнули
			if (seanseTimestamp < now) { // если время начала сеанса меньше текущего времени
				event.preventDefault() // запрещаем переход
			} else { // если время начала сеанса больше текущего времени
				let chosenData = target.dataset; // сохраняем данные элемента
				chosenData.timestamp = Math.floor(seanseTimestamp / 1000);	// сохраняем время начала сеанса

				chosenData.hallConfig = arr.halls.find(hall => hall.hall_id == chosenData.hallId).hall_config; // сохраняем конфиг зала
				sessionStorage.setItem('session', JSON.stringify(chosenData)); // сохраняем данные сеанса
			}
		})
	})
}; // закрываем функцию hallConfig