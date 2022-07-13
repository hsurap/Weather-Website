const request=require('request');

const forecast=(Latitude,Longitude,callback)=>{
    const url=`http://api.weatherstack.com/current?access_key=c8ac3d404f7e8548d26b3e7610c96ef4&query=${Latitude},${Longitude}&units=m`
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('unable to connect to weather service',undefined);
        }else if(body.error){
            callback('unable to find location',undefined);
        }else{
            const data={
                weather_descriptions:body.current.weather_descriptions[0],
                current_temperature:body.current.temperature,
                feel_temperature:body.current.feelslike,
                humidity:body.current.humidity,
            }
            const str=`${data.weather_descriptions} , it is currently ${data.current_temperature}C out . It feels like ${data.feel_temperature}C out and the humidity is ${humidity}%`;
            callback(undefined,str)
        }
    })
}

module.exports=forecast;