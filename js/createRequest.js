"use strict"; // включаем строгий синтаксис

// Функция для отправки POST-запроса
function createRequest(body, callback) {

	fetch('https://jscp-diplom.netoserver.ru/', { // отправляем запрос на сервер
			method: 'POST',
			body: body, // отправляем данные
			headers: {	// добавляем заголовки запроса
				'Content-Type': 'application/x-www-form-urlencoded', // указываем тип запроса, в формат формы
			},
		})
		.then((response) => {	// получаем ответ от сервера
			if (!response.ok) {	// если не получилось
				throw new Error('Произошла ошибка!');	// выбрасываем ошибку
			}
			return response.json() // возвращаем ответ в формате JSON
		})

		.then((data) => { // обрабатываем ответ
			callback(data);	// вызываем функцию обратного вызова
		})

		.catch((error) => {	// обрабатываем ошибку
			console.log(error);	// выводим ее в консоль
		})
};