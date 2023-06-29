Ссылка на репозиторий: https://github.com/dmitrgulyaeff/movies-explorer-api
Ссылка на api: https://api.dmitrgulyaeff.nomoredomains.rocks/

## Директории

`/routes` — роутеры
`/controllers` — контроллеры пользователя и фильма   
`/models` — схемы пользователя и фильма  
`/errors` — экземпляры ошибок  
  
## Запуск проекта

`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload
`npm run lint` — проверка кода линтером
`npm run lint:fix` — автоисправление кода линтером

## Ручки
###Регистрация/авторизация:
### `POST /signup`
создаёт пользователя с переданными в body: {email, password, name}

### `POST /signin `
проверяет переданные в теле почту и пароль и возвращает JWT
###Пользователь:
### `GET /users/me`
возвращает информацию о пользователе (email и имя)
### `PATCH /users/me`
обновляет информацию о пользователе (email и имя)

###Фильмы:
### `GET /movies`
возвращает все сохранённые текущим  пользователем фильмы
### `POST /movies`
создаёт фильм с переданными в body: {country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId }
### `DELETE /movies/_id` 
удаляет сохранённый фильм по id
