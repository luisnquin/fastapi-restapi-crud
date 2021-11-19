"use strict"

window.onload = function() {
    // Father of everything
    const CONTENT = document.getElementById('content');


    fetch('http://127.0.0.1:8000/movies', {})
    .then(response => response.json())
    .then(data => {
        data.forEach(movie => appendContentItems(movie, CONTENT));
    });
}


function appendContentItems(movies, context) {
    const HOMELINK = document.getElementById("home");
    HOMELINK.onclick  = function(e) {
        e.preventDefault();
        location.reload();
    }
    
    const ADDBUTTON = document.getElementById("add-content");
    const UPDATEBUTTON = document.createElement("a");
    const DELETEBUTTON = document.createElement("a");
    
    const CONTENTITEM_DIV_PARAGRAPH = []
    for(let i=0; i<4; i++){
        CONTENTITEM_DIV_PARAGRAPH.push(document.createElement("p"));
    }
    
    CONTENTITEM_DIV_PARAGRAPH[0].innerText = `Title: ${movies.movie_title}`;
    CONTENTITEM_DIV_PARAGRAPH[1].innerText = `Genres: ${embellishGenresText(movies.movie_genres)}.`;
    CONTENTITEM_DIV_PARAGRAPH[2].innerText = `Agender: ${movies.date}`;
    CONTENTITEM_DIV_PARAGRAPH[3].innerText = `Company: ${movies.company_name}`;
    
    
    // HTTP Methods
    ADDBUTTON.onclick = function(e) {
        e.preventDefault();
        createFormulary(undefined, context, 'POST');
    };
    
    
    UPDATEBUTTON.innerText = "Update";
    UPDATEBUTTON.setAttribute("href", `http://127.0.0.1:8000/movies/${movies.id}`);
    UPDATEBUTTON.setAttribute("class", "update-button");
    UPDATEBUTTON.onclick = function(e){
        e.preventDefault();
        
        // To fill the form
        fetch(`http://127.0.0.1:8000/movies/${movies.id}`, {})
        .then(response => response.json())
        .then(movieData => createFormulary(movieData, context, 'PUT'));
    }
    
    DELETEBUTTON.innerHTML = "Delete";
    DELETEBUTTON.setAttribute("href", `http://127.0.0.1:8000/movies/${movies.id}`);
    DELETEBUTTON.setAttribute("class", "delete-button");
    DELETEBUTTON.onclick = function (e) {
        e.preventDefault();
        
        return fetch(`http://127.0.0.1:8000/movies/${movies.id}`, {
            method: 'DELETE'
        })
        .then((response) => response.json())
        .then(function() {
            let childToDelete = document.getElementById(`${movies.id}`);
            context.removeChild(childToDelete);
        });
    }

    // Showing data in home
    const CONTENTITEM = document.createElement("div");
    CONTENTITEM.setAttribute("class", "content-item");
    CONTENTITEM.setAttribute("id", `${movies.id}`);

    const CONTENTITEM_DIV = document.createElement("div");
    CONTENTITEM_DIV.setAttribute("class", "content-info-div")

    const CONTENTITEM_DIVBUTTONS = document.createElement("div");
    
    CONTENTITEM_DIVBUTTONS.setAttribute("class", "content-buttons")
    CONTENTITEM_DIVBUTTONS.appendChild(UPDATEBUTTON);
    CONTENTITEM_DIVBUTTONS.appendChild(DELETEBUTTON);
    
    for(let i=0; i<4; i++){
        CONTENTITEM_DIV.appendChild(CONTENTITEM_DIV_PARAGRAPH[i]);
    }
    
    CONTENTITEM.appendChild(CONTENTITEM_DIV);
    CONTENTITEM.appendChild(CONTENTITEM_DIVBUTTONS);
    
    
    context.appendChild(CONTENTITEM);
}

