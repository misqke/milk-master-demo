import styled, { keyframes } from "styled-components";

export const Page = styled.div`
  display: flex;
  position: relative;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-image: url("/cow.jpg");
  background-size: cover;
  background-position: center;
`;

export const Title = styled.h1`
  position: fixed;
  top: 0;
  left: 0;
  text-align: center;
  width: 100%;
  background-color: #0004;
  backdrop-filter: blur(5px);
  border-radius: 0.5rem;
  padding: 0.5rem;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  color: #00f;
  margin: 0;
`;

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
  gap: 1rem;
  width: 90%;
  height: calc(100vh - 100px);
  margin-top: 70px;
  overflow-x: hidden;
  overflow-y: scroll;
  background-color: #3335;
  border-radius: 0.5rem;
  position: relative;
`;

export const TableHeader = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  width: 100%;
  padding: 0 0.5rem;
  justify-content: space-around;
  height: 1.5rem;
  background-color: #0009;
  span {
    width: 50px;
    text-align: center;
    color: #fff;
  }
  span:first-child {
    display: flex;
    width: 30%;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 50%;
  label {
    color: #fff;
  }
  input {
    padding: 0.25rem;
    background-color: #1113;
    color: #fff;
  }
`;

export const SubmitBtn = styled.button`
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid #333;
  background-color: #33f3;
  color: #fff;
  cursor: pointer;
  transition-duration: 250ms;
  :hover {
    background-color: #33f8;
  }
`;

export const Image = styled.img``;

export const Selector = styled.div`
  display: flex;
`;

export const ErrorMsg = styled.div`
  width: 100%;
  /* height: 1rem; */
  padding: 0.25rem;
  background-color: #f003;
  color: #fff;
  text-align: center;
  font-size: 1rem;
`;

export const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  text-shadow: 0 0 2px #222;
  color: #fff;
`;

export const RowTitle = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  width: 30%;
`;

export const Input = styled.input`
  width: 50px;
  height: 50px;
  text-align: center;
  background: #1113;
  color: inherit;
`;

export const Total = styled.p`
  text-align: center;
  width: 50px;
`;

export const loadAnimation = keyframes`
  0% {background: linear-gradient(90deg, #33f3 0%, #3333 1%)}
  12.5% {background: linear-gradient(90deg, #33f3 12.5%, #3333 15%)}
25% {background: linear-gradient(90deg, #33f3 25%, #3333 27%)}
  37.5% {background: linear-gradient(90deg, #33f3 37.5%, #3333 40%)}
  50% {background: linear-gradient(90deg, #33f3 50%, #3333 52%)}
  62.5% {background: linear-gradient(90deg, #33f3 62.5%, #3333 65%)}
  75% {background: linear-gradient(90deg, #33f3 75%, #3333 78%)}
  87.5% {background: linear-gradient(90deg, #33f3 87.5%, #3333 90%)}
  100% {background: linear-gradient(90deg, #33f3 99%, #3333 100%)}
  
`;

export const LoadingMessage = styled.p`
  font-size: 1.5rem;
  font-weight: 500;
  background: #3333;
  backdrop-filter: blur(4px);
  padding: 1rem;
  border-radius: 0.5rem;
  color: #fff;
  animation-name: ${loadAnimation};
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
`;
