import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useOutletContext, useParams } from "react-router-dom";

import Error404 from "../../../404";
import { TabsMenu, TabsMenuItem } from "../../../../components/tabs-menu";
import { vaga } from "../../../../types/vagaType";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../services/api";
import { Skeleton } from "../../../../components/skeleton-load";
import { ProfilePic } from "../../../../components/profile-pic/profile-pic";
import { VagaPageStyle } from "./styles";
import { PillItem, PillList } from "../../../../components/pill";
import { Button } from "../../../../components/button";
import { toast } from "react-toastify";

import { useAuth } from "../../../../hooks/useAuth";

import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useVagas } from "../../../../hooks/useVagas";
import CircularProgressFluent from "../../../../components/circular-progress-fluent";

export default function VagaPage() {
  const auth = useAuth();
  const useVaga = useVagas();
  let params = useParams();

  const [showDialog, setShowDialog] = useState(false);
  const [isCandidatoSubscribed, setIsCandidatoSubscribed] = useState(false);
  const [showUnsubDialog, setShowUnsubDialog] = useState(false);
  const [isOpenCloseOnProgress, setIsOpenCloseOnProgress] = useState(false);


  const subscribeBtnRef = useRef<HTMLButtonElement>(null);

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
        subscribeBtnRef.current &&
          subscribeBtnRef.current.setAttribute("disabled", "");
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
    if (!auth.userInfo?.aluno?.id || !params.id) return;
    useVaga.subscribe({
      vagaId: params.id,
      candidatoId: auth.userInfo?.aluno?.id,
    });
  }
  async function desinscreverAluno() {
    closeUnsubDialog();
    if (!auth.userInfo?.aluno?.id || !params.id) return;
    useVaga.unsubscribe({
      vagaId: params.id,
      candidatoId: auth.userInfo?.aluno?.id,
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
  const closeDialog2 = () => {
    setShowDialog(false);
  };
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
    setIsOpenCloseOnProgress(true);
    await useVaga.close(data.id);
    setIsOpenCloseOnProgress(false);
  }
  async function abrirInscricoes() {
    if (!data) {
      return;
    }
    setIsOpenCloseOnProgress(true);
    await useVaga.open(data.id);
    setIsOpenCloseOnProgress(false);
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
      <VagaPageStyle>
        <div className="vaga-page-header-container content">
          <div className="vaga-page-header ">
            <div className="empresa-info">
              {!data && isFetching ? (
                <>
                  <Skeleton variant="square" className="profile-pic"/>
                </>
              ) : (
                <>
                  <ProfilePic userId={data?.empresa.id} isCompany/>
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
                    {...((isFetching || isOpenCloseOnProgress) && {
                      disabled: true,
                    })}
                  >
                    {isOpenCloseOnProgress && (
                      <CircularProgressFluent height={20} width={20} color="white" duration=".5s"/>
                    )}
                    {data.status === "ATIVO"
                      ? "Encerrar inscrições"
                      : "Reabrir inscrições"}   
                  </Button>
                )}
              {showDialog && (
                <AlertDialog.Root defaultOpen >
                  <AlertDialog.Portal>
                    <AlertDialog.Overlay className="AlertDialogOverlay" />
                    <AlertDialog.Content className="AlertDialogContent">
                      <AlertDialog.Title className="AlertDialogTitle">
                        Tem certeza que deseja desativar esta vaga?
                      </AlertDialog.Title>
                      <AlertDialog.Description className="AlertDialogDescription">
                        A vaga não poderá ser editada e nem aceitará novas
                        inscrições, mas continuará sendo visível para todos.
                      </AlertDialog.Description>
                      <div
                        className="alert-buttons AlertDialogActions"
                        data-reach-alert-dialog-actions
                      >
                        <AlertDialog.Cancel asChild>
                          <Button
                            className="secondary "
                            ref={cancelRef}
                            onClick={closeDialog2}
                          >
                            Cancelar
                          </Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action asChild>
                          <Button className=" red" onClick={encerrarInscricoes}>
                            Sim
                          </Button>
                        </AlertDialog.Action>
                      </div>
                    </AlertDialog.Content>
                  </AlertDialog.Portal>
                </AlertDialog.Root>
              )}
              {auth.userInfo?.aluno?.dadosPessoa && (
                <>
                  <Button
                    type="submit"
                    ref={subscribeBtnRef}
                    onClick={inscreverOuDesinscreverAluno}
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
                    {...(isFetching && {
                      disabled: true,
                    })}
                  >
                    <span>
                      {isCandidatoSubscribed
                        ? "Desinscrever-se"
                        : "Inscrever-se"}
                    </span>
                  </Button>
                  {showUnsubDialog && (
                    <AlertDialog.Root defaultOpen>
                      <AlertDialog.Portal>
                        <AlertDialog.Overlay className="AlertDialogOverlay" />
                        <AlertDialog.Content className="AlertDialogContent">
                          <AlertDialog.Title className="AlertDialogTitle">
                            Tem certeza que deseja se desinscrever desta vaga?
                          </AlertDialog.Title>
                          <div
                            className="alert-buttons AlertDialogActions"
                          >
                            <AlertDialog.Cancel asChild>
                              <Button
                                ref={cancelUnsubRef}
                                onClick={closeUnsubDialog}
                                className="secondary"
                              >
                                Cancelar
                              </Button>
                            </AlertDialog.Cancel>
                            <AlertDialog.Action asChild>
                              <Button
                                className="red"
                                onClick={desinscreverAluno}
                              >
                                Sim
                              </Button>
                            </AlertDialog.Action>
                          </div>
                        </AlertDialog.Content>
                      </AlertDialog.Portal>
                    </AlertDialog.Root>
                  )}
                  </>
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
