import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ReactInputMask from "react-input-mask";
import { toast } from "react-toastify";
import { Box, BoxContent, BoxTitle } from "../../../../../components/box";
import { Input } from "../../../../../components/input";
import * as Yup from "yup";
import { api } from "../../../../../services/api";
import { convertFromStringToDate } from "../../../../../utils/convertStringToDateFormat";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "../../../../../components/button";
import CircularProgressFluent from "../../../../../components/circular-progress-fluent";
import { UFsSelectOptions } from "../../../../../utils/selectLists";
import { CustomSelect } from "../../../../../components/select";

export default function CadastrarEmpresaPage() {
  const [isLoading, setIsLoading] = useState(false);
  let unidadesFederativas = UFsSelectOptions.map(({ value }) => value);
  let validationSchema = Yup.object().shape({
    email: Yup.string().required("Este campo é obrigatório"),
    nome: Yup.string().required("Este campo é obrigatório"),
    cnpj: Yup.string()
      .required("Este campo é obrigatório")
      .min(18, "CNPJ inválido"),
    telefone: Yup.string().required("Este campo é obrigatório"),
    dataFundacao: Yup.string()
      .test(
        "validacao da data",
        "Data inválida",
        (value: any) =>
          convertFromStringToDate(value).toString() !== "Invalid Date" &&
          convertFromStringToDate(value) <= new Date()
      )
      .required("Este campo é obrigatório")
      .min(10, "Data inválida"),
    cidade: Yup.string().required("Este campo é obrigatório"),
    UF: Yup.string()
      .oneOf([...unidadesFederativas], "O estado não é válido")
      .required("Este campo é obrigatório"),
  });
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      nome: "",
      cnpj: "",
      dataFundacao: "",
      cidade: "",
      UF: "",
      telefone: "",
      facebook: "",
      instagram: "",
      linkedin: "",
      twitter: "",
    },
    resolver: yupResolver(validationSchema),
  });

  async function onHandleSubmit(props: any) {
    setIsLoading(true);

    await api
      .post(`/empresa/create/${props.email}`, {
        dadosPessoais: {
          nome: props.nome,
          dataNasc: convertFromStringToDate(props.dataFundacao),
          localizacao: props.cidade + "/" + props.UF,
        },
        telefone: props.telefone,
        cnpj: props.cnpj
          .replaceAll(".", "")
          .replaceAll("-", "")
          .replaceAll("/", ""),
        redesSociais: {
          facebook: props.facebook,
          instagram: props.instagram,
          linkedin: props.linkedin,
          twitter: props.twitter,
        },
      })
      .then(() => {
        toast.success("Empresa cadastrada com sucesso!");
        reset();
      })
      .catch((e) => {
        toast.error("Erro ao cadastrar empresa");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  return (
    <div className="content">
      <Box>
        <BoxTitle>
          <h3>Registrar nova empresa</h3>
        </BoxTitle>
        <BoxContent>
          <form
            id="cadastrar-nova-empresa-form"
            onSubmit={handleSubmit(onHandleSubmit)}
          >
            <div className="inputs">
              <div className="lbl">
                <label htmlFor="email"></label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      icon="fas fa-envelope"
                      type="text"
                      id="email"
                      placeholder="E-mail"
                      {...field}
                      {...(errors.email && { className: "danger" })}
                    />
                  )}
                />
                <p className="input-error">{errors.email?.message}</p>
              </div>
              <div className="lbl">
                <label htmlFor="nome"> </label>
                <Controller
                  name="nome"
                  control={control}
                  render={({ field }) => (
                    <Input
                      icon="fas fa-pencil"
                      type="text"
                      id="nome"
                      placeholder="Nome fantasia"
                      {...field}
                      {...(errors.nome && { className: "danger" })}
                    />
                  )}
                />
                <p className="input-error">{errors.nome?.message}</p>
              </div>
              <div className="lbl">
                <label htmlFor="cnpj"></label>
                <Controller
                  name="cnpj"
                  control={control}
                  render={({ field }) => (
                    <ReactInputMask
                      maskPlaceholder={null}
                      mask="99.999.999/9999-99"
                      {...field}
                    >
                      <Input
                        icon="fas fa-id-card"
                        type="text"
                        id="cnpj"
                        placeholder="CNPJ"
                        {...(errors.cnpj && { className: "danger" })}
                      />
                    </ReactInputMask>
                  )}
                />
                <p className="input-error">{errors.cnpj?.message}</p>
              </div>
              <div className="lbl">
                <label htmlFor="telefone"> </label>
                <Controller
                  name="telefone"
                  control={control}
                  render={({ field }) => (
                    <Input
                      icon="fas fa-phone"
                      type="text"
                      id="telefone"
                      placeholder="Telefone"
                      {...(errors.telefone && { className: "danger" })}
                      {...field}
                    />
                  )}
                />
                <p className="input-error">{errors.telefone?.message}</p>
              </div>
              <div className="lbl">
                <label htmlFor="dataFundacao"></label>
                <Controller
                  name="dataFundacao"
                  control={control}
                  render={({ field }) => (
                    <ReactInputMask
                      maskPlaceholder={null}
                      mask="99/99/9999"
                      {...field}
                    >
                      <Input
                        type="text"
                        placeholder="Data de fundação"
                        icon="fas fa-calendar"
                        id="dataFundacao"
                        autoComplete="off"
                        {...(errors.dataFundacao && { className: "danger" })}
                      />
                    </ReactInputMask>
                  )}
                />
                <p className="input-error">{errors.dataFundacao?.message}</p>
              </div>
              <div className="input-group">
                <div className="lbl">
                  <label htmlFor="estado">Estado: </label>
                  <Controller
                    name="UF"
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
                          errors.UF?.message && "danger"
                        }`}
                      />
                    )}
                  />
                  <p className="input-error">{errors.UF?.message}</p>
                </div>
                <div className="lbl">
                  <label htmlFor="cidade"></label>
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
              <div>
                <h4>Campos Opcionais</h4>
              </div>
              <div className="lbl">
                <label htmlFor="facebook">Facebook: </label>
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
              </div>
              <div className="lbl">
                <label htmlFor="instagram">Instagram: </label>
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
              </div>
              <div className="lbl">
                <label htmlFor="linkedin">LinkedIn: </label>
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
              </div>
              <div className="lbl">
                <label htmlFor="twitter">Twitter: </label>
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
            </div>
          </form>
          <div style={{ alignSelf: "flex-end", paddingTop: "20px" }}>
            <Button
              type="submit"
              form="cadastrar-nova-empresa-form"
              id="submit-form"
              className=""
              {...(isLoading && { disabled: true })}
            >
              {isLoading && (
                <CircularProgressFluent
                  color="white"
                  height="25px"
                  width="25px"
                  duration=".8s"
                  style={{ position: "absolute" }}
                />
              )}
              <span {...(isLoading && { style: { opacity: 0 } })}>Criar</span>
            </Button>
          </div>
        </BoxContent>
      </Box>
    </div>
  );
}
