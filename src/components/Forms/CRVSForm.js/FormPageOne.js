import React from "react";
import ButtonGroup from "./buttonGroup";
import { useState } from "react";
import "./FormPageOne.css"

const FormPageOne = (props) => {
  // const authCtx = useContext(AuthContext);
  // const params = useParams();
  // console.log(params.form_id);
  const formData = props.formData;
  console.log(formData.BIRTH_DISTRICT.text);
  console.log(formData.BIRTH_DISTRICT.correction_needed)
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

  const [distInput, setDistInput]= useState(formData.BIRTH_DISTRICT.text);
  const [distDropdown, setDistDropdown]= useState('');

  const handleInputChange = (event) => {
    setDistInput(event.target.value);
  };

  const handleDropdownChange = (event) => {
    setDistDropdown(event.target.value);
    setDistInput(event.target.value);
  };

  //   const [formData, setFormData] = useState({

  //   const handleChange = (event) => {
  //     const { id, value } = event.target;

  //     const parsedValue =
  //       id === "level" ||
  //       id === "start" ||
  //       id === "end" ||
  //       id === "total" ||
  //       id === "year"
  //         ? parseInt(value, 10)
  //         : value;
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       [id]: parsedValue,
  //     }));
  //     console.log(formData);
  //   };

  // useEffect(() => {
  //     const fetchFormData = async () => {
  //       try {
  //         const response = await fetch(
  //           "https://crvs.onrender.com/workspace/getValidateForm",
  //           {
  //             method: "POST",
  //             headers: {
  //               Authorization: "Bearer " + authCtx.token,
  //             },
  //             body: JSON.stringify(params.form_id),
  //           }
  //         );
  //         const data = await response.json();
  //         console.log(data);
  //         // setWorkspaceData(data.workspaces); // Update the state with fetched data
  //       } catch (error) {
  //         console.error("Error fetching workspace data:", error);
  //       }
  //     };

  //     fetchFormData(); // Fetch data when the component mounts or authCtx.token changes
  //   }, [authCtx.token]);


  const handleSubmit = async (event) => {
    event.preventDefault();
    // Do something with the form data, e.g., send it to the backend
    // try {
    //   const response = await fetch(
    //     "https://crvs.onrender.com/workspace/createWorkspace",
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: "Bearer " + authCtx.token,
    //       },
    //       body: JSON.stringify(formData),
    //     }
    //   );

    //   if (response.ok) {
    //     console.log("Form data submitted successfully.");
    //     // Optionally, you can do something with the response
    //   } else {
    //     console.error("Failed to submit form data.");
    //   }
    // } catch (error) {
    //   console.error("Error submitting form data:", error);
    // }
  };

    return ( <form class="row g-3 needs-validation" novalidate onSubmit={handleSubmit}>
        <div class="row mb-1">
           <label
            for="studentName"
            class="col-sm-3 col-form-label col-form-label-sm"
          >
            Student Name:
          </label>
          <div class="col-sm-9">
            <input
              type="text"
              class={`form-control form-control-sm ${formData.STUDENT_NAME.correction_needed ?   'border-danger' : 'border-success' }`}
              id="studentName"
              value={formData.STUDENT_NAME.text}
              required
            />
          </div>
        </div>

        <div class="row mb-1">
          <label
            for="studentNameEnglish"
            class="col-sm-3 col-form-label col-form-label-sm"
          >
            Student Name (Eng) :
          </label>
          <div class="col-sm-9">
            <input
              type="text"
              class={`form-control form-control-sm ${formData.STUDENT_NAME_ENGLISH.correction_needed ?   'border-danger' : 'border-success' }`}
              id="studentName"
              value={formData.STUDENT_NAME_ENGLISH.text}
              required
            />
          </div>
        </div>

        <div class="row mb-1">
          <label
            for="birthRegNo"
            class="col-sm-3 col-form-label col-form-label-sm"
          >
            Birth Registration No :
          </label>
          <div class="col-sm-9">
            <input
              type="number"
              class={`form-control form-control-sm ${formData.BIRTH_CERTIFICATE_NUMBER.correction_needed ?   'border-danger' : 'border-success' }`}
              id="birthRegNo"
                value={formData.BIRTH_CERTIFICATE_NUMBER.text}               
              min={1}
              required
            />
          </div>
        </div>

        <div class="row mb-1">
          <label
            for="birthDate"
            class="col-sm-3 col-form-label col-form-label-sm"
          >
            Birth Date :
          </label>
          <div class="col-sm-9">
            <input
              type="date"
              class="form-control form-control-sm"
              id="birthDate"
              required
            />
          </div>
        </div>
        <div class="input-group input-group-sm mb-1">
        {/* <div class="row mb-1"> */}
          <label
            for="birthPlace"
            class="col-sm-3 col-form-label col-form-label-sm"
          >
            Birth Place :
          </label>
          {/* <div class="col-sm-9"> */}
            <input
              type="text"
              class={`form-control form-control-sm ${formData.BIRTH_DISTRICT.correction_needed ?   'border-danger' : 'border-success' }`}
              id="birthPlace"
              value={distInput}
              onChange={handleInputChange}
              required
            />
          {/* </div> */}
          {/* <div class="col-sm-4"> */}
          {formData.BIRTH_DISTRICT.correction_needed && (<select class="form-select border-danger" id="birthPlace" aria-label="birthplace_correction"
            value={distDropdown}
            onChange={handleDropdownChange}
          >
            {formData.BIRTH_DISTRICT.suggestions.map((option, index) => (
              <option key={index} value={option}>Suggested: {option}</option>
            ))}
          </select> )}
          {/* </div> */}
          {/* </div> */}
        </div>

        <div class="row mb-1">
          <label for="gender" class="col-sm-3 col-form-label col-form-label-sm">
            Gender :
          </label>
          <div class="col-sm-9">
            <ButtonGroup batch={gender} initial={[formData.GENDER]} />
          </div>
        </div>

        <div class="row mb-1">
          <label
            for="nationality"
            class="col-sm-3 col-form-label col-form-label-sm"
          >
            Nationality :
          </label>
          <div class="col-sm-3">
            <ButtonGroup batch={nationality} initial={[formData.NATIONALITY_BD]} />
          </div>
          <div class="col-sm-6">
            <div class="input-group input-group-sm">
              <div class="input-group-text">Others</div>
              <input type="text" class="form-control" id="nationality" value={formData.NATIONALITY_OTHER.text}/>
            </div>
          </div>
        </div>

        <div class="row mb-1">
          <label for="religion" class="col-sm-3 col-form-label col-form-label-sm">
            Religion :
          </label>
          <div class="col-sm-9">
            <ButtonGroup batch={religion} initial={[formData.RELIGION]} />
          </div>
        </div>

        <div class="row mb-1">
          <label for="class" class="col-sm-3 col-form-label col-form-label-sm">
            Class :
          </label>
          <div class="col-sm-9">
            <ButtonGroup batch={shreny} initial={[formData.CLASS]}/>
          </div>
        </div>

        <div class="row mb-1">
          <label for="Roll" class="col-sm-3 col-form-label col-form-label-sm">
            Class Roll :
          </label>
          <div class="col-sm-9">
            <input
              type="number"
              class={`form-control form-control-sm ${formData.ROLL.correction_needed ?   'border-danger' : 'border-success' }`}
              id="roll"
              value= {formData.ROLL.text}
              min={1}
              required
            />
          </div>
        </div>

        <div class="row mb-1">
          <label
            for="marritalStatus"
            class="col-sm-3 col-form-label col-form-label-sm"
          >
            Marrital Status :
          </label>
          <div class="col-sm-9">
            <ButtonGroup batch={marritalStatus} initial={[formData.MARITAL_STATUS]}/>
          </div>
        </div>

        <div class="row mb-1">
          <label
            for="disability"
            class="col-sm-3 col-form-label col-form-label-sm"
          >
            Disability :
          </label>
          <div class="col-sm-9">
            <ButtonGroup batch={disabled} initial={[formData.DISABILITY]}/>
          </div>
        </div>

        <div class="row mb-1">
          <label
            for="bloodGroup"
            class="col-sm-3 col-form-label col-form-label-sm"
          >
            Blood Group :
          </label>
          <div class="col-sm-9">
            <ButtonGroup batch={bloodGroup} initial={[formData.BLOOD_GROUP]}/>
          </div>
        </div>

        <div class="row mb-1">
          <label for="minority" class="col-sm-3 col-form-label col-form-label-sm">
            Minority or not? :
          </label>
          <div class="col-sm-9">
            <ButtonGroup batch={minority} initial={[formData.IF_MINORITY]}/>
          </div>
        </div>

        <div class="row mb-1">
          <label
            for="minorityYes"
            class="col-sm-3 col-form-label col-form-label-sm"
          >
            If yes :
          </label>
          <div class="col-sm-9">
            <ButtonGroup batch={minorityYes} />
          </div>
        </div>

        <div class="row mb-1">
          <label for="Mother" class="col-sm-8 col-form-label col-form-label-lg">
            Mother's Information:
          </label>
        </div>

        <div class="row mb-1">
          <label
            for="motherName"
            class="col-sm-3 col-form-label col-form-label-sm"
          >
            Mother's Name:
          </label>
          <div class="col-sm-9">
            <input
              type="text"
              class={`form-control form-control-sm ${formData.MOTHERS_NAME.correction_needed ?   'border-danger' : 'border-success' }`}
              id="motherName"
              value={formData.MOTHERS_NAME.text}
              required
            />
          </div>
        </div>

        <div class="row mb-1">
          <label
            for="motherNameEnglish"
            class="col-sm-3 col-form-label col-form-label-sm"
          >
            Mother's Name (Eng) :
          </label>
          <div class="col-sm-9">
            <input
              type="text"
              class={`form-control form-control-sm ${formData.MOTHERS_NAME_ENG.correction_needed ?   'border-danger' : 'border-success' }`}
              id="motherNameEnglish"
              value={formData.MOTHERS_NAME_ENG.text}
              required
            />
          </div>
        </div>

        <div class="row mb-1">
          <label
            for="nidMother"
            class="col-sm-3 col-form-label col-form-label-sm"
          >
            NID :
          </label>
          <div class="col-sm-9">
            <input
              type="number"
              class={`form-control form-control-sm ${formData.MOTHER_NID.correction_needed ?   'border-danger' : 'border-success' }`}
              id="nidMother"
              value={parseInt(formData.MOTHER_NID.text.replace(/\s/g, ''), 10)}
              min={1}
              required
            />
          </div>
        </div>

        <div class="row mb-1">
          <label
            for="birthDateMother"
            class="col-sm-3 col-form-label col-form-label-sm"
          >
            Birth Date :
          </label>
          <div class="col-sm-9">
            <input
              type="date"
              class="form-control form-control-sm"
              id="birthDateMother"
              required
            />
          </div>
        </div>

        <div class="row mb-1">
          <label
            for="birthRegNoMother"
            class="col-sm-3 col-form-label col-form-label-sm"
          >
            Birth Registration No :
          </label>
          <div class="col-sm-9">
            <input
              type="number"
              class={`form-control form-control-sm ${formData.MOTHER_BIRTH_CERTIFICATE.correction_needed ?   'border-danger' : 'border-success' }`}
              id="birthRegNoMother"
              min={1}
              value={parseInt(formData.MOTHER_BIRTH_CERTIFICATE.text.replace(/\s/g, ''), 10)}
              required
            />
          </div>
        </div>

        <div class="row mb-1">
          <label
            for="mobileNoMother"
            class="col-sm-3 col-form-label col-form-label-sm"
          >
            Mobile No :
          </label>
          <div class="col-sm-9">
            <input
              type="number"
              class={`form-control form-control-sm ${formData.MOTHER_MOBILE_NO.correction_needed ?   'border-danger' : 'border-success' }`}
              id="mobileNoMother"
              pattern="[0-9]{11}"
              value={formData.MOTHER_MOBILE_NO.text}
              required
            />
          </div>
        </div>

        <div class="row mb-1">
          <label
            for="occupationMother"
            class="col-sm-3 col-form-label col-form-label-sm"
          >
            Occupation :
          </label>
          <div class="col-sm-9">
            <input
              type="text"
              class={`form-control form-control-sm ${formData.MOTHER_OCCUPATION.correction_needed ?   'border-danger' : 'border-success' }`}
              id="occupationMother"
              value={formData.MOTHER_OCCUPATION.text}
              required
            />
          </div>
        </div>

        <div class="row mb-1">
          <label
            for="deathYearMother"
            class="col-sm-3 col-form-label col-form-label-sm"
          >
            If dead, death year :
          </label>
          <div class="col-sm-9">
            <input
              type="number"
              class="form-control form-control-sm"
              id="deathYearMother"
            />
          </div>
        </div>

        <div class="col-6">
          <button class="btn btn-primary" type="submit">
            Submit form
          </button>
        </div>
      </form> 
    );
};

export default FormPageOne;
