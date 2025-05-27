import styled from "styled-components";

export const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.12), 0px 0px 2px rgba(0, 0, 0, 0.08);
    gap: 1rem;
`;

export const StyledContainerHeader = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const StyledContainerForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 2rem;
    gap: 1rem;

    div {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 1rem;
    }

    input {
      height: 2rem;
      font-size: 1.25rem;

    }
`;
