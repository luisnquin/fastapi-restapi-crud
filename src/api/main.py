from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


from db.database import executeQuery


class Movie(BaseModel):
    movie_title: str
    movie_genres: str
    gender: str
    stock_name: str


def jsonify(data):
    if type(data[0]) == type(10):
        return {
            "id": data[0],
            "movie_title": data[1],
            "movie_genres": data[2],
            "agender": data[3],
            "stock_name": data[4],
        }
    else:
        json = []
        for row in data:
            json.append({
                "id": row[0],
                "movie_title": row[1],
                "movie_genres": row[2],
                "agender": row[3],
                "stock_name": row[4],
            })
        return json


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
                                             movie.gender,
                                             movie.stock_name])
    return


@app.put("/movies/{id:int}")
def updateOneMovie(movie: Movie, id):
    executeQuery(action="PUT", id=id, requestdata=[movie.movie_title,
                                                   movie.movie_genres,
                                                   movie.gender,
                                                   movie.stock_name])
    return


@app.delete("/movies/{id:int}")
def deleteOneMovie(id):
    executeQuery(action="DELETE", id=id)
    return


"""create table movie_data (id SERIAL PRIMARY KEY, movie_title VARCHAR(110), movie_genres VARCHAR(50), gender DATE, stock_name VARCHAR(70));"""