function createFormulary(movieData, context, method) {
    // Changing interface
    context.innerHTML = '';
    const FORMULARY = document.createElement("form");
    const FORMULARY_DIV = document.createElement("div");
    FORMULARY_DIV.classList = "formulary-content";
    const LABEL_TITLE = document.createElement("label");
    LABEL_TITLE.setAttribute("for", "input-m-title");
    LABEL_TITLE.innerText = 'Movie title';

    const INPUT_TITLE = document.createElement("input");
    INPUT_TITLE.setAttribute("id", "input-m-title");
    INPUT_TITLE.setAttribute("placeholder", "Enter a title here");
    INPUT_TITLE.setAttribute("type", "text");
    INPUT_TITLE.setAttribute("name", "title");
    
    const LABEL_GENRES = document.createElement("label");
    LABEL_GENRES.setAttribute("for", "input-m-genres");
    LABEL_GENRES.innerText = 'Movie genres';
    
    const INPUT_GENRES = document.createElement("input");
    INPUT_GENRES.setAttribute("id", "input-m-genres");
    INPUT_GENRES.setAttribute("placeholder", "Enter the genres here");
    INPUT_GENRES.setAttribute("type", "text");
    INPUT_GENRES.setAttribute("name", "genres");

    const LABEL_DATE = document.createElement("label");
    LABEL_DATE.setAttribute("for", "input-m-title");
    LABEL_DATE.innerText = "Date";

    const INPUT_DATE = document.createElement("input");
    INPUT_DATE.setAttribute("id", "input-m-title");
    INPUT_DATE.setAttribute("placeholder", "Insert date here, format(DD/M/YYYY)");
    INPUT_DATE.setAttribute("type", "date");
    INPUT_DATE.setAttribute("name", "date");

    const LABEL_COMPANY = document.createElement("label");
    LABEL_COMPANY.setAttribute("for", "input-m-company");
    LABEL_COMPANY.innerText = "Company name";

    const INPUT_COMPANY = document.createElement("input");
    INPUT_COMPANY.setAttribute("id", "input-m-company");
    INPUT_COMPANY.setAttribute("placeholder", "Insert company name here");
    INPUT_COMPANY.setAttribute("type", "text");
    INPUT_COMPANY.setAttribute("name", "company");

    const INPUT_SUBMIT = document.createElement("input");
    INPUT_SUBMIT.setAttribute("type", "submit");
    INPUT_SUBMIT.setAttribute("value", "Send");
    INPUT_SUBMIT.setAttribute("id", "submit-send")

    if (method === 'PUT') {
        INPUT_TITLE.setAttribute("value", `${movieData.movie_title}`)
        INPUT_GENRES.setAttribute("value", `${movieData.movie_genres}`)
        INPUT_DATE.setAttribute("value", `${movieData.date}`)
        INPUT_COMPANY.setAttribute("value", `${movieData.company_name}`)

    } else if (method === 'POST') {
        FORMULARY.setAttribute("action", `http://127.0.0.1:8000/movies`);
        FORMULARY.setAttribute("method", "post");
    }

    FORMULARY_DIV.appendChild(LABEL_TITLE);
    FORMULARY_DIV.appendChild(INPUT_TITLE);
    FORMULARY_DIV.appendChild(LABEL_GENRES);
    FORMULARY_DIV.appendChild(INPUT_GENRES);
    FORMULARY_DIV.appendChild(LABEL_DATE);
    FORMULARY_DIV.appendChild(INPUT_DATE);
    FORMULARY_DIV.appendChild(LABEL_COMPANY);
    FORMULARY_DIV.appendChild(INPUT_COMPANY);
    FORMULARY_DIV.appendChild(INPUT_SUBMIT);

    FORMULARY.appendChild(FORMULARY_DIV);
    context.appendChild(FORMULARY);
    
    // REQUEST TO API
    if (method === 'PUT') {
        INPUT_SUBMIT.onclick = function(e) {
            e.preventDefault();
    
            fetch(`http://127.0.0.1:8000/movies/${movieData.id}`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'PUT',
                body: JSON.stringify({
                    'movie_title': transformRequests(INPUT_TITLE.value),
                    'movie_genres': transformRequests(INPUT_GENRES.value),
                    'date': INPUT_DATE.value,
                    'company_name': transformRequests(INPUT_COMPANY.value)
                })
            }).then(res => res.json())
            .catch(error => console.error(`Error ${error}.`))
            .then(response => console.log(`Data updated successfully, ${response}.`))
            .then(location.reload());
        }   
    } else if (method === 'POST') {
        INPUT_SUBMIT.onclick = function(e) {
            e.preventDefault();

            fetch(`http://127.0.0.1:8000/movies`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    'movie_title': transformRequests(INPUT_TITLE.value),
                    'movie_genres': transformRequests(INPUT_GENRES.value),
                    'date': INPUT_DATE.value,
                    'company_name': transformRequests(INPUT_COMPANY.value)
                })
            }).then(res => res.json())
            .catch(error => console.error(`Error ${error}.`))
            .then(response => console.log(`Data updated successfully, ${response}.`))
            .then(location.reload());
        }
    }
}

function transformRequests(data){
    // Validates if the string has a simple quote, if this don't be fixed, we would have a query problem
    // This modify the string if is necessary
    if (data.indexOf("'")) {
        return `${data.substring(0, data.indexOf("'"))}'${data.substring(data.indexOf("'"), data.length)}'`;
    }
}

function embellishGenresText(text) {
    let genresText = "";
    text.indexOf("|") ? text.split("|").forEach(gender => {genresText = `${genresText} ${gender}, `}) : text;
    genresText = genresText.substring(0, genresText.length - 2);
    
    return genresText;
}