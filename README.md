# Дипломное задание по курсу «JavaScript-программирование для начинающих»

## Создание «информационной системы для предварительного бронирования билетов».

### Студенту предоставляются следующие компоненты системы:

- Верстка
- Backend

- Проект:-> [github-pages](https://vladvldm.github.io/netolo-js-diploma/#) <-

- ### Используемые технологии в проекте:

- Разметка: HTML-5;
- Оформление: CSS-3;
- Поведение: JavaScript;
- Отслеживание версий кода: Git;
- Публикация на сайте Git-Hub;

## Задача
-   Разработать сайт бронирования билетов онлайн

## Сущности
_Кинозал_  Помещение, в котором демонстрируются фильмы. Режим работы определяется расписанием на день. Зал — прямоугольный, состоит из N*M различных зрительских мест.

_Зрительское место_  Место в кинозале. Зрительские места могут быть VIP и обычные.

_Фильм_  Информация о фильме заполняется администратором. Фильм связан с сеансом в кинозале.

_Сеанс_  Сеанс — это временной промежуток, в котором в кинозале будет показываться фильм. На сеанс могут быть забронированы билеты.

_Билет_  QR-код c уникальным кодом бронирования, в котором обязательно указаны место, ряд, сеанс. Билет действителен строго на свой сеанс. Для генерации QR-кода можно использовать [QRCreator.js](https://github.com/slesareva-gala/QR-Code)

## Роли пользователей системы
-   Гость — неавторизованный посетитель сайта

### Возможности гостя
-   просмотр расписания
-   просмотр информации о фильмах
-   выбор места в кинозале
-   бронирование билета

## Этапы разработки
1.  Адаптируйте исходную верстку под планшетные и мобильные устройства.
Ваша верстка должна корректно отображаться на устройствах с шириной экрана **320px** и более.
Для быстрой адаптации рекомендуем вам воспользоваться [системой сеток BootStrap](https://getbootstrap.su/docs/5.0/layout/grid/).
2. Разработка API для взаимодействия с [Backend.](./md/backend.md)
3. Программирование гостевой части.

### Что должно получиться в итоге
***Git-репозиторий***, содержащий в себе необходимые файлы проекта, и файл Readme, в котором должна быть ссылка на ваш проект, опубликованный на ***githubPage***, а также описание стэка технологий, используемых вами в процессе работы над проектом.
