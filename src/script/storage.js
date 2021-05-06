import { generateHTML } from './shortUrl'

function getStoredLinks() {
  let links

  if(localStorage.getItem('links') == null) {
    links = []
  } else {
    links = JSON.parse(localStorage.getItem('links'))
  }

  return links
}

export function displayStoredLinks() {
  const links = getStoredLinks()
  console.log(links)

  links.map(link => generateHTML(link.originalLink, link.shortLink))
}

// export function deleteStoredLink(shortLink) {
//   const links = getStoredLinks()

//   links.map((link, index) => {
//     if(link.shortLink === shortLink) {
//       links.splice(index, 1)
//     }
//   })

//   localStorage.setItem('links', JSON.stringify(links))
// }



/*
localStorage.setItem('links', JSON.stringify([
{
    shortLink: 'shrtco.de/yP8jtt',
    originalLink: 'https://www.youtube.com/watch?v=2RrhwDKw-j4&list=RDGMEMHDXYb1_DDSgDsobPsOFxpAVMZ_Y2qIS78II&index=10'
  },
  {
    shortLink: 'shrtco.de/yP8jtt',
    originalLink: 'https://www.youtube.com/watch?v=2Rr'
  },
  {
    shortLink: 'shrtco.de/yP8jtt',
    originalLink:  'https://www.youtube.com/watch?v=2RrhwDKw-j4&list=RDGMEMHDXYb1_DDSgDso'
  }
]))
*/