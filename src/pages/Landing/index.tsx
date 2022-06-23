import {
  ParallaxBanner,
  ParallaxProvider,
} from "react-scroll-parallax";
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
                { image: 'images/waves.svg', speed: -20 },
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
          <section id="sec2">
            <div className="container">
              <button onClick={() => alert("HAHA!")}>CLICA AQUI O</button>
            </div>
          </section>
          <section id="sec3"></section>
          <section id="sec4"></section>
        </main>
        <footer className="landing-footer"></footer>
      </LandingStyle>
    </ParallaxProvider>
  );
}
