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
        query = "INSERT INTO stats (ID_Station, Temp, Sun, Wind, Humidity, Date) VALUES (%s, %s, %s, %s, %s, NOW())"
        cursor.execute(query, (stats.station_id, stats.temp, stats.sun, stats.wind, stats.humidity))
        self.connection.commit()
        self.connection.close()


    def getStats(self):
        self.connection = self.connect()
        cursor = self.connection.cursor()
        query = "SELECT ID_Station, Temp, Sun, Wind, Humidity,Date FROM stats ORDER BY DATE DESC LIMIT 1"
        cursor.execute(query)
        result = cursor.fetchone()  # fetchone() instead of fetchall()
        resultado = stats.Stats(result[0], result[1], result[2], result[3], result[4], result[5])
        print(result[1])
        self.connection.close()
        return resultado

    def getStatByDay(self, date):
        self.connection = self.connect()
        cursor = self.connection.cursor()
        query = "SELECT ID_Station, Temp, Sun, Wind, Humidity, Date FROM stats WHERE DATE(date) = %s"
        cursor.execute(query, (str(date),))
        result = cursor.fetchone()
        print(date)

        print(result)
        resultado = stats.Stats(result[0], result[1], result[2], result[3], result[4], result[5])
        print(resultado.date)
        self.connection.close()
        return resultado
    
    #Funcion para obtener los 30 dias anteriores
    def getDates(self):
        self.connection = self.connect()
        cursor = self.connection.cursor()
        query = "SELECT ID_Station, Temp, Sun, Wind, Humidity, Date FROM stats ORDER BY Stat_ID DESC LIMIT 30"
        cursor.execute(query)
        result = cursor.fetchall()
        self.connection.close()
        return result
    
    
        





