import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useIntersection } from "../../hooks/useIntersection";
import { LandingHeader } from "./styles";

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
                  label="Tadah"
                  setMenuState={setMenuState}
                />
                <LandBarItem
                  href="#sec3"
                  label="Cursos"
                  setMenuState={setMenuState}
                />
                <LandBarItem
                  href="#sec4"
                  label="Contato"
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
function LandBarItem({ href, label, setMenuState }: any) {
  let ref = useRef(document.querySelector(href));
  let inViewport = useIntersection(ref, '0px');
  function scrollToId(e : any) {
    e.preventDefault();
    setMenuState(false);
    const to = document.querySelector(e.target.getAttribute("href") + "");
    console.log(to)
    to?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  let section = document.querySelector(href + "");
  console.log(inViewport);
  
  return (
    <li>
      <a
        href={href}
        onClick={
          scrollToId
        }
        {...inViewport ? {className: "active"} : {}}
      >
        {label}
      </a>
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
