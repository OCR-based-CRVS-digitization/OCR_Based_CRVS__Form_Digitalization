import WorkSpaceForm from "../Forms/WorkSpaceForm";

const WorkSpaceModal = () => {
    return ( 
        <div>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
          Add Workspace
        </button>
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">Add Workspace</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <WorkSpaceForm />
              </div>
              <div class="modal-footer">
                
              </div>
            </div>
          </div>
        </div>
        </div>
);
}

export default WorkSpaceModal;