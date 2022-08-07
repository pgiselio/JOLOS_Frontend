import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";
import { useCadastroSteps } from "../../hooks/useCadastroAluno";
import { AccessGlobalStyle, StyledAccess } from "../../styles/LoginSignupStyle";

export function CadastroLayout() {
  let navigate = useNavigate();
  const auth = useAuth();
  const cadastroSteps = useCadastroSteps();
  useEffect(() => {
    if (auth.userInfo?.email) {
      navigate("/sys");
    }
  });
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

      <section className="access-container">
        <div className="login-form signup-form">
          <div className="header-signup">
            <a href="../">
              <img src="../images/logo.svg" alt="" className="logo-signup" />
            </a>
            <div className="progress">
              <span
                {...(cadastroSteps.step === 1
                  ? { className: "active" }
                  : cadastroSteps.step > 1 && {
                      className: "done",
                    })}
                title="Cadastro básico"
              ></span>
              <span
                {...(cadastroSteps.step === 2
                  ? { className: "active" }
                  : cadastroSteps.step > 2 && {
                      className: "done",
                    })}
                title="Confirmação do e-mail"
              ></span>
              <span
                {...(cadastroSteps.step === 3
                  ? { className: "active" }
                  : cadastroSteps.step > 3 && {
                      className: "done",
                    })}
                title="Cadastramento de dados"
              ></span>
            </div>
          </div>
          <div className="cadastro-content">
            <Outlet />
          </div>
        </div>
      </section>
    </StyledAccess>
  );
}
