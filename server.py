from flask import Flask, request, jsonify
import dao
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
    sensorsDao = dao.Dao()
    result = sensorsDao.getStats()
    print(result)


    return jsonify({
        "id": result.station_id,
        "temp": result.temp,
        "light": result.sun,
        "wind": result.wind,
        "hum": result.humidity,
        "date": result.date
    }, 200)


@app.post('/saveSensors')
def saveSensors():
    data = request.json
    humidity = data['hum']
    temperature = data['temp']
    light = data['light']
    wind = data['wind']
    id_station = data['id']
    sensorsDao = dao.Dao()
    sensorsDao.insertStats(id_station, temperature, light, wind, humidity)
    
    return jsonify({"message": "success"}, 200)





@app.route('/getWeatherByCity/<city>')
def getWeatherByCity(city):
    pass



if __name__ == '__main__':
    app.run(host='0.0.0.0',port=5000, debug=True)




# This is the server for the web app. 
# TODO: Get Arduino to communicate with the server. 