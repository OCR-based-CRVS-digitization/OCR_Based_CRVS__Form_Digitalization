import ButtonGroup from "../buttonGroup";
const FormPageTwo = () => {
    const relation= [
        "Grandfather",
        "Grandmother",
        "Brother",
        "Sister",
        "Uncle",
        "Aunt"
    ]
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <form class="row g-3 needs-validation" novalidate onSubmit={handleSubmit}>
      <div class="row mb-1">
        <label for="Father" class="col-sm-8 col-form-label col-form-label-lg">
          Father's Information:
        </label>
      </div>

      <div class="row mb-1">
        <label
          for="fatherName"
          class="col-sm-3 col-form-label col-form-label-sm"
        >
          Father's Name:
        </label>
        <div class="col-sm-9">
          <input
            type="text"
            class="form-control form-control-sm"
            id="fatherName"
            required
          />
        </div>
      </div>

      <div class="row mb-1">
        <label
          for="fatherNameEnglish"
          class="col-sm-3 col-form-label col-form-label-sm"
        >
          Father's Name (Eng) :
        </label>
        <div class="col-sm-9">
          <input
            type="text"
            class="form-control form-control-sm"
            id="fatherNameEnglish"
            required
          />
        </div>
      </div>

      <div class="row mb-1">
        <label
          for="nidFather"
          class="col-sm-3 col-form-label col-form-label-sm"
        >
          NID :
        </label>
        <div class="col-sm-9">
          <input
            type="number"
            class="form-control form-control-sm"
            id="nidFather"
            min={1}
            required
          />
        </div>
      </div>

      <div class="row mb-1">
        <label
          for="birthDateFather"
          class="col-sm-3 col-form-label col-form-label-sm"
        >
          Birth Date :
        </label>
        <div class="col-sm-9">
          <input
            type="date"
            class="form-control form-control-sm"
            id="birthDateFather"
            required
          />
        </div>
      </div>

      <div class="row mb-1">
        <label
          for="birthRegNoFather"
          class="col-sm-3 col-form-label col-form-label-sm"
        >
          Birth Registration No :
        </label>
        <div class="col-sm-9">
          <input
            type="number"
            class="form-control form-control-sm"
            id="birthRegNoFather"
            min={1}
            required
          />
        </div>
      </div>

      <div class="row mb-1">
        <label
          for="mobileNoFather"
          class="col-sm-3 col-form-label col-form-label-sm"
        >
          Mobile No :
        </label>
        <div class="col-sm-9">
          <input
            type="number"
            class="form-control form-control-sm"
            id="mobileNoFather"
            pattern="[0-9]{11}"
            required
          />
        </div>
      </div>

      <div class="row mb-1">
        <label
          for="occupationFather"
          class="col-sm-3 col-form-label col-form-label-sm"
        >
          Occupation :
        </label>
        <div class="col-sm-9">
          <input
            type="text"
            class="form-control form-control-sm"
            id="occupationFather"
            required
          />
        </div>
      </div>

      <div class="row mb-1">
        <label
          for="deathYearFather"
          class="col-sm-3 col-form-label col-form-label-sm"
        >
          If dead, death year :
        </label>
        <div class="col-sm-9">
          <input
            type="number"
            class="form-control form-control-sm"
            id="deathYearFather"
          />
        </div>
      </div>

      <div class="row mb-1">
        <label for="Father" class="col-sm-8 col-form-label col-form-label-lg">
          Present Address:
        </label>
      </div>

      <div class="row mb-1">
        <div class="col-sm-6">
          <div class="input-group input-group-sm">
            <label class="input-group-text" for="Division">
              Division
            </label>
            <input type="text" class="form-control" id="divPresent" />
          </div>
        </div>
        <div class="col-sm-6">
          <div class="input-group input-group-sm">
            <label class="input-group-text" for="District">
              District
            </label>
            <input type="text" class="form-control" id="distPresent" />
          </div>
        </div>

        <div class="col-sm-6">
          <div class="input-group input-group-sm">
            <label class="input-group-text" for="Upozilla/Thana">
              Upozilla/Thana
            </label>
            <input type="text" class="form-control" id="upoPresent" />
          </div>
        </div>
        <div class="col-sm-6">
          <div class="input-group input-group-sm">
            <label class="input-group-text" for="City Corporation/Paurasabha">
              City Corporation/Paurasabha
            </label>
            <input type="text" class="form-control" id="corpPresent" />
          </div>
        </div>

        <div class="col-sm-6">
          <div class="input-group input-group-sm">
            <label class="input-group-text" for="Union">
              Union
            </label>
            <input type="text" class="form-control" id="unionPresent" />
          </div>
        </div>
        <div class="col-sm-6">
          <div class="input-group input-group-sm">
            <label class="input-group-text" for="Ward">
              Ward NO
            </label>
            <input type="text" class="form-control" id="wardPresent" />
          </div>
        </div>

        <div class="col-sm-6">
          <div class="input-group input-group-sm">
            <label class="input-group-text" for="Mouja">
              Mouja
            </label>
            <input type="text" class="form-control" id="moujaPresent" />
          </div>
        </div>
        <div class="col-sm-6">
          <div class="input-group input-group-sm">
            <label class="input-group-text" for="Village/mohalla/Road">
              Village/mohalla/Road Name & No.
            </label>
            <input type="text" class="form-control" id="roadPresent" />
          </div>
        </div>

        <div class="col-sm-4">
          <div class="input-group input-group-sm">
            <label class="input-group-text" for="HouseHoldingNo">
              House Holding No
            </label>
            <input type="text" class="form-control" id="hodingNoPresent" />
          </div>
        </div>
        <div class="col-sm-4">
          <div class="input-group input-group-sm">
            <label class="input-group-text" for="PostOffice">
              PostOffice
            </label>
            <input type="text" class="form-control" id="postOfficePresent" />
          </div>
        </div>
        <div class="col-sm-4">
          <div class="input-group input-group-sm">
            <label class="input-group-text" for="PostCode">
              PostCode
            </label>
            <input type="number" class="form-control" id="postCodePresent" />
          </div>
        </div>
      </div>

      <div class="row mb-1">
        <label for="Father" class="col-sm-8 col-form-label col-form-label-lg">
          Permanent Address:
        </label>
        <span className="text-muted">
          Permanent address of father/mother(from nid).If present address is
          same, don't fill up this section
        </span>
      </div>

      <div class="row mb-1">
        <div class="col-sm-6">
          <div class="input-group input-group-sm">
            <label class="input-group-text" for="Division">
              Division
            </label>
            <input type="text" class="form-control" id="divPermanent" />
          </div>
        </div>
        <div class="col-sm-6">
          <div class="input-group input-group-sm">
            <label class="input-group-text" for="District">
              District
            </label>
            <input type="text" class="form-control" id="distPermanent" />
          </div>
        </div>

        <div class="col-sm-6">
          <div class="input-group input-group-sm">
            <label class="input-group-text" for="Upozilla/Thana">
              Upozilla/Thana
            </label>
            <input type="text" class="form-control" id="upoPermanent" />
          </div>
        </div>
        <div class="col-sm-6">
          <div class="input-group input-group-sm">
            <label class="input-group-text" for="City Corporation/Paurasabha">
              City Corporation/Paurasabha
            </label>
            <input type="text" class="form-control" id="corpPermanent" />
          </div>
        </div>

        <div class="col-sm-6">
          <div class="input-group input-group-sm">
            <label class="input-group-text" for="Union">
              Union
            </label>
            <input type="text" class="form-control" id="unionPermanent" />
          </div>
        </div>
        <div class="col-sm-6">
          <div class="input-group input-group-sm">
            <label class="input-group-text" for="Ward">
              Ward No
            </label>
            <input type="text" class="form-control" id="wardPermanent" />
          </div>
        </div>

        <div class="col-sm-6">
          <div class="input-group input-group-sm">
            <label class="input-group-text" for="Mouja">
              Mouja
            </label>
            <input type="text" class="form-control" id="moujaPermanent" />
          </div>
        </div>
        <div class="col-sm-6">
          <div class="input-group input-group-sm">
            <label class="input-group-text" for="Village/mohalla/Road">
              Village/mohalla/Road Name & No.
            </label>
            <input type="text" class="form-control" id="roadPermanent" />
          </div>
        </div>

        <div class="col-sm-4">
          <div class="input-group input-group-sm">
            <label class="input-group-text" for="HouseHoldingNo">
              House Holding No
            </label>
            <input type="text" class="form-control" id="hodingNoPermanent" />
          </div>
        </div>
        <div class="col-sm-4">
          <div class="input-group input-group-sm">
            <label class="input-group-text" for="PostOffice">
              PostOffice
            </label>
            <input type="text" class="form-control" id="postOfficePermanent" />
          </div>
        </div>
        <div class="col-sm-4">
          <div class="input-group input-group-sm">
            <label class="input-group-text" for="PostCode">
              PostCode
            </label>
            <input type="number" class="form-control" id="postCodePermanent" />
          </div>
        </div>
      </div>

      <div class="row mb-1">
        <label for="Father" class="col-sm-8 col-form-label col-form-label-lg">
          Guardian's Information:
        </label>
        <span className="text-muted">
          If both parents are dead,fill up this section
        </span>
      </div>

      <div class="row mb-1">
        <label
          for="guardianName"
          class="col-sm-3 col-form-label col-form-label-sm"
        >
          Name:
        </label>
        <div class="col-sm-9">
          <input
            type="text"
            class="form-control form-control-sm"
            id="guardianName"
          />
        </div>
      </div>

      <div class="row mb-1">
        <label
          for="nidGuardian"
          class="col-sm-3 col-form-label col-form-label-sm"
        >
          NID :
        </label>
        <div class="col-sm-9">
          <input
            type="number"
            class="form-control form-control-sm"
            id="nidGuardian"
            min={1}
          />
        </div>
      </div>

      <div class="row mb-1">
        <label
          for="occupationGuardian"
          class="col-sm-3 col-form-label col-form-label-sm"
        >
          Occupation :
        </label>
        <div class="col-sm-9">
          <input
            type="text"
            class="form-control form-control-sm"
            id="occupationGuardian"
          />
        </div>
      </div>

      <div class="row mb-1">
        <label for="relation" class="col-sm-3 col-form-label col-form-label-sm">
          Relation :
        </label>
        <div class="col-sm-9">
          <ButtonGroup batch={relation} />
        </div>
      </div>

      <div class="row mb-1">
        <label
          for="mobileNoGuardian"
          class="col-sm-3 col-form-label col-form-label-sm"
        >
          Mobile No :
        </label>
        <div class="col-sm-9">
          <input
            type="number"
            class="form-control form-control-sm"
            id="mobileNoGuardian"
            pattern="[0-9]{11}"
            required
          />
        </div>
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
  );
};

export default FormPageTwo;
