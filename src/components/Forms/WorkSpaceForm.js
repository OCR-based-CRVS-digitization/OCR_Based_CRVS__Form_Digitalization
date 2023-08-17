import React, { useState, useContext } from "react";
import AuthContext from "../../store/auth-context";

const WorkSpaceForm = () => {
  const authCtx = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    level: "",
    sec: "",
    group: "Science",
    start: "",
    end: "",
    total: "",
    year: "",
    description: "",
  });


  const handleChange = (event) => {
    const { id, value } = event.target;

    const parsedValue =
      id === "level" ||
      id === "start" ||
      id === "end" ||
      id === "total" ||
      id === "year"
        ? parseInt(value, 10)
        : value;
    setFormData((prevData) => ({
      ...prevData,
      [id]: parsedValue,
    }));
    console.log(formData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Do something with the form data, e.g., send it to the backend
    try {
      const response = await fetch(
        "https://crvs.onrender.com/workspace/createWorkspace",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + authCtx.token,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        console.log("Form data submitted successfully.");
        // Optionally, you can do something with the response
      } else {
        console.error("Failed to submit form data.");
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };

  return (
    <form class="row g-3 needs-validation" novalidate onSubmit={handleSubmit}>
      <div class="col-md-12">
        <label for="name" class="form-label">
          Workspace name
        </label>
        <input
          type="text"
          class="form-control"
          id="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <div class="valid-feedback">Looks good!</div>
      </div>
      <div class="col-md-6">
        <label for="level" class="form-label">
          Class
        </label>
        <input
          type="number"
          class="form-control"
          id="level"
          value={formData.level}
          onChange={handleChange}
          min="0"
          step={1}
          required
        />
        <div class="valid-feedback">Looks good!</div>
      </div>
      <div class="col-md-6">
        <label for="sec" class="form-label">
          Section
        </label>
        <input
          type="text"
          class="form-control"
          id="sec"
          value={formData.sec}
          onChange={handleChange}
          required
        />
        <div class="valid-feedback">Looks good!</div>
      </div>
      <div class="col-md-12">
        <label for="group" class="form-label">
          Group
        </label>
        <select
          class="form-select form-select"
          aria-label="group"
            id="group"
          value={formData.group}
          onChange={handleChange}
        >
          <option value="Science">Science</option>
          <option value="Arts">Arts</option>
          <option value="Commerce">Commerce</option>
          <option value="General">General</option>
          <option value="Technical">Technical</option>
        </select>

        <div class="valid-feedback">Looks good!</div>
      </div>

      <div class="col-md-12">
        <div class="input-group">
          <span class="input-group-text">Roll</span>
          <div class="form-floating">
            <input
              type="number"
              class="form-control"
              id="start"
              value={formData.start}
              onChange={handleChange}
              placeholder="1"
              min={1}
              step={1}
            />
            <label for="start">Start</label>
          </div>
          <div class="form-floating">
            <input
              type="number"
              class="form-control"
              id="end"
              value={formData.end}
              onChange={handleChange}
              placeholder="1"
              min={1}
              step={1}
            />
            <label for="end">End</label>
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <label for="total" class="form-label">
          Total Students
        </label>
        <input
          type="number"
          class="form-control"
          id="total"
          value={formData.total}
          onChange={handleChange}
          min="0"
          step={1}
          required
        />
        <div class="valid-feedback">Looks good!</div>
      </div>

      <div class="col-md-6">
        <label for="year" class="form-label">
          Year
        </label>
        <input
          type="number"
          class="form-control"
          id="year"
          value={formData.year}
          onChange={handleChange}
          min="2020"
          step={1}
          required
        />
        <div class="valid-feedback">Looks good!</div>
      </div>
      <div class="col-md-12">
        <label for="description" class="form-label">
          Description
        </label>
        <textarea
          class="form-control"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          placeholder="Enter a description..."
        ></textarea>
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

export default WorkSpaceForm;