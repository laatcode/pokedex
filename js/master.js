const $numberForm = document.querySelector('#number-form')
const $nameForm = document.querySelector('#name-form')

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
  const text = document.querySelector('#name-form input')
  text.value = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
})
