import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import ReactCodeInput from "react-verification-code-input";
import CircularProgressFluent from "../../../components/circular-progress-fluent";
import { useCadastroSteps } from "../../../hooks/useCadastroAluno";
import { api } from "../../../services/api";
import { CadastroStep2Style } from "./styles";

export default function VerifiqueOSeuEmailPage() {
  const [isLoading, setIsLoading] = useState(false);
  
  let navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  let ReactCodeInputRef = useRef<ReactCodeInput>(null);
  let codeAfterCompleteFields = useRef<string>();
  let email = searchParams.get("email");
  let codeParam = searchParams.get("codigo");
  const cadastroSteps = useCadastroSteps();

  const { handleSubmit, getValues } = useForm({
    defaultValues: {
      email: email || "",
    },
  });
  useEffect(() => {
    if (cadastroSteps.step === 3) {
      cadastroSteps.setVerificationCode(
        codeParam?.length === 6 ? codeParam : codeAfterCompleteFields.current
      );
      cadastroSteps.setEmail(getValues(["email"])[0]);
      navigate("../step3");
    }
  });
  useEffect(() => {
    if (cadastroSteps.step < 2) {
      cadastroSteps.setStep(2);
    }
  });
  useEffect(() => {
    if (codeParam?.length === 6) {
      let codeArray = Array.from(codeParam);
      ReactCodeInputRef.current?.setState({ values: codeArray });
      if (email) {
        handleSubmit(onSubmit)();
      }
    }
  }, []);

  async function onSubmit({ email }: { email: string }) {
    setIsLoading(true);
    await api
      .get(
        `/usuario/validacao/${email}/${
          codeParam?.length === 6 ? codeParam : codeAfterCompleteFields.current
        }`
      )
      .then((response) => {
        cadastroSteps.setToken(response.data);
        cadastroSteps.setStep(3);
      })
      .catch(() => {
        toast.error("Codigo inválido!");
        searchParams.delete("codigo");
        setSearchParams(searchParams);
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <CadastroStep2Style>
      <div className="content">
        <h1>
          <i className="fas fa-envelope"></i>
        </h1>
        <h2>Verifique o seu e-mail</h2>
        <span className="message">
          Para continuar com o cadastro digite nos campos abaixo o código que
          você recebeu no seu e-mail
        </span>
        <form id="verify" onSubmit={handleSubmit(onSubmit)}>
          <div className="code-fields">
            <ReactCodeInput
              ref={ReactCodeInputRef}
              type="number"
              onComplete={(value: string) => {
                codeAfterCompleteFields.current = value;
                handleSubmit(onSubmit)();
              }}
              onChange={(value: string) => {
                codeAfterCompleteFields.current = value;
              }}
              className="code-field"
              fieldWidth={40}
              fieldHeight={40}
              {...(codeParam?.length === 6 ? { disabled: true } : {})}
              {...(isLoading && { disabled: true })}
            />
          </div>
        </form>
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
            form="verify"
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
                  duration="1s"
                  style={{ position: "absolute" }}
                />
              ) : (
                <i className="fas fa-arrow-right"></i>
              )}
            </span>
          </button>
        </div>
      </div>
    </CadastroStep2Style>
  );
}
