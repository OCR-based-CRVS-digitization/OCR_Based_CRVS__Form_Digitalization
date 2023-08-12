import React, { useState } from 'react';
import classes from './NewWorkSpace.module.css';
import Card from '../components/UI/Card/Card';
import { useContext } from 'react';
import AuthContext from '../store/auth-context';
import { useNavigate } from 'react-router-dom';

const NewWorkSpace = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/home/workspace');
    };
    const authCtx = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    level: '',
    sec: '',
    group: '',
    start: '',
    end: '',
    total: '',
    year: '',
    description: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    const parsedValue = (name === 'level' || name === 'start' || name === 'end' || name === 'total' || name === 'year') ? parseInt(value, 10) : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: parsedValue,
    }));
    console.log(formData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Do something with the form data, e.g., send it to the backend
    try {
        const response = await fetch('https://crvs.onrender.com/workspace/createWorkspace', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + authCtx.token,
          },
          body: JSON.stringify(formData),
        });
    
        if (response.ok) {
          console.log('Form data submitted successfully.');
          handleClick();
          // Optionally, you can do something with the response
        } else {
          console.error('Failed to submit form data.');
        }
      } catch (error) {
        console.error('Error submitting form data:', error);
      }
  };

  return (
    <Card className={classes['form-container']}>
      <form onSubmit={handleSubmit}>
        <div className={classes['form-group']}>
          <label className={classes['form-label']}>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={classes['form-input']}
            required
          />
        </div>
        <div className={classes['form-group']}>
          <label className={classes['form-label']}>Class:</label>
          <input
            type="number"
            name="level"
            value={formData.level}
            onChange={handleChange}
            className={classes['form-input']}
            required
          />
        </div>
        <div className={classes['form-group']}>
          <label className={classes['form-label']}>Section:</label>
          <input
            type="text"
            name="sec"
            value={formData.sec}
            onChange={handleChange}
            className={classes['form-input']}
            required
          />
        </div>
        <div className={classes['form-group']}>
          <label className={classes['form-label']}>Group:</label>
          <input
            type="text"
            name="group"
            value={formData.group}
            onChange={handleChange}
            className={classes['form-input']}
            required
          />
        </div>
        <div className={classes['form-group']}>
          <label className={classes['form-label']}>Roll Start:</label>
          <input
            type="number"
            name="start"
            value={formData.start}
            onChange={handleChange}
            className={classes['form-input']}
            required
          />
        </div>
        <div className={classes['form-group']}>
          <label className={classes['form-label']}>Roll End:</label>
          <input
            type="number"
            name="end"
            value={formData.end}
            onChange={handleChange}
            className={classes['form-input']}
            required
          />
        </div>
        <div className={classes['form-group']}>
          <label className={classes['form-label']}>Total:</label>
          <input
            type="number"
            name="total"
            value={formData.total}
            onChange={handleChange}
            className={classes['form-input']}
            required
          />
        </div>
        <div className={classes['form-group']}>
          <label className={classes['form-label']}>Year:</label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            className={classes['form-input']}
            required
          />
        </div>
        <div className={classes['form-group']}>
          <label className={classes['form-label']}>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={classes['form-textarea']}
            required
          />
        </div>
        <button type="submit" className={classes['form-button']}>
          Submit
        </button>
      </form>
    </Card>
  );
};

export default NewWorkSpace;
