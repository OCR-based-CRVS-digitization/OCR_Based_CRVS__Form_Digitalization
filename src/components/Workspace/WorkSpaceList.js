import React from "react";
import "./WorkSpaceList.css";
import { useNavigate } from "react-router-dom";

const WorkspaceList = (props) => {
  const navigate = useNavigate();
  const { data } = props;
  console.log("Hewwo");
  console.log(props);
  const handleCardClick = (id, name) => {
    navigate(`/home/workspace/${id}`,{state: name});
  };

  return (
    <div className="container mt-4">
      {data.length > 0 ? (
        <div className="row">
          {data.map((item, index) => (
            <div key={index} className="col-md-3 mb-4">
              <div className="card custom-card" onClick={() => handleCardClick(item.id, item.name)}>
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <div className="card-text">
                    <div className="row">
                      <div className="col-md-4">
                        <p>Section : {item.section}</p>
                      </div>
                      <div className="col-md-8">
                        <p>Total Students: {item.total}</p>
                      </div>
                    </div>
                  </div>
                  <p className="card-text">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="d-flex justify-content-center">
          <div className="spinner-grow text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkspaceList;
