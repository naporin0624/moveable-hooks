import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: transparent;
`;

export const Text = styled.p`
  margin: 0;
  padding: 0;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 30%;
  max-width: 128px;
  height: 30%;
  max-height: 64px;
  border: solid 3px #f6f9fc;
  border-radius: 3px;
  cursor: pointer;
  background: white;
  transition: box-shadow 300ms ease-in-out;

  &:before {
    transition: opacity 300ms ease-in-out;
    content: "";
    opacity: 0;
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translate(-50%, 1px);
    border-top: 6px solid #646464;
    border-right: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-left: 6px solid transparent;
  }
  &:after {
    transition: opacity 300ms ease-in-out;
    content: "moveable";
    opacity: 0;
    position: absolute;
    padding: 4px 8px;
    top: -40px;
    left: 50%;
    transform: translateX(-50%);
    background: #646464;
    color: white;
    font-size: 14px;
  }

  &:hover {
    box-shadow: 0 6px 6px 0 rgba(0, 0, 0, 0.1);
    &:before {
      opacity: 1;
    }
    &:after {
      opacity: 1;
    }
  }
`;
