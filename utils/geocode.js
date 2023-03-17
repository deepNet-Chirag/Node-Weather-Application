const request = require("postman-request")

const geoCode = (address,callback)=>{
    const url = "https://dev.virtualearth.net/REST/v1/Locations?addressLine=" + encodeURIComponent(address) + "&key=AmbgUjI_4K6MPPdTMhWPw2EcTD_LYGbQTsn_O3FJqZPhYOngC5RsejS7k4ExhYi1";

    request( url , (error,respone, body) => {
            if(error){
                callback("There may be some error!!",undefined);
                return  
            }

            data = JSON.parse(body);
            data = data.resourceSets[0]
        
            if( data.estimatedTotal == 0){
                callback("Unable to fetch the location!!",undefined)
            }
            else{
                callback(undefined,{
                    latitude:data.resources[0].point.coordinates[0],
                    longitude :data.resources[0].point.coordinates[1],
                    name : data.resources[0].name
                })
            }
        })    
}

module.exports = geoCode;