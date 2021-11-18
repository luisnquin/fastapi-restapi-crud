# Web Page connected to a REST API(FastAPI)

To have some data in the database:
```
create table movie_data (id SERIAL PRIMARY KEY, movie_title VARCHAR(110), movie_genres VARCHAR(50), date DATE, company_name VARCHAR(70));

insert into movie_data (movie_title, movie_genres, gender, stock_name) values ('I Killed My Mother (J''ai tué ma mère)', 'Drama', '31/7/2021', 'Stag Industrial, Inc.');
insert into movie_data (movie_title, movie_genres, gender, stock_name) values ('At First Sight (Entre Nous) (Coup de foudre)', 'Drama', '3/11/2021', 'Teekay Offshore Partners L.P.');
insert into movie_data (movie_title, movie_genres, gender, stock_name) values ('Pride of St. Louis, The', 'Drama', '27/7/2021', 'TTM Technologies, Inc.');
insert into movie_data (movie_title, movie_genres, gender, stock_name) values ('Perrier''s Bounty', 'Action|Comedy|Crime|Drama', '10/8/2021', 'CSI Compressco LP');
insert into movie_data (movie_title, movie_genres, gender, stock_name) values ('Circus', 'Crime|Drama|Thriller', '26/9/2021', 'Invesco Municipal Income Opportunities Trust');
insert into movie_data (movie_title, movie_genres, gender, stock_name) values ('Tarzan''s New York Adventure', 'Action|Adventure', '29/10/2021', 'AMC Entertainment Holdings, Inc.');
insert into movie_data (movie_title, movie_genres, gender, stock_name) values ('Legends of Oz: Dorothy''s Return', 'Animation|Children|Musical', '17/1/2021', 'Baltimore Gas & Electric Company');
insert into movie_data (movie_title, movie_genres, gender, stock_name) values ('Clay Bird, The (Matir moina)', 'Drama', '26/4/2021', 'Taiwan Fund, Inc. (The)');
insert into movie_data (movie_title, movie_genres, gender, stock_name) values ('Piano, The', 'Drama|Romance', '24/6/2021', 'Enterprise Financial Services Corporation');
insert into movie_data (movie_title, movie_genres, gender, stock_name) values ('Small Town in Texas, A', 'Action|Adventure|Crime|Drama|Romance', '23/6/2021', 'Brookline Bancorp, Inc.');
insert into movie_data (movie_title, movie_genres, gender, stock_name) values ('Tender Is the Night', 'Drama', '11/3/2021', 'ARMOUR Residential REIT, Inc.');
insert into movie_data (movie_title, movie_genres, gender, stock_name) values ('Whale Rider', 'Drama', '7/5/2021', 'Hecla Mining Company');
insert into movie_data (movie_title, movie_genres, gender, stock_name) values ('Pi', 'Drama|Sci-Fi|Thriller', '7/6/2021', 'Interlink Electronics, Inc.');
insert into movie_data (movie_title, movie_genres, gender, stock_name) values ('A Merry Friggin'' Christmas', 'Comedy', '28/3/2021', 'MannKind Corporation');
insert into movie_data (movie_title, movie_genres, gender, stock_name) values ('Art of the Steal, The', 'Documentary', '6/3/2021', 'BCE, Inc.');
insert into movie_data (movie_title, movie_genres, gender, stock_name) values ('Water-mirror of Granada', 'Documentary', '2/2/2021', 'Delta Technology Holdings Limited');
insert into movie_data (movie_title, movie_genres, gender, stock_name) values ('Fantastic Fear of Everything, A', 'Comedy', '3/4/2021', 'China Petroleum & Chemical Corporation');
```

Data generated from <a href="https://mockaroo.com/">mockaroo.com</a>.
<br><br><br>
<img src="https://i.ibb.co/5kp2sKq/postgresql.png" alt="postgresql" width=60>
<hr>

To install all dependencies, in ```.```:

```
pip install -r requirements.txt
```

To test it, in the ```./src/api``` folder:
```
uvicorn main:app --reload
```
And ```LiveServer```, ```port 5500```.

## Screenshots
#### Home
<img src="https://i.ibb.co/wYSkGQB/home.png" alt="home">

#### Add movie
<img src="https://i.ibb.co/XX1ys8q/add.png" alt="add">

#### Update movie
<img src="https://i.ibb.co/dpy1tYF/update.png" alt="update">
