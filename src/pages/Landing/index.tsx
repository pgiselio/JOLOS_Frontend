import { LandNavBar } from "./navbar";
import { LandingStyle } from "./style";

export default function LandingPage() {
    return (
        <LandingStyle>
            <LandNavBar />
            <main className="landing-main">
                <section id="1">
                    CARROUSEL
                </section>
                <section id="2">
                    <button onClick={()=> alert("SIMMMM")}>CLICA AQUI O</button>
                </section>
                <section id="3">

                </section>
                <section id="4">

                </section>
            </main>
            <footer className="landing-footer">

            </footer>
        </LandingStyle>
    );
}