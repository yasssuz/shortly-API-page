import { getQuery } from './utils.js'

getQuery('.shortener__input-area').addEventListener('submit', showCard)

export default async function showCard(e) {
  e.preventDefault()
  const submitBtn =  getQuery('form button')
  const originalLink = validateInput(getQuery('#original-link-input').value)
  submitBtn.textContent = 'Loading....'

  const shortLink = await fetchShortUrl(originalLink)
  const card = generateHTML(originalLink, shortLink)

  submitBtn.textContent = 'Shorten it!'
  getQuery('.shortener__output-area').appendChild(card)
} 

async function fetchShortUrl(link) {
  const res = await fetch(`https://api.shrtco.de/v2/shorten?url=${link}`)
  const data = await res.json()

  return data.result.short_link
}

function generateHTML(originalLink, shortLink) {
  const li = document.createElement('li')

  li.innerHTML = `
    <span class="link original">${originalLink}</span>
    <div class="new-data">
      <span class="link shortened">${shortLink}</span>
      <button type="submit" class="primary-btn primary-btn-page">Shorten It!</button>
    </div>
  `
  return li
}

function validateInput(input) {
  const pattern = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig

  !input.match(pattern) && showError() 
  return input
}

function showError() {
  throw 'Link is not valid'
}