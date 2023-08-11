import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CenteredContainer,
  StyledPaper,
  StyledForm,
  StyledTextField,
  StyledButton,
  StyledButtonSecondary,
} from './RegisterFormStyles';
import axios from 'axios';

function RegisterForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      console.log('User created:', response.data);
      navigate('/attendees');
    } catch (err) {
      console.error('Error creating user:', err);
    }
  };

  const createUser = async (body) => {
    const baseURL = 'http://localhost:8080';
    try {
      const response = await axios.post(`${baseURL}/register`, body);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <CenteredContainer>
      <StyledPaper>
        <h1>Register</h1>
        <StyledForm onSubmit={handleSubmit}>
          <StyledTextField
            type='text'
            name='name'
            value={formData.name}
            onChange={handleInputChange}
            placeholder='Name'
            required
          />
          <StyledTextField
            type='email'
            name='email'
            value={formData.email}
            onChange={handleInputChange}
            placeholder='Email'
            required
          />
          <StyledTextField
            type='password'
            name='password'
            value={formData.password}
            onChange={handleInputChange}
            placeholder='Password'
            required
          />
          <StyledButton type='submit'>Register</StyledButton>
          <p>Already registered?</p>
          <StyledButtonSecondary
            onClick={() =>
              (window.location.href = 'http://localhost:5173/login')
            }
          >
            Move to Login
          </StyledButtonSecondary>
        </StyledForm>
      </StyledPaper>
    </CenteredContainer>
  );
}

export default RegisterForm;
