import psycopg2


def executeQuery(action: str, data: list):
    match action:
        case "GET", "get":
            pass
        case "POST", "post":
            pass
        case "PUT", "put":
            pass
        case "DELETE", "delete":
            pass
