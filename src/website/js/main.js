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
    updateButton.onclick = function(e){
        e.preventDefault();

        context.innerHTML = '';

        let formulary = document.createElement("form");
        let formularyDiv = document.createElement("div");
        let label_m_title = document.createElement("label");
        let input_m_title = document.createElement("input");
        let label_m_genres = document.createElement("label");
        let input_m_genres = document.createElement("input");

        formulary.setAttribute("action", `http://127.0.0.1:8000/movies/`);
        formulary.setAttribute("method", "post");

        label_m_title.setAttribute("for", "input-m-title");
        label_m_title.innerText = 'Movie title';
        input_m_title.setAttribute("id", "input-m-title");
        input_m_title.setAttribute("placeholder", "Enter a title here");
        input_m_title.setAttribute("name", "title");

        label_m_genres.setAttribute("for", "input-m-genres");
        label_m_genres.innerText = 'Movie genres';
        input_m_genres.setAttribute("id", "input-m-genres");
        input_m_genres.setAttribute("placeholder", "Enter the genres here");
        input_m_genres.setAttribute("name", "genres");

        formularyDiv.appendChild(label_m_title);
        formularyDiv.appendChild(input_m_title);

        formularyDiv.appendChild(label_m_genres);
        formularyDiv.appendChild(input_m_genres);

        formulary.appendChild(formularyDiv);
        context.appendChild(formulary);
    }
    
    deleteButton.innerHTML = "Delete";
    deleteButton.setAttribute("href", `http://127.0.0.1:8000/movies/${movie.id}`);
    deleteButton.setAttribute("class", "delete-button");
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
    
    

    for(let i=0; i<4; i++){
        contentItemDiv.appendChild(contentIParag[i]);
    }

    contentItemDivButtons.appendChild(updateButton);
    contentItemDivButtons.appendChild(deleteButton);

    contentItem.appendChild(contentItemDiv);
    contentItem.appendChild(contentItemDivButtons);


    context.appendChild(contentItem);
}