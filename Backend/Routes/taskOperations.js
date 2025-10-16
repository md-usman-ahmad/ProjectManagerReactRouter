const express = require("express");
const Router = express.Router();
const {AuthMiddleware} = require("../middleware.js");
const dbQuery = require("../database/dbhelper.js");

Router.use(AuthMiddleware);

Router.get("/",async function(request,response){
    try {
        console.log("request.originalUrl = ",request.originalUrl);
        console.log("request.method = ",request.method);
        console.log("request.query = ",request.query);
        const {selectedProjId , projectId} = request.query;
        const {currentLoggedInuserId , currentLoggedInusername} = request;
        let query = "select * from tasks where pId = ? AND createdBy = ?";
        let params = [selectedProjId , currentLoggedInuserId];
        let  outputFromDB = await dbQuery(query,params);
        console.log(`${currentLoggedInusername}(userId-${currentLoggedInuserId}   all Tasks = `,outputFromDB);
        response.send(outputFromDB);
    } catch (error) {
        console.log("getTask error = ",error);
        response.status(500).send(error)
    }
})

Router.post("/",async function(request,response){
    try {
        console.log("request.originalUrl = ",request.originalUrl);
        console.log("request.method = ",request.method);
        console.log("request.body = ",request.body);

        const {projectId , taskTitle , taskDescription} = request.body
        const {currentLoggedInuserId , currentLoggedInusername} = request;

        let query = "insert into tasks(title,description,createdAt,pId,createdBy) values(?,?,?,?,?)";
        let params = [taskTitle,taskDescription,new Date().toISOString().slice(0, 19).replace("T", " "),projectId,currentLoggedInuserId];
        await dbQuery(query,params);
        response.send(`${currentLoggedInusername}(userId-${currentLoggedInuserId}) projectId_${projectId}) Task(${taskTitle}) Added Successfully`)
    } catch (error) {
        console.log("postTask error = ",error);
        response.status(500).send(error)
    }
})


module.exports = Router;