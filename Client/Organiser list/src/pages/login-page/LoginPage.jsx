import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CenteredContainer,
  StyledPaper,
  StyledForm,
  StyledTextField,
  StyledButton,
  StyledButtonSecondary,
} from './LoginFormStyles';

import axios from 'axios';

function LoginForm() {
  const [formData, setFormData] = useState({
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
      const response = await loginUser({
        email: formData.email,
        password: formData.password,
      });

      console.log('Login successful:', response.data);
      navigate('/attendees');
    } catch (err) {
      console.error('Error logging in:', err);
    }
  };

  const loginUser = async (body) => {
    const baseURL = 'http://localhost:8080';
    try {
      const response = await axios.post(`${baseURL}/login`, body);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return (
    <CenteredContainer>
      <StyledPaper>
        <h1>Login</h1>
        <StyledForm onSubmit={handleSubmit}>
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
          <StyledButton type='submit'>Login</StyledButton>
          <p>Not registered?</p>
          <StyledButtonSecondary
            onClick={() =>
              (window.location.href = 'http://localhost:5173/login')
            }
          >
            Move to Register
          </StyledButtonSecondary>
        </StyledForm>
      </StyledPaper>
    </CenteredContainer>
  );
}

export default LoginForm;
