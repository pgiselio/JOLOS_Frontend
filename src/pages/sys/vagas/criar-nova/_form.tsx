// import { Editor, EditorState } from "draft-js";
// import { useState } from "react";

import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import InputMask from "react-input-mask";

import { Input } from "../../../../components/input";
import { useAuth } from "../../../../hooks/useAuth";
import { usePrompt } from "../../../../hooks/usePrompt";
import { api } from "../../../../services/api";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { queryClient } from "../../../../services/queryClient";
import { CustomSelect } from "../../../../components/select";
import { Button } from "../../../../components/button";
import { CriarVagaFormStyle } from "./style";
import { CursosSelectOptions } from "../../../../utils/selectLists";

export function CriarNovaVagaForm() {
  // const [editorState, setEditorState] = useState(() =>
  //   EditorState.createEmpty()
  // );
  const auth = useAuth();
  const maxDescriptionLength = 1000;
  
  const [empresaCNPJ, setEmpresaCNPJ] = useState<string | null>();
  const [remainigDescriptionLength, setRemainigDescriptionLength] =
    useState(maxDescriptionLength);

  useEffect(() => {
    setEmpresaCNPJ(auth.userInfo?.empresa?.cnpj);
  }, [auth.userInfo]);
  
  let cursos = CursosSelectOptions.map(({value}) => value);

  let validationSchema;
  if (empresaCNPJ) {
    validationSchema = Yup.object().shape({
      titulo: Yup.string().required("Este campo é obrigatório"),
      localidade: Yup.string().required("Este campo é obrigatório"),
      cursoAlvo: Yup.string()
        .oneOf([...cursos], "O curso selecionado não é válido")
        .required("Este campo é obrigatório"),
      descricao: Yup.string()
        .required("Este campo é obrigatório")
        .max(maxDescriptionLength, `Máximo de ${maxDescriptionLength} caracteres`),
      cnpj: Yup.string().notRequired(),
    });
  } else {
    validationSchema = Yup.object().shape({
      titulo: Yup.string().required("Este campo é obrigatório"),
      localidade: Yup.string().required("Este campo é obrigatório"),
      cursoAlvo: Yup.string()
        .oneOf([...cursos], "O curso selecionado não é válido")
        .required("Este campo é obrigatório"),
      descricao: Yup.string().required("Este campo é obrigatório").max(maxDescriptionLength, `Máximo de ${maxDescriptionLength} caracteres`),
      cnpj: Yup.string()
        .required("Este campo é obrigatório")
        .min(18, "CNPJ inválido"),
    });
  }
  const {
    control,
    formState: { errors, isDirty },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      titulo: "",
      localidade: "",
      cursoAlvo: "",
      descricao: "",
      cnpj: "",
    },
    resolver: yupResolver(validationSchema),
  });
  usePrompt(
    "Deseja realmente sair? Os dados não salvos serão perdidos!",
    isDirty
  );

  async function onSubmit({
    titulo,
    localidade,
    cursoAlvo,
    descricao,
    cnpj,
  }: any) {
    await api
      .post("/vaga/create", {
        cursoAlvo,
        titulo,
        localizacao: localidade,
        descricao,
        cnpj: auth?.authorities?.includes("EMPRESA")
          ? empresaCNPJ
          : cnpj.replaceAll(".", "").replaceAll("/", "").replaceAll("-", ""),
        dataCriacao: new Date(),
      })
      .then((response) => {
        if (response.status === 201) {
          toast.success("Vaga criada com sucesso!");
          reset();
          queryClient.invalidateQueries("vagas");
        }
      })
      .catch((err) => {
        if (err.status === 500) {
          toast.error("Ops... algo não deu certo!", {});
        }
        if (err.response.status === 403 || err.response.status === 401) {
          toast.error("Você não tem autorização para executar essa ação!");
        } else {
          console.error(err);
        }
      });
  }
  if (auth?.authorities?.includes("ALUNO")) {
    return <h2>SEM PERMISSÃO</h2>;
  }
  return (
    <CriarVagaFormStyle
      className="form-create-vaga"
      id="form-create-vaga"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="lbl">
        <Controller
          name="titulo"
          control={control}
          render={({ field }) => (
            <Input
              type="text"
              id="vaga-title"
              placeholder="Título"
              {...field}
              {...(errors.titulo && { className: "danger" })}
            />
          )}
        />
        <p className="input-error">{errors.titulo?.message}</p>
      </div>
      <div className="form-item-group" style={{ width: "100%" }}>
        <div className="lbl">
          <label htmlFor="vaga-location"> </label>
          <Controller
            name="localidade"
            control={control}
            render={({ field }) => (
              <Input
                type="text"
                id="vaga-location"
                placeholder="Localização da vaga"
                {...field}
                {...(errors.localidade && { className: "danger" })}
              />
            )}
          />
          <p className="input-error">{errors.localidade?.message}</p>
        </div>
        <div className="lbl">
          <label htmlFor="change-courses"> </label>
          <Controller
            name={"cursoAlvo"}
            control={control}
            render={({ field: { value, onChange, onBlur, ref } }) => {
              return (
                <CustomSelect
                  noOptionsMessage={() => "Não encontrado"}
                  ref={ref}
                  inputId="change-courses"
                  options={CursosSelectOptions}
                  placeholder="Curso alvo"
                  onChange={(option: any) => onChange(option?.value)}
                  onBlur={onBlur}
                  value={CursosSelectOptions.filter((option) =>
                    value?.includes(option.value)
                  )}
                  defaultValue={CursosSelectOptions.filter((option) =>
                    value?.includes(option.value)
                  )}
                  className={`${errors.cursoAlvo?.message && "danger"}`}
                />
              );
            }}
          />
          <p className="input-error">{errors.cursoAlvo?.message}</p>
        </div>
      </div>
      {auth?.authorities?.includes("ADMIN") && (
        <div className="lbl">
          <label htmlFor="cnpj">Empresa gerente da vaga: </label>
          <Controller
            name="cnpj"
            control={control}
            render={({ field }) => (
              <InputMask
                maskPlaceholder={null}
                mask="99.999.999/9999-99"
                {...field}
              >
                <Input
                  type="text"
                  id="cnpj"
                  placeholder="CNPJ"
                  {...(errors.cnpj && { className: "danger" })}
                />
              </InputMask>
            )}
          />
          <p className="input-error">{errors.cnpj?.message}</p>
        </div>
      )}

      <div className="lbl">
        <label htmlFor="desc">Descrição: </label>
        {/* <Editor editorState={editorState} onChange={setEditorState} /> */}
        <div id="descriptionVaga"></div>
        <div className="description-container">
          <Controller
            name="descricao"
            control={control}
            render={({ field }) => (
              <textarea
                style={{
                  resize: "vertical",
                  minHeight: "150px",
                  maxHeight: "250px",
                  height: 150,
                  padding: "5px",
                }}
                placeholder="Descrição da vaga..."
                {...(errors.descricao && { className: "danger" })}
                id="desc"
                rows={10}
                maxLength={maxDescriptionLength}
                onKeyDown={() => {
                  let currentValue = maxDescriptionLength - field.value.length;
                  setRemainigDescriptionLength(currentValue);
                }}
                onKeyUp={() => {
                  let currentValue = maxDescriptionLength - field.value.length;
                  setRemainigDescriptionLength(currentValue);
                }}
                {...field}
              ></textarea>
            )}
          />
          <div
            className={`counter-box ${
              remainigDescriptionLength === 0 ? "danger" : ""
            }`}
          >
            <span id="count">{remainigDescriptionLength}</span>
          </div>
        </div>
        <p className="input-error">{errors.descricao?.message}</p>
      </div>
      <div className="buttons-container">
        <Button type="submit" id="submit-form">
          Criar
        </Button>
      </div>
    </CriarVagaFormStyle>
  );
}
