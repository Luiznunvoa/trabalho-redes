import { Outlet } from "react-router-dom";
import { Header } from "../../components/header"
import { StyledMain } from "./index.styles";

export const DefaultLayout = () => {
  return (
    <>
      <Header />
      <StyledMain>
        <Outlet />
      </StyledMain>
    </>
  );
};

export const DashboardLayout = () => {
  return (
    <>
      <StyledMain>
        <Outlet />
      </StyledMain>
    </>
  );
}
