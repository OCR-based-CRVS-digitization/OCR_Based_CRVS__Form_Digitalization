import React, { useEffect } from "react";
import ButtonGroup from "./buttonGroup";
import { useState, useContext } from "react";
import "./FormPageOne.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const FormPageOne = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  // console.log(params.form_id);
  const [formData, setFormData] = useState(props.formData);
  console.log(formData);
  const gender = ["Male", "Female", "Other"];
  const nationality = ["Bangladeshi"];
  const religion = [
    "Islam",
    "Hinduism",
    "Christianity",
    "Buddhism",
    "Not a believer",
    "Refuse to disclose",
    "Other",
  ];
  const shreny = ["6", "7", "8", "9", "10", "11", "12"];
  const marritalStatus = [
    "Unmarried",
    "Married",
    "Widowed",
    "Widowered",
    "Separated",
    "Divorced",
    "Other",
  ];
  const disabled = [
    "Mute",
    "Blind",
    "Deaf",
    "Handicapped",
    "Mentally Retarded",
    "No disability",
  ];
  const bloodGroup = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const minority = ["Yes", "No"];
  const minorityYes = [
    "Santal",
    "Chakma",
    "Garo",
    "Hajong",
    "Chak",
    "Kuki",
    "Kheya",
    "Bom",
    "Marma",
    "Tripura",
    "Khasi",
    "Manipuri",
    "Other",
  ];

  const [selectedValue, setSelectedValue] = useState([]);
  const [error, setError] = useState("");

  // useEffect(() => {
  //   const newError = { ...error};
  //   for (const [key, value] of Object.entries(formData)){
  //     newError[key]=value.errors;
  //   }
  //   setError(newError)

  // },[]
  // );

  console.log(error);

  const handleDropDownChange = (selected, fieldName) => {
    setSelectedValue(selected);
    const updatedFormData = { ...formData };
    updatedFormData[fieldName].text = selected;
    setFormData(updatedFormData);
    console.log(selectedValue);

    if (selected.length === 1 || fieldName === "MINORITY") {
      const updatedError = { ...error };
      updatedError[fieldName] = "";
      setError(updatedError);
    } else {
      const updatedError = { ...error };
      updatedError[fieldName] = "Must select one option";
      setError(updatedError);
    }
  };

  const handleSuggestionChange = (event, fieldName) => {
    console.log("suggestion change called");
    const updatedFormData = { ...formData };
    console.log(event.target.value);
    updatedFormData[fieldName].text = [event.target.value];
    setFormData(updatedFormData);
  };

  const handleTextChange = (event, fieldName) => {
    const updatedFormData = { ...formData };
    updatedFormData[fieldName].text = event.target.value;
    setFormData(updatedFormData);

    if (
      fieldName === "BIRTH_CERTIFICATE_NUMBER" ||
      fieldName === "MOTHER_BIRTH_CERTIFICATE"
    ) {
      if (event.target.value != parseInt(event.target.value, 10)) {
        const updatedError = { ...error };
        updatedError[fieldName] = "Birth certificate number must be a number.";
        setError(updatedError);
      } else if (event.target.value.length === 17) {
        updatedFormData[fieldName].correction_needed = false;
        const updatedError = { ...error };
        updatedError[fieldName] = "";
        setError(updatedError);
      } else {
        const updatedError = { ...error };
        updatedError[fieldName] =
          "Birth certificate number must be 17 digits long.";
        setError(updatedError);
      }
    }

    if (fieldName === "MOTHER_NID") {
      if (event.target.value != parseInt(event.target.value, 10)) {
        const updatedError = { ...error };
        updatedError[fieldName] = "NID must be a number.";
        setError(updatedError);
      } else if (event.target.value.length === 17) {
        updatedFormData[fieldName].correction_needed = false;
        const updatedError = { ...error };
        updatedError[fieldName] = "";
        setError(updatedError);
      } else {
        const updatedError = { ...error };
        updatedError[fieldName] =
          "NID must be 17 digits long. If 13 digits NID, add 4 zeros at the beginning.";
        setError(updatedError);
      }
    }

    if (fieldName === "MOTHER_MOBILE_NO") {
      if (event.target.value != parseInt(event.target.value, 10)) {
        const updatedError = { ...error };
        updatedError[fieldName] = "Mobile no must be a number.";
        setError(updatedError);
      } else if (event.target.value.length === 11) {
        updatedFormData[fieldName].correction_needed = false;
        const updatedError = { ...error };
        updatedError[fieldName] = "";
        setError(updatedError);
      } else {
        const updatedError = { ...error };
        updatedError[fieldName] = "Mobile no must be 11 digits long.";
        setError(updatedError);
      }
    }
  };

  const handleDateChange = (event, fieldName) => {
    const updatedFormData = { ...formData };
    const [year, month, day] = event.target.value.split("-");
    updatedFormData[fieldName + "_YEAR"].text = year;
    updatedFormData[fieldName + "_MONTH"].text = month;
    updatedFormData[fieldName + "_DAY"].text = day;
    setFormData(updatedFormData);

    const parsedYear = parseInt(year, 10);
    const parsedMonth = parseInt(month, 10);
    const parsedDay = parseInt(day, 10);

    const updatedError = { ...error };

    if (isNaN(parsedYear) || parsedYear < 1900 || parsedYear > 2024) {
      updatedError[fieldName + "_YEAR"] = "Invalid year";
    } else {
      updatedError[fieldName + "_YEAR"] = "";
    }

    if (isNaN(parsedMonth) || parsedMonth < 1 || parsedMonth > 12) {
      updatedError[fieldName + "_MONTH"] = "Invalid month";
    } else {
      updatedError[fieldName + "_MONTH"] = "";
    }

    if (isNaN(parsedDay) || parsedDay < 1 || parsedDay > 31) {
      updatedError[fieldName + "_DAY"] = "Invalid day";
    } else {
      updatedError[fieldName + "_DAY"] = "";
    }

    setError(updatedError);
  };

  const handleNavigate = () => {
    navigate(
      `/home/workspace/${params.workspace_id}/validate/${params.form_id}/2`
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    for (const [key, value] of Object.entries(error)) {
      if (value !== "") {
        alert(`${key} : ${value}`);
        return;
      }
    }

    let message = "";
    const url = localStorage.getItem("baseurl") + "/workspace/updateFormPageOne";
    // console.log(formData);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "content-type": "application/json",
        },
        body: JSON.stringify({
          form_id: params.form_id,
          ocr_result: formData,
        }),
      });
      if (response.ok) {
        console.log("Form data submitted successfully.");
        message = "Form data submitted successfully.";
      } else if (response.status === 401  && ( response.statusText==='Token has expired!' || response.statusText==='Invalid token!' )) {
        console.error("Unauthorized access.");
        message = "Unauthorized access.";
        localStorage.removeItem("token");
        localStorage.setItem("isLoggedIn", "0");
        alert("Session expired. Please login again.");
        window.location.href("/");
      } else {
        console.error("Failed to submit form data.");
        message = "Failed to submit form data.";
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
      message = "Error submitting form data.";
    }
    alert(message);
    handleNavigate();
  };

  return (
    <div>
      <form
        className="row g-3 needs-validation"
        novalidate
        onSubmit={handleSubmit}
      >
        <div className="row mb-1">
          <label
            htmlFor="studentName"
            className="col-sm-3 col-form-label col-form-label-sm"
          >
            Student Name:
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              className={`form-control form-control-sm ${
                formData.STUDENT_NAME.correction_needed
                  ? "border-danger"
                  : "border-success"
              }`}
              id="studentName"
              value={formData.STUDENT_NAME.text}
              onChange={(event) => handleTextChange(event, "STUDENT_NAME")}
              required
            />
          </div>
        </div>

        <div className="row mb-1">
          <label
            htmlFor="studentNameEnglish"
            className="col-sm-3 col-form-label col-form-label-sm"
          >
            Student Name (Eng) :
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              className={`form-control form-control-sm ${
                formData.STUDENT_NAME_ENGLISH.correction_needed
                  ? "border-danger"
                  : "border-success"
              }`}
              id="studentName"
              value={formData.STUDENT_NAME_ENGLISH.text}
              onChange={(event) =>
                handleTextChange(event, "STUDENT_NAME_ENGLISH")
              }
              required
            />
          </div>
        </div>

        <div className="row mb-1">
          <label
            htmlFor="birthRegNo"
            className="col-sm-3 col-form-label col-form-label-sm"
          >
            Birth Registration No :
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              className={`form-control form-control-sm ${
                formData.BIRTH_CERTIFICATE_NUMBER.correction_needed
                  ? "border-danger"
                  : "border-success"
              }`}
              id="birthRegNo"
              min={0}
              minLength={17}
              maxLength={17}
              value={formData.BIRTH_CERTIFICATE_NUMBER.text}
              onChange={(event) =>
                handleTextChange(event, "BIRTH_CERTIFICATE_NUMBER")
              }
              required
            />
            {error.BIRTH_CERTIFICATE_NUMBER && (
              <div style={{ color: "red" }}>
                {error.BIRTH_CERTIFICATE_NUMBER}
              </div>
            )}
          </div>
        </div>

        <div className="row mb-1">
          <label
            htmlFor="birthDate"
            className="col-sm-3 col-form-label col-form-label-sm"
          >
            Birth Date :
          </label>
          <div className="col-sm-9">
            <input
              type="date"
              className="form-control form-control-sm"
              id="birthDate"
              value={
                formData.BIRTH_DATE_YEAR.text +
                "-" +
                formData.BIRTH_DATE_MONTH.text +
                "-" +
                formData.BIRTH_DATE_DAY.text
              }
              onChange={(event) => handleDateChange(event, "BIRTH_DATE")}
              required
            />
          </div>
        </div>

        <div className="input-group input-group-sm mb-1">
          {/* <div class="row mb-1"> */}
          <label
            htmlFor="birthPlace"
            className="col-sm-3 col-form-label col-form-label-sm"
          >
            Birth Place :
          </label>
          {/* <div class="col-sm-9"> */}
          <input
            type="text"
            className={`form-control form-control-sm ${
              formData.BIRTH_DISTRICT.correction_needed
                ? "border-danger"
                : "border-success"
            }`}
            id="birthPlace"
            value={formData.BIRTH_DISTRICT.text}
            onChange={(event) => handleTextChange(event, "BIRTH_DISTRICT")}
            required
          />
          {/* </div> */}
          {/* <div class="col-sm-4"> */}
          {formData.BIRTH_DISTRICT.correction_needed && (
            <select
              className="form-select border-danger"
              id="birthPlace"
              aria-label="birthplace_correction"
              value={formData.BIRTH_DISTRICT.suggestions}
              onChange={(event) =>
                handleSuggestionChange(event, "BIRTH_DISTRICT")
              }
            >
              <option value="" hidden>Suggested: {formData.BIRTH_DISTRICT.suggestions[0]}</option>
              {formData.BIRTH_DISTRICT.suggestions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
          {/* </div> */}
          {/* </div> */}
        </div>

        <div className="row mb-1">
          <label
            htmlFor="gender"
            className="col-sm-3 col-form-label col-form-label-sm"
          >
            Gender :
          </label>
          <div className="col-sm-9">
            <ButtonGroup
              batch={gender}
              initial={formData.GENDER.text}
              onButtonSelect={(selectedValue) =>
                handleDropDownChange(selectedValue, "GENDER")
              }
            />
          </div>
          {error.GENDER && <div style={{ color: "red" }}>{error.GENDER}</div>}
        </div>

        <div className="row mb-1">
          <label
            htmlFor="nationality"
            className="col-sm-3 col-form-label col-form-label-sm"
          >
            Nationality :
          </label>
          <div className="col-sm-3">
            <ButtonGroup
              batch={nationality}
              initial={formData.NATIONALITY_BD.text}
              onButtonSelect={(selectedValue) =>
                handleDropDownChange(selectedValue, "NATIONALITY_BD")
              }
            />
          </div>
          <div className="col-sm-6">
            <div className="input-group input-group-sm">
              <div className="input-group-text">Others</div>
              <input
                type="text"
                className="form-control"
                id="nationality"
                value={formData.NATIONALITY_OTHER.text}
                onChange={(event) =>
                  handleTextChange(event, "NATIONALITY_OTHER")
                }
              />
            </div>
          </div>
        </div>

        <div className="row mb-1">
          <label
            htmlFor="religion"
            className="col-sm-3 col-form-label col-form-label-sm"
          >
            Religion :
          </label>
          <div className="col-sm-9">
            <ButtonGroup
              batch={religion}
              initial={formData.RELIGION.text}
              onButtonSelect={(selectedValue) =>
                handleDropDownChange(selectedValue, "RELIGION")
              }
            />
          </div>
          {error.RELIGION && (
            <div style={{ color: "red" }}>{error.RELIGION}</div>
          )}
        </div>

        <div className="row mb-1">
          <label
            htmlFor="class"
            className="col-sm-3 col-form-label col-form-label-sm"
          >
            Class :
          </label>
          <div className="col-sm-9">
            <ButtonGroup
              batch={shreny}
              initial={formData.CLASS.text}
              onButtonSelect={(selectedValue) =>
                handleDropDownChange(selectedValue, "CLASS")
              }
            />
          </div>
          {error.CLASS && <div style={{ color: "red" }}>{error.CLASS}</div>}
        </div>

        <div className="row mb-1">
          <label
            htmlFor="Roll"
            className="col-sm-3 col-form-label col-form-label-sm"
          >
            Class Roll :
          </label>
          <div className="col-sm-9">
            <input
              type="number"
              className={`form-control form-control-sm ${
                formData.ROLL.correction_needed
                  ? "border-danger"
                  : "border-success"
              }`}
              id="roll"
              value={formData.ROLL.text}
              onChange={(event) => handleTextChange(event, "ROLL")}
              min={1}
              required
            />
          </div>
        </div>

        <div className="row mb-1">
          <label
            htmlFor="marritalStatus"
            className="col-sm-3 col-form-label col-form-label-sm"
          >
            Marrital Status :
          </label>
          <div className="col-sm-9">
            <ButtonGroup
              batch={marritalStatus}
              initial={formData.MARITAL_STATUS.text}
              onButtonSelect={(selectedValue) =>
                handleDropDownChange(selectedValue, "MARITAL_STATUS")
              }
            />
          </div>
          {error.MARITAL_STATUS && (
            <div style={{ color: "red" }}>{error.MARITAL_STATUS}</div>
          )}
        </div>

        <div className="row mb-1">
          <label
            htmlFor="disability"
            className="col-sm-3 col-form-label col-form-label-sm"
          >
            Disability :
          </label>
          <div className="col-sm-9">
            <ButtonGroup
              batch={disabled}
              initial={formData.DISABILITY.text}
              onButtonSelect={(selectedValue) =>
                handleDropDownChange(selectedValue, "DISABILITY")
              }
            />
          </div>
          {error.DISABILITY && (
            <div style={{ color: "red" }}>{error.DISABILITY}</div>
          )}
        </div>

        <div className="row mb-1">
          <label
            htmlFor="bloodGroup"
            className="col-sm-3 col-form-label col-form-label-sm"
          >
            Blood Group :
          </label>
          <div className="col-sm-9">
            <ButtonGroup
              batch={bloodGroup}
              initial={formData.BLOOD_GROUP.text}
              onButtonSelect={(selectedValue) =>
                handleDropDownChange(selectedValue, "BLOOD_GROUP")
              }
            />
          </div>
          {error.BLOOD_GROUP && (
            <div style={{ color: "red" }}>{error.BLOOD_GROUP}</div>
          )}
        </div>

        <div className="row mb-1">
          <label
            htmlFor="minority"
            className="col-sm-3 col-form-label col-form-label-sm"
          >
            Minority or not? :
          </label>
          <div className="col-sm-9">
            <ButtonGroup
              batch={minority}
              initial={formData.IF_MINORITY.text}
              onButtonSelect={(selectedValue) =>
                handleDropDownChange(selectedValue, "IF_MINORITY")
              }
            />
          </div>
          {error.IF_MINORITY && (
            <div style={{ color: "red" }}>{error.IF_MINORITY}</div>
          )}
        </div>

        <div className="row mb-1">
          <label
            htmlFor="minorityYes"
            className="col-sm-3 col-form-label col-form-label-sm"
          >
            If yes :
          </label>
          <div className="col-sm-9">
            <ButtonGroup
              batch={minorityYes}
              initial={formData.MINORITY.text}
              onButtonSelect={(selectedValue) =>
                handleDropDownChange(selectedValue, "MINORITY")
              }
            />
          </div>
          {error.MINORITY && (
            <div style={{ color: "red" }}>{error.MINORITY}</div>
          )}
        </div>

        <div className="row mb-1">
          <label
            htmlFor="Mother"
            className="col-sm-8 col-form-label col-form-label-lg"
          >
            Mother's Information:
          </label>
        </div>

        <div className="row mb-1">
          <label
            htmlFor="motherName"
            className="col-sm-3 col-form-label col-form-label-sm"
          >
            Mother's Name:
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              className={`form-control form-control-sm ${
                formData.MOTHERS_NAME.correction_needed
                  ? "border-danger"
                  : "border-success"
              }`}
              id="motherName"
              value={formData.MOTHERS_NAME.text}
              onChange={(event) => handleTextChange(event, "MOTHERS_NAME")}
              required
            />
          </div>
        </div>

        <div className="row mb-1">
          <label
            htmlFor="motherNameEnglish"
            className="col-sm-3 col-form-label col-form-label-sm"
          >
            Mother's Name (Eng) :
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              className={`form-control form-control-sm ${
                formData.MOTHERS_NAME_ENG.correction_needed
                  ? "border-danger"
                  : "border-success"
              }`}
              id="motherNameEnglish"
              value={formData.MOTHERS_NAME_ENG.text}
              onChange={(event) => handleTextChange(event, "MOTHERS_NAME_ENG")}
              required
            />
          </div>
        </div>

        <div className="row mb-1">
          <label
            htmlFor="nidMother"
            className="col-sm-3 col-form-label col-form-label-sm"
          >
            NID :
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              className={`form-control form-control-sm ${
                formData.MOTHER_NID.correction_needed
                  ? "border-danger"
                  : "border-success"
              }`}
              id="nidMother"
              value={formData.MOTHER_NID.text}
              onChange={(event) => handleTextChange(event, "MOTHER_NID")}
              min={0}
              minLength={17}
              maxLength={17}
              required
            />
            {error.MOTHER_NID && (
              <div style={{ color: "red" }}>{error.MOTHER_NID}</div>
            )}
          </div>
        </div>

        <div className="row mb-1">
          <label
            htmlFor="birthDateMother"
            className="col-sm-3 col-form-label col-form-label-sm"
          >
            Birth Date :
          </label>
          <div className="col-sm-9">
            <input
              type="date"
              className="form-control form-control-sm"
              id="birthDateMother"
              value={
                formData.MOTHER_BIRTH_DATE_YEAR.text +
                "-" +
                formData.MOTHER_BIRTH_DATE_MONTH.text +
                "-" +
                formData.MOTHER_BIRTH_DATE_DAY.text
              }
              onChange={(event) => handleDateChange(event, "MOTHER_BIRTH_DATE")}
              required
            />
          </div>
        </div>

        <div className="row mb-1">
          <label
            htmlFor="birthRegNoMother"
            className="col-sm-3 col-form-label col-form-label-sm"
          >
            Birth Registration No :
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              className={`form-control form-control-sm ${
                formData.MOTHER_BIRTH_CERTIFICATE.correction_needed
                  ? "border-danger"
                  : "border-success"
              }`}
              id="birthRegNoMother"
              min={0}
              minLength={17}
              maxLength={17}
              value={formData.MOTHER_BIRTH_CERTIFICATE.text}
              onChange={(event) =>
                handleTextChange(event, "MOTHER_BIRTH_CERTIFICATE")
              }
              required
            />
            {error.MOTHER_BIRTH_CERTIFICATE && (
              <div style={{ color: "red" }}>
                {error.MOTHER_BIRTH_CERTIFICATE}
              </div>
            )}
          </div>
        </div>

        <div className="row mb-1">
          <label
            htmlFor="mobileNoMother"
            className="col-sm-3 col-form-label col-form-label-sm"
          >
            Mobile No :
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              className={`form-control form-control-sm ${
                formData.MOTHER_MOBILE_NO.correction_needed
                  ? "border-danger"
                  : "border-success"
              }`}
              id="mobileNoMother"
              min={0}
              minLength={11}
              maxLength={11}
              value={formData.MOTHER_MOBILE_NO.text}
              onChange={(event) => handleTextChange(event, "MOTHER_MOBILE_NO")}
              required
            />
            {error.MOTHER_MOBILE_NO && (
              <div style={{ color: "red" }}>{error.MOTHER_MOBILE_NO}</div>
            )}
          </div>
        </div>

        <div className="row mb-1">
          <label
            htmlFor="occupationMother"
            className="col-sm-3 col-form-label col-form-label-sm"
          >
            Occupation :
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              className={`form-control form-control-sm ${
                formData.MOTHER_OCCUPATION.correction_needed
                  ? "border-danger"
                  : "border-success"
              }`}
              id="occupationMother"
              value={formData.MOTHER_OCCUPATION.text}
              onChange={(event) => handleTextChange(event, "MOTHER_OCCUPATION")}
              required
            />
          </div>
        </div>

        <div className="row mb-1">
          <label
            htmlFor="deathYearMother"
            className="col-sm-3 col-form-label col-form-label-sm"
          >
            If dead, death year :
          </label>
          <div className="col-sm-9">
            <input
              type="number"
              className="form-control form-control-sm"
              id="deathYearMother"
              onChange={(event) => handleTextChange(event, "MOTHER_DEATH_YEAR")}
            />
          </div>
        </div>

        <div className="col-6">
          <button className="btn btn-primary" type="submit">
            Next Page
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormPageOne;
