const fs = require("fs");
const axios = require("axios");

async function generateJsonDB() {
  // TODO: fetch data pokemon api dan buatlah JSON data sesuai dengan requirement.
  // json file bernama db.json. pastikan ketika kalian menjalankan npm run start
  // dan ketika akses url http://localhost:3000/pokemon akan muncul seluruh data
  // pokemon yang telah kalian parsing dari public api pokemon
  const pokemonApiURL = "https://pokeapi.co/api/v2/pokemon?limit=100";

  try {
    const response = await axios.get(pokemonApiURL);
    const listPokemon = response.data.results;

    const pokemonData = [];

    for (const pokemon of listPokemon) {
      const detailPokemon = await axios.get(pokemon.url);
      const types = detailPokemon.data.types.map(
        (typeInfo) => typeInfo.type.name
      );

      const infoPokemon = {
        name: detailPokemon.data.name,
        types: types,
        image: detailPokemon.data.sprites.front_default,
      };
      pokemonData.push(infoPokemon);
    }
    console.log(pokemonData);

    const data = {
      pokemon: pokemonData,
    };

    fs.writeFileSync("db.json", JSON.stringify(data, null, 4));
  } catch {
    console.log("gambar tidak berhasil di simpan");
  }
}

generateJsonDB();
