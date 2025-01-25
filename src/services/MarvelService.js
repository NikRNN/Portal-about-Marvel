class MarvelService {
  getResource = async (url) => {
    let res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
  };

  getAllCharacters = async () => {
    const res = await this.getResource(
      "https://gateway.marvel.com:443/v1/public/characters?limit=9&offset=200&apikey=63ecc63e1c62910f53b2061e0aa2656e"
    );

    return res.data.results.map((item) =>
      this.onCheckInfoChar(this._returnDataCharacter(item))
    );
  };

  getSingleCharacter = async (id) => {
    const res = await this.getResource(
      `https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=63ecc63e1c62910f53b2061e0aa2656e`
    );
    return this.onCheckInfoChar(this._returnDataCharacter(res.data.results[0]));
  };

  onCheckInfoChar = (item) => {
    const descr =
      item.description.length > 150
        ? item.description.slice(0, 110) + "..."
        : item.description;

    const comics =
      item.comics.length > 9 ? item.comics.slice(0, 10) : item.comics;

    return { ...item, description: descr, comics: comics };
  };

  _returnDataCharacter = (res) => {
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
}

export default MarvelService;
