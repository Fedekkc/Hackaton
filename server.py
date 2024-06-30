from flask import Flask, request, jsonify
import dao
import stats
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
CORS(app, resources={r"/*": {"origins": "*"}})


# En este post, recibimos un JSON del ESP32
@app.post('/test')
def test():
    data = request.json
    print(data)
    return  jsonify({"message": "success"}, 200)




@app.get('/getSensors')
def getSensors():
    client_ip = request.remote_addr
    print("Conexión a la página desde: " + client_ip)
    sensorsDao = dao.Dao()
    result = sensorsDao.getStats()
    return jsonify({
        "station_id": result.station_id,
        "temp": result.temp,
        "light": result.sun,
        "wind": result.wind,
        "hum": result.humidity,
        "date": result.date
    }, 200)


@app.post('/saveSensors')
def saveSensors():
    data = request.json
    humidity = data['stats']['hum']
    temperature = data['stats']['temp']
    light = data['stats']['light']
    wind = data['stats']['wind']
    id_station = data['id']
    sensorsDao = dao.Dao()
    stat = stats.Stats(id_station, temperature, light, wind, humidity, None)
    sensorsDao.insertStats(stat)
    
    return jsonify({"message": "success"}, 200)

@app.get('/getHistoric/<date>')
def getHistoric(date):
    try:
        getDao = dao.Dao()
        result = getDao.getStatByDay(date)
        if result is None:
            return jsonify({"error": "No data found for the given date"}, 404)
        return jsonify({
            "station_id": result.station_id,
            "temp": result.temp,
            "light": result.sun,
            "wind": result.wind,
            "hum": result.humidity,
            "date": result.date
        }, 200)
    except Exception as e:
        return jsonify({"error": str(e)}, 500)
    
@app.get('/getLastDays')
def getLastDays():
    try:
        getDao = dao.Dao()
        result = getDao.getDates()
        if result is None:
            return jsonify({"error": "No data found for the given date"}, 404)
        # Recibimos 30 resultados, debemos devolverlos de manera ordenada
        response = []
        for res in result:
            response.append({
                "station_id": res[0],
                "temp": res[1],
                "light": res[2],
                "wind": res[3],
                "hum": res[4],
                "date": res[5]
            })
        return jsonify(response, 200)            

    except Exception as e:
        return jsonify({"error": str(e)}, 500)
    

    





@app.route('/getWeatherByCity/<city>')
def getWeatherByCity(city):
    pass



if __name__ == '__main__':
    app.run(host='0.0.0.0',port=5000, debug=True)




# This is the server for the web app. 
# TODO: Get Arduino to communicate with the server. 