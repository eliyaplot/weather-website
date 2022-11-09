const request = require("postman-request")

const geocode = (address,callback) => {
    const url = "http://api.positionstack.com/v1/forward?access_key=c07e8ef741ecd64fcf428fe32f2e805b&query=1600%20" + address

    request( {url, json:true}, (error,{body})=>{
        if(error){
            callback("unable to connect to location service",undefined)
        }
        else if(body.error){
            callback({error:"unable to find location"},undefined)

        }
        else {
            callback(undefined,{
                latitude:body.data[0].latitude,
                longitude: body.data[0].longitude,
                name: body.data[0].name
            })
        }
        //console.log("eliya")
    })
}

module.exports = geocode