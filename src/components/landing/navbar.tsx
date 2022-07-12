import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { LandingHeader } from "./styles";
import { Link } from "react-scroll";

export function LandNavBar() {
  const [menuState, setMenuState] = useState(false);
  const [accessState, setAccessState] = useState(false);
  let navigate = useNavigate();
  const auth = useAuth();
  return (
    <>
      <LandingHeader className="landing navigate-container">
        <nav className="navigate">
          <div className="menu-container">
            <a href="/" className="logo-nav">
              <img src="images/logo.svg" alt="" />
            </a>
            <div className={"menu " + (menuState ? "active" : "")}>
              <ul>
                <LandBarItem
                  href="#sec1"
                  label="Sobre"
                  setMenuState={setMenuState}
                />
                <LandBarItem
                  href="#sec2"
                  label="Cursos"
                  setMenuState={setMenuState}
                />
                <LandBarItem
                  href="#sec3"
                  label="Aderir"
                  setMenuState={setMenuState}
                />
                <LandBarItem
                  href="#sec4"
                  label="Contato"
                  setMenuState={setMenuState}
                />
                <LandBarItem
                  href="#sec5"
                  label="Equipe"
                  setMenuState={setMenuState}
                />
              </ul>
            </div>
            <div className="acesso">
              {auth.email ? (
                <button
                  type="button"
                  className={"access-bt " + (accessState ? "active" : "")}
                  onClick={() => {
                    window.location.href = "sys";
                  }}
                >
                  Logado
                </button>
              ) : (
                <Acesso />
              )}
            </div>

            <div className="mobile-buttons">
              <button
                type="button"
                className={"access-bt " + (accessState ? "active" : "")}
                onClick={() => {
                  auth.email ? navigate("sys") : navigate("entrar");
                }}
              ></button>
              <div className={"acesso-mobile " + (accessState ? "active" : "")}>
                <Acesso />
              </div>
              <div
                id="botao-ham"
                className={"botao-ham " + (menuState && "active")}
                onClick={() => {
                  setMenuState(!menuState);
                  setAccessState(false);
                }}
              >
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </nav>
      </LandingHeader>
      <div
        className={"backshadow " + (accessState || menuState ? "active" : "")}
        onClick={() => {
          setMenuState(false);
          setAccessState(false);
        }}
      ></div>
    </>
  );
}
function LandBarItem({
  href,
  label,
  setMenuState,
}: {
  href: string;
  label: string;
  setMenuState: (bol: boolean) => void;
}) {
  return (
    <li>
      <Link
        activeClass="active"
        to={href.replace("#", "")}
        spy={true}
        smooth={true}
        offset={-80}
        duration={500}
        onClick={() => {
          setMenuState(false);
        }}
      >
        {label}
      </Link>
    </li>
  );
}

function Acesso() {
  return (
    <>
      <a href="entrar" className="login-bt">
        Login
      </a>
      <a href="cadastro" className="signup-bt">
        Cadastro
      </a>
    </>
  );
}
