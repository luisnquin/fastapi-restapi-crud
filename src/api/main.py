from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from fastapi import FastAPI


from db.database import executeQuery


class Movie(BaseModel):
    movie_title: str
    movie_genres: str
    date: str
    company_name: str


def jsonify(data):
    if type(data[0]) == type(10):
        return {
            "id": data[0],
            "movie_title": data[1],
            "movie_genres": data[2],
            "date": data[3],
            "company_name": data[4],
        }
    else:
        json_format = []
        for row in data:
            json_format.append({
                "id": row[0],
                "movie_title": row[1],
                "movie_genres": row[2],
                "date": row[3],
                "company_name": row[4],
            })
        return json_format


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/movies")
def getMovies():
    return jsonify(executeQuery(action="GET", howmuch="MANY"))


@app.get("/movies/{id:int}")
def getOneMovie(id):
    return jsonify(list(executeQuery(action="GET", howmuch="ONE", id=id)))


@app.post("/movies")
def addOneMovie(movie: Movie):
    executeQuery(action="POST", requestdata=[movie.movie_title,
                                             movie.movie_genres,
                                             movie.date,
                                             movie.company_name])


@app.put("/movies/{id:int}")
def updateOneMovie(movie: Movie, id):
    executeQuery(action="PUT", id=id, requestdata=[movie.movie_title,
                                                   movie.movie_genres,
                                                   movie.date,
                                                   movie.company_name])


@app.delete("/movies/{id:int}")
def deleteOneMovie(id):
    executeQuery(action="DELETE", id=id)
