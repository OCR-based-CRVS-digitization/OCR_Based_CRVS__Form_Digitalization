
import { useParams } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const EditWorkspace = () => {
    const navigate = useNavigate();
    const params = useParams();

    const handleNavigate = () => {
        navigate(`/home/workspace/${params.workspace_id}`);
    };

    const [workspaceData, setWorkspaceData] = useState(null);
    const [isDataLoaded, setIsDataLoaded] = useState(false); // State to manage loading status

      const handleTextChange = (event, id) => {
        const updatedWorkspaceData = { ...workspaceData };
        updatedWorkspaceData[id] = event.target.value;
        setWorkspaceData(updatedWorkspaceData);
      };

      const handleNumberChange = (event, id) => {
        const updatedWorkspaceData = { ...workspaceData };
        const parsedValue = parseInt(event.target.value, 10);
        updatedWorkspaceData[id] = parsedValue;
        setWorkspaceData(updatedWorkspaceData);
      };

      const handleListChange = (event, id) => {
        const updatedWorkspaceData = { ...workspaceData };
        updatedWorkspaceData[id] = event.target.value;
        setWorkspaceData(updatedWorkspaceData);
      };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = localStorage.getItem('baseurl') + "/workspace/updateWorkspace";
        console.log(url);
        try{
            const response = await fetch(
                url,
                {
                    method: "POST",
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem('token'),
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
            if(response.status === 401 && ( response.statusText==='Token has expired!' || response.statusText==='Invalid token!' )){
                alert("Session Expired, Please Login Again");
                localStorage.removeItem('token');
                localStorage.setItem('isLoggedIn', '0');
                window.location.href = "/";
            }
        }
        catch (error) {
            console.error("Error fetching workspace data:", error);
        }
        alert("Workspace updated successfully");
        handleNavigate();
    };

    useEffect(() => {
        const fetchWorkspaceData = async () => {
        const url = localStorage.getItem('baseurl') + "/workspace/getWorkspace";
        console.log(url);
        try {
            const response = await fetch(
            url,
            {
                method: "POST",
                headers: {
                Authorization: "Bearer " + localStorage.getItem('token'),
                "content-type": "application/json",
                },
                body: JSON.stringify({
                    workspace_id: params.workspace_id,
                }),
            }
            );

            if(response.status === 401 && ( response.statusText==='Token has expired!' || response.statusText==='Invalid token!' )){
                alert("Session Expired, Please Login Again");
                localStorage.removeItem('token');
                localStorage.setItem('isLoggedIn', '0');
                window.location.href = "/";
            }
            
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
    }, []);
       
    return (
        <div>
            {isDataLoaded ? (
               <form className="row g-3 needs-validation" noValidate onSubmit={handleSubmit}>
               <div className="col-md-12">
                 <label htmlFor="name" className="form-label">
                   Workspace name
                 </label>
                 <input
                   type="text"
                   className="form-control"
                   id="name"
                   value={workspaceData.name}
                   onChange= {event => handleTextChange(event, "name")}
                   required
                 />
                 <div className="valid-feedback">Looks good!</div>
               </div>
               <div className="col-md-6">
                 <label htmlFor="level" className="form-label">
                   Class
                 </label>
                 <input
                   type="number"
                   className="form-control"
                   id="level"
                   value={workspaceData.class}
                   onChange={event => handleNumberChange(event, "class")}
                   min="0"
                   step={1}
                   required
                 />
                 <div className="valid-feedback">Looks good!</div>
               </div>
               <div className="col-md-6">
                 <label htmlFor="sec" className="form-label">
                   Section
                 </label>
                 <input
                   type="text"
                   className="form-control"
                   id="sec"
                   value={workspaceData.section}
                   onChange={event => handleTextChange(event, "section")}
                   required
                 />
                 <div className="valid-feedback">Looks good!</div>
               </div>
               <div className="col-md-12">
                 <label htmlFor="group" className="form-label">
                   Group
                 </label>
                 <select
                   className="form-select form-select"
                   aria-label="group"
                   id="group"
                   value={workspaceData.group}
                   onChange={event => handleListChange(event, "group")}
                 >
                   <option value="general">General</option>
                   <option value="science">Science</option>
                   <option value="Arts">Arts</option>
                   <option value="Commerce">Commerce</option>
                   <option value="Technical">Technical</option>
                 </select>
         
                 <div className="valid-feedback">Looks good!</div>
               </div>
         
               <div className="col-md-12">
                 <div className="input-group">
                   <span className="input-group-text">Roll</span>
                   <div className="form-floating">
                     <input
                       type="number"
                       className="form-control"
                       id="start"
                       value={workspaceData.roll_start}
                       onChange={event => handleNumberChange(event, "roll_start")}
                       placeholder="1"
                       min={1}
                       step={1}
                     />
                     <label htmlFor="start">Start</label>
                   </div>
                   <div className="form-floating">
                     <input
                       type="number"
                       className="form-control"
                       id="total"
                       value={workspaceData.roll_end}
                       onChange={event => handleNumberChange(event, "roll_end")}
                       placeholder="1"
                       min={1}
                       step={1}
                       required
                     />
                     <label htmlFor="end">End</label>
                   </div>
                 </div>
               </div>
         
               <div className="col-md-6">
                 <label htmlFor="total" className="form-label">
                   Total Students
                 </label>
                 <input
                   type="number"
                   className="form-control"
                   id="total"
                   value={workspaceData.total}
                   onChange={event => handleNumberChange(event, "total")}
                   min="0"
                   step={1}
                   required
                 />
                 <div className="valid-feedback">Looks good!</div>
               </div>
         
               <div className="col-md-6">
                 <label htmlFor="year" className="form-label">
                   Year
                 </label>
                 <input
                   type="number"
                   className="form-control"
                   id="year"
                   value={workspaceData.year}
                   onChange={event => handleNumberChange(event, "year")}
                   min="2020"
                   step={1}
                   required
                 />
                 <div className="valid-feedback">Looks good!</div>
               </div>
               <div className="col-md-12">
                 <label htmlFor="description" className="form-label">
                   Description
                 </label>
                 <textarea
                   className="form-control"
                   id="description"
                   name="description"
                   value={workspaceData.description}
                   onChange={event => handleTextChange(event, "description")}
                   rows="4"
                   placeholder="Enter a description..."
                 ></textarea>
               </div>
               <div className="col-6">
                 <button className="btn btn-primary" type="submit">
                   Submit form
                 </button>
               </div>
               {/* <div class="col-6">
               <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
           </div> */}
             </form> 
            ): <p>Loading...</p>}

        </div>

    );

};



export default EditWorkspace;