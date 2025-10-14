import { Sidebar } from "./sidebar.jsx"
import { Mainmenu } from "./Mainmenu.jsx"
import { useState } from "react";
import { NewProject } from "./NewProject.jsx"


export function Dashboard(){
const [projectState, setProjectState] = useState({
        projects: [],
        tasks: [],
        selectedProjectId: undefined,
});
let content;

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