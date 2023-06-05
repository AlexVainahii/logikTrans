import styled from "styled-components";

export const Status = styled.div`
  text-align: center;
  padding: 0;
  background: none;
`;

export const Dates = styled.div`
  padding: 0;
  font-weight: 400;
  background: none;
`;

export const Weight = styled.div`
  padding: 0;
  padding-top: 10px;
  font-weight: 400;
  background: none;
`;

export const CardWrapper = styled.div`
  display: flex;
  border: 1px solid black;
  border-radius: 4px;
  margin-top: 10px;
  padding: 5px;
  width: 100%; /* Змініть ширину на бажану */

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ProductName = styled.div`
  display: flex;
  padding: 4px;
  margin-bottom: 0;
  color: black;
  font-weight: 700;
`;

export const Pag = styled.p`
  margin: 5px;
`;

export const Back = styled.h3`
  margin: 5px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: space-between;
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  padding: 0;
  @media (max-width: 768px) {
    flex-direction: row;
    margin: 0 auto;
  }
`;

// Додайте різні стилі для різних розмірів екрану
export const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 0;
  background-color: none;
  flex: 1; /* Додайте цей стиль для рівномірного розподілу простору */

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const WrapArrow = styled.div`
  text-align: center;
  padding: 0;
  background: none;
  width: 100px;
  padding: 40px;

  @media (max-width: 768px) {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;

export const Wrap = styled.div`
  text-align: center;
  padding: 0;
  background: none;
  width: 250px;
  flex: 1; /* Додайте цей стиль для рівномірного розподілу простору */

  @media (max-width: 768px) {
    width: 100%;
  }
`;
