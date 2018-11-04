const $numberForm = document.querySelector('#number-form')
const $nameForm = document.querySelector('#name-form')
const $image = document.querySelector('#image')
const $text = document.querySelector('#name-form input')
const $textarea = document.querySelector('#textarea')

async function getData(entrypoint, param) {
  const response =  await fetch(`https://pokeapi.co/api/v2/${entrypoint}/${param}/`)
  const pokemon = await response.json()
  return pokemon
}

$numberForm.addEventListener('submit', async (ev) => {
  ev.preventDefault()
  const form = new FormData($numberForm)
  const id = form.get('id')
  const pokemon = await getData('pokemon', id)

  // Establecer nombre del Pokemon
  $text.value = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)

  // Establecer imagen de Pokemon
  $image.setAttribute('src', pokemon.sprites.front_default)

  // Establecer descripción del Pokemon
  const species = await getData('pokemon-species',id)
  const flavor = species.flavor_text_entries.find((entry) => entry.language.name === 'es').flavor_text
  $textarea.value = flavor
})
