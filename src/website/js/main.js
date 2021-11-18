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
    
    contentIParag[0].innerText = `Title: ${movie.movie_title}`;
    contentIParag[1].innerText = `Genres: ${movie.movie_genres}`;
    contentIParag[2].innerText = `Agender: ${movie.date}`;
    contentIParag[3].innerText = `Company: ${movie.company_name}`;
    
    contentItemDiv.setAttribute("class", "content-info-div")
    contentItemDivButtons.setAttribute("class", "content-buttons")

    updateButton.innerText = "Update";
    updateButton.setAttribute("href", `http://127.0.0.1:8000/movies/${movie.id}`);
    updateButton.setAttribute("class", "update-button");
    
    deleteButton.innerHTML = "Delete";
    deleteButton.setAttribute("href", `http://127.0.0.1:8000/movies/${movie.id}`);
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