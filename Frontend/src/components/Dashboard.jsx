import { Sidebar } from "./sidebar.jsx"
import { Mainmenu } from "./Mainmenu.jsx"
import { useEffect, useState } from "react";
import { NewProject } from "./NewProject.jsx"
import { useNavigate } from "react-router";


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


    if(projectState.selectedProjectId === undefined){
        content = <Mainmenu></Mainmenu>
    }
    if(projectState.selectedProjectId === null){
        content = <NewProject onClickCancelBtn={handleProjectCancelBtn}></NewProject>
    }

    return (
        <>
            <div className="flex">
                <Sidebar onClickAddProject={handleOnClickAddProject}></Sidebar>
                {content}
            </div>
        </>
    )
}