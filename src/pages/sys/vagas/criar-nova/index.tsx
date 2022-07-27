import { Box, BoxContent, BoxTitle } from "../../../../components/box";
import { Button } from "../../../../components/button";
import { useAuth } from "../../../../hooks/useAuth";
import { CriarNovaVagaForm } from "./_form";

export default function CriarNovaVagaPage() {
  const auth = useAuth();
  if (auth?.authorities?.includes("ALUNO")) {
    return <h2>SEM PERMISÃO</h2>;
  }
  return (
    <section>
      <div className="content">
        <Box>
          <BoxTitle>
            <h3>Criar nova vaga</h3>
          </BoxTitle>
          <BoxContent>
            <CriarNovaVagaForm />
          </BoxContent>
        </Box>
      </div>
    </section>
  );
}
