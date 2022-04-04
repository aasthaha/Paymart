const express = require("express")
const app = express();
const port = 8000;
app.get('/',(req,res) => {
    return res.send("hello ")
})
app.get('/login',(req,res) => {
    return res.send("hello hello")
})
app.get('/SIGNUP',(req,res) => {
    return res.send("hello hello")
})
app.listen(port, () => {
    console.log("server is up and running")
})