import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { AccessGlobalStyle, StyledAccess } from "../../styles/LoginSignupStyle";
import CircularProgressFluent from "../../components/circular-progress-fluent";

export default function LoginPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { control, formState, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: {
      email: process.env.NODE_ENV === "development" ? "jolos.aluno@jolos.com" : "",
      password: process.env.NODE_ENV === "development" ? "jolos" : "",
    },
  });
  
  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (auth.email) {
      navigate("/sys");
    }
  });

  const paramsError = searchParams.getAll("error");
  useEffect(() => {
    if (searchParams.has("error")) {
      paramsError.forEach((error) => {
        if (error === "needsLogin") {
          toast.error("Você precisa fazer login primeiro!", {});
        } else if (error === "invalidCredentials") {
          toast.error("Sua sessão expirou, faça login novamente!", {});
        } else if (error === "needsPasswordReset") {
          toast.error("Você precisa resetar sua senha!", {});
        } else if (error === "checkEmail") {
          toast.info("Verifique o seu e-mail", {});
        }
      });
      searchParams.delete("error");
      setSearchParams(searchParams);
    }
  }, []);

  async function onSubmit(data: any) {
    try {
      setIsLoading(true);
      await auth.signin(data.email, data.password);

      window.location.href = "/sys";
    } catch (error: any) {
      setIsLoading(false);
      toast.error("Usuário ou senha inválidos!", {});
    }
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
          <form
            method="post"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h2 className="desc">Entrar</h2>
            <div className="info-message error-msg">
              <span>Usuário ou senha inválidos</span>
            </div>
            <div className="inputs">
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
              <Controller
                name="password"
                control={control}
                rules={{ required: true }}
                render={({ field }) => {
                  return (
                    <Input
                      type="password"
                      id="password"
                      icon="fas fa-lock"
                      placeholder="Senha"
                      {...field}
                    />
                  );
                }}
              />
            </div>
            <div>
              <Link to="/password-reset/" className="pwrst-link">
                Esqueceu a senha?
              </Link>
            </div>

            <Button
              type="submit"
              className="less-radius"
              disabled={!formState.isValid || isLoading}
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
              <span {...(isLoading && { style: { opacity: 0 } })}>Entrar</span>
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
