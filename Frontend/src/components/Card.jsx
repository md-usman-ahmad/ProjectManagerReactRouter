import axios from "axios";
import { use, useRef, useState } from "react";
import { useContext } from "react";
import {ProjectManagerContext} from "../store/contextProvider.js";

export function Card({ projectId, title, description , createdAt,updatedAt}) {
    const {projectDelete , projectUpdate} = useContext(ProjectManagerContext);


    const [IsEditing , setIsEditing] = useState(false);

    const updatedProjectTitleRef = useRef();
    const updatedProjectDescriptionRef = useRef();
  return (
    <>
      <div className="flex border border-gray-700 rounded-lg p-4 bg-stone-800 shadow-sm mt-2  ">
        <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-cyan-400 text-lg">⚡</span>
        </div>
        <div className="flex  justify-between pl-3">
          <div className="flex-1 w-[300px]">
            {IsEditing ? (
              <>
                <input
                  type="text"
                  className="w-full bg-gray-700 border border-gray-600 text-white rounded px-3 py-1 mb-2 text-sm"
                  placeholder="Edit Title"
                  defaultValue={title}
                  ref={updatedProjectTitleRef}
                />
                <input
                  type="text"
                  className="w-full bg-gray-700 border border-gray-600 text-white rounded px-3 py-1 text-sm"
                  placeholder="Edit Description"
                  defaultValue={description}
                  ref={updatedProjectDescriptionRef}
                />
              </>
            ) : (
              <>
                <div className="task-content">
                  <h6 className="font-semibold text-white mb-1">{title}</h6>
                  <hr className="my-1 border-gray-600" />
                  <p className="text-gray-300 text-sm break-words">
                    {description}
                  </p>
                </div>
              </>
            )}
          </div>

          <div className="flex flex-col ml-4">
            <small className="text-gray-400 text-xs whitespace-nowrap">
              createdAt - {createdAt}
            </small>
            <small className="text-gray-400 text-xs whitespace-nowrap">
              updatedAt - {updatedAt}
            </small>
          </div>

          <div className="ml-4">
            <div className="action-buttons">
              {IsEditing ? (
                <>
                  <button onClick={()=>{
                    projectUpdate(projectId,updatedProjectTitleRef.current.value, updatedProjectDescriptionRef.current.value);
                    setTimeout(()=>{
                        setIsEditing(false);
                    },1000  )
                }}
                    className="save-btn border border-green-400 text-green-400 hover:bg-green-900 px-3 py-1 rounded text-sm mr-2"
                  >
                    Save
                  </button>
                  <button
                    className="cancel-btn border border-gray-400 text-gray-400 hover:bg-gray-700 px-3 py-1 rounded text-sm"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="edit-btn border border-cyan-400 text-cyan-400 hover:bg-cyan-900 px-3 py-1 rounded text-sm mr-2"
                    onClick={() => {
                      setIsEditing(true);
                    }}
                  >
                    Edit
                  </button>
                  <button  onClick={()=>{projectDelete(projectId)}}
                    className="delete-btn border border-red-400 text-red-400 hover:bg-red-900 px-3 py-1 rounded text-sm  "
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
