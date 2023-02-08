import * as Accordion from "@radix-ui/react-accordion";

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
      <Accordion.Root type="single" defaultValue="item-1" collapsible>
        <Accordion.Item
          data-reach-accordion-item
          style={{ marginTop: 14 }}
          value="item-1"
        >
          <Accordion.Header>
            <Accordion.Trigger
              className="arrow-right"
              onClick={() => navigate("cadastrar/empresa")}
              data-reach-accordion-button
            >
              <h4>Cadastrar nova empresa</h4>
            </Accordion.Trigger>
          </Accordion.Header>
        </Accordion.Item>
      </Accordion.Root>
    </div>
  );
}
