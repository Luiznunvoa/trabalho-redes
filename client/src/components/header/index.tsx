import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSessionStore } from "../../stores/useSessionStore";
import { logo } from "../../assets";
import { StyledHeader } from "./index.styles";

export function Header() {
  const { authenticated } = useSessionStore();
  const [links, setLinks] = useState([
    { path: "/", label: "What's SuperChat?" },
    { path: "/", label: "Help" },
    { path: "/", label: "Blog" },
    { path: "/", label: "Donate" }
  ]);

  useEffect(() => {
    if (!authenticated) {
      setLinks((prev) => {
        const loginExists = prev.some(link => link.path === "/login");
        if (!loginExists) {
          return [...prev, { path: "/login", label: "Login!" }];
        }
        return prev;
      });
    } else {
      // Remove o campo login se for autenticado
      setLinks((prev) => prev.filter(link => link.path !== "/login"));
    }
  }, [authenticated]);

  return (
    <StyledHeader>
      <div>
        <Link to="/">
          <img src={logo} alt="SuperChat logo" />
          <h1>SuperChat</h1>
        </Link>
      </div>
      <div>
        {links.map((link) => (
          <Link key={link.label} to={link.path}>
            <p>{link.label}</p>
          </Link>
        ))}
      </div>
    </StyledHeader>
  );
}

