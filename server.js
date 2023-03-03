const express = require("express");
const app = express();
const {Musician} = require("./Musician")
const {sequelize} = require("./db");
const { response } = require("express");

const port = 3000;

//TODO
app.get("/musicians", async(request, response)=>{
    let allMusicians = await Musician.findAll();
    response.json(allMusicians);
})

app.listen(port, () => {
    sequelize.sync();
    console.log(`Listening on port ${port}`)
})