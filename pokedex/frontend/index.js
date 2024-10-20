let dataPokemon = [];

const fetchPokemon = async () => {
  try {
    const response = await fetch("http://localhost:3000/pokemon");
    if (!response.ok) {
      throw new Error("HTTP call failed");
    }
    const data = await response.json();
    dataPokemon = data;
    renderApp();
  } catch (error) {
    console.error(`failed to fatch pokemon data : ${error}`);
    renderApp();
  }
};

const CardPokemon = ({ name, image, types }) => {
  return React.createElement(
    "div",
    { className: "m-4 p-4 border rounded shadow-lg text-center" },
    React.createElement("img", {
      src: image,
      alt: name,
      className: "w-32 h-32 mx-auto",
    }),
    React.createElement("h2", { className: "text-xl font-bold" }, name),
    React.createElement("p", { className: "text-gray-600" }, `Type : ${types}`)
  );
};

const ListPokemon = () => {
  if (!Array.isArray(dataPokemon) || dataPokemon.length === 0) {
    return React.createElement(
      "p",
      { className: "text-center" },
      "Loading Pokemon Data"
    );
  }
  return React.createElement(
    "div",
    {
      className: "flex flex-wrap justify-center",
    },
    dataPokemon.map((pokemon, index) =>
      React.createElement(CardPokemon, {
        key: index,
        name: pokemon.name,
        types: pokemon.types ? pokemon.types.join("/") : "Unknown",
        image: pokemon.image,
      })
    )
  );
};

const App = () => {
  return React.createElement(
    "div",
    { className: "p-4" },
    React.createElement(
      "header",
      { className: "mb-4" },
      React.createElement(
        "h1",
        { className: "text-3xl text-center font-bold underline" },
        "Pokedex"
      )
    ),
    React.createElement(ListPokemon, null)
  );
};

const renderApp = () => {
  ReactDOM.render(React.createElement(App), document.getElementById("root"));
};

renderApp();

fetchPokemon();
