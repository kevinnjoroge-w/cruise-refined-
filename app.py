import mysql.connector

def create_connection():
    """Create a database connection to the MySQL database."""
    connection = mysql.connector.connect(
        host='localhost',
        user='your_username',  # Replace with your MySQL username
        password='your_password',  # Replace with your MySQL password
        database='your_database'  # Replace with your database name
    )
    return connection

# Example of using the connection
def get_users():
    connection = create_connection()
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM users")  # Adjust the query as needed
    users = cursor.fetchall()
    cursor.close()
    connection.close()
    return users

# Initialize MySQL connection
if __name__ == "__main__":
    users = get_users()
    print(users)
