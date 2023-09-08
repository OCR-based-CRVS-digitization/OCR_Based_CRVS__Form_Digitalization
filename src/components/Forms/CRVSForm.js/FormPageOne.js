import React from "react";
import ButtonGroup from "./buttonGroup";
import { useState,useContext } from "react";
import "./FormPageOne.css"
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

  const [selectedValue, setSelectedValue] = useState('');

  const  handleDropDownChange= (selectedValue,fieldName) => {
    setSelectedValue(selectedValue);
    const updatedFormData = { ...formData };
    updatedFormData[fieldName] = selectedValue;
    setFormData(updatedFormData);
  };


  const handleTextChange = (event, fieldName) => {
    const updatedFormData = { ...formData };
    updatedFormData[fieldName].text = event.target.value;
    setFormData(updatedFormData);
  };

  const handleNumberChange = (event, fieldName) => {
    const updatedFormData = { ...formData };
    const prev = updatedFormData[fieldName].text;
    const parsedValue = parseInt(event.target.value, 10);
    if(!isNaN(parsedValue)){
      updatedFormData[fieldName].text = parsedValue;
    }
    else{
      updatedFormData[fieldName].text = prev;
    }
    setFormData(updatedFormData);
  };

  const handleDateChange = (event, fieldName) => {
    const updatedFormData = { ...formData };
    const [year, month, day] = event.target.value.split('-');
    updatedFormData[fieldName + '_YEAR'].text = year;
    updatedFormData[fieldName + '_MONTH'].text = month;
    updatedFormData[fieldName + '_DAY'].text = day;
    setFormData(updatedFormData);
  };
  

  


  const handleNavigate = () => {
    // navigate(`/home/workspace/${params.workspace_id}`);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let message = "";
    const url = localStorage.getItem('baseurl') + "/workspace/updateForm";
    // console.log(formData);
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
            form_id: params.form_id,
            ocr_result: formData,
          })
        });
      if (response.ok) {
        console.log("Form data submitted successfully.");
        message = "Form data submitted successfully.";
      }
      else if (response.status === 401) {
        console.error("Unauthorized access.");
        message = "Unauthorized access.";
        navigate('/');
        alert('Session expired. Please login again.');
      }
      else {
        console.error("Failed to submit form data.");
        message = "Failed to submit form data.";
      }
    }
    catch (error) {
      console.error("Error submitting form data:", error);
      message = "Error submitting form data.";
    }
    alert(message);
    handleNavigate();

  };

  return (
    <div>
      <form className="row g-3 needs-validation" noValidate onSubmit={handleSubmit}>
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
              className={`form-control form-control-sm ${formData.STUDENT_NAME.correction_needed ? 'border-danger' : 'border-success'}`}
              id="studentName"
              value={formData.STUDENT_NAME.text}
              onChange={(event) => handleTextChange(event, 'STUDENT_NAME')}
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
              className={`form-control form-control-sm ${formData.STUDENT_NAME_ENGLISH.correction_needed ? 'border-danger' : 'border-success'}`}
              id="studentName"
              value={formData.STUDENT_NAME_ENGLISH.text}
              onChange={(event) => handleTextChange(event, 'STUDENT_NAME_ENGLISH')}
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
              type="number"
              className={`form-control form-control-sm ${formData.BIRTH_CERTIFICATE_NUMBER.correction_needed ? 'border-danger' : 'border-success'}`}
              id="birthRegNo"
              value={formData.BIRTH_CERTIFICATE_NUMBER.text}
              onChange={(event) => handleNumberChange(event, 'BIRTH_CERTIFICATE_NUMBER')}
              min={1}
              required
            />
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
              value={formData.BIRTH_DATE_YEAR.text + '-' + formData.BIRTH_DATE_MONTH.text + '-' + formData.BIRTH_DATE_DAY.text}
              onChange={(event) => handleDateChange(event, 'BIRTH_DATE')}
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
            className={`form-control form-control-sm ${formData.BIRTH_DISTRICT.correction_needed ? 'border-danger' : 'border-success'}`}
            id="birthPlace"
            value={formData.BIRTH_DISTRICT.text}
            onChange={(event) => handleTextChange(event, 'BIRTH_DISTRICT')}
            required
          />
          {/* </div> */}
          {/* <div class="col-sm-4"> */}
          {formData.BIRTH_DISTRICT.correction_needed && (<select className="form-select border-danger" id="birthPlace" aria-label="birthplace_correction"
            value={formData.BIRTH_DISTRICT.suggestions}
            onChange={(event) => handleDropDownChange(event, 'BIRTH_DISTRICT')}
          >
            {formData.BIRTH_DISTRICT.suggestions.map((option, index) => (
              <option key={index} value={option}>Suggested: {option}</option>
            ))}
          </select>)}
          {/* </div> */}
          {/* </div> */}
        </div>

        <div className="row mb-1">
          <label htmlFor="gender" className="col-sm-3 col-form-label col-form-label-sm">
            Gender :
          </label>
          <div className="col-sm-9">
            <ButtonGroup 
              batch={gender} 
              initial={[formData.GENDER]}
              onButtonSelect={(selectedValue) => handleDropDownChange(selectedValue, 'GENDER')}
            />
          </div>
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
              initial={[formData.NATIONALITY_BD]} 
              onButtonSelect={(selectedValue) =>   handleDropDownChange(selectedValue, 'NATIONALITY_BD')}
            />
          </div>

          <div className="col-sm-6">
            <div className="input-group input-group-sm">
              <div className="input-group-text">Others</div>
              <input type="text" 
                className="form-control" 
                id="nationality" 
                value={formData.NATIONALITY_OTHER.text}
                onChange={(event) => handleTextChange(event, 'NATIONALITY_OTHER')}
              />
            </div>
          </div>
        </div>

        <div className="row mb-1">
          <label htmlFor="religion" className="col-sm-3 col-form-label col-form-label-sm">
            Religion :
          </label>
          <div className="col-sm-9">
            <ButtonGroup 
            batch={religion} 
            initial={[formData.RELIGION]} 
            onButtonSelect={(selectedValue) => handleDropDownChange(selectedValue, 'RELIGION')}
          />
          </div>
        </div>

        <div className="row mb-1">
          <label htmlFor="class" className="col-sm-3 col-form-label col-form-label-sm">
            Class :
          </label>
          <div className="col-sm-9">
            <ButtonGroup batch={shreny} 
            initial={[formData.CLASS]} 
            onButtonSelect={(selectedValue) => handleDropDownChange(selectedValue, 'CLASS')}
          />
          </div>
        </div>

        <div className="row mb-1">
          <label htmlFor="Roll" className="col-sm-3 col-form-label col-form-label-sm">
            Class Roll :
          </label>
          <div className="col-sm-9">
            <input
              type="number"
              className={`form-control form-control-sm ${formData.ROLL.correction_needed ? 'border-danger' : 'border-success'}`}
              id="roll"
              value={formData.ROLL.text}
              onChange={(event) => handleNumberChange(event, 'ROLL')}
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
              initial={[formData.MARITAL_STATUS]} 
              onButtonSelect={(selectedValue) => handleDropDownChange(selectedValue, 'MARITAL_STATUS')}
            />
          </div>
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
              initial={[formData.DISABILITY]} 
              onButtonSelect={(selectedValue) => handleDropDownChange(selectedValue, 'DISABILITY')}
            />
          </div>
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
              initial={[formData.BLOOD_GROUP]} 
              onButtonSelect={(selectedValue) => handleDropDownChange(selectedValue, 'BLOOD_GROUP')}  
            />
          </div>
        </div>

        <div className="row mb-1">
          <label htmlFor="minority" className="col-sm-3 col-form-label col-form-label-sm">
            Minority or not? :
          </label>
          <div className="col-sm-9">
            <ButtonGroup 
              batch={minority} 
              initial={[formData.IF_MINORITY]} 
              onButtonSelect={(selectedValue) => handleDropDownChange(selectedValue, 'IF_MINORITY')}
            />
          </div>
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
              initial={[formData.MINORITY]}
              onButtonSelect={(selectedValue) => handleDropDownChange(selectedValue, 'MINORITY')}
            />
          </div>
        </div>

        <div className="row mb-1">
          <label htmlFor="Mother" className="col-sm-8 col-form-label col-form-label-lg">
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
              className={`form-control form-control-sm ${formData.MOTHERS_NAME.correction_needed ? 'border-danger' : 'border-success'}`}
              id="motherName"
              value={formData.MOTHERS_NAME.text}
              onChange={(event) => handleTextChange(event, 'MOTHERS_NAME')}
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
              className={`form-control form-control-sm ${formData.MOTHERS_NAME_ENG.correction_needed ? 'border-danger' : 'border-success'}`}
              id="motherNameEnglish"
              value={formData.MOTHERS_NAME_ENG.text}
              onChange={(event) => handleTextChange(event, 'MOTHERS_NAME_ENG')}
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
              type="number"
              className={`form-control form-control-sm ${formData.MOTHER_NID.correction_needed ? 'border-danger' : 'border-success'}`}
              id="nidMother"
              value={parseInt(formData.MOTHER_NID.text.replace(/\s/g, ''), 10)}
              onChange={(event) => handleTextChange(event, 'MOTHER_NID')}
              min={1}
              required
            />
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
              value={formData.MOTHER_BIRTH_DATE_YEAR.text + '-' + formData.MOTHER_BIRTH_DATE_MONTH.text + '-' + formData.MOTHER_BIRTH_DATE_DAY.text}
              onChange={(event) => handleDateChange(event, 'MOTHER_BIRTH_DATE')}
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
              type="number"
              className={`form-control form-control-sm ${formData.MOTHER_BIRTH_CERTIFICATE.correction_needed ? 'border-danger' : 'border-success'}`}
              id="birthRegNoMother"
              min={0}
              value={parseInt(formData.MOTHER_BIRTH_CERTIFICATE.text.replace(/\s/g, ''), 10)}
              onChange={(event) => handleTextChange(event, 'MOTHER_BIRTH_CERTIFICATE')}
              required
            />
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
              type="number"
              className={`form-control form-control-sm ${formData.MOTHER_MOBILE_NO.correction_needed ? 'border-danger' : 'border-success'}`}
              id="mobileNoMother"
              pattern="[0-9]{11}"
              value={formData.MOTHER_MOBILE_NO.text}
              onChange={(event) => handleNumberChange(event, 'MOTHER_MOBILE_NO')}
              required
            />
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
              className={`form-control form-control-sm ${formData.MOTHER_OCCUPATION.correction_needed ? 'border-danger' : 'border-success'}`}
              id="occupationMother"
              value={formData.MOTHER_OCCUPATION.text}
              onChange={(event) => handleTextChange(event, 'MOTHER_OCCUPATION')}
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
              onChange={(event) => handleNumberChange(event, 'MOTHER_DEATH_YEAR')}
            />
          </div>
        </div>

        <div className="col-6">
          <button className="btn btn-primary" type="submit">
            Submit form
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormPageOne;
