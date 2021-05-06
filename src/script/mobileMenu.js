import { getQuery } from './utils'

const toggler = getQuery('.header__mobile-toggler')

toggler.addEventListener('click', showMenu)

export default function showMenu() {
  toggler.classList.toggle('active')
  getQuery('.header__navigation').classList.toggle('active')
  getQuery('.overlay').classList.toggle('active')
  getQuery('html').classList.toggle('active')
}