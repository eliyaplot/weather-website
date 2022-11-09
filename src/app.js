const path = require("path")
const express = require("express")
const hbs = require("hbs")
const geocode = require("./utils/geocode.js")
const forecast = require("./utils/forecast.js")


console.log(__dirname)
console.log(path.join(__dirname,"../public"))

const app = express()

//define paths for express config
const publicDirApp = path.join(__dirname,"../public")
const viewsPath = path.join(__dirname,"../templates/views")
const partialPath = path.join(__dirname,"../templates/partials")

//setup handlebars, engine and views location
app.set("view engine","hbs")
app.set("views",viewsPath)
hbs.registerPartials(partialPath)

//setup static dir to serve
app.use(express.static(publicDirApp)) //coming from a static dir

app.get("",(req,res)=> {
    res.render("index", {
        title:"Weather App",
        name: "Eliya Plotnitsky"
    })
})

app.get("/about",(req,res)=> {
    res.render("about", {
        title:"About Me",
        name: "Eliya Plotnitsky"
    })
})

app.get("/help",(req,res)=> {
    res.render("help", {
        title:"Help page",
        message: "For help please send email to eliya.plot@gmail.com",
        name: "Eliya Plotnitsky"
    })
})

app.get("/info",(req,res)=> {
    res.render("info", {
        title:"Project info",
        message: "here you can find information about this project.",
        name: "Eliya Plotnitsky"
    })
})

app.get("/weather", (req,res)=> {
    if (!req.query.address) {
        return res.send({
            error:"you must provide an address"
        })
    }

    geocode(req.query.address, (error,{latitude,longtitude,name} = {})=>{
        if (error){
            return res.send(error)
        }

        forecast(latitude, longtitude, (error, foreCastdata) => {
            if (error) {
                return res.send(error)
            }
            res.send({
                forecast: foreCastdata,
                name,
                address: req.query.address
            })
          })
    })


   
})

app.get("/products",(req,res)=>{
    if (!req.query.search) {
        return res.send({
            error:"you must provide a search term"
        })
    }
    

    console.log(req.query.games)
    res.send({
        products: []
    })
})

app.get("/help/*",(req,res)=>{
    res.render("404", {
        title:" 404",
        error: "Help article not found",
        name: "Eliya Plotnitsky"
    })
})

app.get("*",(req,res)=>{
    res.render("404", {
        title:" 404",
        error: "Page not found",
        name: "Eliya Plotnitsky"
    })
})

app.listen(3000, () => {
    console.log("server is up on port 3000")
})