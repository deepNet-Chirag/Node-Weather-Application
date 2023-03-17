const path = require("path")
const express = require("express")
const hbs = require("hbs")
const geoCode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express()

//initialising paths
const static_files = path.join(__dirname,"/public")
const pathTemplates = path.join(__dirname,"/templates/views")
const pathPartials = path.join(__dirname,"/templates/headers")

//set hbs paths entry
app.set('view engine','hbs')
app.set('views',pathTemplates)
hbs.registerPartials(pathPartials)

app.use(express.static(static_files))


//Page rendering 
app.get("",(res,rep)=>{
    rep.render("index",{
        name:"Chirag",
        picture:"picture.jpg",
        title:"Home Page"
    })
})

app.get("/about",(res,rep)=>{
    rep.render("about",{
        name:"Chirag",
        picture:"picture.jpg",
        title:"About Page"
    })
})

app.get("/help",(res,rep)=>{
    rep.render("help",{
        message:"Do you need any help??",
        title:"Help Page",
        name:"Chirag"
    })
})

app.get("/weather",(res,rep)=>{
    if(!res.query.address){
        return rep.send({
            error:"Enter the address!!"
        })
    }

    geoCode(res.query.address, (error,{name,longitude,latitude}={})=>{
        if(error){
            return rep.send({
                error:"Enter the correct address!!"
            })
        }
        else{
            console.log("Place - "+ name)
            forecast(latitude,longitude, (error, weather)=>{
                if(error){
                    return rep.send({
                        error:error
                    })
                }
                else{
                    
                    return rep.send({
                        name:name,
                        weather:weather,
                        address:res.query.address
                    })
                }
            
            })
        }
    })
})

app.get("/help/*",(res,rep)=>{
    rep.render("error",{
        message:"404 No such help article found",
        title:"Error Page",
        name:"Chirag"
    })
})


app.get("*",(res,rep)=>{
    rep.render("error",{
        message:"404 No such page found",
        title:"Error Page",
        name:"Chirag"
    })
})

app.listen(3000, ()=> console.log("Server is running on port 3000"))