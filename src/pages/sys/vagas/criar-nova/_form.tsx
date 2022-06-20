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
import Select from "react-select";

export function CriarNovaVagaForm() {
  // const [editorState, setEditorState] = useState(() =>
  //   EditorState.createEmpty()
  // );
  const [empresaCNPJ, setEmpresaCNPJ] = useState<string | null>();
  const auth = useAuth();

  useEffect(() => {
    setEmpresaCNPJ(auth.userInfo?.empresa?.cnpj);
  }, [auth.userInfo]);
  const options = [
    { value: "Informática", label: "Informática" },
    { value: "Administração", label: "Administração" },
    { value: "Eletrotécnica", label: "Eletrotécnica" },
    { value: "Energias Renováveis", label: "Energias Renováveis" },
    { value: "Física", label: "Física" },
  ]
  let cursos = [
    "Informática",
    "Administração",
    "Eletrotécnica",
    "Energias Renováveis",
    "Física",
  ];
  const maxDescriptionLength = 1000;
  const [remainigDescriptionLength, setRemainigDescriptionLength] =
    useState(maxDescriptionLength);

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
        .max(maxDescriptionLength, "Máximo de 1000 caracteres"),
      cnpj: Yup.string().notRequired(),
    });
  } else {
    validationSchema = Yup.object().shape({
      titulo: Yup.string().required("Este campo é obrigatório"),
      localidade: Yup.string().required("Este campo é obrigatório"),
      cursoAlvo: Yup.string()
        .oneOf([...cursos], "O curso selecionado não é válido")
        .required("Este campo é obrigatório"),
      descricao: Yup.string().required("Este campo é obrigatório"),
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
    return <h2>SEM PERMISÃO</h2>;
  }
  return (
    <form
      className="form-create-vaga"
      id="form-create-vaga"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="lbl">
        <label htmlFor="vaga-title">Título:</label>
        <Controller
          name="titulo"
          control={control}
          render={({ field }) => (
            <Input
              type="text"
              id="vaga-title"
              placeholder="Jovem aprendiz na área de manutenção"
              {...field}
              {...(errors.titulo && { className: "danger" })}
            />
          )}
        />
        <p className="input-error">{errors.titulo?.message}</p>
      </div>
      <div className="form-item-group" style={{ width: "100%" }}>
        <div className="lbl">
          <label htmlFor="vaga-location">Localização da vaga: </label>
          <Controller
            name="localidade"
            control={control}
            render={({ field }) => (
              <Input
                type="text"
                id="vaga-location"
                placeholder="ex.: João Câmara, RN"
                {...field}
                {...(errors.localidade && { className: "danger" })}
              />
            )}
          />
          <p className="input-error">{errors.localidade?.message}</p>
        </div>
        <div className="lbl">
          <label htmlFor="change-courses">Curso alvo: </label>
          <Controller
            name={"cursoAlvo"}
            control={control}
            render={({ field: { value, onChange, onBlur, ref } }) => {
              return (
                <Select
                  ref={ref}
                  inputId="change-courses"
                  options={options}
                  placeholder="Selecione um curso"
                  onChange={(option) =>
                    onChange(option?.value)
                  }
                  onBlur={onBlur}
                  value={options.filter((option) =>
                    value?.includes(option.value)
                  )}
                  defaultValue={options.filter((option) =>
                    value?.includes(option.value)
                  )}
                  className={`custom-select ${errors.cursoAlvo?.message && "danger"}`}
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
        <label htmlFor="descriptionVaga">Descrição: </label>
        {/* <Editor editorState={editorState} onChange={setEditorState} /> */}
        <div id="descriptionVaga"></div>

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
        <p className="input-error">{errors.descricao?.message}</p>

        <div className="counter-box">
          <p>
            Limite de caracteres:{" "}
            <span id="count">{remainigDescriptionLength}</span>
          </p>
        </div>
      </div>
    </form>
  );
}
