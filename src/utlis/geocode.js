const request=require('request');

const geocode=(address,callback)=>{
    const url=`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoicGFydXNoNzg2IiwiYSI6ImNsNWdpNG55YjFsaDQza21jdmVmZHM0bncifQ.J1inpgsJn_fsYTlde1UbZA&limit=1`;
    request({url,json:true},(error,response)=>{
        if(error){
            callback('unable to connect to location service',undefined);
        }else if(response.body.features.length==0){
            callback('Unable to find the location. Try another search',undefined);
        }else{
            callback(undefined,{
                Latitude:response.body.features[0].center[1],
                Longitude:response.body.features[0].center[0],
                location:response.body.features[0].place_name,
            })
        }
    })
}

module.exports=geocode;