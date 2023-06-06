//obtengo referencias a los elementos HTML
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');




//obtengo el valor del input (searchInput) y eliminar los espacios en blanco del principio y el final utilizando el método trim(). Retornando el valor en limpio.
function getPokemonInput () {
  return searchInput.value.trim()  
}



//Esta función devuelve un número entero aleatorio dentro del rango especificado
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}



//Este bloque se ejecuta cuando el contenido de la página se carga completamente. Genera un número aleatorio usando getRandomInt() y luego llama a la función fetchData() para buscar los datos del Pokémon.
document.addEventListener("DOMContentLoaded", () => {
  const ramdom = getRandomInt(1, 152);
  fetchData(ramdom);
});



//Se obtiene el valor del campo de entrada de búsqueda utilizando getPokemonInput(). Si el valor no está vacío, llama a la función fetchData() para buscar los datos del Pokémon ingresado por el usuario.
searchBtn.addEventListener("click", () => {
  const userInput = getPokemonInput();
  if (userInput !== "") {
    fetchData(userInput);
  }
});




//Esta función asincrónica se encarga de realizar la solicitud a la API de Pokémon para obtener los datos del Pokémon con el ID especificado. Utiliza el ID en la URL de la solicitud y luego convierte la respuesta en formato JSON.
const fetchData = async (id) => {
  try {
    // Realiza una solicitud a la API de Pokédex para obtener información sobre un Pokémon específico
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

    // Verifica si la respuesta tiene un código de estado 404, lo que indica que el Pokémon no se encontró
    if (res.status === 404) {
      // Si el Pokémon no se encontró, creamos un objeto "notFoundPokemon" con valores predeterminados para representar la situación de "No existe"
      const notFoundPokemon = {
        nombre: "No existe",
        img: "Not found",
        experiencia: 0,
        hp: 0,
        ataque: 0,
        defensa: 0,
        especial: 0,
      };
      pintarCard(notFoundPokemon);
    } else {
      const data = await res.json();
      const pokemon = {
        img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
        imgJuego: data.sprites.front_default,
        imgCvg: data.sprites.other.dream_world.front_default,
        nombre: data.name,
        experiencia: data.base_experience,
        hp: data.stats[0].base_stat,
        ataque: data.stats[1].base_stat,
        defensa: data.stats[2].base_stat,
        especial: data.stats[3].base_stat,
      };
      pintarCard(pokemon);
    }
  } catch (error) {
    console.log(error);
  }
};








//Esta función se encarga de crear y mostrar la tarjeta del Pokémon en el DOM. Obtiene referencias a los elementos relevantes dentro de la tarjeta y los actualiza con los datos del Pokémon proporcionados. Luego, agrega la tarjeta clonada al fragmento y lo agrega al contenedor principal (con la clase "flex") en el DOM.
const pintarCard = (pokemon) => {
  const flex = document.querySelector(".flex");
  const template = document.getElementById("card").content;
  const clone = template.cloneNode(true);
  const fragment = document.createDocumentFragment();

  const existingCard = flex.querySelector(".card");
  if (existingCard) {
    flex.removeChild(existingCard);
 }
  clone.querySelector(".card-body-img").setAttribute("src", pokemon.imgCvg);

  clone.querySelector(
    ".card-body-title"
  ).innerHTML = `${pokemon.nombre} <span>${pokemon.hp}hp</span>`;
  clone.querySelector(".card-body-text").textContent =
    pokemon.experiencia + " exp";
  clone.querySelectorAll(".card-footer-social h3")[0].textContent =
    pokemon.ataque + "K";
  clone.querySelectorAll(".card-footer-social h3")[1].textContent =
    pokemon.especial + "K";
  clone.querySelectorAll(".card-footer-social h3")[2].textContent =
    pokemon.defensa + "K";

  fragment.appendChild(clone);
  
  flex.appendChild(fragment);
};