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
      item.description.length > 100
        ? item.description.slice(0, 97) + "..."
        : item.description;
    const name =
      item.name.length > 27 ? item.name.slice(0, 27) + "..." : item.name;

    return { ...item, description: descr, name: name };
  };

  _returnDataCharacter = (res) => {
    return {
      name: res.name,
      description:
        res.description === ""
          ? "Oooops, we don't have any description"
          : res.description,
      thumbnail: `${res.thumbnail.path}.${res.thumbnail.extension}`,
      homepage: res.urls[0].url,
      wiki: res.urls[1].url,
      loading: false,
    };
  };
}

export default MarvelService;
