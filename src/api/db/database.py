import psycopg2


def executeQuery(action: str, requestdata: list = None, id: int = None, howmuch: str = "MANY"):
    table_name = "movie_data"

    connection = psycopg2.connect(
        host="localhost",
        database="restapidb",
        user="postgres",
        password="admin",
        port=5432,
    )

    cursor = connection.cursor()

    match action:
        case "GET":
            match howmuch:
                case "MANY":
                    cursor.execute(f"SELECT * FROM {table_name}")
                    data = cursor.fetchall()
                    print(data)
                    print(type(data))

                    cursor.close()
                    connection.close()

                    return data

                case "ONE":
                    cursor.execute(f"SELECT * FROM {table_name} WHERE id={id}")
                    data = cursor.fetchone()

                    cursor.close()
                    connection.close()

                    return data

        case "POST":
            cursor.execute(
                f"INSERT INTO {table_name}(movie_title, movie_genres, gender, stock_name) VALUES('{requestdata[0]}', '{requestdata[1]}', '{requestdata[2]}', '{requestdata[3]}')")
            connection.commit()

            cursor.close()
            connection.close()
            return

        case "PUT":
            cursor.execute(
                f"UPDATE {table_name} SET movie_title='{requestdata[0]}', movie_genres='{requestdata[1]}', gender='{requestdata[2]}', stock_name='{requestdata[3]}' WHERE id={id}")
            connection.commit()

            cursor.close()
            connection.close()
            return

        case "DELETE":
            cursor.execute(f"DELETE FROM {table_name} WHERE id={id}")
            connection.commit()

            cursor.close()
            connection.close()
            return


if __name__ == "__main__":
    print(executeQuery(action="GET", requestdata=[]))


"""create table movie_data (id SERIAL PRIMARY KEY, movie_title VARCHAR(110), movie_genres VARCHAR(50), gender DATE, stock_name VARCHAR(70));"""
