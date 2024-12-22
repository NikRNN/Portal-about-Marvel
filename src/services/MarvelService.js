class MarvelService {
   getResource = async (url) => {
        let res = await fetch(url);
        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`)
        }
        return await res.json()
    }

    getAllCharacters = () => {
       return this.getResource('https://gateway.marvel.com:443/v1/public/characters?limit=9&offset=200&apikey=63ecc63e1c62910f53b2061e0aa2656e')
    }

    getSingleCharacter = (id) => {
        return this.getResource(`https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=63ecc63e1c62910f53b2061e0aa2656e`)
   }
}

export default MarvelService;