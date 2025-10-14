const express = require("express");
const Router = express.Router();
const {AuthMiddleware} = require("../middleware.js");
const dbQuery = require("../database/dbhelper.js");

Router.use(AuthMiddleware);

Router.get("/", async function(request,response){
    try {
        console.log("request.originalUrl = ",request.originalUrl);
        console.log("request.method = ",request.method);

        const {currentLoggedInuserId, currentLoggedInusername} = request

        let query = "select * from projects where createdBy = ?";
        let params = [currentLoggedInuserId];
        let outputFromDB = await dbQuery(query,params);
        console.log(`${currentLoggedInusername}(userId-${currentLoggedInuserId}) all projects = `,outputFromDB);

        response.send(outputFromDB);
    } catch (error) {
        console.log("getProjects error(POST) = ",error);
        response.status(500).send(error);
    }
})

Router.post("/"  ,async function(request,response){
    try {
        console.log("request.originalUrl = ",request.originalUrl);
        console.log("request.method = ",request.method);
        console.log("request.body = ",request.body);
        const {projectTitle , projectDescription } = request.body;
        const {currentLoggedInuserId, currentLoggedInusername} = request;

        if(projectDescription && projectTitle){
            let query = "insert into projects(title,description,createdAt,createdBy) values(?,?,?,?)";
            let params = [projectTitle,projectDescription,new Date().toISOString().slice(0, 19).replace("T", " "),currentLoggedInuserId];
            await dbQuery(query,params);
            response.send(`${currentLoggedInusername}(userId-${currentLoggedInuserId}) ${projectTitle} Project Added Successfully`);
        } else{
            throw "Enter every field above (backend)";
        }

    } catch (error) {
        console.log("addProject Error - ",error)
        response.status(500).send(error);
    }
})

Router.delete("/",async function(request,response){
    try {
        console.log("request.originalUrl = ",request.originalUrl);
        console.log("request.method = ",request.method);
        console.log("request.query = ",request.query);
        const {projectId} = request.query;
        const {currentLoggedInuserId, currentLoggedInusername} = request;

        let query = "select * from projects where projectId = ?";
        let params = [projectId];
        let deletingProjectDetails = await dbQuery(query,params);
        if(currentLoggedInuserId === deletingProjectDetails[0].createdBy){
            query = "delete from projects where projectId = ?";
            params = [projectId];
            await dbQuery(query,params);
            response.send(`${currentLoggedInusername}(userId-${currentLoggedInuserId}) taskId-${taskId} deletedSuccessfully`)
        }else {
             throw "This Project is not from your projectList hence you cant delete";
         }

    } catch (error) {
        console.log("deleteProject Error - ",error)
        response.status(500).send(error);
    }
})

module.exports = Router;