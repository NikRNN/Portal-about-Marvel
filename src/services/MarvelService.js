class MarvelService {
  getResource = async (url) => {
    let res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
  };

  getAllCharacters = async () => {
    const res = this.getResource(
      "https://gateway.marvel.com:443/v1/public/characters?limit=9&offset=200&apikey=63ecc63e1c62910f53b2061e0aa2656e"
    );
    return res.data.results.map((item) => this._returnDataCharacter(item));
  };

  getSingleCharacter = async (id) => {
    const res = await this.getResource(
      `https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=63ecc63e1c62910f53b2061e0aa2656e`
    );
    return this.onCheckInfoChar(this._returnDataCharacter(res));
  };

  onCheckInfoChar = (item) => {
    const descr =
      item.description.length > 100
        ? item.description.slice(0, 97) + "..."
        : item.description;

    return { ...item, description: descr };
  };

  _returnDataCharacter = (res) => {
    console.log(res.data);
    return {
      name: res.data.results[0].name,
      description:
        res.data.results[0].description === ""
          ? "Oooops, we don't have any description"
          : res.data.results[0].description,
      thumbnail: `${res.data.results[0].thumbnail.path}.${res.data.results[0].thumbnail.extension}`,
      homepage: res.data.results[0].urls[0].url,
      wiki: res.data.results[0].urls[1].url,
      loading: false,
    };
  };
}

export default MarvelService;
