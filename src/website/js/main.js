"use strict"

window.onload = function() {
    fetch('http://127.0.0.1:8000/movies', {})
    .then(response => response.json())
    .then(data => {
        data.forEach(movie => console.log(movie))
    });
}