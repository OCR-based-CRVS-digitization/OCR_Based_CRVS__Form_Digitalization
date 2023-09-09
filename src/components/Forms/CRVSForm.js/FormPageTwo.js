import React, { useState } from "react";

const FormPageTwo = (props) => {
  const [formData, setFormData] = useState(props.formData);
  const [error, setError] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const handleCheckboxChange = () => {
    setIsDisabled(!isDisabled);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  const handleTextChange = (event, fieldName) => {
    const updatedFormData = { ...formData };
    updatedFormData[fieldName].text = event.target.value;
    setFormData(updatedFormData);
  };

  const handleDateChange = (event, fieldName) => {
    const updatedFormData = { ...formData };
    const [year, month, day] = event.target.value.split("-");
    updatedFormData[fieldName + "_YEAR"].text = year;
    updatedFormData[fieldName + "_MONTH"].text = month;
    updatedFormData[fieldName + "_DAY"].text = day;
    console.log(updatedFormData);
    setFormData(updatedFormData);
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
            value={formData.FATHER_NAME.text}
            onChange={(event) => handleTextChange(event, "FATHER_NAME")}
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
            value={formData.FATHER_NAME_ENG.text}
            onChange={(event) => handleTextChange(event, "FATHER_NAME_ENG")}
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
            value={formData.FATHER_NID.text}
            onChange={(event) => handleTextChange(event, "FATHER_NID")}
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
            value={
              formData.FATHER_BIRTH_DATE_YEAR.text +
              "-" +
              formData.FATHER_BIRTH_DATE_MONTH.text +
              "-" +
              formData.FATHER_BIRTH_DATE_DAY.text
            }
            onChange={(event) => handleDateChange(event, "FATHER_BIRTH_DATE")}
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
            type="text"
            class="form-control form-control-sm"
            id="birthRegNoFather"
            value={formData.FATHER_BIRTH_CERTIFICATE.text}
            onChange={(event) =>
              handleTextChange(event, "FATHER_BIRTH_CERTIFICATE")
            }
            min={1}
            minLength={17}
            maxLength={17}
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
            type="text"
            class="form-control form-control-sm"
            id="mobileNoFather"
            pattern="[0-9]{11}"
            min={0}
            minLength={11}
            maxLength={11}
            value={formData.FATHER_MOBILE_NO.text}
            onChange={(event) => handleTextChange(event, "FATHER_MOBILE_NO")}
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
            value={formData.FATHER_OCCUPATION.text}
            onChange={(event) => handleTextChange(event, "FATHER_OCCUPATION")}
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
            min={0}
            value={formData.FATHER_DEATH_YEAR.text}
            onChange={(event) => handleTextChange(event, "FATHER_DEATH_YEAR")}
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
            <input
              type="text"
              class="form-control"
              id="divPresent"
              value={formData.CURRENT_ADDRESS_DIVISION.text}
              onChange={(event) =>
                handleTextChange(event, "CURRENT_ADDRESS_DIVISION")
              }
            />
          </div>
        </div>
        <div class="col-sm-6">
          <div class="input-group input-group-sm">
            <label class="input-group-text" for="District">
              District
            </label>
            <input type="text" class="form-control" id="distPresent" value={formData.CURRENT_ADDRESS_DISTRICT.text}
              onChange={(event) =>
                handleTextChange(event, "CURRENT_ADDRESS_DISTRICT")
              }
            />
          </div>
        </div>

        <div class="col-sm-6">
          <div class="input-group input-group-sm">
            <label class="input-group-text" for="Upozilla/Thana">
              Upozilla/Thana
            </label>
            <input type="text" class="form-control" id="upoPresent" value={formData.CURRENT_ADDRESS_UPAZILLA_THANA.text}
              onChange={(event) =>
                handleTextChange(event, "CURRENT_ADDRESS_UPAZILLA_THANA")
              }
            />
          </div>
        </div>
        <div class="col-sm-6">
          <div class="input-group input-group-sm">
            <label class="input-group-text" for="City Corporation/Paurasabha">
              City Corporation/Paurasabha
            </label>
            <input type="text" class="form-control" id="corpPresent" value={formData.CURRENT_ADDRESS_CITYCORPORATION_POURASHOVA.text}
              onChange={(event) =>
                handleTextChange(event, "CURRENT_ADDRESS_CITYCORPORATION_POURASHOVA")
              }
            />
          </div>
        </div>

        <div class="col-sm-6">
          <div class="input-group input-group-sm">
            <label class="input-group-text" for="Union">
              Union
            </label>
            <input type="text" class="form-control" id="unionPresent" value={formData.CURRENT_ADDRESS_UNION.text}
            onChange={(event) =>
              handleTextChange(event, "CURRENT_ADDRESS_UNION")
            }
            />
          </div>
        </div>
        <div class="col-sm-6">
          <div class="input-group input-group-sm">
            <label class="input-group-text" for="Ward">
              Ward No
            </label>
            <input type="text" class="form-control" id="wardPresent" value={formData.CURRENT_ADDRESS_WARDNUMBER.text}
            onChange={(event) =>
              handleTextChange(event, "CURRENT_ADDRESS_WARDNUMBER")
            }
            />
          </div>
        </div>

        <div class="col-sm-6">
          <div class="input-group input-group-sm">
            <label class="input-group-text" for="Mouja">
              Mouja
            </label>
            <input type="text" class="form-control" id="moujaPresent" value={formData.CURRENT_ADDRESS_MOUJA.text}
            onChange={(event) =>
              handleTextChange(event, "CURRENT_ADDRESS_MOUJA")
            }
            />
          </div>
        </div>
        <div class="col-sm-6">
          <div class="input-group input-group-sm">
            <label class="input-group-text" for="Village/mohalla/Road">
              Village/mohalla/Road Name & No.
            </label>
            <input type="text" class="form-control" id="roadPresent" value={formData.CURRENT_ADDRESS_VILLAGE_MOHOLLA.text} 
            onChange={(event) =>
              handleTextChange(event, "CURRENT_ADDRESS_VILLAGE_MOHOLLA")
            }
            />
          </div>
        </div>

        <div class="col-sm-4">
          <div class="input-group input-group-sm">
            <label class="input-group-text" for="HouseHoldingNo">
              House Holding No
            </label>
            <input type="text" class="form-control" id="hodingNoPresent" value={formData.CURRENT_ADDRESS_HOLDING_NUMBER.text}
            onChange={(event) =>
              handleTextChange(event, "CURRENT_ADDRESS_HOLDING_NUMBER")
            }
            />
          </div>
        </div>
        <div class="col-sm-4">
          <div class="input-group input-group-sm">
            <label class="input-group-text" for="PostOffice">
              PostOffice
            </label>
            <input type="text" class="form-control" id="postOfficePresent" value={formData.CURRENT_ADDRESS_POST_OFFICE.text}
            onChange={(event) =>
              handleTextChange(event, "CURRENT_ADDRESS_POST_OFFICE")
            }
            />
          </div>
        </div>
        <div class="col-sm-4">
          <div class="input-group input-group-sm">
            <label class="input-group-text" for="PostCode">
              PostCode
            </label>
            <input type="number" class="form-control" id="postCodePresent" value={formData.CURRENT_ADDRESS_POST_CODE.text}
            onChange={(event) =>
              handleTextChange(event, "CURRENT_ADDRESS_POST_CODE")
            }
            />
          </div>
        </div>
      </div>

      <div class="row mb-1">
        <label for="Father" class="col-sm-8 col-form-label col-form-label-lg">
          Permanent Address:
        </label>
        <span className="text-muted">
          Permanent address of father/mother(from nid).If present address is
          same, please check the box
        </span>
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            checked={isDisabled}
            onChange={handleCheckboxChange}
            id="flexCheckDefault"
          />
          <label class="form-check-label" for="flexCheckDefault">
            Select
          </label>
        </div>
      </div>

      <div class="row mb-1">
        <div class="col-sm-6">
          <div class="input-group input-group-sm">
            <label class="input-group-text" for="Division">
              Division
            </label>
            <input
              type="text"
              class="form-control"
              id="divPermanent"
              disabled={isDisabled}
            ></input>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="input-group input-group-sm">
            <label class="input-group-text" for="District">
              District
            </label>
            <input
              type="text"
              class="form-control"
              id="distPermanent"
              disabled={isDisabled}
            />
          </div>
        </div>

        <div class="col-sm-6">
          <div class="input-group input-group-sm">
            <label class="input-group-text" for="Upozilla/Thana">
              Upozilla/Thana
            </label>
            <input
              type="text"
              class="form-control"
              id="upoPermanent"
              disabled={isDisabled}
            />
          </div>
        </div>
        <div class="col-sm-6">
          <div class="input-group input-group-sm">
            <label class="input-group-text" for="City Corporation/Paurasabha">
              City Corporation/Paurasabha
            </label>
            <input
              type="text"
              class="form-control"
              id="corpPermanent"
              disabled={isDisabled}
            />
          </div>
        </div>

        <div class="col-sm-6">
          <div class="input-group input-group-sm">
            <label class="input-group-text" for="Union">
              Union
            </label>
            <input
              type="text"
              class="form-control"
              id="unionPermanent"
              disabled={isDisabled}
            />
          </div>
        </div>
        <div class="col-sm-6">
          <div class="input-group input-group-sm">
            <label class="input-group-text" for="Ward">
              Ward No
            </label>
            <input
              type="text"
              class="form-control"
              id="wardPermanent"
              disabled={isDisabled}
            />
          </div>
        </div>

        <div class="col-sm-6">
          <div class="input-group input-group-sm">
            <label class="input-group-text" for="Mouja">
              Mouja
            </label>
            <input
              type="text"
              class="form-control"
              id="moujaPermanent"
              disabled={isDisabled}
            />
          </div>
        </div>
        <div class="col-sm-6">
          <div class="input-group input-group-sm">
            <label class="input-group-text" for="Village/mohalla/Road">
              Village/mohalla/Road Name & No.
            </label>
            <input
              type="text"
              class="form-control"
              id="roadPermanent"
              disabled={isDisabled}
            />
          </div>
        </div>

        <div class="col-sm-4">
          <div class="input-group input-group-sm">
            <label class="input-group-text" for="HouseHoldingNo">
              House Holding No
            </label>
            <input
              type="text"
              class="form-control"
              id="hodingNoPermanent"
              disabled={isDisabled}
            />
          </div>
        </div>
        <div class="col-sm-4">
          <div class="input-group input-group-sm">
            <label class="input-group-text" for="PostOffice">
              PostOffice
            </label>
            <input
              type="text"
              class="form-control"
              id="postOfficePermanent"
              disabled={isDisabled}
            />
          </div>
        </div>
        <div class="col-sm-4">
          <div class="input-group input-group-sm">
            <label class="input-group-text" for="PostCode">
              PostCode
            </label>
            <input
              type="number"
              class="form-control"
              id="postCodePermanent"
              disabled={isDisabled}
            />
          </div>
        </div>
      </div>

      {/* <div class="row mb-1">
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

      {/* <div class="row mb-1">
        <label for="relation" class="col-sm-3 col-form-label col-form-label-sm">
          Relation :
        </label>
        <div class="col-sm-9">
          <ButtonGroup batch={relation} />
        </div>
      </div> */}

      {/* <div class="row mb-1">
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
      </div> */}

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
