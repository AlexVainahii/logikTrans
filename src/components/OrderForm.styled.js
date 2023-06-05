import styled from "styled-components";
import { IconButton } from "@mui/material";

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
`;

export const Title = styled.h2`
  margin-top: 0;
  padding-top: 20px;
  text-align: center;
`;

export const Back = styled.span`
  margin-left: 8px;
`;

export const Form = styled.form`
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;

  @media (min-width: 768px) {
    width: 750px;
  }
`;

export const FormRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;

  @media (min-width: 768px) {
    margin-bottom: 20px;
  }
`;

export const Label = styled.label`
  flex: 1 1 100%;

  @media (min-width: 768px) {
    flex: 0 0 50%;
    text-align: left;
    padding-right: 20px;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 5px;
  border-radius: 3px;
  border: 1px solid #ccc;
  background-color: #f5f5f5;

  @media (min-width: 768px) {
    width: auto;
  }
`;

export const SuggestionsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    cursor: pointer;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 10px;
  border-radius: 3px;
  border: none;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;

  @media (min-width: 768px) {
    width: auto;
  }
`;

export const LinkButton = styled.button`
  display: flex;
  padding: 10px;
  border-radius: 3px;
  border: none;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  width: 70%;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

export const IconButtons = styled(IconButton)`
  margin-right: 8px;
`;

export const ActionsWrapper = styled.div`
  display: flex;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    margin-bottom: 40px;
  }
`;

export const NewOrderButton = styled.button`
  padding: 10px;
  border-radius: 3px;
  border: none;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
`;
export const ButtonsContainer = styled.div`
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const SubmitButton = styled.button`
  display: flex;
  padding: 10px;
  border-radius: 3px;
  border: none;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  width: 70%;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;
export const TextButton = styled.div`
  margin-right: 20px;
`;
