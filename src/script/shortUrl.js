import { getQuery } from './utils.js'
import { storeNewLink } from './storage'

getQuery('.shortener__input-area').addEventListener('submit', showCard)
document.addEventListener('click', (e) => {
  const target = e.target
  
  if(target.classList.contains('copy-link-btn')) {
    copyShortLink(target)
    addCopiedAnimation(target)
  }
})

export default async function showCard(e) {
  e.preventDefault()
  const submitBtn =  getQuery('form button')
  const originalLink = validateInput(getQuery('#original-link-input'))

  submitBtn.textContent = 'Loading....'

  const shortLink = await fetchShortUrl(originalLink)

  generateHTML(originalLink, shortLink)
  storeNewLink(shortLink, originalLink)
  clearInput()
  submitBtn.textContent = 'Shorten it!'
} 

async function fetchShortUrl(link) {
  const res = await fetch(`https://api.shrtco.de/v2/shorten?url=${link}`)
  const data = await res.json()

  return data.result.short_link
}

export function generateHTML(originalLink, shortLink) {
  const card = document.createElement('li')

  card.innerHTML = `
    <span class="link original">${originalLink}</span>
    <div class="new-data">
      <span class="link shortened">${shortLink}</span>
      <button type="submit" class="primary-btn primary-btn-page copy-link-btn">Copy!</button>
    </div>
  `
  getQuery('.shortener__output-area').appendChild(card)
}

function validateInput(input) {
  const pattern = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig

  !input.value.match(pattern) && inputNotValid(input) 
  input.classList.remove('not-valid')
  getQuery('#message-not-valid').classList.remove('not-valid')
  
  return input.value
}

function inputNotValid(input) {
  input.classList.add('not-valid')
  getQuery('#message-not-valid').classList.add('not-valid')
  throw 'Link is not valid'
}

function copyShortLink(button) {
  const cardBtn = button
  const shortLink = cardBtn.previousElementSibling.innerText

  window.navigator.clipboard.writeText(shortLink)
}

function addCopiedAnimation(e) {
  //add new style
  e.textContent = 'Copied!'
  e.classList.add('copied')

  //remove new style
  setInterval(() => {
    e.classList.remove('copied');
    e.textContent = 'Copy!'
  }, 3000)
}

function clearInput() {
  getQuery('#original-link-input').value = ''
}