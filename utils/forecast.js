const request = require("postman-request")

const forecast = (longitude,latitude,callback) => {
    const url = "http://api.weatherstack.com/current?access_key=e94429185ad825a98f96da2f5eab3f37&query=" + longitude + "," + latitude;
    request(url, (error,response,body) =>{
        
        if(error){
            callback("There may be some error!!", undefined)
            return
        }
        const data = JSON.parse(body);
        if(data.success == false){
            callback("Unable to fetch the temperature!!", undefined)
        }
        else{
            callback(undefined,"Today weather is " + data.current.weather_descriptions[0] +". It is currently " + data.current.temperature + " degree but it feels like " + data.current.feelslike + " degree. Humity is "+ data.current.humidity + " and visibility is "+ data.current.visibility +".");
        }
        
    })
       
}

module.exports = forecast