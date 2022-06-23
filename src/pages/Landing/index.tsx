import { Link } from "react-router-dom";
import { ParallaxBanner, ParallaxProvider } from "react-scroll-parallax";
import { Button } from "../../components/button";
import { LandNavBar } from "./navbar";
import { LandingGlobalStyle, LandingStyle } from "./styles";

export default function LandingPage() {
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
                },
              ]}
              style={{ aspectRatio: "2 / 1" }}
            />
          </section>

          <section className="cursos-section" id="sec2"></section>
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
              <h1>A equipe que desenvolveu tudo do zero</h1>
              <div className="equipe">
                <div className="pessoa">
                  <img
                    src="images/equipe/Lucas.jpg"
                    alt=""
                    className="picture"
                  />
                  <div className="info">
                    <h3>Lucas Mateus</h3>
                    <span>Back-end dev e idealizador dessa bagaça</span>
                    <a href="https://github.com/Lucas-dev-back" target="_blank" rel="noreferrer">
                      <i className="fa-brands fa-github"></i>
                    </a>
                  </div>
                </div>
                <div className="pessoa">
                  <img
                    src="images/equipe/Pedro.jpg"
                    alt=""
                    className="picture"
                  />
                  <div className="info">
                    <h3>Pedro Gisélio</h3>
                    <span>Front-end dev e palpiteiro</span>
                    <a href="https://github.com/pgiselio" target="_blank" rel="noreferrer">
                      <i className="fa-brands fa-github"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <footer className="landing-footer"></footer>
      </LandingStyle>
    </ParallaxProvider>
  );
}
