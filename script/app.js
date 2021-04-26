const toggler = document.querySelector('.header__mobile-toggler')

toggler.addEventListener('click', showMenu)

function showMenu() {
  toggler.classList.toggle('active')
  document.querySelector('.header__navigation').classList.toggle('active')
  document.querySelector('.overlay').classList.toggle('active')
}