import films from "./data/films.json"

export function fetchAPIFilms() {
    return new Promise(resolve => {
        setTimeout(() => resolve(films), 2000)
    })
}