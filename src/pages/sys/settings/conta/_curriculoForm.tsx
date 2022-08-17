import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "../../../../components/button";
import { useAuth } from "../../../../hooks/useAuth";
import * as Yup from "yup";
import { api } from "../../../../services/api";
import { yupResolver } from "@hookform/resolvers/yup";
import { CurriculoFormStyle } from "./styles";
import prettyBytes from "pretty-bytes";
import { Link } from "react-router-dom";

export function CurriculoForm() {
  const auth = useAuth();
  const [curriculo, setCurriculo] = useState<File | undefined>(undefined);
  const [sending, setSending] = useState(false);
  const [sendingProgress, setSendingProgress] = useState(0);
  const [uploaded, setUploaded] = useState(false);
  
  let validationSchema = Yup.object().shape({
    arquivo: Yup.mixed().required("É necessário selecionar um arquivo"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      arquivo: curriculo,
    },
    resolver: yupResolver(validationSchema),
  });
  const maxSize = 10000000;
  const { getRootProps, getInputProps, open, rootRef } = useDropzone({
    accept: {
      "application/pdf": [],
    },
    maxFiles: 1,
    noClick: true,
    multiple: false,
    maxSize: maxSize,
    onDrop: (acceptedFiles) => {
      setUploaded(false);
      setCurriculo(acceptedFiles[0]);
      setValue("arquivo", acceptedFiles[0]);
    },
    onDragEnter: () => {
      rootRef.current?.classList.add("active");
    },
    onDragLeave: () => {
      rootRef.current?.classList.remove("active");
    },
    onDropAccepted: () => {
      rootRef.current?.classList.remove("active");
      rootRef.current?.classList.add("accepted");
    },
    onDropRejected: () => {
      rootRef.current?.classList.remove("active");
      rootRef.current?.classList.remove("accepted");
      rootRef.current?.classList.add("rejected");
      toast.warning(
        `O arquivo deve ser um PDF menor que ${prettyBytes(maxSize)}!`
      );
    },
  });

  async function onSubmit(data: any) {
    if(sending)
      return;
    const formData = new FormData();
    const file = data.arquivo;
    formData.append("arquivo", file);
    await api
      .patch(`/curriculo/atualizaArquivo/${auth.userInfo?.email}`, formData, {
        onUploadProgress: (progressEvent) => {
          setSending(true);
          setSendingProgress(
            Math.round((progressEvent.loaded * 100) / progressEvent.total)
          );
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setUploaded(true);
          setValue("arquivo", undefined);
          toast.success("Currículo enviado com sucesso!");
        }
      })
      .catch((err) => {
        if (err.status === 500) {
          toast.error("Ops... algo não deu certo!", {});
        }
        if (err.status === 403 || err.status === 401) {
          toast.error("Você não tem autorização para executar essa ação!");
        } else {
          console.error(err);
        }
      })
      .finally(() => {
        setSending(false);
        setSendingProgress(0);
      });
  }
  return (
    <CurriculoFormStyle onSubmit={handleSubmit(onSubmit)} id="curriculo-form">
      <div {...getRootProps({ className: "dropzone" })} onClick={open}>
        <input
          type="file"
          {...register("arquivo")}
          {...getInputProps()}
        />

        {curriculo ? (
          <div className="selected-file">
            <p className="preview">
              <i className="fa-solid fa-file-pdf"></i>
            </p>
            <div className="file-details">
              <p className="file-name">{curriculo.name}</p>
              <p className="file-size">{prettyBytes(curriculo.size)}</p>
              <p className={`file-progress-bar ${sending ? "onProgress" : ""}`}>
                <span
                  style={{
                    transform: `translateX(-${100 - sendingProgress}%)`,
                  }}
                ></span>
              </p>
            </div>
            <p className="status">
              <i className={`fa-solid fa-check ${uploaded ? "done" : ""}`}></i>
            </p>
          </div>
        ) : (
          <>
            <p>Clique ou arraste o arquivo para cá</p>
          </>
        )}
      </div>
      <p className="maxMessage">
        O currículo deve ser do tipo <strong>PDF</strong> e ter no máximo
        <strong> {prettyBytes(maxSize)}</strong>
      </p>
      <div className="group-buttons">
      <Button
        type="button"
        className="select-new less-radius secondary"
        onClick={open}
        {...(sending && { disabled: true })}
      >
        <i className="fa-solid fa-file"></i> Selecionar arquivo
      </Button>
      <Link to="/curriculo" className="link"><i className="fa-solid fa-share"></i> Ver exemplo</Link>
      </div>
      <p className="input-error">{errors.arquivo?.message}</p>
    </CurriculoFormStyle>
  );
}
