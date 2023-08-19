import React, { useState, useContext, useEffect } from "react";
import ButtonGroup from "./buttonGroup";
import AuthContext from "../../../store/auth-context";
import { useParams } from "react-router-dom";

const FormPageOne = ({formData}) => {
    // const authCtx = useContext(AuthContext);
    // const params = useParams();
    // console.log(params.form_id);
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
  const shreny = ["Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve"];
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

//   console.log("Hello",  formData.STUDENT_NAME.text);


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

  return (
    <form class="row g-3 needs-validation" novalidate onSubmit={handleSubmit}>
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
            class="form-control form-control-sm"
            id="studentName"
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
            class="form-control form-control-sm"
            id="studentName"
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
            class="form-control form-control-sm"
            id="birthRegNo"
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

      <div class="row mb-1">
        <label
          for="birthPlace"
          class="col-sm-3 col-form-label col-form-label-sm"
        >
          Birth Place :
        </label>
        <div class="col-sm-9">
          <input
            type="text"
            class="form-control form-control-sm"
            id="birthPlace"
            required
          />
        </div>
      </div>

      <div class="row mb-1">
        <label for="gender" class="col-sm-3 col-form-label col-form-label-sm">
          Gender :
        </label>
        <div class="col-sm-9">
          <ButtonGroup batch={gender} initial={["Male"]} />
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
          <ButtonGroup batch={nationality} initial={[]} />
        </div>
        <div class="col-sm-6">
          <div class="input-group">
            <div class="input-group-text">Others</div>
            <input type="text" class="form-control" id="nationality" />
          </div>
        </div>
      </div>

      <div class="row mb-1">
        <label for="religion" class="col-sm-3 col-form-label col-form-label-sm">
          Religion :
        </label>
        <div class="col-sm-9">
          <ButtonGroup batch={religion} />
        </div>
      </div>

      <div class="row mb-1">
        <label for="class" class="col-sm-3 col-form-label col-form-label-sm">
          Class :
        </label>
        <div class="col-sm-9">
          <ButtonGroup batch={shreny} />
        </div>
      </div>

      <div class="row mb-1">
        <label for="Roll" class="col-sm-3 col-form-label col-form-label-sm">
          Class Roll :
        </label>
        <div class="col-sm-9">
          <input
            type="number"
            class="form-control form-control-sm"
            id="roll"
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
          <ButtonGroup batch={marritalStatus} />
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
          <ButtonGroup batch={disabled} />
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
          <ButtonGroup batch={bloodGroup} />
        </div>
      </div>

      <div class="row mb-1">
        <label for="minority" class="col-sm-3 col-form-label col-form-label-sm">
          Minority or not? :
        </label>
        <div class="col-sm-9">
          <ButtonGroup batch={minority} />
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
            class="form-control form-control-sm"
            id="motherName"
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
            class="form-control form-control-sm"
            id="motherNameEnglish"
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
            class="form-control form-control-sm"
            id="nidMother"
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
            class="form-control form-control-sm"
            id="birthRegNoMother"
            min={1}
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
            class="form-control form-control-sm"
            id="mobileNoMother"
            pattern="[0-9]{11}"
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
            class="form-control form-control-sm"
            id="occupationMother"
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
      {/* <div class="col-6">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
  </div> */}
    </form>
  );
};

export default FormPageOne;
