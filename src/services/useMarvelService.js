import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
  const { request, loading, error, clearError } = useHttp();

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

  const getAllComics = async (offset = _baseOffsetCom) => {
    const res = await request(
      "https://gateway.marvel.com/v1/public/comics?limit=8&apikey=63ecc63e1c62910f53b2061e0aa2656e"
    );
    return;
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

  return {
    loading,
    error,
    getAllCharacters,
    getSingleCharacter,
    clearError,
  };
};

export default useMarvelService;
