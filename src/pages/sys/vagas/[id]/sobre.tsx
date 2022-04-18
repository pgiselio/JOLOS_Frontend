import {
  AlertDialog,
  AlertDialogDescription,
  AlertDialogLabel,
} from "@reach/alert-dialog";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { useVaga } from ".";
import {
  Box,
  BoxContent,
  BoxMessage,
  BoxTitle,
} from "../../../../components/box";
import { Button } from "../../../../components/button";
import CircularProgressFluent from "../../../../components/circular-progress-fluent";
import { useAuth } from "../../../../hooks/useAuth";
import { api } from "../../../../services/api";
import { queryClient } from "../../../../services/queryClient";

export function VagaSobrePage() {
  const { data } = useVaga();
  const auth = useAuth();
  const isAluno = auth.type === "ALUNO";
  const [showDialog, setShowDialog] = useState(false);
  const openDialog = () => setShowDialog(true);
  const closeDialog = () => setShowDialog(false);
  const cancelRef = useRef(null);
  async function encerrarInscricoes() {
    closeDialog();
    if (!data) {
      return;
    }
    await api.patch(`/vaga/${data.id}`, { "status" : "INATIVO" });
    queryClient.invalidateQueries([`vaga-${data.id}`]);
    queryClient.invalidateQueries("vagas");
    toast.success("Vaga encerrada com sucesso!");
  }

  if (!data) {
    return (
      <p
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          paddingTop: "30px",
        }}
      >
        <CircularProgressFluent
          color="var(--accent-color)"
          height="30px"
          width="30px"
          duration=".9s"
        />
        Carregando...
      </p>
    );
  }
  return (
    <div className={!isAluno ? "vaga-columns-2" : ""}>
      <div className="column-1">
        <Box>
          <BoxTitle>Sobre a vaga</BoxTitle>
          <BoxContent>
            <div className="vaga-page-description">{data.descricao}</div>
          </BoxContent>
        </Box>
      </div>

      {((!isAluno && auth.userInfo?.id === data.empresa?.id) ||
        (!auth.userInfo?.aluno && !auth.userInfo?.empresa)) && (
        <div className="column-2">
          <Box>
            <BoxTitle>
              <h3>
                <i className="fas fa-exclamation-triangle"></i> Ações
              </h3>
            </BoxTitle>
            {data.status ? (
              <BoxContent>
                <div className="vaga-page-actions">
                  <Button className="red less-radius" onClick={openDialog}>
                    Fechar inscrições
                  </Button>
                  {showDialog && (
                    <AlertDialog
                      leastDestructiveRef={cancelRef}
                      className="small"
                    >
                      <AlertDialogLabel>
                        Tem certeza que deseja desativar esta vaga?
                      </AlertDialogLabel>

                      <AlertDialogDescription>
                        Uma vez desativada, esta ação não poderá ser desfeita. 
                        Ninguém mais poderá se inscrever
                        e ela nem poderá mais ser editada.
                      </AlertDialogDescription>

                      <div
                        className="alert-buttons"
                        data-reach-alert-dialog-actions
                      >
                        <Button
                          className="secondary less-radius"
                          onClick={encerrarInscricoes}
                        >
                          Sim
                        </Button>
                        <br />
                        <Button
                          className="less-radius"
                          ref={cancelRef}
                          onClick={closeDialog}
                        >
                          Cancelar
                        </Button>
                      </div>
                    </AlertDialog>
                  )}
                  <Button className="less-radius">Editar informações</Button>
                </div>
              </BoxContent>
            ) : (
              <span>
                <BoxMessage>
                  <span>Essa vaga já foi encerrada</span>
                </BoxMessage>
              </span>
            )}
          </Box>
        </div>
      )}
    </div>
  );
}
