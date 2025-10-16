import { Card } from "./Card";
import { TaskCard } from "./TaskCard.jsx"
import { Input } from "./input";

import { useRef } from "react";

export function SelectedProject({selectedProject , addingTask , selectedProjectAllTasks}) {
    const taskTitleRef = useRef();
    const taskDescriptionRef = useRef();    

  return (
    <>
    <div className=" mx-auto px-10 py-2 rounded-lg ">
        <div className="w-full">
            <Card  {...selectedProject} ></Card>
        </div>
      <div className="max-w-4xl mx-auto px-10  bg-white rounded-lg ">
        <div className="pt-20">
          <div className=" mb-6 flex gap-2">
            <Input id="TaskTitle" ref={taskTitleRef} type="text" placeholder="Enter Title"></Input>
            <Input id="TaskTitle" ref={taskDescriptionRef} type="text" placeholder="Enter Description"></Input>
            <button onClick={()=>{
              addingTask(selectedProject.projectId,taskTitleRef.current.value , taskDescriptionRef.current.value)
              taskTitleRef.current.value = "";
              taskDescriptionRef.current.value = "";
            }}
              className="shadow bg-gray-800 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 mx-2 rounded"
              type="button"
            >
              Add
            </button>
          </div>
        </div>

        {selectedProjectAllTasks.length === 0 && <h1 className="text-center">Add Tasks for this Project</h1>}
        {selectedProjectAllTasks.length > 0 && selectedProjectAllTasks.map((item) => {
          return (
            <>
                <TaskCard key={item.taskId} {...item} ></TaskCard>
            </>
        );
        })}
      </div>
      </div>
    </>
  );
}
