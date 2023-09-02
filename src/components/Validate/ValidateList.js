import React, { useState } from 'react';
import AuthContext from '../../store/auth-context';
import { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const ValidateList = () => {
    const authCtx = useContext(AuthContext);
    const params = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState([]);

    const handleClick = (id) => {
        navigate(`/home/workspace/${params.workspace_id}/validate/${id}`);
    };

    useEffect(() => {
        const fetchData = async () => {
          try {
            console.log(params.workspace_id);
            const response = await fetch(
              "https://crvs.onrender.com/workspace/getValidateList",
              {
                method: "POST",
                headers: {
                  Authorization: "Bearer " + authCtx.token,
                },
                body: JSON.stringify(params.workspace_id),
              }
            );
            const newData = await response.json();
            console.log(newData.validateList);
            setData(newData.validateList); // Update the state with fetched data
            
          } catch (error) {
            console.error("Error fetching workspace data:", error);
          }
        };
    
        fetchData(); // Fetch data when the component mounts or authCtx.token changes
      }, [authCtx.token, params.workspace_id]);
    


  return (
    <div class= "container">
      {data.length > 0 ? (<table className="table table-success table-striped caption-top">
        <caption>Forms to be validated</caption>
        <thead>
          <tr>
            <th>Form ID</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name.text}</td>
              <td>
              <button className="btn btn-success" onClick={() => handleClick(item.id)} >Validate</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>) : 
        <div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      }
    </div>
  );
};

export default ValidateList;
