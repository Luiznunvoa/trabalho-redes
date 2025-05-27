import { Link } from "react-router-dom";
import { StyledHeader } from "./index.styles";
import { logo } from "../../assets";

export function Header() {
  return (
    <StyledHeader>
      <div>
        <Link to={{ pathname: "/", }}>
          <img src={logo} />
          <h1>SuperChat</h1>
        </Link>
      </div>
    </StyledHeader>
  );
}
