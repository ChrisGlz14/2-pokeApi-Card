const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

searchBtn.addEventListener('click', () => {
  const searchPokemon = searchInput.value.trim();
  if (searchPokemon) {
    fetchData(searchPokemon)
  }
})




function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
  
document.addEventListener("DOMContentLoaded", () => {
    const ramdom = getRandomInt(1, 152);
    fetchData(ramdom);
});




  const fetchData = async (searchPokemon) => { // Funcion Async para que se espere al traer la informacion y pintarla en DOM
    try {
      console.log(searchPokemon);
  
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchPokemon}`); // Res junto con Await fetch que recibira una Url para consumir
      const data = await res.json(); // Nuevamente se depura la Api y se transforma en JSON 
  
      console.log(data);
  
      const pokemon = { //La constante pokemon tendra a su vez propiedades que sean utilizadas en el clone 
        nombre: data.name, //Buscamos los datos en general de los pokemones en el objeto como imagenes, nombres, exp, hp,etc.
        img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
        imgJuego: data.sprites.front_default,
        imgCvg: data.sprites.other.dream_world.front_default, 
        experiencia: data.base_experience,
        hp: data.stats[0].base_stat,
        ataque: data.stats[1].base_stat,
        defensa: data.stats[2].base_stat,
        especial: data.stats[3].base_stat,
      };
  
      pintarCard(pokemon); //Pasamos como parametro el objeto pokemon
    } catch (error) {           // Se pinta el error si falla el Try
      console.log(error);
    }
  };
  
  const pintarCard = (pokemon) => {
    const flex = document.querySelector(".flex");       // Aqui es donde ira la informacion y contenido del template
    // Eliminar los resultados anteriores
  while (flex.firstChild) {
    flex.removeChild(flex.firstChild);
  }
    const template = document.querySelector("#card");   // Realizamos una funcion con el template y el .content para buscar su informacion y contenido, Capturamos el template.
    const clone = template.content.cloneNode(true);// Clonamos el template y clonamos con cloneNode(true), es el mismo template clonado, ya que puede ocacionar errores solo utilizar el template
    const fragment = document.createDocumentFragment();//Con fragment modificamos el DOM, no el html, evitamos el Reflow en loops, es una buena practica evitando el innerHTML
  

    clone.querySelector(".card-body-img").setAttribute("src", pokemon.imgCvg); //con el clon modificamos el html y con setAttribute modificamos sus atributos, en este caso Src 
    
    // clone.querySelector('.card-body-img').setAttribute('src', pokemon.imgJuego)

    clone.querySelector(".card-body-title").innerHTML = `${pokemon.nombre} <span>${pokemon.hp}hp</span>`; //Utilizamos innerHTML para que interprete el span

    clone.querySelector(".card-body-text").textContent = pokemon.experiencia + " exp";clone.querySelectorAll(".card-footer-social h3")[0].textContent = pokemon.ataque + " Pts";//Al repetirse el elemento html lo selecciono con query selector All y al elemento h3, despues selecciono el indice 0 del array.
    
    clone.querySelectorAll(".card-footer-social h3")[1].textContent = pokemon.especial + " Pts";
    
    clone.querySelectorAll(".card-footer-social h3")[2].textContent = pokemon.defensa + " Pts";
    
    fragment.appendChild(clone);// Para que ocurran cambios, debemos pasar el clon al fragment
    flex.appendChild(fragment);//Le decimos que en el fragmento se guarde y lo pasamos al flex
  
};
  


