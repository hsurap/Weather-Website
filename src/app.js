const path=require('path')
const express=require('express');
const hbs=require('hbs')
const geocode=require('./utlis/geocode.js')
const forecast=require('./utlis/forecast.js')

const app=express(); 

//define path for express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialPath)

// setup static directory  to serve
app.use(express.static(publicDirectoryPath))

app.get('/',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Parush'
    });
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Parush',
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message:'Welcome to Page .. Do you need any help??',
        title:'Help',
        name:'Parush',
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an Address'
        })
    }
    const location_name=req.query.address
    geocode(location_name,(error,{Latitude,Longitude,location}={})=>{
        if(error){
            return res.send({
                error:error,
            })
        }
        forecast(Latitude,Longitude,(error,forecastdata)=>{
            if(error){
                return res.send({
                    error:error,
                })
            }
            res.send({
                Address:req.query.address,
                location:location,
                Information:forecastdata,
                
            })
        })
    })

})



app.get('/help/*',(req,res)=>{
    // res.send('Help Article not Found')
    res.render('error',{
        message:'Help Article Not Found',
        title:'Error 404',
        name:'Parush'
    })
})

app.get('*',(req,res)=>{
    // res.send('My  404 Page ')
    res.render('error',{
        message:'Page Not Found',
        title:'Error 404',
        name:'Parush'
    })
})

app.listen(3000,()=>{
    console.log('server is up on port 3000.');
})








// app.get('/products',(req,res)=>{
//     if(!req.query.search){
//         return res.send({
//             error:'You must provide a search term'
//         })
//     }
//     console.log(req.query);
//     console.log(req.query.search);
//     res.send({
//         products:[],
//     })
// })



// console.log(__dirname);
// console.log(path.join(__dirname,'../public'));

// app.get('',(req,res)=>{
//     // res.send('hello express')
//     res.send('<h1>Weather</h1>')
// })


// app.get('/help',(req,res)=>{

//     // res.send('Help Page')
//     // res.send({
//     //     name:'Parush',
//     //     age:20,
//     // })
//     res.send([{
//         name:'Parush',
//     },{
//         name:'Rohan'
//     }])
// })

// app.get('/about',(req,res)=>{
//     // res.send('About Page')
//     res.send('<h1>About</h1>')
// })

