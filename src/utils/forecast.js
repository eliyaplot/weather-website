const request = require("postman-request")

const forecast = (latitude,longitude,callback) => {
    const url = "http://api.weatherstack.com/current?access_key=688545911b985c05a6377c182a228b60&query="+latitude+","+longitude

    request( {url, json:true}, (error,{body})=>{
        if(error){
            callback("unable to connect to weather service",undefined)
        }
        else if(body.error){
            callback({error:"unable to find location"},undefined)

        }
        else {
            callback(undefined,
                "Outside it's " + body.current.weather_descriptions[0] + 
                ". It is currently " + body.current.temperature + 
               " degrees. And it feels like " + body.current.feelslike + 
               " degrees."
            )
        }
        //console.log("eliya")
    })
}

module.exports = forecast