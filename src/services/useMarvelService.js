import { useHttp } from "../hooks/http.hook";
import thorImg from "../resources/img/thor.jpeg";

const useMarvelService = () => {
  const { request, loading, error, setError, clearError } = useHttp();

  const _baseOffset = 1;

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(
      // `https://gateway.marvel.com:443/v1/public/characters?limit=9&offset=${offset}&apikey=63ecc63e1c62910f53b2061e0aa2656e` //запрос на оригинальный api, по состоянию на май 2025 не работает
      `https://marvel-server-zeta.vercel.app/characters?limit=9&offset=${offset}&apikey=d4eecb0c66dedbfae4eab45d312fc1df` //запрос на похожий сервис, но с меньшим количеством персонажей
    );

    return res.data.results.map((item) =>
      onCheckInfoChar(_returnDataCharacter(item))
    );
  };

  const getSingleCharacter = async (id) => {
    const res = await request(
      // `https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=63ecc63e1c62910f53b2061e0aa2656e` //запрос на оригинальный api, по состоянию на май 2025 не работает
      `https://marvel-server-zeta.vercel.app/characters/${id}?apikey=d4eecb0c66dedbfae4eab45d312fc1df` //запрос на похожий сервис, но с меньшим количеством персонажей
    );
    return onCheckInfoChar(_returnDataCharacter(res.data.results[0]));
  };

  const onCheckInfoChar = (item) => {
    const descr =
      item.description.length > 150
        ? item.description.slice(0, 110) + "..."
        : item.description;

    const comics =
      item.comics.length > 9 ? item.comics.slice(0, 10) : item.comics;

    return { ...item, description: descr, comics: comics };
  };

  const getAllComics = async (offset = 0) => {
    const res = await request(
      // `https://gateway.marvel.com:443/v1/public/comics?orderBy=issueNumber&limit=8&offset=${offset}&&apikey=63ecc63e1c62910f53b2061e0aa2656e` //запрос на оригинальный api, по состоянию на май 2025 не работает);
      "https://marvel-server-zeta.vercel.app/comics?limit=10&apikey=d4eecb0c66dedbfae4eab45d312fc1df" //запрос на похожий сервис, но с меньшим количеством персонажей
    );
    return res.data.results.map(_returnDataComic);
  };

  const getSingleComic = async (id) => {
    let res;
    try {
      res = await request(
        // `https://gateway.marvel.com:443/v1/public/comics/${id}?apikey=63ecc63e1c62910f53b2061e0aa2656e` //запрос на оригинальный api, по состоянию на май 2025 не работает);
        `https://marvel-server-zeta.vercel.app/comics/${id}?apikey=d4eecb0c66dedbfae4eab45d312fc1df`
      );

      return _returnDataComic(res.data.results[0]);
    } catch (error) {
      console.error("Ошибка при загрузке комикса");
      setError(true);
    }
  };

  const getCharacterByName = async (name) => {
    try {
      let res = await request(
        `https://marvel-server-zeta.vercel.app/characters?name=${name}&apikey=d4eecb0c66dedbfae4eab45d312fc1df`
      );
      return _returnDataCharacter(res.data.results[0]);
    } catch (error) {
      console.error("Ошибка при загрузке персонажа");
      setError(true);
    }
  };

  // const getCharacterByName = () => {
  //   //Marvel API не работает, его замена не знает запрос по имени персонажа, поэтому имитация запроса на сервер с именем; запрос
  //   return new Promise((resolve, reject) => {
  //     const rndNum = Math.floor(Math.random() * 11);
  //     if (rndNum <= 5) {
  //       setTimeout(() => {
  //         resolve({
  //           name: "Тор",
  //           descr:
  //             "Тор — один из главных супергероев вселенной Marvel, бог грома, наследник престола Асгарда и член команды Мстителей. В комиксах он представлен как могущественный воин, обладающий невероятной силой, выносливостью и способностью управлять молнией. Его легендарный молот Мьёльнир, выкованный из звёздного металла ура, наделяет его способностью летать, вызывать грозы и возвращаться к своему владельцу после броска. Однако поднять его может только тот, кто «достоин» — это ключевой мотив в историях о Торе, включая его временную потерю права владеть молотом и последующее искупление.",
  //           id: 21,
  //           img: thorImg,
  //         });
  //       }, 3000);
  //     } else if (rndNum > 6) {
  //       setTimeout(() => {
  //         reject({
  //           status: "error",
  //           message: "Персонаж не найден. Проверьте имя и попробуйте снова",
  //         });
  //       }, 3000);
  //     }
  //   });
  // };

  const _returnDataCharacter = (res) => {
    return {
      id: res.id,
      name: res.name,
      description:
        res.description === ""
          ? "Ой, у нас отсутствует описание персонажа"
          : "Описание только на английском :) " + res.description,
      thumbnail: `${res.thumbnail.path}.${res.thumbnail.extension}`,
      homepage: res.urls[0].url,
      wiki: res.urls[1].url,
      comics: res.comics.items,
      loading: false,
    };
  };

  const _returnDataComic = (res) => {
    return {
      id: res.id,
      thumbnail: `${res.thumbnail.path}.${res.thumbnail.extension}`,
      title: `${res.title.slice(0, -4)}`,
      price: `${
        res.prices.length === 1 ? "Цена отсутствует" : res.prices[1].price
      }`,
      description: res.description || "Извини, у нас отсутствует описание",
      language: res.textObjects.language || "en-rus",
      pageCount: res.pageCount
        ? `${res.pageCount} стр.`
        : `Извини, у нас отсутствует информация о количестве страниц`,
    };
  };

  return {
    loading,
    error,
    getAllCharacters,
    getSingleCharacter,
    clearError,
    getAllComics,
    getSingleComic,
    getCharacterByName,
  };
};

export default useMarvelService;
