import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
  const { request, loading, error, setError, clearError } = useHttp();

  const _baseOffset = 210;
  const _baseOffsetCom = 0;

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(
      `https://gateway.marvel.com:443/v1/public/characters?limit=9&offset=${offset}&apikey=63ecc63e1c62910f53b2061e0aa2656e`
    );

    return res.data.results.map((item) =>
      onCheckInfoChar(_returnDataCharacter(item))
    );
  };

  const getSingleCharacter = async (id) => {
    const res = await request(
      `https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=63ecc63e1c62910f53b2061e0aa2656e`
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
      `https://gateway.marvel.com:443/v1/public/comics?orderBy=issueNumber&limit=8&offset=${offset}&&apikey=63ecc63e1c62910f53b2061e0aa2656e`
    );

    return res.data.results.map(_returnDataComic);
  };

  const getSingleComic = async (id) => {
    let res;

    try {
      res = await request(
        `https://gateway.marvel.com:443/v1/public/comics/${id}?apikey=63ecc63e1c62910f53b2061e0aa2656e`
      );
      return _returnDataComic(res.data.results[0]);
    } catch (error) {
      console.error("Ошибка при загрузке комикса");
      setError(true);
    }
  };

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
  };
};

export default useMarvelService;
