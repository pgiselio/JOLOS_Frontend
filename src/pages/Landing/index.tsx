import { Parallax } from "react-parallax";
import { LandNavBar } from "./navbar";
import { LandingGlobalStyle, LandingStyle } from "./styles";

export default function LandingPage() {
  return (
    <LandingStyle>
      <LandNavBar />
      <LandingGlobalStyle />
      <main className="landing-main">
        <Parallax
          bgImage={"images/waves.svg"}
          bgImageAlt="the dog"
          strength={window.innerHeight * 0.9}
          style={{ width: "100%" }}
        >
          <section className="hello-section" id="sec1">
            <div className="container">
              <h1>Olá!👋</h1>
              <p>
                Somos uma plataforma de oportunidades voltada para alunos e
                ex-alunos do IFRN Campus João Câmara. Surgimos com o objetivo de
                estreitar os laços entre as empresas, tornando o processo de
                divulgação de vagas e de contratação mais centrado e formal, não
                dependendo daquela coisa de boca-a-boca por mensagens.
              </p>
            </div>
          </section>
        </Parallax>

        <section id="sec2">
          <button onClick={() => alert("HAHA!")}>CLICA AQUI O</button>
        </section>
        <section id="sec3"></section>
        <section id="sec4"></section>
      </main>
      <footer className="landing-footer"></footer>
    </LandingStyle>
  );
}
