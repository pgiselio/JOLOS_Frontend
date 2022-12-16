import { useTabs } from "react-headless-tabs";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Input } from "../../components/input";
import { api } from "../../services/api";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { TabSelector } from "../../components/Tabs/TabSelector";
import CircularProgressFluent from "../../components/circular-progress-fluent";
import { useEffect, useState } from "react";

type signupType = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function CadastroPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const [selectedTab, setSelectedTab] = useTabs(["CANDIDATO", "EMPRESA"], searchParams.get("tab"));
  
  useEffect(() => {
    if (!searchParams.get("tab")) {
      setSelectedTab("CANDIDATO");
    }
  }, []);
  
  let navigate = useNavigate();
  const empresaValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Endereço de e-mail inválido")
      .required("Este campo é obrigatório"),
  });
  const candidatoValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Endereço de e-mail inválido")
      .required("Este campo é obrigatório"),
    password: Yup.string()
      .required("Este campo é obrigatório")
      .min(8, "A senha deve ter no mínimo 8 caracteres"),
    confirmPassword: Yup.string()
      .required("Este campo é obrigatório")
      .oneOf([Yup.ref("password")], "As senhas não coincidem"),
  });
  // const formOptions = { resolver: yupResolver(validationSchema) };

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(
      selectedTab === "CANDIDATO"
        ? candidatoValidationSchema
        : empresaValidationSchema
    ),
  });

  async function onSubmit({ email, password, confirmPassword }: signupType) {
    setIsLoading(true);
    await api
      .post(
        "/usuario/create",
        selectedTab === "CANDIDATO"
          ? {
              email,
              senha: password,
              tipoUsuario: "ALUNO",
            }
          : {
              email,
              tipoUsuario: selectedTab,
            }
      )
      .then((response) => {
        if (response.status === 201) {
          toast.success("Cadastro realizado com sucesso!");
          if (selectedTab === "CANDIDATO") {
            navigate(`step2?email=${email}`);
          }
        }
      })
      .catch(() => {
        toast.error(
          "O e-mail informado já se encontra cadastrado no sistema!",
          {}
        );
      })
      .finally(() => setIsLoading(false));
  }
  return (
    <>
      <div className="form-destaque-grid">
        <div className="form">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <h2 className="desc">Criar conta</h2>

            <div style={{ display: "flex", height: "35px", columnGap: "10px" }}>
              <TabSelector
                isActive={selectedTab === "CANDIDATO"}
                onClick={() => setSelectedTab("CANDIDATO")}
              >
                Candidato
              </TabSelector>
              <TabSelector
                isActive={selectedTab === "EMPRESA"}
                onClick={() => setSelectedTab("EMPRESA")}
              >
                Empresa
              </TabSelector>
            </div>
          </div>
          <div style={{ display: "flex", flexGrow: 1, alignItems: "center" }}>
            <form
              id="cadastroStep1"
              onSubmit={handleSubmit(onSubmit)}
              style={{ paddingRight: "10px" }}
            >
              <section className="inputs">
                <div>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <Input
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
                {selectedTab === "CANDIDATO" && (
                  <>
                    <div>
                      <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                          <Input
                            type="password"
                            id="password"
                            placeholder="Senha"
                            {...field}
                            {...(errors.password && { className: "danger" })}
                          />
                        )}
                      />
                      <p className="input-error">{errors.password?.message}</p>
                    </div>
                    <div>
                      <Controller
                        name="confirmPassword"
                        control={control}
                        render={({ field }) => (
                          <Input
                            type="password"
                            id="passwordconfirm"
                            placeholder="Confirmar senha"
                            {...field}
                            {...(errors.confirmPassword && {
                              className: "danger",
                            })}
                          />
                        )}
                      />
                      <p className="input-error">
                        {errors.confirmPassword?.message}
                      </p>
                    </div>
                  </>
                )}
              </section>
              <div className="info-message">
                {selectedTab === "CANDIDATO" ? (
                  <span>
                    O cadastro continuará após a confirmação do e-mail, então
                    certifique-se de informar um e-mail válido
                  </span>
                ) : (
                  <span>
                    Assim que possível entraremos em contato por esse e-mail para prosseguir com o seu cadastro
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>
        <div className="destaque">
          {selectedTab === "CANDIDATO" ? (
            <>
              <div className="imagem-destaque">
                <img src="../images/undraw_typewriter_re_u9i2.svg" alt="" />
              </div>

              <span>Sua conta a três passos de você</span>
            </>
          ) : (
            <>
              <div className="imagem-destaque">
                <img
                  src="../images/undraw_connected_re_lmq2.svg"
                  alt=""
                  style={{ width: "60%" }}
                />
              </div>
              <span>Faça o pré-cadastro da sua empresa</span>
            </>
          )}
        </div>
      </div>
      <div className="bottom-actions">
        <div className="flex-btn-login">
          <Link
            to="/entrar"
            className="btn-login"
            title="Já tem uma conta? Faça Login!"
          >
            Ou... faça login
          </Link>
        </div>
        <div className="flex-btn-next">
          <button
            type="submit"
            className="btn-next"
            title="Confirmar cadastro"
            form="cadastroStep1"
            id="cadastroSubmit"
            disabled={isLoading}
          >
            <span>Próximo</span>
            <span className="next-arrow">
              {isLoading ? (
                <CircularProgressFluent
                  color="white"
                  height="2em"
                  width="2em"
                  duration="1.5s"
                  style={{ position: "absolute" }}
                />
              ) : (
                <i className="fas fa-arrow-right"></i>
              )}
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
