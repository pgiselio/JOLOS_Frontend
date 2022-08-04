import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { AccessGlobalStyle, StyledAccess } from "../../styles/LoginSignupStyle";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "../../services/api";
import { useEffect, useState } from "react";
import { Buffer } from "buffer";
type tokenPayloadType = {
  sub: string;
  exp: number;
};
export default function PasswordResetPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const paramsToken = searchParams.get("token");
  const [tokenPayload, setTokenPayload] = useState<
    tokenPayloadType | undefined
  >();
  useEffect(() => {
    if (paramsToken) {
      let paramsTokensSplitted = paramsToken.split(".");
      let tokenBuffer = Buffer.from(
        paramsTokensSplitted[1],
        "base64"
      ).toString();

      let tokenPayloadFromParams = JSON.parse(tokenBuffer);
      if(tokenPayloadFromParams.exp < new Date().getTime()){
        toast.error("O token expirou", { toastId: "tokenExpired" });
      }
      setTokenPayload(tokenPayloadFromParams);
    }
  }, []);
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Endereço de e-mail inválido")
      .required("Este campo é obrigatório"),
  });
  const { control, formState, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const resetPasswordFormValidationSchema = Yup.object().shape({
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

  const {
    control: resetPasswordControl,
    formState: resetPasswordFormState,
    handleSubmit: resetPasswordHandleSubmit,
    setValue: resetPasswordSetValue,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(resetPasswordFormValidationSchema),
  });
  async function onSubmit(data: any) {
    await api.get(`/usuario/recuperar/${data.email}`).finally(() => {
      toast.info("E-mail de recuperação de senha enviado!");
      reset();
      navigate("/entrar?error=checkEmail");
    });
  }
  async function onSubmitNewPassword(data: any) {
    toast.info("Falta criar o endpoint :C");
  }
  return (
    <StyledAccess>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <AccessGlobalStyle />

      <div className="access-container">
        <div className="login-form">
          <div className="logo-login">
            <a href="../">
              <img
                src="../images/logo.svg"
                className="logo"
                alt="Logo do IF Jobs"
                title="Logo IF Jobs"
              />
            </a>
          </div>
          {paramsToken && (
            <>
              <textarea name="" id="" defaultValue={paramsToken}></textarea>
              <i className="fa-solid fa-arrow-down"></i>
              <textarea
                name=""
                id=""
                defaultValue={tokenPayload?.sub}
              ></textarea>
            </>
          )}
          {tokenPayload?.sub ? (
            <>
              {resetPasswordSetValue("email", tokenPayload?.sub)}

              <form onSubmit={resetPasswordHandleSubmit(onSubmitNewPassword)}>
                <h2 className="desc">Criar nova senha</h2>
                <section className="inputs">
                  <div className="lbl">
                    <label htmlFor="password">Nova senha:</label>
                    <Controller
                      name="password"
                      control={resetPasswordControl}
                      render={({ field }) => (
                        <Input
                          type="password"
                          id="password"
                          placeholder="Senha"
                          {...field}
                          {...(resetPasswordFormState.errors
                            .confirmPassword && {
                            className: "danger",
                          })}
                        />
                      )}
                    />
                    <p className="input-error">
                      {resetPasswordFormState.errors.password?.message}
                    </p>
                  </div>
                  <div className="lbl">
                    <label htmlFor="passwordconfirm">
                      Confirmar nova senha:{" "}
                    </label>
                    <Controller
                      name="confirmPassword"
                      control={resetPasswordControl}
                      render={({ field }) => (
                        <Input
                          type="password"
                          id="passwordconfirm"
                          placeholder="Confirmar senha"
                          {...field}
                          {...(resetPasswordFormState.errors
                            .confirmPassword && {
                            className: "danger",
                          })}
                        />
                      )}
                    />
                    <p className="input-error">
                      {resetPasswordFormState.errors.confirmPassword?.message}
                    </p>
                  </div>
                </section>
                <Button
                  type="submit"
                  className="less-radius"
                  disabled={!resetPasswordFormState.isValid}
                >
                  <span>Enviar</span>
                </Button>
              </form>
            </>
          ) : (
            <form method="post" onSubmit={handleSubmit(onSubmit)}>
              <h2 className="desc" style={{ fontSize: 20 }}>
                Esqueceu a sua senha?
              </h2>
              <div className="lbl">
                <label htmlFor="email">Informe o e-mail de cadastro: </label>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <Input
                      type="text"
                      id="email"
                      icon="fas fa-user"
                      placeholder="E-mail"
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="info-message">
                <span>
                  Caso o e-mail esteja cadastrado, você receberá um e-mail com
                  as instruções para redefinir sua senha.
                </span>
              </div>
              <div>
                <Link to="/entrar/" className="pwrst-link">
                  <i className="fa-solid fa-arrow-left"></i> Voltar para o login
                </Link>
              </div>
              <Button
                type="submit"
                className="less-radius"
                disabled={!formState.isValid}
              >
                <span>Enviar solicitação</span>
              </Button>
              <div className="registre-se">
                <span>Não tem uma conta?</span>
                <Link to="/cadastro" className="bt-cadse">
                  Registre-se
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </StyledAccess>
  );
}
