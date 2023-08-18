import React from "react";
import "./WorkSpaceList.css";
import { useNavigate } from "react-router-dom";

const WorkspaceList = (props) => {
  const navigate = useNavigate();
  const { data } = props;
  console.log("Hewwo");
  console.log(props);
  const handleCardClick = (id) => {
    navigate(`/home/workspace/${id}`);
  };

  return (
    <div className="container mt-4">
      {data.length > 0 ? (
        <div className="row">
          {data.map((item, index) => (
            <div key={index} className="col-md-3 mb-4">
              <div className="card custom-card" onClick={handleCardClick}>
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <div class="card-text">
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
        <div class="d-flex justify-content-center">
          <div class="spinner-grow text-success" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkspaceList;
