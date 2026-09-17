const BOOKINGS_KEY = 'samflix_bookings'

export function getBookings() {
  const raw = localStorage.getItem(BOOKINGS_KEY) //Get whatever is stored under samflix_bookings.
  return raw ? JSON.parse(raw) : [] //JSON string back into a JavaScript object/array.
}
export function saveBooking(booking) {
  const bookings = getBookings()
  bookings.unshift(booking) // newest first
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings)) //converts the JavaScript array into a JSON string.
}