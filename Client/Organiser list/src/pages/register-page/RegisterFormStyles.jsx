import styled from 'styled-components';

export const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
margin: bottom: 1rem;
`;

export const StyledPaper = styled.div`
  padding: 1.5rem;
  width: 80%;
  max-width: 400px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const StyledTextField = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
`;

export const StyledButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #c64191;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: rgb(138, 45, 101);
  }
`;

export const StyledButtonSecondary = styled.button`
  color: #c64191;
  background-color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    color: #152b68;
  }
`;
