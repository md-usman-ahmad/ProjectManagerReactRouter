import { Card } from "./Card";
import { Input } from "./input";

import { useRef } from "react";

export function SelectedProject({selectedProject}) {
  return (
    <>
    <div class=" mx-auto px-10 py-2 rounded-lg ">
        <div className="w-full">
            <Card  {...selectedProject} ></Card>
        </div>
      <div class="max-w-4xl mx-auto px-10  bg-white rounded-lg ">
        <form class="pt-20">
          <div class=" mb-6 flex gap-2">
            <Input id="TaskTitle"  type="text" placeholder="Enter Title"></Input>
            <Input id="TaskTitle"  type="text" placeholder="Enter Description"></Input>
            <button
              class="shadow bg-gray-800 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 mx-2 rounded"
              type="button"
            >
              Add
            </button>
          </div>
        </form>

        {/* {selectedProjectTasks.length === 0 && <h1 className="text-center">Add Tasks for this Project</h1>}
        {selectedProjectTasks.length > 0 && selectedProjectTasks.map((item) => {
          return (
            <>
                <TaskCard key={item.taskId} item={item} ></TaskCard>
            </>
        );
        })} */}
      </div>
      </div>
    </>
  );
}
