const express = require("express");
const app = express();
const {Musician} = require("./Musician")
const {sequelize} = require("./db");
const { response } = require("express");

const port = 3000;

//get method, all musicians
app.get("/musicians", async(request, response)=>{
    let allMusicians = await Musician.findAll();
    response.json(allMusicians);
})

//route specific musician
app.get("/musicians/:id", async(request, response)=>{
    let musician = await Musician.findByPk(request.params.id)
    response.json(musician);
})

//middleware
app.use(express.json());

//post method/ add new musician
app.post("/musicians", async(request, response)=>{
    let musicianInfo = request.body;
    await Musician.create({
        name: musicianInfo.name,
        instrument: musicianInfo.instrument
    })
})
//PUT method/update musician
app.put("/musicians/:id", async(request, response)=>{
    let primaryKey = request.params.id;
    let newInfo = request.body;
    await Musician.update({
        name: newInfo.name,
        instrument: newInfo.instrument},{
            where : {id : primaryKey}
    })
})
//DELETE method
app.delete("/musicians/:id", async(request, response)=>{
    let primaryKey = request.params.id;
    await Musician.destroy({
        where: {id: primaryKey}
    });
})


app.listen(port, () => {
    sequelize.sync();
    console.log(`Listening on port ${port}`)
})