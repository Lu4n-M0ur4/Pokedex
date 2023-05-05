const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const loadMoreDetailpokemon = document.getElementById("loadMoreDetailpokemon");
const limit = 2;
let offset = 0;
const MaxRecords = 500;

function loadPokemonsItem(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons
      .map((pokemon) => {
        return `
    
        <li class = 'pokemon ${pokemon.type}' >
        <span class = 'number'>#${pokemon.number}</span>
        <span class = 'name'>${pokemon.name}</span>
    
    
            <div class="detail">
        <ol class = 'types'>
            ${pokemon.types
              .map((type) => `<li class="type ${type}">${type}</li>`)
              .join("")}
        </ol>      

    
        <img src="${pokemon.photo}" alt="${pokemon.name}">
       
        <div class='buttonDetail'>
         <button onclick= pokemonDetail(${pokemon.number}) id="loadMoreDetailpokemon" type="button" >
             Detalhes do pokemon
        </button>
         </div>
        </li>
     
    `;
      })
      .join("");
    pokemonList.innerHTML += newHtml;
  });
}

loadPokemonsItem(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  let qtdRecordNextPage = offset + limit;

  if (qtdRecordNextPage >= MaxRecords) {
    const newLimit = MaxRecords - offset;
    loadPokemonsItem(offset, newLimit);
    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonsItem(offset, limit);
  }
});

function pokemonDetail(pokemonNumber) {
//  window.location.href=`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}/`

 fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}/`)
 .then((response) => response.json())
 .then((pokDetail)=> console.log(pokDetail))
 
 ;
}
