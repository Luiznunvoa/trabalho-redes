import styled from "styled-components";

export const StyledAlertContaienr = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-height: 2rem;
`

export const StyledAlert = styled.span`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0.25rem 2rem 0.25rem 2rem;
    font-size: 1rem;
    // box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.12), 0px 0px 2px rgba(0, 0, 0, 0.08);
    background-color: ${(props) => props.theme.colors.alert};
    color: ${(props) => props.theme.colors.onPrimary};
    font-family: "Jost", sans-serif;
    border-radius: 5px;
    border: none;
    cursor: pointer
`;
