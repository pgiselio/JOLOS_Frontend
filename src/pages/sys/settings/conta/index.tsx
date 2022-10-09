import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from "@reach/accordion";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import CircularProgressFluent from "../../../../components/circular-progress-fluent";
import { FabButton } from "../../../../components/fab";
import { Input } from "../../../../components/input";
import LabelWithData from "../../../../components/label-data";
import { ProfilePic } from "../../../../components/profile-pic/profile-pic";
import { useAuth } from "../../../../hooks/useAuth";
import { api } from "../../../../services/api";
import { queryClient } from "../../../../services/queryClient";
import { CurriculoForm } from "./_curriculoForm";
import { isBlank } from "../../../../utils/isBlank";
import { Modal } from "../../../../components/modal";
import { ProfilePictureForm } from "./_porfilePictureForm";
import { Button } from "../../../../components/button";
import { ModalBottom } from "../../../../components/modal/style";
import {
  CursosSelectOptions,
  UFsSelectOptions,
} from "../../../../utils/selectLists";
import { CustomSelect } from "../../../../components/select";

export default function SettingContaPage() {
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showModalPic, setShowModalPic] = useState(false);
  const [showModalCurriculo, setShowModalCurriculo] = useState(false);
  let unidadesFederativas = UFsSelectOptions.map(({ value }) => value);

  const {
    control,
    formState: { isDirty, errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      nome:
        auth.userInfo?.aluno?.dadosPessoa.nome ||
        auth.userInfo?.empresa?.dadosPessoa.nome,
      resumo:
        auth.userInfo?.aluno?.resumo || auth.userInfo?.empresa?.resumo || "",
      facebook: auth.userInfo?.empresa?.redesSociais?.facebook || "",
      instagram: auth.userInfo?.empresa?.redesSociais?.instagram || "",
      linkedin: auth.userInfo?.empresa?.redesSociais?.linkedin || "",
      twitter: auth.userInfo?.empresa?.redesSociais?.twitter || "",
      telefone: auth.userInfo?.empresa?.telefone || "",
      uf:
        auth.userInfo?.empresa?.dadosPessoa?.localizacao.split("/")[1] ||
        auth.userInfo?.aluno?.dadosPessoa?.localizacao.split("/")[1],
      cidade:
        auth.userInfo?.empresa?.dadosPessoa?.localizacao.split("/")[0] ||
        auth.userInfo?.aluno?.dadosPessoa?.localizacao.split("/")[0],
      curso: auth.userInfo?.aluno?.curso || "",
      periodo: auth.userInfo?.aluno?.periodo || "",
      empresaSite: auth.userInfo?.empresa?.linkSite || "",
    },
  });
  async function onSubmit(data: any) {
    setIsLoading(true);
    await api
      .patch(
        `/usuario/${auth.userInfo?.id}`,
        auth.userInfo?.aluno?.id
          ? [
              {
                op: "replace",
                path: "/aluno/dadosPessoa/nome",
                value: data.nome,
              },
              {
                op: "replace",
                path: "/aluno/curso",
                value: data.curso,
              },
              {
                op: "replace",
                path: "/aluno/periodo",
                value: data.periodo,
              },
              {
                op: "replace",
                path: "/aluno/dadosPessoa/localizacao",
                value: data.cidade.trim() + "/" + data.uf.trim().toUpperCase(),
              },
              {
                op: "replace",
                path: "/aluno/resumo",
                value: data.resumo,
              },
            ]
          : auth.userInfo?.empresa?.id
          ? [
              {
                op: "replace",
                path: "/empresa/dadosPessoa/nome",
                value: data.nome,
              },
              {
                op: "replace",
                path: "/empresa/dadosPessoa/localizacao",
                value: data.cidade.trim() + "/" + data.uf.trim().toUpperCase(),
              },
              {
                op: "replace",
                path: "/empresa/resumo",
                value: data.resumo,
              },
              {
                op: "replace",
                path: "/empresa/redesSociais/facebook",
                value: data.facebook.trim(),
              },
              {
                op: "replace",
                path: "/empresa/redesSociais/instagram",
                value: data.instagram.trim(),
              },
              {
                op: "replace",
                path: "/empresa/redesSociais/linkedin",
                value: data.linkedin.trim(),
              },
              {
                op: "replace",
                path: "/empresa/redesSociais/twitter",
                value: data.twitter.trim(),
              },
              {
                op: "replace",
                path: "/empresa/telefone",
                value: data.telefone,
              },
              {
                op: "replace",
                path: "/empresa/linkSite",
                value: data.empresaSite,
              },
            ]
          : null
      )
      .then((response) => {
        if (response.status === 200) {
          toast.success("Mudanças salvas com sucesso!");
        }
        queryClient.invalidateQueries(["meUser"]);
        queryClient.invalidateQueries(["profile" + auth.userInfo?.id]);
        queryClient.fetchQuery(["meUser"]);
      })
      .catch((err) => {
        if (err.status === 500) {
          toast.error("Ops... algo não deu certo!", {});
        }
        if (err.status === 403 || err.status === 401) {
          toast.error("Você não tem autorização para executar essa ação!");
        } else {
          toast.error("Ops... algo não deu certo!");
          console.error(err);
        }
      });
    setIsLoading(false);
  }

  function getFormattedDate(date: Date) {
    if (!date) {
      return;
    }
    date = new Date(date);
    let dateFormatted = new Intl.DateTimeFormat(undefined, {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date.getTime() + Math.abs(date.getTimezoneOffset() * 60000));
    return dateFormatted;
  }

  return (
    <>
      <div className="align-center">
        <div className="profile-pic-opts">
          <ProfilePic
            style={{ height: "100px" }}
            userId={auth.userInfo?.id + ""}
          />
          <button
            className="change-pic-btn"
            onClick={() => setShowModalPic(true)}
          >
            <i className="fa-solid fa-pencil"></i>
          </button>
        </div>
      </div>
      <Modal
        open={showModalPic}
        handleClose={() => setShowModalPic(false)}
        title="Editar foto de perfil"
      >
        <div className="flx flx-aic flx-jcc fdc" style={{ gap: 30 }}>
          <ProfilePictureForm />
          <ModalBottom>
            <Button
              type="button"
              onClick={() => setShowModalPic(false)}
              className="secondary"
            >
              Cancelar
            </Button>
            <Button type="submit" form="profile-pic-form">
              Salvar
            </Button>
          </ModalBottom>
        </div>
      </Modal>
      {(auth.userInfo?.aluno?.dadosPessoa.dataNasc ||
        auth.userInfo?.empresa?.dadosPessoa.dataNasc) && (
        <LabelWithData
          data={
            auth.userInfo?.aluno?.dadosPessoa.dataNasc
              ? getFormattedDate(auth.userInfo?.aluno?.dadosPessoa.dataNasc)
              : auth.userInfo?.empresa?.dadosPessoa.dataNasc
              ? getFormattedDate(auth.userInfo?.empresa?.dadosPessoa.dataNasc)
              : ""
          }
          label={`Data de ${
            auth.authorities?.includes("ALUNO") ? "nascimento" : "fundação"
          }:`}
          icon="fas fa-calendar-day"
        />
      )}

      <Accordion collapsible multiple>
        <form>
          <AccordionItem>
            <AccordionButton className="autohide-sub">
              <h4>Nome</h4>
              <span className="subtitle">
                {auth.userInfo?.aluno?.dadosPessoa.nome ||
                  auth.userInfo?.empresa?.dadosPessoa.nome}
              </span>
            </AccordionButton>
            <AccordionPanel>
              <Controller
                name="nome"
                control={control}
                render={({ field }) => (
                  <Input type="text" id="nome" {...field} />
                )}
              />
            </AccordionPanel>
          </AccordionItem>
          {auth?.authorities?.includes("ALUNO") && (
            <AccordionItem>
              <AccordionButton className="autohide-sub">
                <h4>Curso e período</h4>
                <span className="subtitle">
                  {auth.userInfo?.aluno?.curso + " "}
                  {auth.userInfo?.aluno?.periodo}º período
                </span>
              </AccordionButton>
              <AccordionPanel>
                <label htmlFor="change-courses">Curso: </label>
                <Controller
                  name={"curso"}
                  control={control}
                  render={({ field: { value, onChange, onBlur, ref } }) => {
                    return (
                      <CustomSelect
                        noOptionsMessage={() => "Não encontrado"}
                        ref={ref}
                        inputId="change-courses"
                        options={CursosSelectOptions}
                        placeholder="Selecione um curso"
                        onChange={(option: any) => onChange(option?.value)}
                        onBlur={onBlur}
                        value={CursosSelectOptions.filter((option) =>
                          value?.includes(option.value)
                        )}
                        defaultValue={CursosSelectOptions.filter((option) =>
                          value?.includes(option.value)
                        )}
                        className={`${errors.curso?.message && "danger"}`}
                      />
                    );
                  }}
                />
                <div className="lbl" style={{ maxWidth: "70px" }}>
                  <label htmlFor="periodo"></label>
                  <Controller
                    name="periodo"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="number"
                        min={1}
                        id="periodo"
                        placeholder="Período"
                        style={{ textAlign: "center" }}
                        {...field}
                        {...(errors.periodo && { className: "danger" })}
                      />
                    )}
                  />
                </div>
              </AccordionPanel>
            </AccordionItem>
          )}

          <AccordionItem>
            <AccordionButton className="has-sub">
              <h4>
                Sobre {auth?.authorities?.includes("ALUNO") ? "mim" : "nós"}
              </h4>
              <span className="subtitle">
                Uma breve descrição sobre{" "}
                {auth?.authorities?.includes("ALUNO")
                  ? "você"
                  : "a sua empresa"}
              </span>
            </AccordionButton>
            <AccordionPanel>
              <Controller
                name="resumo"
                control={control}
                render={({ field }) => (
                  <textarea
                    style={{
                      resize: "vertical",
                      minHeight: "150px",
                      maxHeight: "250px",
                      height: 150,
                      width: "100%",
                    }}
                    placeholder="Faça uma breve descrição sobre você"
                    className="txt-input"
                    {...field}
                    id="desc"
                    rows={10}
                  ></textarea>
                )}
              />
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionButton className="autohide-sub">
              <h4>Localização</h4>
              <span className="subtitle">
                {auth.userInfo?.aluno?.dadosPessoa.localizacao ||
                  auth.userInfo?.empresa?.dadosPessoa.localizacao}
              </span>
            </AccordionButton>
            <AccordionPanel>
              <div className="input-group">
                <div className="lbl">
                  <label htmlFor="estado">Estado: </label>
                  <Controller
                    name="uf"
                    control={control}
                    render={({ field: { value, onChange, onBlur, ref } }) => (
                      <CustomSelect
                        noOptionsMessage={() => "Não encontrado"}
                        ref={ref}
                        inputId="estado"
                        options={UFsSelectOptions}
                        placeholder="Selecione um estado"
                        onChange={(option: any) => onChange(option?.value)}
                        onBlur={onBlur}
                        value={UFsSelectOptions.filter((option) =>
                          value?.includes(option.value)
                        )}
                        defaultValue={UFsSelectOptions.filter((option) =>
                          value?.includes(option.value)
                        )}
                        className={`custom-select ${
                          errors.uf?.message && "danger"
                        }`}
                      />
                    )}
                  />
                  <p className="input-error">{errors.uf?.message}</p>
                </div>
                <div className="lbl">
                  <Controller
                    name="cidade"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="text"
                        id="cidade"
                        placeholder="Cidade"
                        {...field}
                        {...(errors.cidade && { className: "danger" })}
                      />
                    )}
                  />
                  <p className="input-error">{errors.cidade?.message}</p>
                </div>
              </div>
            </AccordionPanel>
          </AccordionItem>

          {auth.userInfo?.empresa && (
            <span>
              <h4
                style={{
                  margin: "15px 0",
                  marginBottom: "8px",
                  marginLeft: "5px",
                }}
              >
                Contatos
              </h4>

              <AccordionItem>
                <AccordionButton className="autohide-sub">
                  <h4>Telefone</h4>
                  <span className="subtitle">
                    {auth.userInfo?.empresa?.telefone}
                  </span>
                </AccordionButton>
                <AccordionPanel>
                  <Controller
                    name="telefone"
                    control={control}
                    render={({ field }) => (
                      <Input type="text" id="telefone" {...field} />
                    )}
                  />
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <AccordionButton className="autohide-sub">
                  <h4>Site</h4>

                  <span className="subtitle">
                    {!isBlank(auth.userInfo?.empresa?.linkSite || "")
                      ? auth.userInfo?.empresa?.linkSite
                      : "Não informado"}
                  </span>
                </AccordionButton>
                <AccordionPanel>
                  <Controller
                    name="empresaSite"
                    control={control}
                    render={({ field }) => (
                      <Input type="text" id="site" {...field} />
                    )}
                  />
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <AccordionButton className="has-sub">
                  <h4>Redes Sociais</h4>
                  <span className="subtitle">
                    Facebook, Instagram, LinkedIn e Twitter
                  </span>
                </AccordionButton>
                <AccordionPanel>
                  <div className="inputs">
                    <Controller
                      name="facebook"
                      control={control}
                      render={({ field }) => (
                        <Input
                          icon="fa-brands fa-facebook-f"
                          type="text"
                          id="facebook"
                          {...field}
                          spellCheck={false}
                        />
                      )}
                    />
                    <Controller
                      name="instagram"
                      control={control}
                      render={({ field }) => (
                        <Input
                          type="text"
                          icon="fa-brands fa-instagram"
                          id="instagram"
                          {...field}
                          spellCheck={false}
                        />
                      )}
                    />
                    <Controller
                      name="linkedin"
                      control={control}
                      render={({ field }) => (
                        <Input
                          type="text"
                          icon="fa-brands fa-linkedin"
                          id="linkedin"
                          {...field}
                          spellCheck={false}
                        />
                      )}
                    />
                    <Controller
                      name="twitter"
                      control={control}
                      render={({ field }) => (
                        <Input
                          type="text"
                          icon="fa-brands fa-twitter"
                          id="twitter"
                          {...field}
                          spellCheck={false}
                        />
                      )}
                    />
                  </div>
                </AccordionPanel>
              </AccordionItem>
            </span>
          )}

          {isDirty && (
            <FabButton type="button" onClick={handleSubmit(onSubmit)}>
              {isLoading && (
                <CircularProgressFluent
                  color="white"
                  height="25px"
                  width="25px"
                  duration=".8s"
                  style={{ position: "absolute" }}
                />
              )}
              <span {...(isLoading && { style: { opacity: 0 } })}>
                <i className="fas fa-floppy-disk"></i> Salvar alterações
              </span>
            </FabButton>
          )}
        </form>
        {auth.userInfo?.aluno && (
          <>
            <AccordionItem style={{ marginTop: 14 }}>
              <AccordionButton
                className="arrow-right"
                onClick={() => setShowModalCurriculo(true)}
              >
                <h4>Currículo</h4>
              </AccordionButton>
            </AccordionItem>
            <Modal
              open={showModalCurriculo}
              handleClose={() => setShowModalCurriculo(false)}
              title="Enviar currículo"
            >
              <CurriculoForm />
              <ModalBottom>
                <Button type="submit" form="curriculo-form">
                  Enviar
                </Button>
              </ModalBottom>
            </Modal>
          </>
        )}
      </Accordion>
    </>
  );
}
