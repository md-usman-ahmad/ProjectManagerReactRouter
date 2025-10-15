import { Sidebar } from "./sidebar.jsx"
import { Mainmenu } from "./Mainmenu.jsx"
import { useEffect, useState } from "react";
import { NewProject } from "./NewProject.jsx"
import { useNavigate } from "react-router";
import { SelectedProject } from "./SelectedProject.jsx"
import axios from "axios";
import {ProjectManagerContext} from "../store/contextProvider.js";


export function Dashboard(){
const [projectState, setProjectState] = useState({
        projects: [],
        tasks: [],
        selectedProjectId: undefined,
});
let content;

const navigate = useNavigate();
const token = localStorage.getItem("token");
console.log("Dashboard Token = ",token);

useEffect( ()=>{
    if(token){
        axios({
            method : "GET",
            url : "http://localhost:4500/ProjectOperations",
            headers : {
                authorization : localStorage.getItem("token")
            }
        })
        .then( (response)=>{
            console.log("getProject response = ",response);
            let currentLoggedInUserAllProjects = response.data;
            setProjectState( (prevState)=>{
                return {
                    ...prevState,
                    projects : currentLoggedInUserAllProjects
                }
            })
        })
        .catch( (error)=>{
            console.log("getProject Error = ",error);
        })
    } else{
        navigate("/herosection");
    }
},[])

    const handleOnClickAddProject = ()=>{
        setProjectState( (prevState)=>{
            return {
                ...prevState,
                selectedProjectId : null
            }
        })
    }

    const handleProjectCancelBtn = ()=>{
        setProjectState( (prevState)=>{
            return {
                ...prevState,
                selectedProjectId : undefined
            }
        })
    }

    const handleAddingProject = (projectTitle,projectDescription)=>{
        console.log(projectTitle,projectDescription)
        axios({
            method : "POST",
            url : "http://localhost:4500/projectOperations",
            data : {
                projectTitle,projectDescription
            },
            headers : {
                authorization : localStorage.getItem("token")
            }
        })
        .then((response)=>{
            console.log("addProject response = ",response);
            alert(response.data);
            axios({
                method : "GET",
                url : "http://localhost:4500/projectOperations",
                headers : {
                    authorization : localStorage.getItem("token")
                }
            })
            .then((response)=>{
                console.log("Fetching Projects on Dashboard(sidebar) justafter addingProject = ",response.data);
                setProjectState( (prevState)=>{
                    return {
                        ...prevState,
                        projects : response.data,
                        selectedProjectId : response.data[response.data.length-1].projectId
                    }
                })
            })
            .catch((error)=>{
                console.log(error);
            })
        })
        .catch((error)=>{
            console.log("addProject error = ",error);
        })
    }
    const handleOnSelectingProject = (projectId)=>{
        setProjectState((prevState)=>{
            return {
                ...prevState,
                selectedProjectId : projectId
            }
        })
    }
    const handleProjectDelete = (projectId)=>{

        axios({
            method : "DELETE",
            url : `http://localhost:4500/projectOperations?projectId=${projectId}`,
            headers : {
                authorization : localStorage.getItem("token")
            }
        })
        .then((response)=>{
            console.log("deleteProject response = ",response);
            alert(response.data);
            axios({
                method : "GET",
                url : "http://localhost:4500/projectOperations",
                headers : {
                    authorization : localStorage.getItem("token")
                }
            })
            .then((response)=>{
                console.log("Fetching Projects on Dashboard(sidebar) justafter deletingProject = ",response.data);
                setProjectState((prevState)=>{
                    return {
                        ...prevState,
                        projects : response.data,
                        selectedProjectId : undefined
                    }    
                })
            })
        })
        .catch((error)=>{
            console.log("deleteProject error = ",error);
        })
    }

    const handleProjectUpdate = (projectId,updatedTitle,updatedDescription)=>{
        axios({
            method : "PATCH",
            url : "http://localhost:4500/projectOperations",
            data : {
                projectId,updatedTitle,updatedDescription
            },
            headers : {
                authorization: localStorage.getItem("token")
            }
        })
        .then((response)=>{
            console.log("updatedProject response = ",response);
            alert(response.data);
            axios({
                method : "GET",
                url : "http://localhost:4500/projectOperations",
                headers : {
                    authorization : localStorage.getItem("token")
                }
            })
            .then((response)=>{
                console.log("Fetching Projects on Dashboard(sidebar) justafter updatingProject = ",response.data);
                setProjectState( (prevState)=>{
                    return {
                        ...prevState,
                        projects : response.data,
                        selectedProjectId : projectId
                    }
                })
            })
        })
        .catch((error)=>{
            console.log("updatedProject error = ",error)
        })
    }   



    if(projectState.selectedProjectId === undefined){
        content = <Mainmenu></Mainmenu>
    }
    if(projectState.selectedProjectId === null){
        content = <NewProject onClickCancelBtn={handleProjectCancelBtn} addingProject={handleAddingProject}></NewProject>
    }

    if(projectState.selectedProjectId){
        const selectedProject = projectState.projects.filter( (item)=>(item.projectId === projectState.selectedProjectId));
        console.log("selectedProject = ",selectedProject);

        content = <SelectedProject 
            selectedProject={selectedProject[0]}
        ></SelectedProject>
    }

    return (
        <>
        <ProjectManagerContext value={{
            projectDelete : handleProjectDelete,
            projectUpdate : handleProjectUpdate
        }}
        >
            <div className="flex">
                <Sidebar 
                onClickAddProject={handleOnClickAddProject} 
                projects={projectState.projects} 
                onSelectingProject={handleOnSelectingProject}
                >
                </Sidebar>
                {content}
            </div>
        </ProjectManagerContext>
        </>
    )
}