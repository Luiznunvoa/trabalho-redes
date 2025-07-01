import styled from "styled-components";

export const StyledButton = styled.button`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0.25rem 2rem 0.25rem 2rem;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.12), 0px 0px 2px rgba(0, 0, 0, 0.08);
    background-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.onPrimary};
    border-radius: 5px;
    border: none;
    cursor: pointer
`;
