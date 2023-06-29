const ERROR_MESSAGES = {
  400: {
    users: {
      cast: 'Передан некорректный идентификатор пользователя',
      passwordRequirements: 'Пароль должен содержать не менее 8 символов',
      validationRegistration: 'Переданы некорректные данные при регистрации пользователя',
      validationUpdate: 'Переданы некорректные данные при обновлении данных профиля пользователя',
    },

    movies: {
      validationSaving: 'Переданы некорректные данные при сохранении фильма в личном кабинете пользователя',
    },
  },

  401: {
    users: {
      unauthorized: 'Неправильный пароль',
    },
  },

  403: {
    movies: {
      noAccessRights: 'Отказано в доступе',
    },
  },

  404: {
    users: {
      userUndefined: 'Пользователь не найден',
    },

    movies: {
      moviesUndefined: 'Не найдены данные о фильмах пользователя с указанным идентификатором',
      movieUndefined: 'Неверный идентификатор фильма',
    },
  },

  409: {
    users: {
      emailDuplication: 'Пользователь с указанным email уже существует',
    },
  },
};

module.exports = ERROR_MESSAGES;
