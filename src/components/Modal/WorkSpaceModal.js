import WorkSpaceForm from "../Forms/WorkSpaceForm";

const WorkSpaceModal = () => {
    return ( 
        <div>
        <button type="button" className="btn btn-success " data-bs-toggle="modal" data-bs-target="#staticBackdrop">
          Add Workspace
        </button>
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">Add Workspace</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <WorkSpaceForm />
              </div>
              <div className="modal-footer">
                
              </div>
            </div>
          </div>
        </div>
        </div>
);
}

export default WorkSpaceModal;