import aniPoster from '../assets/posters/ani.jpg'
import comPoster from '../assets/posters/com.jpg'
import htPoster from '../assets/posters/ht.jpg'
import bPoster from '../assets/posters/B.jpg'
import magicPoster from '../assets/posters/magic.jpg'

export const events = [
  {
    id: 'live-in-concert-A',
    title: 'Anirudh Live in Concert',
    image: aniPoster,
    date: '2026-08-20',
    time: '7:00 PM',
    location: 'Codessia ground',
    price: 3999,
    bookable: true,
  },
  {
    id: 'standup-night',
    title: 'Comedy Night with Zakir Khan',
    image: comPoster,
    date: '2026-08-15',
    time: '8:30 PM',
    location: 'PSGIM Auditorium',
    price: 599,
    bookable: true,
  },
  {
    id: 'live-in-concert-H',
    title: 'Return of Dragon by HIP HOP TAMIZHA',
    image: htPoster,
    date: '2026-08-20',
    time: '7:00 PM',
    location: 'Codessia ground',
    price: 1999,
    bookable: true,
  },
  {
    id: 'classical-dance',
    title: 'Bharatanatyam Evening',
    image: bPoster,
    date: '2026-08-25',
    time: '6:00 PM',
    location: 'Medai, Clusters',
    price: 350,
    bookable: true,
  },
  {
    id: 'magic-show',
    title: "P.C. Sorcar's Magic Show",
    image: magicPoster,
    date: '2026-09-15',
    time: '4:00 PM',
    location: 'Prozone mall',
    price: 450,
    bookable: false,
  },
]

export const getEventById = (id) => events.find((e) => e.id === id)