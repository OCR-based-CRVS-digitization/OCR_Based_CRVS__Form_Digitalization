import React, { useState } from "react";
import "./FormPageOne.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

const FormPageTwo = (props) => {
  const [formData, setFormData] = useState(props.formData);
  const [error, setError] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate= useNavigate();
  const params = useParams();

  const handleCheckboxChange = () => {
    setIsDisabled(!isDisabled);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    for (const [key, value] of Object.entries(error)) {
      if (value !== "") {
        alert(`${key} : ${value}`);
        return;
      }
    }

    console.log("Form submitted");
    const url = localStorage.getItem("baseurl") + "/workspace/updateForm";
    try{
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "content-type": "application/json",
        },
        body: JSON.stringify({
          form_id: props.form_id,
          form_info: formData,
        }),
      });
      if(response.status === 401 && ( response.statusText==='Token has expired!' || response.statusText==='Invalid token!' )){
        localStorage.removeItem('token');
        localStorage.setItem('isLoggedIn', '0');
        alert("Session Expired, Please Login Again");
        window.location.href = "/";
      }
      if(response.status === 200){
        alert("Form Updated Successfully");
        navigate(`/home/workspace/${params.workspace_id}`);
      }
      else{
        alert("Something went wrong, Please try again later");
      }
    }
    catch(error){
      // console.error("Error updating form data:", error);
      alert("Something went wrong, Please try again later");
    }

  };

  const handleTextChange = (event, fieldName) => {
    const updatedFormData = { ...formData };
    updatedFormData[fieldName].text = event.target.value;
    updatedFormData[fieldName].correction_needed = false;
    setFormData(updatedFormData);

    if (
      fieldName === "FATHER_BIRTH_CERTIFICATE"
    ) {
      if (event.target.value != parseInt(event.target.value, 10)) {
        updatedFormData[fieldName].correction_needed = true;
        const updatedError = { ...error };
        updatedError[fieldName] = "Birth certificate number must be a number.";
        setError(updatedError);
      } else if (event.target.value.length === 17) {
        updatedFormData[fieldName].correction_needed = false;
        const updatedError = { ...error };
        updatedError[fieldName] = "";
        setError(updatedError);
      } else {
        updatedFormData[fieldName].correction_needed = true;
        const updatedError = { ...error };
        updatedError[fieldName] =
          "Birth certificate number must be 17 digits long.";
        setError(updatedError);
      }
    }

    if(fieldName === "FATHER_NID"){
      if (event.target.value != parseInt(event.target.value, 10)) {
        updatedFormData[fieldName].correction_needed = true;
        const updatedError = { ...error };
        updatedError[fieldName] = "NID must be a number.";
        setError(updatedError);
      } else if (event.target.value.length === 17) {
        updatedFormData[fieldName].correction_needed = false;
        const updatedError = { ...error };
        updatedError[fieldName] = "";
        setError(updatedError);
      } else {
        updatedFormData[fieldName].correction_needed = true;
        const updatedError = { ...error };
        updatedError[fieldName] =
          "NID must be 17 digits long.";
        setError(updatedError);
      }
    }
    
    if (fieldName === "FATHER_MOBILE_NO") {
      if (event.target.value != parseInt(event.target.value, 10)) {
        updatedFormData[fieldName].correction_needed = true;
        const updatedError = { ...error };
        updatedError[fieldName] = "Mobile no must be a number.";
        setError(updatedError);
      } else if (event.target.value.length === 11) {
        updatedFormData[fieldName].correction_needed = false;
        const updatedError = { ...error };
        updatedError[fieldName] = "";
        setError(updatedError);
      } else {
        updatedFormData[fieldName].correction_needed = true;
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
    console.log(updatedFormData);
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

  const handleSuggestionChange = (event, fieldName) => {
    console.log("suggestion change called");
    const updatedFormData = { ...formData };
    console.log(event.target.value);
    updatedFormData[fieldName].text = [event.target.value];
    updatedFormData[fieldName].correction_needed = false;
    setFormData(updatedFormData);
  };

  console.log(formData);

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
            className={`form-control form-control-sm ${
              formData.FATHER_NAME.correction_needed
                ? "border-danger"
                : "border-success"
            }`}
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
            id="fatherNameEnglish"
            className={`form-control form-control-sm ${
              formData.FATHER_NAME_ENG.correction_needed
                ? "border-danger"
                : "border-success"
            }`}
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
            id="nidFather"
            className={`form-control form-control-sm ${
              formData.FATHER_NID.correction_needed
                ? "border-danger"
                : "border-success"
            }`}
            min={1}
            value={formData.FATHER_NID.text}
            onChange={(event) => handleTextChange(event, "FATHER_NID")}
            required
          />
          {error.FATHER_NID && (
              <div style={{ color: "red" }}>{error.FATHER_NID}</div>
            )}
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
            id="birthDateFather"
            className={`form-control form-control-sm ${
              formData.FATHER_BIRTH_DATE_YEAR.correction_needed
                ? "border-danger"
                : "border-success"
            }`}
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
            id="birthRegNoFather"
            className={`form-control form-control-sm ${
              formData.FATHER_BIRTH_CERTIFICATE.correction_needed
                ? "border-danger"
                : "border-success"
            }`}
            value={formData.FATHER_BIRTH_CERTIFICATE.text}
            onChange={(event) =>
              handleTextChange(event, "FATHER_BIRTH_CERTIFICATE")
            }
            min={1}
            minLength={17}
            maxLength={17}
            required
          />
          {error.FATHER_BIRTH_CERTIFICATE && (
              <div style={{ color: "red" }}>{error.FATHER_BIRTH_CERTIFICATE}</div>
            )}
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
            className={`form-control form-control-sm ${
              formData.FATHER_MOBILE_NO.correction_needed
                ? "border-danger"
                : "border-success"
            }`}
            id="mobileNoFather"
            pattern="[0-9]{11}"
            min={0}
            minLength={11}
            maxLength={11}
            value={formData.FATHER_MOBILE_NO.text}
            onChange={(event) => handleTextChange(event, "FATHER_MOBILE_NO")}
            required
          />
          {error.FATHER_MOBILE_NO && (
              <div style={{ color: "red" }}>{error.FATHER_MOBILE_NO}</div>
            )}
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
            className={`form-control form-control-sm ${
              formData.FATHER_OCCUPATION.correction_needed
                ? "border-danger"
                : "border-success"
            }`}
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
            className={`form-control form-control-sm ${
              formData.FATHER_DEATH_YEAR.correction_needed
                ? "border-danger"
                : "border-success"
            }`}
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
        <div class="col-sm-12">
          <div class="input-group input-group-sm">
            <label class="input-group-text" for="Division" style={{ width: '230px' }}>
              Division:
            </label>
            <input
              type="text"
              className={`form-control form-control-sm ${
                formData.CURRENT_ADDRESS_DIVISION.correction_needed
                  ? "border-danger"
                  : "border-success"
              }`}
              id="divPresent"
              value={formData.CURRENT_ADDRESS_DIVISION.text}
              onChange={(event) =>
                handleTextChange(event, "CURRENT_ADDRESS_DIVISION")
              }
              required
            />
            {formData.CURRENT_ADDRESS_DIVISION.suggestions.length> 0 && (
            <select
            className={`form-control form-control-sm ${
              formData.CURRENT_ADDRESS_DIVISION.correction_needed
                ? "border-danger"
                : "border-success"
            }`}
              id="divPresent"
              aria-label="divPresent_correction"
              value={formData.CURRENT_ADDRESS_DIVISION.text}
              onChange={(event) =>
                handleSuggestionChange(event, "CURRENT_ADDRESS_DIVISION")
              }
            >
              <option value="" hidden>Suggested: {formData.CURRENT_ADDRESS_DIVISION.suggestions[0]}</option>
              {formData.CURRENT_ADDRESS_DIVISION.suggestions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}

          </div>
        </div>
        <div class="col-sm-12">
          <div class="input-group input-group-sm">
            <label class="input-group-text" for="District" style={{ width: '230px' }}>
              District:
            </label>
            <input
              type="text"
              className={`form-control form-control-sm ${
                formData.CURRENT_ADDRESS_DISTRICT.correction_needed
                  ? "border-danger"
                  : "border-success"
              }`}
              id="distPresent"
              value={formData.CURRENT_ADDRESS_DISTRICT.text}
              onChange={(event) =>
                handleTextChange(event, "CURRENT_ADDRESS_DISTRICT")
              }
              required
            />
            {formData.CURRENT_ADDRESS_DISTRICT.suggestions.length> 0 &&  (
            <select
            className={`form-control form-control-sm ${
              formData.CURRENT_ADDRESS_DISTRICT.correction_needed
                ? "border-danger"
                : "border-success"
            }`}
              id="distPresent"
              aria-label="distPresent_correction"
              value={formData.CURRENT_ADDRESS_DISTRICT.text}
              onChange={(event) =>
                handleSuggestionChange(event, "CURRENT_ADDRESS_DISTRICT")
              }
            >
              <option value="" hidden>Suggested: {formData.CURRENT_ADDRESS_DISTRICT.suggestions[0]}</option>
              {formData.CURRENT_ADDRESS_DISTRICT.suggestions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
          </div>
        </div>

        <div class="col-sm-12">
          <div class="input-group input-group-sm">
            <label class="input-group-text" for="Upozilla/Thana" style={{ width: '230px' }}>
              Upozilla/Thana:
            </label>
            <input
              type="text"
              className={`form-control form-control-sm ${
                formData.CURRENT_ADDRESS_UPAZILLA_THANA.correction_needed
                  ? "border-danger"
                  : "border-success"
              }`}
              id="upoPresent"
              value={formData.CURRENT_ADDRESS_UPAZILLA_THANA.text}
              onChange={(event) =>
                handleTextChange(event, "CURRENT_ADDRESS_UPAZILLA_THANA")
              }
              required
            />
            {formData.CURRENT_ADDRESS_UPAZILLA_THANA.suggestions.length> 0 && (
            <select
            className={`form-control form-control-sm ${
              formData.CURRENT_ADDRESS_UPAZILLA_THANA.correction_needed
                ? "border-danger"
                : "border-success"
            }`}
              id="upoPresent"
              aria-label="upoPresent_correction"
              value={formData.CURRENT_ADDRESS_UPAZILLA_THANA.text}
              onChange={(event) =>
                handleSuggestionChange(event, "CURRENT_ADDRESS_UPAZILLA_THANA")
              }
            >
              <option value="" hidden>Suggested: {formData.CURRENT_ADDRESS_UPAZILLA_THANA.suggestions[0]}</option>
              {formData.CURRENT_ADDRESS_UPAZILLA_THANA.suggestions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
          </div>
        </div>
        <div class="col-sm-12">
          <div class="input-group input-group-sm">
            <label class="input-group-text" for="City Corporation/Paurasabha" style={{ width: '230px' }}>
              City Corporation/Paurasabha:
            </label>
            <input
              type="text"
              className={`form-control form-control-sm ${
                formData.CURRENT_ADDRESS_CITYCORPORATION_POURASHOVA.correction_needed
                  ? "border-danger"
                  : "border-success"
              }`}
              id="corpPresent"
              value={formData.CURRENT_ADDRESS_CITYCORPORATION_POURASHOVA.text}
              onChange={(event) =>
                handleTextChange(
                  event,
                  "CURRENT_ADDRESS_CITYCORPORATION_POURASHOVA"
                )
              }
              required
            />
            {formData.CURRENT_ADDRESS_CITYCORPORATION_POURASHOVA.suggestions.length> 0 && (
            <select
            className={`form-control form-control-sm ${
              formData.CURRENT_ADDRESS_CITYCORPORATION_POURASHOVA.correction_needed
                ? "border-danger"
                : "border-success"
            }`}
              id="corpPresent"
              aria-label="corpPresent_correction"
              value={formData.CURRENT_ADDRESS_CITYCORPORATION_POURASHOVA.text}
              onChange={(event) =>
                handleSuggestionChange(event, "CURRENT_ADDRESS_CITYCORPORATION_POURASHOVA")
              }
            >
              <option value="" hidden>Suggested: {formData.CURRENT_ADDRESS_CITYCORPORATION_POURASHOVA.suggestions[0]}</option>
              {formData.CURRENT_ADDRESS_CITYCORPORATION_POURASHOVA.suggestions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
          </div>
        </div>

        <div class="col-sm-12">
          <div class="input-group input-group-sm">
            <label class="input-group-text" for="Union" style={{ width: '230px' }}>
              Union:
            </label>
            <input
              type="text"
              className={`form-control form-control-sm ${
                formData.CURRENT_ADDRESS_UNION.correction_needed
                  ? "border-danger"
                  : "border-success"
              }`}
              id="unionPresent"
              value={formData.CURRENT_ADDRESS_UNION.text}
              onChange={(event) =>
                handleTextChange(event, "CURRENT_ADDRESS_UNION")
              }
              required
            />
            {formData.CURRENT_ADDRESS_UNION.suggestions.length> 0 && (
            <select
            className={`form-control form-control-sm ${
              formData.CURRENT_ADDRESS_UNION.correction_needed
                ? "border-danger"
                : "border-success"
            }`}
              id="unionPresent"
              aria-label="unionPresent_correction"
              value={formData.CURRENT_ADDRESS_UNION.text}
              onChange={(event) =>
                handleSuggestionChange(event, "CURRENT_ADDRESS_UNION")
              }
            >
              <option value="" hidden>Suggested: {formData.CURRENT_ADDRESS_UNION.suggestions[0]}</option>
              {formData.CURRENT_ADDRESS_UNION.suggestions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
          </div>
        </div>
        <div class="col-sm-12">
          <div class="input-group input-group-sm">
            <label class="input-group-text" for="Ward" style={{ width: '230px' }}>
              Ward No.:
            </label>
            <input
              type="text"
              className={`form-control form-control-sm ${
                formData.CURRENT_ADDRESS_WARDNUMBER.correction_needed
                  ? "border-danger"
                  : "border-success"
              }`}
              id="wardPresent"
              value={formData.CURRENT_ADDRESS_WARDNUMBER.text}
              onChange={(event) =>
                handleTextChange(event, "CURRENT_ADDRESS_WARDNUMBER")
              }
              required
            />
            {formData.CURRENT_ADDRESS_WARDNUMBER.suggestions.length >0 && (
            <select
            className={`form-control form-control-sm ${
              formData.CURRENT_ADDRESS_WARDNUMBER.correction_needed
                ? "border-danger"
                : "border-success"
            }`}
              id="wardPresent"
              aria-label="wardPresent_correction"
              value={formData.CURRENT_ADDRESS_WARDNUMBER.text}
              onChange={(event) =>
                handleSuggestionChange(event, "CURRENT_ADDRESS_WARDNUMBER")
              }
            >
              <option value="" hidden>Suggested: {formData.CURRENT_ADDRESS_WARDNUMBER.suggestions[0]}</option>
              {formData.CURRENT_ADDRESS_WARDNUMBER.suggestions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
          </div>
        </div>

        <div class="col-sm-12">
          <div class="input-group input-group-sm">
            <label class="input-group-text" for="Mouja" style={{ width: '230px' }}>
              Mouja:
            </label>
            <input
              type="text"
              className={`form-control form-control-sm ${
                formData.CURRENT_ADDRESS_MOUJA.correction_needed
                  ? "border-danger"
                  : "border-success"
              }`}
              id="moujaPresent"
              value={formData.CURRENT_ADDRESS_MOUJA.text}
              onChange={(event) =>
                handleTextChange(event, "CURRENT_ADDRESS_MOUJA")
              }
              required
            />
            {formData.CURRENT_ADDRESS_MOUJA.suggestions.length> 0 && (
            <select
            className={`form-control form-control-sm ${
              formData.CURRENT_ADDRESS_MOUJA.correction_needed
                ? "border-danger"
                : "border-success"
            }`}
              id="moujaPresent"
              aria-label="moujaPresent_correction"
              value={formData.CURRENT_ADDRESS_MOUJA.text}
              onChange={(event) =>
                handleSuggestionChange(event, "CURRENT_ADDRESS_MOUJA")
              }
            >
              <option value="" hidden>Suggested: {formData.CURRENT_ADDRESS_MOUJA.suggestions[0]}</option>
              {formData.CURRENT_ADDRESS_MOUJA.suggestions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
          </div>
        </div>
        <div class="col-sm-12">
          <div class="input-group input-group-sm">
            <label class="input-group-text" for="Village/mohalla/Road" style={{ width: '230px' }}>
              Village/mohalla/Road Name & No.:
            </label>
            <input
              type="text"
              className={`form-control form-control-sm ${
                formData.CURRENT_ADDRESS_VILLAGE_MOHOLLA.correction_needed
                  ? "border-danger"
                  : "border-success"
              }`}
              id="roadPresent"
              value={formData.CURRENT_ADDRESS_VILLAGE_MOHOLLA.text}
              onChange={(event) =>
                handleTextChange(event, "CURRENT_ADDRESS_VILLAGE_MOHOLLA")
              }
              required
            />
            {formData.CURRENT_ADDRESS_VILLAGE_MOHOLLA.suggestions.length> 0 && (
            <select
            className={`form-control form-control-sm ${
              formData.CURRENT_ADDRESS_VILLAGE_MOHOLLA.correction_needed
                ? "border-danger"
                : "border-success"
            }`}
              id="roadPresent"
              aria-label="roadPresent_correction"
              value={formData.CURRENT_ADDRESS_VILLAGE_MOHOLLA.text}
              onChange={(event) =>
                handleSuggestionChange(event, "CURRENT_ADDRESS_VILLAGE_MOHOLLA")
              }
            >
              <option value="" hidden>Suggested: {formData.CURRENT_ADDRESS_VILLAGE_MOHOLLA.suggestions[0]}</option>
              {formData.CURRENT_ADDRESS_VILLAGE_MOHOLLA.suggestions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
          </div>
        </div>

        <div class="col-sm-12">
          <div class="input-group input-group-sm">
            <label class="input-group-text" for="HouseHoldingNo" style={{ width: '230px' }}>
              House Holding No.:
            </label>
            <input
              type="text"
              className={`form-control form-control-sm ${
                formData.CURRENT_ADDRESS_HOLDING_NUMBER.correction_needed
                  ? "border-danger"
                  : "border-success"
              }`}
              id="hodingNoPresent"
              value={formData.CURRENT_ADDRESS_HOLDING_NUMBER.text}
              onChange={(event) =>
                handleTextChange(event, "CURRENT_ADDRESS_HOLDING_NUMBER")
              }
              required
            />
            {formData.CURRENT_ADDRESS_HOLDING_NUMBER.suggestions.length> 0 && (
            <select
            className={`form-control form-control-sm ${
              formData.CURRENT_ADDRESS_HOLDING_NUMBER.correction_needed
                ? "border-danger"
                : "border-success"
            }`}
              id="hodingNoPresent"
              aria-label="hodingNoPresent_correction"
              value={formData.CURRENT_ADDRESS_HOLDING_NUMBER.text}
              onChange={(event) =>
                handleSuggestionChange(event, "CURRENT_ADDRESS_HOLDING_NUMBER")
              }
            >
              <option value="" hidden>Suggested: {formData.CURRENT_ADDRESS_HOLDING_NUMBER.suggestions[0]}</option>
              {formData.CURRENT_ADDRESS_HOLDING_NUMBER.suggestions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
          </div>
        </div>
        <div class="col-sm-12">
          <div class="input-group input-group-sm">
            <label class="input-group-text" for="PostOffice" style={{ width: '230px' }}>
              PostOffice:
            </label>
            <input
              type="text"
              className={`form-control form-control-sm ${
                formData.CURRENT_ADDRESS_POST_OFFICE.correction_needed
                  ? "border-danger"
                  : "border-success"
              }`}
              id="postOfficePresent"
              value={formData.CURRENT_ADDRESS_POST_OFFICE.text}
              onChange={(event) =>
                handleTextChange(event, "CURRENT_ADDRESS_POST_OFFICE")
              }
              required
            />
            {formData.CURRENT_ADDRESS_POST_OFFICE.suggestions.length> 0 && (
            <select
            className={`form-control form-control-sm ${
              formData.CURRENT_ADDRESS_POST_OFFICE.correction_needed
                ? "border-danger"
                : "border-success"
            }`}
              id="postOfficePresent"
              aria-label="postOfficePresent_correction"
              value={formData.CURRENT_ADDRESS_POST_OFFICE.text}
              onChange={(event) =>
                handleSuggestionChange(event, "CURRENT_ADDRESS_POST_OFFICE")
              }
            >
              <option value="" hidden>Suggested: {formData.CURRENT_ADDRESS_POST_OFFICE.suggestions[0]}</option>
              {formData.CURRENT_ADDRESS_POST_OFFICE.suggestions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
          </div>
        </div>
        <div class="col-sm-12">
          <div class="input-group input-group-sm">
            <label class="input-group-text" for="PostCode" style={{ width: '230px' }}>
              PostCode:
            </label>
            <input
              type="number"
              className={`form-control form-control-sm ${
                formData.CURRENT_ADDRESS_POST_CODE.correction_needed
                  ? "border-danger"
                  : "border-success"
              }`}
              id="postCodePresent"
              value={formData.CURRENT_ADDRESS_POST_CODE.text}
              onChange={(event) =>
                handleTextChange(event, "CURRENT_ADDRESS_POST_CODE")
              }
              required
            />
            {formData.CURRENT_ADDRESS_POST_CODE.suggestions.length>0 && (
            <select
            className={`form-control form-control-sm ${
              formData.CURRENT_ADDRESS_POST_CODE.correction_needed
                ? "border-danger"
                : "border-success"
            }`}
              id="postCodePresent"
              aria-label="postCodePresent_correction"
              value={formData.CURRENT_ADDRESS_POST_CODE.text}
              onChange={(event) =>
                handleSuggestionChange(event, "CURRENT_ADDRESS_POST_CODE")
              }
            >
              <option value="" hidden>Suggested: {formData.CURRENT_ADDRESS_POST_CODE.suggestions[0]}</option>
              {formData.CURRENT_ADDRESS_POST_CODE.suggestions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
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
        <div class="col-sm-12">
          <div class="input-group input-group-sm">
            <label class="input-group-text" for="Division" style={{ width: '230px' }}>
              Division: 
            </label>
            <input
              type="text"
              class="form-control"
              id="divPermanent"
              disabled={isDisabled}
            ></input>
          </div>
        </div>
        <div class="col-sm-12">
          <div class="input-group input-group-sm">
            <label class="input-group-text" for="District" style={{ width: '230px' }}>
              District:
            </label>
            <input
              type="text"
              class="form-control"
              id="distPermanent"
              disabled={isDisabled}
            />
          </div>
        </div>

        <div class="col-sm-12">
          <div class="input-group input-group-sm">
            <label class="input-group-text" for="Upozilla/Thana" style={{ width: '230px' }}>
              Upozilla/Thana:
            </label>
            <input
              type="text"
              class="form-control"
              id="upoPermanent"
              disabled={isDisabled}
            />
          </div>
        </div>
        <div class="col-sm-12">
          <div class="input-group input-group-sm">
            <label class="input-group-text" for="City Corporation/Paurasabha" style={{ width: '230px' }}>
              City Corporation/Paurasabha:
            </label>
            <input
              type="text"
              class="form-control"
              id="corpPermanent"
              disabled={isDisabled}
            />
          </div>
        </div>

        <div class="col-sm-12">
          <div class="input-group input-group-sm">
            <label class="input-group-text" for="Union" style={{ width: '230px' }}>
              Union:
            </label>
            <input
              type="text"
              class="form-control"
              id="unionPermanent"
              disabled={isDisabled}
            />
          </div>
        </div>
        <div class="col-sm-12">
          <div class="input-group input-group-sm">
            <label class="input-group-text" for="Ward" style={{ width: '230px' }}>
              Ward No.:
            </label>
            <input
              type="text"
              class="form-control"
              id="wardPermanent"
              disabled={isDisabled}
            />
          </div>
        </div>

        <div class="col-sm-12">
          <div class="input-group input-group-sm">
            <label class="input-group-text" for="Mouja" style={{ width: '230px' }}>
              Mouja:
            </label>
            <input
              type="text"
              class="form-control"
              id="moujaPermanent"
              disabled={isDisabled}
            />
          </div>
        </div>
        <div class="col-sm-12">
          <div class="input-group input-group-sm">
            <label class="input-group-text" for="Village/mohalla/Road" style={{ width: '230px' }}>
              Village/mohalla/Road Name & No.: 
            </label>
            <input
              type="text"
              class="form-control"
              id="roadPermanent"
              disabled={isDisabled}
            />
          </div>
        </div>

        <div class="col-sm-12">
          <div class="input-group input-group-sm">
            <label class="input-group-text" for="HouseHoldingNo" style={{ width: '230px' }}>
              House Holding No.:
            </label>
            <input
              type="text"
              class="form-control"
              id="hodingNoPermanent"
              disabled={isDisabled}
            />
          </div>
        </div>
        <div class="col-sm-12">
          <div class="input-group input-group-sm">
            <label class="input-group-text" for="PostOffice" style={{ width: '230px' }}>
              PostOffice:
            </label>
            <input
              type="text"
              class="form-control"
              id="postOfficePermanent"
              disabled={isDisabled}
            />
          </div>
        </div>
        <div class="col-sm-12">
          <div class="input-group input-group-sm">
            <label class="input-group-text" for="PostCode" style={{ width: '230px' }}>
              PostCode:
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
