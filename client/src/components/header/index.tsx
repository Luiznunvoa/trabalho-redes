
import { Link } from "react-router-dom";
import { StyledHeader, StyledLinks } from "./index.styles";

export function Header() {
  const links: { path: string, label: string}[] = [
    { path: "/", label: "Sobre Nós" }
  ]


  return (
    <StyledHeader>
      <div>
        <Link to="/">
          <h1>SuperChat</h1>
        </Link>
      </div>
      <StyledLinks>
        {links.map((link) => (
          <Link key={link.label} to={link.path}>
            <p>{link.label}</p>
          </Link>
        ))}
      </StyledLinks>
    </StyledHeader>
  );
}

