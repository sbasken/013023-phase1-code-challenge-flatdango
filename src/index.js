// Your code here

// "defer" added to script tag in html
// global variables;
const movieAPI = "http://localhost:3000/films";
const sideMenu = document.querySelector("#films")
const poster = document.querySelector("#poster")
const showCard = document.querySelector("#showCard")


// get data from the server to list titles
fetch("http://localhost:3000/films/1")
.then(res => res.json())
.then(movie => {
    poster.innerHTML = " " 
    const img = document.createElement('img');
    img.src = movie.poster;
    img.alt = `${movie.title} poster image`
    poster.append(img)

    renderCards(movie)
})

fetch(movieAPI)
.then(res => res.json())
.then(movies => {
    sideMenu.innerHTML = ""
    movies.forEach(renderMovie)
})

const renderMovie = (movie) => {
    const li = document.createElement("li")
    li.className = "film item";
    li.innerText = movie.title;
    sideMenu.append(li)

    // poster shows after the title is clicked
    li.addEventListener('click', () => {
        poster.innerHTML = ""
        const img = document.createElement('img');
        img.src = movie.poster;
        img.alt = `${movie.title} poster image`
        poster.append(img)

        renderCards(movie)
    })
}

const renderCards = (movie) => {
    showCard.innerHTML = ""

    const movieTitle = document.createElement('div')
    movieTitle.className = "title";
    movieTitle.id = "title"
    movieTitle.innerText = movie.title;

    const movieRuntime = document.createElement('div')
    movieRuntime.classname = "meta";
    movieRuntime.id = "runtime"
    movieRuntime.innerText = `${movie.runtime} minutes`

    const movieContent = document.createElement('div')
    movieContent.className = "content"

    const description = document.createElement('div')
    description.className = "description"

    const extraContent = document.createElement('div')
    extraContent.class = "extra content"

    movieContent.append(description)

    showCard.append(movieTitle, movieRuntime, movieContent,extraContent)

    const filmInfo = document.createElement('div')
    filmInfo.id = "film-info"
    filmInfo.innerText = movie.description

    const showTimeCard = document.createElement('span')
    showTimeCard.id = "showtime";
    showTimeCard.class = "ui label";
    showTimeCard.innerText = movie.showtime

    const remainingTicket = document.createElement('span')
    remainingTicket.id = "ticket-num";
    remainingTicket.innerText = `${movie.capacity - movie["tickets_sold"]} `

    description.append(filmInfo, showTimeCard, remainingTicket)
    description.innerText += " remaining tickets"

    const button = document.createElement('button')
    button.id = "buy-ticket";
    button.className = "ui orange button"
    button.innerText = "Buy Ticket"
    extraContent.append(button)

    button.addEventListener('click', ()=> {
        movie.capacity - movie["tickets_sold"] += 1
        // console.log(movie.capacity - movie["tickets_sold"])
        // it's showing 1 less number but I cann't render it on the browser...!!
        
        remainingTicket.textContent = `${movie.capacity - movie["tickets_sold"]} `        
    })

}



// 1. See the first movie's details, including its **poster, title, runtime,
//    showtime, and available tickets** when the page loads. The number of
//    available tickets will need to be derived by subtracting the number of
//    `tickets_sold` from the theater's `capacity`. You will need to make a GET
//    request to the following endpoint to retrieve the film data:

//    ```txt
//    GET /films/1

//    Example Response:
//    {
//      "id": "1",
//      "title": "The Giant Gila Monster",
//      "runtime": "108",
//      "capacity": 30,
//      "showtime": "04:00PM",
//      "tickets_sold": 27,
//      "description": "A giant lizard terrorizes a rural Texas community and a heroic teenager attempts to destroy the creature.",
//      "poster": "https://www.gstatic.com/tv/thumb/v22vodart/2157/p2157_v_v8_ab.jpg"
//    }
//    ```
