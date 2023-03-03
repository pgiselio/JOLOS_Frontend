import * as Accordion from "@radix-ui/react-accordion";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
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
            isCompany={!!auth.userInfo?.empresa?.id}
          />
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="change-pic-btn" aria-label="Customise options">
                <span aria-label="Opções para a foto de perfil">
                  <i className="fas fa-camera"></i>
                </span>
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="DropdownMenuContent slide-down"
                sideOffset={5}
                align="start"
              >
                <DropdownMenu.Item className="DropdownMenuItem" onSelect={() => setShowModalPic(true)}>
                  Editar ou enviar foto
                </DropdownMenu.Item>
                <DropdownMenu.Item className="DropdownMenuItem" onSelect={() => setShowModalPic(true)}>
                  Remover foto atual
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
          {/* <button
            className="change-pic-btn"
            onClick={() => setShowModalPic(true)}
          >
            <i className="fa-solid fa-pencil"></i>
          </button> */}
        </div>
      </div>
      <Modal
        open={showModalPic}
        handleClose={() => setShowModalPic(false)}
        title="Editar foto de perfil"
      >
        <div className="flx flx-aic flx-jcc fdc" style={{ gap: 30 }}>
          <ProfilePictureForm closeModal={() => setShowModalPic(false)} />
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

      <Accordion.Root type="multiple">
        <form>
          <Accordion.Item data-reach-accordion-item value="basic-info">
            <Accordion.Trigger
              data-reach-accordion-button
              className="autohide-sub"
            >
              <h4>Informações Básicas</h4>
              <span className="subtitle">
                Nome de exibição
                {auth?.authorities?.includes("ALUNO")
                  ? ", Localização, Curso e Período"
                  : " e Localização"}
              </span>
            </Accordion.Trigger>
            <Accordion.Content data-reach-accordion-panel>
              <div className="lbl">
                <label htmlFor="nome">Nome: </label>
                <Controller
                  name="nome"
                  control={control}
                  render={({ field }) => (
                    <Input type="text" id="nome" {...field} />
                  )}
                />
              </div>

              {auth?.authorities?.includes("ALUNO") && (
                <>
                  <div className="lbl">
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
                  </div>
                  <div className="lbl" style={{ maxWidth: "70px" }}>
                    <label htmlFor="periodo">Período</label>
                    <Controller
                      name="periodo"
                      control={control}
                      render={({ field }) => (
                        <Input
                          type="number"
                          min={1}
                          id="periodo"
                          style={{ textAlign: "center" }}
                          {...field}
                          {...(errors.periodo && { className: "danger" })}
                        />
                      )}
                    />
                  </div>
                </>
              )}
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
                  <label htmlFor="cidade">Cidade: </label>
                  <Controller
                    name="cidade"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="text"
                        id="cidade"
                        {...field}
                        {...(errors.cidade && { className: "danger" })}
                      />
                    )}
                  />
                  <p className="input-error">{errors.cidade?.message}</p>
                </div>
              </div>
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item data-reach-accordion-item value="about">
            <Accordion.Trigger data-reach-accordion-button className="has-sub">
              <h4>
                Sobre{" "}
                {auth?.authorities?.includes("ALUNO") ? "você" : "a empresa"}
              </h4>
              <span className="subtitle">
                Uma breve descrição sobre{" "}
                {auth?.authorities?.includes("ALUNO")
                  ? "você"
                  : "a sua empresa"}
              </span>
            </Accordion.Trigger>
            <Accordion.Content data-reach-accordion-panel>
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
            </Accordion.Content>
          </Accordion.Item>

          {auth.userInfo?.empresa && (
            <span>
              <h4
                style={{
                  margin: "20px 0px 10px 5px",
                  fontWeight: "600",
                }}
              >
                Informações de contato
              </h4>

              <Accordion.Item data-reach-accordion-item value="phone">
                <Accordion.Trigger
                  data-reach-accordion-button
                  className="autohide-sub"
                >
                  <h4>Telefone</h4>
                  <span className="subtitle">
                    {auth.userInfo?.empresa?.telefone}
                  </span>
                </Accordion.Trigger>
                <Accordion.Content data-reach-accordion-panel>
                  <Controller
                    name="telefone"
                    control={control}
                    render={({ field }) => (
                      <Input type="text" id="telefone" {...field} />
                    )}
                  />
                </Accordion.Content>
              </Accordion.Item>

              <Accordion.Item data-reach-accordion-item value="site">
                <Accordion.Trigger
                  data-reach-accordion-button
                  className="autohide-sub"
                >
                  <h4>Site</h4>

                  <span className="subtitle">
                    {!isBlank(auth.userInfo?.empresa?.linkSite || "")
                      ? auth.userInfo?.empresa?.linkSite
                      : "Não informado"}
                  </span>
                </Accordion.Trigger>
                <Accordion.Content data-reach-accordion-panel>
                  <Controller
                    name="empresaSite"
                    control={control}
                    render={({ field }) => (
                      <Input type="text" id="site" {...field} />
                    )}
                  />
                </Accordion.Content>
              </Accordion.Item>

              <Accordion.Item data-reach-accordion-item value="social">
                <Accordion.Trigger
                  data-reach-accordion-button
                  className="has-sub"
                >
                  <h4>Redes Sociais</h4>
                  <span className="subtitle">
                    Facebook, Instagram, LinkedIn e Twitter
                  </span>
                </Accordion.Trigger>
                <Accordion.Content data-reach-accordion-panel>
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
                </Accordion.Content>
              </Accordion.Item>
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
            <Accordion.Item
              data-reach-accordion-item
              style={{ marginTop: 14 }}
              value="curriculum"
            >
              <Accordion.Trigger
                data-reach-accordion-button
                className="arrow-right"
                onClick={() => setShowModalCurriculo(true)}
              >
                <h4>Currículo</h4>
              </Accordion.Trigger>
            </Accordion.Item>
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
      </Accordion.Root>
    </>
  );
}
