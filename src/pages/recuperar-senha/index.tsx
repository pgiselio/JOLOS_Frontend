import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { AccessGlobalStyle, StyledAccess } from "../../styles/LoginSignupStyle";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "../../services/api";

export default function PasswordResetPage() {
  const navigate = useNavigate();
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
  async function onSubmit(data: any) {
    await api.get(`/usuario/recuperar/${data.email}`).finally(() => {
      toast.info("E-mail de recuperação de senha enviado!");
      reset();
      navigate("/entrar?error=checkEmail");
    });
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
                Caso o e-mail esteja cadastrado, você receberá um e-mail com as
                instruções para redefinir sua senha.
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
        </div>
      </div>
    </StyledAccess>
  );
}
