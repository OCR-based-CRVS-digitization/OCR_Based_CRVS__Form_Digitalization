import AuthContext from "../../store/auth-context";
import { useParams } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const EditWorkspace = () => {
    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);
    const params = useParams();

    const handleNavigate = () => {
        navigate(`/home/workspace/${params.workspace_id}`);
    };

    const [workspaceData, setWorkspaceData] = useState(null);
    const [isDataLoaded, setIsDataLoaded] = useState(false); // State to manage loading status

    const handleChange = (event) => {
        const { id, value } = event.target;
    
        const parsedValue =
          id === "level" ||
          id === "start" ||
          id === "end" ||
          id === "total" ||
          id === "year"
            ? parseInt(value, 10)
            : value;
            setWorkspaceData((prevData) => ({
          ...prevData,
          [id]: parsedValue,
        }));
        // console.log(formData);
      };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = authCtx.baseurl + "/workspace/updateWorkspace";
        console.log(url);
        try{
            const response = await fetch(
                url,
                {
                    method: "POST",
                    headers: {
                        Authorization: "Bearer " + authCtx.token,
                        "content-type": "application/json",
                    },
                    body: JSON.stringify({
                        workspace_id: params.workspace_id,
                        name: workspaceData.name,
                        class: workspaceData.class,
                        section: workspaceData.section,
                        group: workspaceData.group,
                        roll_start: workspaceData.roll_start,
                        roll_end: workspaceData.roll_end,
                        total: workspaceData.total,
                        year: workspaceData.year,
                        description: workspaceData.description,
                    }),
                }
            );
        }
        catch (error) {
            console.error("Error fetching workspace data:", error);
        }
        alert("Workspace updated successfully");
        handleNavigate();
    };

    useEffect(() => {
        const fetchWorkspaceData = async () => {
        const url = authCtx.baseurl + "/workspace/getWorkspace";
        console.log(url);
        try {
            const response = await fetch(
            url,
            {
                method: "POST",
                headers: {
                Authorization: "Bearer " + authCtx.token,
                "content-type": "application/json",
                },
                body: JSON.stringify({
                    workspace_id: params.workspace_id,
                }),
            }
            );
            const data = await response.json();
            console.log(data);
            console.log(data.workspace.name);
            setWorkspaceData(data.workspace); // Update the state with fetched data
            setIsDataLoaded(true);
        } catch (error) {
            console.error("Error fetching workspace data:", error);
        }
        };
    
        fetchWorkspaceData(); // Fetch data when the component mounts or authCtx.token changes
    }, [authCtx.token]);
       
    return (
        <div>
            {isDataLoaded ? (
               <form class="row g-3 needs-validation" novalidate onSubmit={handleSubmit}>
               <div class="col-md-12">
                 <label for="name" class="form-label">
                   Workspace name
                 </label>
                 <input
                   type="text"
                   class="form-control"
                   id="name"
                   value={workspaceData.name}
                   onChange={handleChange}
                   required
                 />
                 <div class="valid-feedback">Looks good!</div>
               </div>
               <div class="col-md-6">
                 <label for="level" class="form-label">
                   Class
                 </label>
                 <input
                   type="number"
                   class="form-control"
                   id="level"
                   value={workspaceData.class}
                   onChange={handleChange}
                   min="0"
                   step={1}
                   required
                 />
                 <div class="valid-feedback">Looks good!</div>
               </div>
               <div class="col-md-6">
                 <label for="sec" class="form-label">
                   Section
                 </label>
                 <input
                   type="text"
                   class="form-control"
                   id="sec"
                   value={workspaceData.section}
                   onChange={handleChange}
                   required
                 />
                 <div class="valid-feedback">Looks good!</div>
               </div>
               <div class="col-md-12">
                 <label for="group" class="form-label">
                   Group
                 </label>
                 <select
                   class="form-select form-select"
                   aria-label="group"
                   id="group"
                   value={workspaceData.group}
                   onChange={handleChange}
                 >
                   <option value="general">General</option>
                   <option value="science">Science</option>
                   <option value="Arts">Arts</option>
                   <option value="Commerce">Commerce</option>
                   <option value="Technical">Technical</option>
                 </select>
         
                 <div class="valid-feedback">Looks good!</div>
               </div>
         
               <div class="col-md-12">
                 <div class="input-group">
                   <span class="input-group-text">Roll</span>
                   <div class="form-floating">
                     <input
                       type="number"
                       class="form-control"
                       id="start"
                       value={workspaceData.roll_start}
                       onChange={handleChange}
                       placeholder="1"
                       min={1}
                       step={1}
                     />
                     <label for="start">Start</label>
                   </div>
                   <div class="form-floating">
                     <input
                       type="number"
                       class="form-control"
                       id="total"
                       value={workspaceData.roll_end}
                       onChange={handleChange}
                       placeholder="1"
                       min={1}
                       step={1}
                       required
                     />
                     <label for="end">End</label>
                   </div>
                 </div>
               </div>
         
               <div class="col-md-6">
                 <label for="total" class="form-label">
                   Total Students
                 </label>
                 <input
                   type="number"
                   class="form-control"
                   id="total"
                   value={workspaceData.total}
                   onChange={handleChange}
                   min="0"
                   step={1}
                   required
                 />
                 <div class="valid-feedback">Looks good!</div>
               </div>
         
               <div class="col-md-6">
                 <label for="year" class="form-label">
                   Year
                 </label>
                 <input
                   type="number"
                   class="form-control"
                   id="year"
                   value={workspaceData.year}
                   onChange={handleChange}
                   min="2020"
                   step={1}
                   required
                 />
                 <div class="valid-feedback">Looks good!</div>
               </div>
               <div class="col-md-12">
                 <label for="description" class="form-label">
                   Description
                 </label>
                 <textarea
                   class="form-control"
                   id="description"
                   name="description"
                   value={workspaceData.description}
                   onChange={handleChange}
                   rows="4"
                   placeholder="Enter a description..."
                 ></textarea>
               </div>
               <div class="col-6">
                 <button class="btn btn-primary" type="submit">
                   Submit form
                 </button>
               </div>
               {/* <div class="col-6">
               <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
           </div> */}
             </form> 
            ): <p>Loading...</p>};

        </div>

    );

};



export default EditWorkspace;