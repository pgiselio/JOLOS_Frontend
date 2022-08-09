import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CircularProgressFluent from "../../../../../components/circular-progress-fluent";
import { api } from "../../../../../services/api";

export default function DownloadCurriculoPage() {
  const [curriculo, setCurriculo] = useState<any>();
  const [hasError, setHasError] = useState<any>();
  const [downloadCProgress, setDownloadCProgress] = useState(0);
  
  let params = useParams();
  useEffect(() => {
    const getCurriculo = async () => {
      const response = await api
        .get(`/curriculo/download/${params.id}`, {
          responseType: "blob",
          onDownloadProgress: (progressEvent) => {
            setDownloadCProgress(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            );
          },
        })
        .catch((error) =>
          error.response.status === 401 || error.response.status === 403
            ? (window.location.href = "/logout")
            : (setHasError(error), error)
        );
      setCurriculo(response.data);
    };
    getCurriculo();
  }, []);

  if (!curriculo && !hasError) {
    return (
      <>
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: downloadCProgress + "%",
            height: "4px",
            background: "var(--accent-color)",
          }}
        >
            <span
              style={{
                position: "absolute",
                right: 0,
                top: 10,
                color: "var(--text-b)",
                fontWeight: "500",
              }}
            >{downloadCProgress}%</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "90vh",
            gap: "10px",
          }}
        >
            <CircularProgressFluent height={"40px"} width={"40px"} />
            <span>Carregando informações do currículo</span>
        </div>
      </>
    );
  }
  if (hasError) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
          gap: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "90vh",
            gap: "10px",
          }}
        >
          <i
            style={{ fontSize: 30, color: "var(--text-b)" }}
            className="fas fa-info-circle"
          ></i>
          <span>Currículo não encontrado</span>
        </div>
        <span style={{ fontSize: 13 }}>{hasError.message}</span>
      </div>
    );
  } else {
    
    let blob = curriculo;
    blob.name = `curriculo-${params.id}.pdf`;
    const url = URL.createObjectURL(blob);
    return (
      <object
        data={url}
        title="curriculo"
        type="application/pdf"
        width="100%"
        height="100%"
      ></object>
    );
  }
}
