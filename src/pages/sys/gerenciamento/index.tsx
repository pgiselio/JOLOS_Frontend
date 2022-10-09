import { Accordion, AccordionButton, AccordionItem } from "@reach/accordion";
// import { useQuery } from "@tanstack/react-query";
// import { api } from "../../../services/api";
import { useNavigate } from "react-router-dom";

export default function GerenciamentoPage() {
  const navigate = useNavigate();
  // const { data } = useQuery(
  //   "GerenciamentoUsuariosList",
  //   async () => {
  //     const response = await api.get("/usuario/");
  //     return response.data;
  //   },
  //   {
  //     staleTime: 1000 * 60, // 1 minute to refetch
  //   }
  // );
  return (
    <div className="content">
      <Accordion>
        <AccordionItem style={{ marginTop: 14 }}>
          <AccordionButton
            className="arrow-right"
            onClick={() => navigate("cadastrar/empresa")}
          >
            <h4>Cadastrar nova empresa</h4>
          </AccordionButton>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
