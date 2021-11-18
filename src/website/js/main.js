"use strict"

window.onload = function() {
    const content = document.getElementById('content');

    fetch('http://127.0.0.1:8000/movies', {})
    .then(response => response.json())
    .then(data => {
        data.forEach(movie => appendContent(movie, content));
    });
}


function appendContent(movie, context) {
    let contentItem = document.createElement("div")
    contentItem.setAttribute("class", "content-item");
    
    let contentItemParagraphs = []
    for(let i=0; i<4; i++){
        contentItemParagraphs.push(document.createElement("p"));
    }
    
    contentItemParagraphs[0].innerText = `Title: ${movie.movie_title}`
    contentItemParagraphs[1].innerText = `Genres: ${movie.movie_genres}`
    contentItemParagraphs[2].innerText = `Agender: ${movie.agender}`
    contentItemParagraphs[3].innerText = `Company: ${movie.stock_name}`

    for(let i=0; i<4; i++){
        contentItem.appendChild(contentItemParagraphs[i])   
    }

    let horizontalLine = document.createElement("hr");
    contentItem.appendChild(horizontalLine);

    context.appendChild(contentItem);
}