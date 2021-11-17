from fastapi import FastAPI

app = FastAPI()


@app.get("/movies")
def getMovies():
    pass
