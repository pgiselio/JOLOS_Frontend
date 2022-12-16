import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ParallaxBanner, ParallaxProvider } from "react-scroll-parallax";
import { Button } from "../components/button";
import { LandNavBar } from "../components/landing/navbar";
import { LandingGlobalStyle, LandingStyle } from "../components/landing/styles";
import { useAuth } from "../hooks/useAuth";
import { TagCloud } from "react-tagcloud";

export default function LandingPage() {
  const auth = useAuth();
  useEffect(() => {
    if (auth.userInfo?.email) {
      window.location.href = "sys";
    }
  });
  const data = [
    { value: "Administração", count: 25 },
    { value: "Informática", count: 30 },
    { value: "Eletrotécnica", count: 38 },
    { value: "Física", count: 38 },
    { value: "Energias Renováveis", count: 28 },
  ];
  const options = {
    luminosity: "light",
    hue: "green",
  };
  return (
    <ParallaxProvider>
      <LandingStyle>
        <LandNavBar />
        <LandingGlobalStyle />
        <main className="landing-main">
          <section className="hello-section" id="sec1">
            <ParallaxBanner
              className="parallax"
              layers={[
                { image: "images/waves.svg", speed: -20 },
                {
                  children: (
                    <div className="container">
                      <h1>Olá!👋</h1>
                      <p>
                        Somos uma plataforma de oportunidades voltada para
                        alunos e ex-alunos do IFRN Campus João Câmara. Surgimos
                        com o objetivo de estreitar os laços entre as empresas,
                        tornando o processo de divulgação de vagas e de
                        contratação mais centrado, fácil e ágil.
                      </p>
                    </div>
                  ),
                  speed: -30,
                  className: "layer-1",
                  scale: [1.5, 0.5],
                  opacity: [2, 0],
                },
              ]}
              style={{ aspectRatio: "2 / 1" }}
            />
          </section>

          <section className="cursos-section" id="sec2">
            <div className="container" style={{maxWidth: 500,}}>
              <TagCloud
                minSize={20}
                maxSize={35}
                colorOptions={options}
                tags={data}
                shuffle
                onClick={(tag: any) => console.log("clicking on tag:", tag)}
              />
            </div>
          </section>
          <section className="aderir-section" id="sec3">
            <div className="container">
              <img
                src="images/undraw_job_hunt_re_q203.svg"
                alt=""
                className="img-job-hunt"
              />
              <h1>Se interessou?</h1>
              <div className="options">
                <div className="option">
                  <h2>É aluno ou ex-aluno?</h2>
                  <Link to="/cadastro">
                    <Button className="outlined">Cadastre-se</Button>
                  </Link>
                </div>
                <div className="option">
                  <h2>É uma empresa?</h2>
                  <Link to="/cadastro?tab=EMPRESA">
                    <Button className="outlined">Faça o pré-cadastro</Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <section id="sec4">
            <h3>Contatos aqui em</h3>
          </section>

          <section className="equipe-section" id="sec5">
            <div className="container">
              <h1>A equipe fundadora</h1>
              <div className="equipe">
                <div className="pessoa">
                  <img
                    src="images/landing/equipe/Lucas.jpg"
                    alt=""
                    className="picture"
                  />
                  <div className="info">
                    <h3>Lucas Mateus</h3>
                    <span>Back-end dev javeiro</span>
                    <a
                      href="https://github.com/Lucas-dev-back"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fa-brands fa-github"></i>
                    </a>
                  </div>
                </div>
                <div className="pessoa">
                  <img
                    src="images/landing/equipe/Pedro.jpg"
                    alt=""
                    className="picture"
                  />
                  <div className="info">
                    <h3>Pedro Gisélio</h3>
                    <span>Front-end dev e palpiteiro</span>
                    <a
                      href="https://github.com/pgiselio"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fa-brands fa-github"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <footer className="landing-footer">
          <img src="images/landing/IFRNJC.png" alt="" />
          <img src="images/landing/coex.png" alt="" />
        </footer>
      </LandingStyle>
    </ParallaxProvider>
  );
}
