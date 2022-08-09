import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useOutletContext, useParams } from "react-router-dom";

import Error404 from "../../../404";
import { TabsMenu, TabsMenuItem } from "../../../../components/tabs-menu";
import { vaga } from "../../../../types/vagaType";
import { useQuery } from "react-query";
import { api } from "../../../../services/api";
import { Skeleton } from "../../../../components/skeleton-load";
import { ProfilePic } from "../../../../components/profile-pic/profile-pic";
import { VagaPageStyle } from "./styles";
import { PillItem, PillList } from "../../../../components/pill";
import { Button } from "../../../../components/button";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { queryClient } from "../../../../services/queryClient";

import { useAuth } from "../../../../hooks/useAuth";
import {
  AlertDialog,
  AlertDialogDescription,
  AlertDialogLabel,
} from "@reach/alert-dialog";

export default function VagaPage() {
  const auth = useAuth();
  let params = useParams();
  
  const [showDialog, setShowDialog] = useState(false);
  const [isCandidatoSubscribed, setIsCandidatoSubscribed] = useState(false);
  const [showUnsubDialog, setShowUnsubDialog] = useState(false);

  let subscribeBtnRef = useRef<HTMLButtonElement>(null);
  const openUnsubDialog = () => setShowUnsubDialog(true);
  const closeUnsubDialog = () => setShowUnsubDialog(false);
  const { data, isFetching } = useQuery<vaga>(
    [`vaga-${params.id}`],
    async () => {
      const response = await api
        .get(`/vaga/lista/${params.id}`)
        .catch((error) => (error.response.status === 400 ? null : error));
      return response?.data;
    },
    {
      refetchOnWindowFocus: false,
    }
  );
  const { handleSubmit } = useForm({
    defaultValues: {
      id: "",
    },
  });
  
  
  const cancelUnsubRef = useRef(null);
  function inscreverOuDesinscreverAluno() {
    if (
      !(
        auth.userInfo?.aluno?.dadosPessoa &&
        (data?.status === "INATIVO" ||
          data?.cursoAlvo.localeCompare(
            auth.userInfo?.aluno?.curso,
            undefined,
            {
              sensitivity: "accent",
            }
          ))
      )
    ) {
      if (isCandidatoSubscribed) {
        openUnsubDialog();
      } else {
        inscreverAluno();
      }
    } else {
      toast.error(subscribeBtnRef.current?.title, {
        position: "bottom-center",
        hideProgressBar: true,
        toastId: "subscribe-btn-disabled",
      });
    }
  }
  async function inscreverAluno() {
    await api
      .patch(`/vaga/${params.id}/addAluno/${auth.userInfo?.aluno?.id}`)
      .then(() => {
        toast.success("Você se increveu na vaga!", {
          position: "bottom-center",
          hideProgressBar: true,
        });
        queryClient.invalidateQueries([`vaga-${params.id}`]);
        queryClient.invalidateQueries("vagas");
      });
  }
  async function desinscreverAluno() {
    closeUnsubDialog();
    await api
      .patch(`/vaga/${params.id}/removeAluno/${auth.userInfo?.aluno?.id}`)
      .then(() => {
        toast.info("Você se desinscreveu da vaga!", {
          position: "bottom-center",
          hideProgressBar: true,
        });
        queryClient.invalidateQueries([`vaga-${params.id}`]);
        queryClient.invalidateQueries("vagas");
      });
  }

  useEffect(() => {
    if (auth.userInfo?.id && data?.alunos.includes(auth.userInfo?.id)) {
      setIsCandidatoSubscribed(true);
    } else {
      setIsCandidatoSubscribed(false);
    }
  }, [auth.userInfo?.id, data?.alunos]);


  const cancelRef = useRef(null);
  const openDialog2 = () => setShowDialog(true);
  const closeDialog2 = () => setShowDialog(false);
  function abrirEncerrarInscricoes() {
    if (data?.status === "ATIVO") {
      openDialog2();
    } else {
      abrirInscricoes();
    }
  }
  async function encerrarInscricoes() {
    closeDialog2();
    if (!data) {
      return;
    }
    await api.patch<vaga>(`/vaga/${data.id}`, [
      {
        op: "replace",
        path: "/status",
        value: "INATIVO",
      },
    ]);
    queryClient.invalidateQueries([`vaga-${data.id}`]);
    queryClient.invalidateQueries("vagas");
    toast.success("Vaga encerrada com sucesso!", { toastId: "vaga-encerrada" });
  }
  async function abrirInscricoes() {
    if (!data) {
      return;
    }
    await api.patch<vaga>(`/vaga/${data.id}`, [
      {
        op: "replace",
        path: "/status",
        value: "ATIVO",
      },
    ]);
    queryClient.invalidateQueries([`vaga-${data.id}`]);
    queryClient.invalidateQueries("vagas");
    toast.success("Incrições reabertas com sucesso!", {
      toastId: "vaga-aberta",
    });
  }

  let date;
  let dateFormatted;
  if (data) {
    date = new Date(data.dataCriacao);
    dateFormatted = new Intl.DateTimeFormat(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date.getTime() + Math.abs(date.getTimezoneOffset() * 60000));
  } else if (!isFetching) {
    return <Error404 />;
  }

  return (
    <>
      {/* <div className="tree-links"></div> */}
      <VagaPageStyle>
        <div className="vaga-page-header-container content">
          <div className="vaga-page-header ">
            <div className="empresa-info">
              {!data && isFetching ? (
                <>
                  <Skeleton variant="circle" width="60px" height="60px" />
                </>
              ) : (
                <>
                  <ProfilePic userId={data?.empresa.id}/>
                </>
              )}
            </div>
            {!data && isFetching ? (
              <>
                <Skeleton variant="text" width="300px" height="43px" />
                <Skeleton variant="text" width="150px" height="25px" />
              </>
            ) : (
              <>
                <h2>{data?.titulo}</h2>
                <Link to={`../profile/${data?.empresa?.id}`}>
                  {data?.empresa?.dadosPessoa.nome}
                </Link>
              </>
            )}
            <div className="subscribe">
              <div
                className={
                  "vaga-status " + (data?.status === "ATIVO" ? "enabled" : "")
                }
              >
                {data?.status === "ATIVO" ? "ATIVO" : "INATIVO"}
              </div>
              {data &&
                ((!auth.authorities?.includes("ALUNO") &&
                  auth.userInfo?.id === data.empresa?.id) ||
                  auth.authorities?.includes("ADMIN")) && (
                  <Button
                    className={`less-radius ${
                      data.status === "ATIVO" ? "red" : "secondary"
                    }`}
                    onClick={abrirEncerrarInscricoes}
                  >
                    {data.status === "ATIVO"
                      ? "Encerrar inscrições"
                      : "Reabrir inscrições"}
                  </Button>
                )}
              {showDialog && (
                <AlertDialog leastDestructiveRef={cancelRef} className="small">
                  <AlertDialogLabel>
                    Tem certeza que deseja desativar esta vaga?
                  </AlertDialogLabel>

                  <AlertDialogDescription>
                    A vaga não poderá ser editada e nem aceitará novas
                    inscrições, mas continuará sendo visível para todos.
                  </AlertDialogDescription>

                  <div
                    className="alert-buttons"
                    data-reach-alert-dialog-actions
                  >
                    <br />
                    <Button
                      className="secondary "
                      ref={cancelRef}
                      onClick={closeDialog2}
                    >
                      Cancelar
                    </Button>
                    <Button className=" red" onClick={encerrarInscricoes}>
                      Sim
                    </Button>
                  </div>
                </AlertDialog>
              )}
              {auth.userInfo?.aluno?.dadosPessoa && (
                <form
                  action=""
                  onSubmit={handleSubmit(inscreverOuDesinscreverAluno)}
                >
                  <Button
                    type="submit"
                    ref={subscribeBtnRef}
                    className={`less-radius ${
                      isCandidatoSubscribed ? "red" : ""
                    }`}
                    {...((data?.status === "INATIVO" ||
                      data?.cursoAlvo.localeCompare(
                        auth.userInfo?.aluno?.curso,
                        undefined,
                        { sensitivity: "accent" }
                      )) && {
                      disabled: true,
                      title:
                        data?.status === "INATIVO"
                          ? "A vaga não aceita novas inscrições"
                          : "Voce não está no curso alvo para esta vaga",
                      onTouchEnd: () =>
                        toast.error(subscribeBtnRef.current?.title, {
                          position: "bottom-center",
                          hideProgressBar: true,
                          toastId: "subscribe-btn-disabled",
                        }),
                    })}
                  >
                    <span>
                      {isCandidatoSubscribed
                        ? "Desinscrever-se"
                        : "Inscrever-se"}
                    </span>
                  </Button>
                  {showUnsubDialog && (
                    <AlertDialog
                      leastDestructiveRef={cancelRef}
                      className="small"
                    >
                      <AlertDialogLabel>
                        Tem certeza que deseja se desinscrever desta vaga?
                      </AlertDialogLabel>

                      <div
                        className="alert-buttons"
                        data-reach-alert-dialog-actions
                      >
                        <Button
                          className="secondary"
                          onClick={desinscreverAluno}
                        >
                          Sim
                        </Button>
                        <br />
                        <Button ref={cancelUnsubRef} onClick={closeUnsubDialog}>
                          Cancelar
                        </Button>
                      </div>
                    </AlertDialog>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
        <TabsMenu sticky size="medium" isOntop className="tabs">
          <TabsMenuItem to="" title="Detalhes" end />
          <TabsMenuItem
            to="candidatos"
            title="Candidatos"
            highlighted={data ? data?.alunos.length + "" : ""}
          />
        </TabsMenu>
        <div className="content">
          <div className="vaga-page-info">
            <PillList style={{ marginTop: 10 }}>
              <PillItem>
                <i className="fas fa-calendar-day"></i>
                {!data && isFetching ? (
                  <Skeleton variant="text" width="130px" height="25px" />
                ) : (
                  <span>{dateFormatted}</span>
                )}
              </PillItem>
              <PillItem>
                <i className="fas fa-map-marker-alt"></i>
                {!data && isFetching ? (
                  <Skeleton variant="text" width="150px" height="25px" />
                ) : (
                  <span>{data?.localizacao}</span>
                )}
              </PillItem>
              <PillItem>
                <i className="fas fa-book-open"></i>
                {!data && isFetching ? (
                  <Skeleton variant="text" width="150px" height="25px" />
                ) : (
                  <span>{data?.cursoAlvo}</span>
                )}
              </PillItem>
            </PillList>
          </div>
          <div className="vaga-navigation">
            {!data && isFetching ? (
              <Skeleton
                variant="square"
                width="100%"
                height="300px"
                style={{ marginTop: "20px" }}
              />
            ) : (
              <Outlet context={{ data }} />
            )}
          </div>
        </div>
      </VagaPageStyle>
    </>
  );
}
type ContextType = {
  data: vaga;
};
export function useVaga() {
  return useOutletContext<ContextType>();
}
