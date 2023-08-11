import styled from 'styled-components';

export const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledPaper = styled.div`
  background-color: #fff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  padding: 24px;
  border-radius: 8px;
  width: 300px;
  margin-bottom: 1rem;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const StyledTextField = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

export const StyledButton = styled.button`
  padding: 10px;
  background-color: #c64191;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
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
