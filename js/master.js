const $numberForm = document.querySelector('#number-form')
const $nameForm = document.querySelector('#name-form')
const $image = document.querySelector('#image')
const $id = document.querySelector('#number-form input')
const $text = document.querySelector('#name-form input')
const $textarea = document.querySelector('#textarea')
const speach = window.speechSynthesis


async function getData(entrypoint, param) {
  const response =  await fetch(`https://pokeapi.co/api/v2/${entrypoint}/${param}/`)
  const pokemon = await response.json()
  return pokemon
}

async function formAction(param){
  const pokemon = await getData('pokemon', param)

  // Establecer id del Pokemon
  $id.value = pokemon.id

  // Establecer nombre del Pokemon
  $text.value = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)

  // Establecer imagen de Pokemon
  $image.setAttribute('src', pokemon.sprites.front_default)

  // Establecer descripción del Pokemon
  const species = await getData('pokemon-species',pokemon.id)
  const flavor = species.flavor_text_entries.find((entry) => entry.language.name === 'es').flavor_text
  $textarea.value = flavor

  speach.cancel()
  let utterance = new SpeechSynthesisUtterance()
  utterance.text = flavor
  utterance.lang = 'es'

  speach.speak(utterance)
}

$numberForm.addEventListener('submit', async (ev) => {
  ev.preventDefault()
  const form = new FormData($numberForm)
  const id = form.get('id').toLowerCase()
  formAction(id)
})

$nameForm.addEventListener('submit', (ev) => {
  ev.preventDefault()
  const form = new FormData($nameForm)
  const name = form.get('name').toLowerCase()
  formAction(name)
})
