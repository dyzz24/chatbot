
const SupportFeatures = (APIDATA, service) => {
  const http = new service();
  const {API} = APIDATA;
  const {APIID} = APIDATA;
  const {NEWSAPI} = APIDATA;
  const {NEWSAPIID} = APIDATA;

  const messageGenerate = (type, text, id) => {
    const message = {
      id: id + Math.random(),
      type: type,
      message: text
    };

    return message;
  };

  const parseUserEnter = userString => {
    const text = userString.trim();

    if (text.match(/^help$/) || text.match(/^\/help$/)) {
      return { command: 'help' };
    } else if (text.match(/\/play/)) {
      const number = Number(text.replace('/play', ''));
      if (number >= 100 || number < 1 || !number) {
        return { command: 'play', subCommand: 'invalidNumber' };
      } else {
        return { command: 'play', subCommand: number };
      }
    } else if (text.match(/\/weather/)) {
      const cityName = text.replace('/weather', '').trim();
      return { command: 'weather', subCommand: cityName };
    } else if (text.match(/\/translate/)) {
      const translateTxt = text.replace('/translate', '').trim();
      return { command: 'translate', subCommand: translateTxt };
    } else if (text.match(/\/bestsellers/)) {
      return { command: 'bestsellers' };
    } else if (text.match(/\/clear/)) {
      return { command: 'clear' };
    } else if (text.match(/\/news/)) {
      const news = text.replace('/news', '').trim();
      return { command: 'news', subCommand: news };
    } else {
      return { command: 'null' };
    }
  };

  // * for play */
  const randomNumberGenerate = () => {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    return randomNumber;
  };

  const numberComprasion = (randomNumber, userNumber) => {
    if (randomNumber > userNumber) {
      return 'Я выиграл';
    }

    if (randomNumber < userNumber) {
      return 'Ты выиграл';
    }

    if (randomNumber === userNumber) {
      return 'Ничья';
    }
  };

  const getWeather = async cityName => {
    const data = http.getData(`${API}${cityName}${APIID}`);
    return data;
  };

  const getTranslate = async text => {
    const data = http.getOtherData(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=
    trnsl.1.1.20191210T104539Z.2eeb161aebc81077.45334090b358589ba100668eaa847973ede8bcc7&text=${text}&lang=ru`);
    return data;
  };

  const getBestsellers = async () => {
    const data = http.getOtherData(
      `https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?api-key=3RyIGqWqdJRZwGpSYM6WJLkXGHXQceCx`
    );
    return data;
  };

  const getLastNews = async newsFrom => {
    const data = http.getOtherData(
      `${NEWSAPI}q=${newsFrom}&sortBy=publishedAt${NEWSAPIID}`
    );
    return data;
  };

  const parseBestsellers = (bestArray, descriptSlice, maxBestsellersCount) => {
    if (bestArray && bestArray.length > 0) {
      const bestSellers = bestArray
        // * выдать определенное количество записей
        .filter((v, ind) => ind < maxBestsellersCount)
        .map(items => {
          // * обрезать строку и поставить ... в конце
          items.description = items.description.slice(0, descriptSlice) + '...';
          const { author, description, title } = items;
          return { author, description, title };
        })
        .map(item => {
          const oneString = `<p class = 'authorString'> Автор: ${item.author}</p>  <p> Название: ${item.title} </p>  <p> Описание: ${item.description} </p>`;
          return oneString;
        });

      return bestSellers;
    }
  };

  return {
    messageGenerate,
    parseUserEnter,
    randomNumberGenerate,
    numberComprasion,
    getWeather,
    getTranslate,
    getBestsellers,
    getLastNews,
    parseBestsellers
  };
};

export default SupportFeatures;
