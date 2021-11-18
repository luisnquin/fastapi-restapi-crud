"use strict"

window.onload = function() {
    // Father of everything
    const content = document.getElementById('content');


    fetch('http://127.0.0.1:8000/movies', {})
    .then(response => response.json())
    .then(data => {
        data.forEach(movie => appendContentToHome(movie, content));
    });
}


function appendContentToHome(movie, context) {
    let homepage = document.getElementById("home");
    homepage.onclick  = function(e) {
        e.preventDefault();
        location.reload();
    }
    
    let addbutton = document.getElementById("add-content");
    let updateButton = document.createElement("a");
    let deleteButton = document.createElement("a");
    
    let contentIParag = []
    for(let i=0; i<4; i++){
        contentIParag.push(document.createElement("p"));
    }
    
    // Data representation
    let genresText = "";
    movie.movie_genres.indexOf("|") ? movie.movie_genres.split("|").forEach(gender => {genresText = `${genresText} ${gender}, `}) : movie.movie_genres;
    
    contentIParag[0].innerText = `Title: ${movie.movie_title}`;
    contentIParag[1].innerText = `Genres: ${genresText.substring(0, genresText.length - 2)}.`;
    contentIParag[2].innerText = `Agender: ${movie.date}`;
    contentIParag[3].innerText = `Company: ${movie.company_name}`;
    
    
    // HTTP Methods
    addbutton.onclick = function(e) {
        e.preventDefault();
        createFormulary(undefined, context, 'POST');
    };
    
    
    updateButton.innerText = "Update";
    updateButton.setAttribute("href", `http://127.0.0.1:8000/movies/${movie.id}`);
    updateButton.setAttribute("class", "update-button");
    updateButton.onclick = function(e){
        e.preventDefault();
        
        // To fill the form
        fetch(`http://127.0.0.1:8000/movies/${movie.id}`, {})
        .then(response => response.json())
        .then(movie_data => createFormulary(movie_data, context, 'PUT'));
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

    // Showing data in home
    let contentItem = document.createElement("div");
    contentItem.setAttribute("class", "content-item");
    contentItem.setAttribute("id", `${movie.id}`);

    let contentItemDiv = document.createElement("div");
    contentItemDiv.setAttribute("class", "content-info-div")

    let contentItemDivButtons = document.createElement("div");
    
    contentItemDivButtons.setAttribute("class", "content-buttons")
    contentItemDivButtons.appendChild(updateButton);
    contentItemDivButtons.appendChild(deleteButton);
    
    for(let i=0; i<4; i++){
        contentItemDiv.appendChild(contentIParag[i]);
    }
    
    contentItem.appendChild(contentItemDiv);
    contentItem.appendChild(contentItemDivButtons);
    
    
    context.appendChild(contentItem);
}

function createFormulary(movie_data, context, method) {
    // Changing interface
    context.innerHTML = '';
    let formulary = document.createElement("form");
    let formularyDiv = document.createElement("div");
    let label_m_title = document.createElement("label");
    label_m_title.setAttribute("for", "input-m-title");
    label_m_title.innerText = 'Movie title';

    let input_m_title = document.createElement("input");
    input_m_title.setAttribute("id", "input-m-title");
    input_m_title.setAttribute("placeholder", "Enter a title here");
    input_m_title.setAttribute("type", "text");
    input_m_title.setAttribute("name", "title");
    
    let label_m_genres = document.createElement("label");
    label_m_genres.setAttribute("for", "input-m-genres");
    label_m_genres.innerText = 'Movie genres';
    
    let input_m_genres = document.createElement("input");
    input_m_genres.setAttribute("id", "input-m-genres");
    input_m_genres.setAttribute("placeholder", "Enter the genres here");
    input_m_genres.setAttribute("type", "text");
    input_m_genres.setAttribute("name", "genres");

    let label_m_date = document.createElement("label");
    label_m_date.setAttribute("for", "input-m-title");
    label_m_date.innerText = "Date";

    let input_m_date = document.createElement("input");
    input_m_date.setAttribute("id", "input-m-title");
    input_m_date.setAttribute("placeholder", "Insert date here, format(DD/M/YYYY)");
    input_m_date.setAttribute("type", "date");
    input_m_date.setAttribute("name", "date");

    let label_m_company = document.createElement("label");
    label_m_company.setAttribute("for", "input-m-company");
    label_m_company.innerText = "Company name";

    let input_m_company = document.createElement("input");
    input_m_company.setAttribute("id", "input-m-company");
    input_m_company.setAttribute("placeholder", "Insert company name here");
    input_m_company.setAttribute("type", "text");
    input_m_company.setAttribute("name", "company");

    let input_m_send = document.createElement("input");
    input_m_send.setAttribute("type", "submit");
    input_m_send.setAttribute("value", "Send");
    input_m_send.setAttribute("id", "submit-send")

    if (method === 'PUT') {
        input_m_title.setAttribute("value", `${movie_data.movie_title}`)
        input_m_genres.setAttribute("value", `${movie_data.movie_genres}`)
        input_m_date.setAttribute("value", `${movie_data.date}`)
        input_m_company.setAttribute("value", `${movie_data.company_name}`)

    } else if (method === 'POST') {
        formulary.setAttribute("action", `http://127.0.0.1:8000/movies`);
        formulary.setAttribute("method", "post");
    }

    formularyDiv.appendChild(label_m_title);
    formularyDiv.appendChild(input_m_title);
    formularyDiv.appendChild(label_m_genres);
    formularyDiv.appendChild(input_m_genres);
    formularyDiv.appendChild(label_m_date);
    formularyDiv.appendChild(input_m_date);
    formularyDiv.appendChild(label_m_company);
    formularyDiv.appendChild(input_m_company);
    formularyDiv.appendChild(input_m_send);

    formularyDiv.classList = "formulary-content";

    formulary.appendChild(formularyDiv);
    context.appendChild(formulary);
    
    // REQUEST TO API
    if (method === 'PUT') {
        input_m_send.onclick = function(e) {
            e.preventDefault();
    
            fetch(`http://127.0.0.1:8000/movies/${movie_data.id}`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'PUT',
                body: JSON.stringify({
                    'movie_title': analyzingData(input_m_title.value),
                    'movie_genres': analyzingData(input_m_genres.value),
                    'date': input_m_date.value,
                    'company_name': analyzingData(input_m_company.value)
                })
            }).then(res => res.json())
            .catch(error => console.error(`Error ${error}.`))
            .then(response => console.log(`Data updated successfully, ${response}.`))
            .then(location.reload());
        }   
    } else if (method === 'POST') {
        input_m_send.onclick = function(e) {
            e.preventDefault();

            fetch(`http://127.0.0.1:8000/movies`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    'movie_title': analyzingData(input_m_title.value),
                    'movie_genres': analyzingData(input_m_genres.value),
                    'date': input_m_date.value,
                    'company_name': analyzingData(input_m_company.value)
                })
            }).then(res => res.json())
            .catch(error => console.error(`Error ${error}.`))
            .then(response => console.log(`Data updated successfully, ${response}.`))
            .then(location.reload());
        }
    }
}

function analyzingData(data){
    // Validates if the string has a simple quote, if this don't be fixed, we would have a query problem
    // Modify the string if necessary
    if (data.indexOf("'")) {
        return `${data.substring(0, data.indexOf("'"))}'${data.substring(data.indexOf("'"), data.length)}'`;
    }
}