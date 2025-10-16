import { Sidebar } from "./sidebar.jsx"
import { Mainmenu } from "./Mainmenu.jsx"
import { useEffect, useState , useReducer } from "react";
import { NewProject } from "./NewProject.jsx"
import { useNavigate } from "react-router";
import { SelectedProject } from "./SelectedProject.jsx"
import axios from "axios";
import {ProjectManagerContext} from "../store/contextProvider.js";


export function Dashboard(){
// const [projectState, setProjectState] = useState({
//         projects: [],
//         tasks: [],
//         selectedProjectId: undefined,
// });

const reducerFn = (projectState,action)=>{
    if(action.type === "FetchingAllProjectsOnLoggedIn"){
        console.log("bbbbbbbbbbbb")
        return {
            ...projectState,
            projects : action.payload.currentLoggedInUserAllProjects
        }
    } else if(action.type === "FetchingSelectedProjectTasks"){
        return {
            ...projectState,
            tasks : action.payload.selectedProjectAllTasks
        }
    } else if(action.type === "handleOnClickAddProject"){
        return {
            ...projectState,
            selectedProjectId : null
        }
    } else if(action.type === "handleProjectCancelBtn"){
        return {
             ...projectState,
            selectedProjectId : undefined
        }   
    } else if(action.type === "handleAddingProject"){
        return {
            ...projectState,
            projects : action.payload.currentLoggedInUserAllProjects
        }
    } else if(action.type === "handleOnSelectingProject"){
        console.log("projectId 2 = ",action.payload.projectId);
        return {
                ...projectState,
                selectedProjectId : action.payload.projectId
            }
    } else if(action.type === "handleProjectDelete"){
        return {
            ...projectState,
            projects : action.payload.currentLoggedInUserAllProjects,
            selectedProjectId : undefined
        }
    } else if(action.type === "handleProjectUpdate"){
        return {
            ...projectState,
            projects : action.payload.currentLoggedInUserAllProjects,
            selectedProjectId : action.payload.projectId
        }
    } else if(action.type === "handleAddingTask"){
        return {
            ...projectState,
            tasks : action.payload.selectedProjectAllTasks
        }
    } else if(action.type === "handleDeleteTask"){
        return {
            ...projectState,
            tasks : action.payload.selectedProjectAllTasks
        }
    } else if(action.type === "handleUpdateTask"){
        return {
            ...projectState,
            tasks : action.payload.selectedProjectAllTasks
        } 
    } else {
        return {
        ...projectState
      }
    }
}
const [projectState , dispatch] = useReducer(reducerFn, {
    projects: [],
    tasks: [],
    selectedProjectId: undefined,
})
console.log("projectState = ",projectState);

let content,currentLoggedInUserAllProjects , selectedProjectAllTasks ,  selectedProjId;


const navigate = useNavigate();
const token = localStorage.getItem("token");
console.log("Dashboard Token = ",token);

useEffect( ()=>{
    console.log("useEffect chlaaa");
     // userLogin hote hi saare projects fetch krrhe DB se 
    if(token){
        console.log("aaaaaaaaaa")
        axios({
            method : "GET",
            url : "http://localhost:4500/ProjectOperations",
            headers : {
                authorization : localStorage.getItem("token")
            }
        })
        .then( (response)=>{
            console.log("getProject response = ",response);
            currentLoggedInUserAllProjects = response.data; 
            dispatch({
                type : "FetchingAllProjectsOnLoggedIn",
                payload : {
                    currentLoggedInUserAllProjects
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

useEffect( ()=>{
    // selectedProject ke saare tasks fetch krrhe DB se 
    console.log("useEffect, selectedProjectId  = ",projectState.selectedProjectId);
        selectedProjId = projectState.selectedProjectId;
        if(projectState.selectedProjectId !== undefined && projectState.selectedProjectId !== null){
            axios({
                method : "GET",
                url : "http://localhost:4500/taskOperations",
                headers : {
                    authorization : localStorage.getItem("token")
                },
                params : {
                    selectedProjId
                }
            })
            .then((response)=>{
                console.log("getTasks response.data = ",response.data);
                // alert(response.data.message);
                selectedProjectAllTasks = response.data;
                dispatch({
                    type : "FetchingSelectedProjectTasks",
                    payload : {
                        selectedProjectAllTasks
                    }
                })
            })
            .catch((error)=>{
                console.log("getTask error = ",error)
            })
        }
},[projectState.selectedProjectId])

        // Project Operations 
    const handleOnClickAddProject = ()=>{
        dispatch({
            type : 'handleOnClickAddProject',
        })
    }

    const handleProjectCancelBtn = ()=>{
        dispatch({
            type : "handleProjectCancelBtn" 
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
                currentLoggedInUserAllProjects = response.data; 
                dispatch({
                    type : "handleAddingProject",
                    payload : {
                        currentLoggedInUserAllProjects,
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
        console.log("projectId 1 = ",projectId);
        dispatch({
            type : "handleOnSelectingProject",
            payload : {
                projectId,
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
                currentLoggedInUserAllProjects = response.data;
                dispatch({
                    type : "handleProjectDelete",
                    payload : {
                        currentLoggedInUserAllProjects
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
                currentLoggedInUserAllProjects = response.data;
                dispatch({
                    type : "handleProjectUpdate",
                    payload : {
                        currentLoggedInUserAllProjects,
                        projectId
                    }
                })
            })
        })
        .catch((error)=>{
            console.log("updatedProject error = ",error)
        })
    }   

        // Task Operations 
    const handleAddingTask = (projectId,taskTitle,taskDescription)=>{
        console.log(projectId,taskTitle,taskDescription)
        selectedProjId = projectId;
        axios({
            method : "POST",
            url : "http://localhost:4500/taskOperations",
            data : {
                projectId , taskTitle , taskDescription
            },
            headers : {
                authorization : localStorage.getItem("token")
            }
        })
        .then((response)=>{
            console.log("addTask response = ",response);
            axios({
                method : "GET",
                url : "http://localhost:4500/taskOperations",
                headers : {
                    authorization : localStorage.getItem("token")
                },
                params : {
                    selectedProjId
                }
            })
            .then((response)=>{
                console.log("Fetching Tasks on Dashboard(selectedProject) justafter addingTask = ",response.data);
                selectedProjectAllTasks = response.data;
                dispatch({
                    type : "handleAddingTask",
                    payload : {
                        selectedProjectAllTasks
                    }
                })
            })
        })
        .catch((error)=>{
            console.log("addTask Error = ",error);
        })
    }

    const handleDeleteTask = (selectedProjectId,taskId)=>{
        console.log(selectedProjectId , taskId);
        selectedProjId = selectedProjectId;
        axios({
            method : "DELETE",
            url : `http://localhost:4500/taskOperations?selectedProjId=${selectedProjId}&taskId=${taskId}`,
            headers : {
                authorization : localStorage.getItem("token")
            },
        })
        .then((response)=>{
            console.log("deleteTask response = ",response);
            alert(response.data);
            axios({
                method : "GET",
                url : `http://localhost:4500/taskOperations?selectedProjId=${selectedProjId}`,
                headers : {
                    authorization : localStorage.getItem("token")
                }
            })
            .then((response)=>{
                console.log("Fetching Tasks on Dashboard(selectedProject) justafter addingTask = ",response.data);
                selectedProjectAllTasks = response.data;
                dispatch({
                    type : "handleDeleteTask",
                    payload : {
                        selectedProjectAllTasks
                    }
                })  
            })
        })
        .catch((error)=>{
            console.log("deleteTask error = ",error);
        })
    }
    const handleUpdateTask = (selectedProjectId, taskId, updatedTitle, updatedDescription)=>{
        console.log(selectedProjectId, taskId, updatedTitle, updatedDescription);
        selectedProjId = selectedProjectId;
        axios({
            method : "PATCH",
            url : "http://localhost:4500/taskOperations",
            headers : {
                authorization : localStorage.getItem("token")
            },
            data : {
                selectedProjId, taskId, updatedTitle, updatedDescription
            }
        })
        .then((response)=>{
            console.log("updateTask response.data = ",response.data);
            alert(response.data);
            selectedProjectAllTasks = response.data;
            axios({
                method : "GET",
                url : `http://localhost:4500/taskOperations?selectedProjId=${selectedProjId}`,
                headers : {
                    authorization : localStorage.getItem("token")
                }
            })
            .then((response)=>{
                console.log("Fetching Tasks on Dashboard(selectedProject) justafter updatingTask = ",response.data);
                selectedProjectAllTasks = response.data;
                dispatch({
                    type : "handleUpdateTask",
                    payload : {selectedProjectAllTasks}
                })
            })
        })
        .catch((error)=>{
            console.log("updateTask error = ",error);
        })
    }


    if(projectState.selectedProjectId === undefined){
        content = <Mainmenu></Mainmenu>
    }
    if(projectState.selectedProjectId === null){
        content = <NewProject onClickCancelBtn={handleProjectCancelBtn} addingProject={handleAddingProject} ></NewProject>
    }

    if(projectState.selectedProjectId){
        const selectedProject = projectState.projects.filter( (item)=>(item.projectId === projectState.selectedProjectId));
        console.log("selectedProject = ",selectedProject);
        const selectedProjectAllTasks = projectState.tasks;

        content = <SelectedProject 
            selectedProject={selectedProject[0]}
            addingTask={handleAddingTask}
            selectedProjectAllTasks={selectedProjectAllTasks}
        ></SelectedProject>
    }

    return (
        <>
        <ProjectManagerContext value={{
            projectDelete : handleProjectDelete,
            projectUpdate : handleProjectUpdate,
            deleteTask : handleDeleteTask,
            updateTask : handleUpdateTask
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