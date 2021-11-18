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
    let contentItem = document.createElement("div");
    let contentItemDiv = document.createElement("div");

    let contentItemDivButtons = document.createElement("div");
    let updateButton = document.createElement("a");
    let deleteButton = document.createElement("a");

    contentItem.setAttribute("class", "content-item");
    contentItem.setAttribute("id", `${movie.id}`);
    
    let contentIParag = []
    for(let i=0; i<4; i++){
        contentIParag.push(document.createElement("p"));
    }

    let genresText = "";
    movie.movie_genres.indexOf("|") ? movie.movie_genres.split("|").forEach(gender => {genresText = `${genresText} ${gender}, `}) : movie.movie_genres;

    contentIParag[0].innerText = `Title: ${movie.movie_title}`;
    contentIParag[1].innerText = `Genres: ${genresText.substring(0, genresText.length - 2)}.`;
    contentIParag[2].innerText = `Agender: ${movie.date}`;
    contentIParag[3].innerText = `Company: ${movie.company_name}`;
    
    contentItemDiv.setAttribute("class", "content-info-div")
    contentItemDivButtons.setAttribute("class", "content-buttons")

    updateButton.innerText = "Update";
    updateButton.setAttribute("href", `http://127.0.0.1:8000/movies/${movie.id}`);
    updateButton.setAttribute("class", "update-button");
    
    deleteButton.innerHTML = "Delete";
    deleteButton.setAttribute("href", `http://127.0.0.1:8000/movies/${movie.id}`);
    deleteButton.onclick = function (e) {
        e.preventDefault();

        return fetch(`http://127.0.0.1:8000/movies/${movie.id}`, {
            method: 'DELETE'
        })
        .then((response) => response.json())
        .then(function() {
            let childToDelete = document.getElementById(`${movie.id}`);
            context.removeChild(childToDelete);
        });
    }
    
    deleteButton.setAttribute("class", "delete-button");

    for(let i=0; i<4; i++){
        contentItemDiv.appendChild(contentIParag[i]);
    }

    contentItemDivButtons.appendChild(updateButton);
    contentItemDivButtons.appendChild(deleteButton);

    contentItem.appendChild(contentItemDiv);
    contentItem.appendChild(contentItemDivButtons);


    context.appendChild(contentItem);
}