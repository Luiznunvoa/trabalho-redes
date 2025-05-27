import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSessionStore } from "../../stores/useSessionStore";
import { logo } from "../../assets";
import { StyledHeader } from "./index.styles";

export function Header() {
  const { authenticated } = useSessionStore();
  const [links, setLinks] = useState([
    {
      path: "/",
      label: "What's SuperChat?"
    },
    {
      path: "/",
      label: "Help"
    },
    {
      path: "/",
      label: "Blog"
    },
    {
      path: "/",
      label: "Donate"
    }
  ]);

  useEffect(() => {
    if (!authenticated) {
      setLinks((prev) => [...prev, { path: "/login", label: "Login!" }]);
    }
  }, [authenticated]);

  return (
    <StyledHeader>
      <div>
        <Link to={{ pathname: "/", }}>
          <img src={logo} />
          <h1>SuperChat</h1>
        </Link>
      </div>
      <div>
        {links.map((link) => (
          <Link to={{ pathname: link.path }}>
            <p>{link.label}</p>
          </Link>
        ))}
      </div>
    </StyledHeader>
  );
}
