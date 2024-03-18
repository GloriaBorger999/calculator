const express = require('express')
const { join } = require('path')
const bodyparser = require('body-parser')
const { mongclient } = require('mongodb')
const bcrypt = require('bcrypt')
const app = express()
const port = process.env.PORT || 3000

app.set('query parser', true)
app.use(bodyparser.urlencoded({extended: false}))
app.use(express.static(__dirname + '/public'));

let d = [
    {
        "name": "lee",
        "email": "lee@mail.com",
        "calchis":["2*2","25/6"]
    }
]
d[0]["password"] = bcrypt.hashSync("456456",10)
console.log(d)
app.get("/welcome", (req,res) => {
    res.sendFile(join(__dirname, "welcome.html"))
})

app.get('/', (req,res)=>{
    res.sendFile(join(__dirname, "index.html"))
})

app.get("/login", (req,res) => {
    res.sendFile(join(__dirname,"login.html"))
})

app.get("/signup", (req,res) => {
    res.sendFile(join(__dirname,"signup.html"))
})

app.post("/login", (req,res) => {
    let x = req.body.email
    let y = req.body.password
    if (d[0]['email'] === x && bcrypt.compareSync(y, d[0]['password'])){
        console.log("trueee")
        let p = d[0]['calchis']
        let a = `hiii ${d[0]["name"]}\n${p}`
        console.log(a)
        res.send(a)
    }
    else{
        console.log('false')
        res.send("incorrect username or password")
    }
    return 0
})

app.post("/signup", (req,res) => {
    let w = req.body.name
    let x = req.body.email
    let y = req.body.password
    for (const i in d){
        if(d[i]["name"] === w){
            alert("Name already exists")
            res.sendFile(join(__dirname,"signup.html"))
        }
    }
    d.push({"name":w, "email":x, "password":bcrypt.hashSync(y,10)})
    console.log(d)
    res.send(`welcome ${w}`)
})

app.listen(port, ()=>{ console.log("app active at http://localhost:3000/welcome")})