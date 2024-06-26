import mysql.connector
import stats

class Dao:
    def __init__(self):
        self.connection = self.connect()
    def connect(self):
        self.connection = mysql.connector.connect(
            host="localhost",
            user="root",
            passwd="root",
            database="test"
        )
        return self.connection


    def insertStats(self, stats):
        cursor = self.connection.cursor()
        query = "INSERT INTO stats (ID_Station, Temp, Sun, Wind, Humidity, Date) VALUES (%s, %s, %s, %s, %s, %s, NOW())"
        cursor.execute(query, (stats.station_id, stats.temp, stats.sun, stats.wind, stats.humidity, stats.value, stats.date))
        self.connection.commit()
        self.connection.close()


    def getStats(self):
        self.connection = self.connect()
        cursor = self.connection.cursor()
        query = "SELECT * FROM stats"
        cursor.execute(query)
        result = cursor.fetchall()
        result = result[0]
        resultado = stats.Stats(result[0], result[1], result[2], result[3], result[4], result[5])
        self.connection.close()
        return resultado
    
    
        





