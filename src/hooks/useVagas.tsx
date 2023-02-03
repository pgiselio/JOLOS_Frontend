import { toast } from "react-toastify";
import { api } from "../services/api";
import { queryClient } from "../services/queryClient";
import { vaga } from "../types/vagaType";

export const useVagas = () => {
  const subscribe = async ({
    vagaId,
    candidatoId,
  }: {
    vagaId: number | string;
    candidatoId: number | string;
  }) => {
    await api.patch(`/vaga/${vagaId}/addAluno/${candidatoId}`).then(() => {
      toast.success("Você se increveu na vaga!", {
        position: "bottom-center",
        hideProgressBar: true,
      });
      queryClient.invalidateQueries([`vaga-${vagaId}`]);
      queryClient.invalidateQueries(["vagas"]);
    });
  };

  const unsubscribe = async ({
    vagaId,
    candidatoId,
  }: {
    vagaId: number | string;
    candidatoId: number | string;
  }) => {
    await api.patch(`/vaga/${vagaId}/removeAluno/${candidatoId}`).then(() => {
      toast.success("Você se desinscreveu da vaga!", {
        position: "bottom-center",
        hideProgressBar: true,
      });
      queryClient.invalidateQueries([`vaga-${vagaId}`]);
      queryClient.invalidateQueries(["vagas"]);
    });
  };

  const open = async (vagaId?: number | string) => {
    await api
      .patch<vaga>(`/vaga/${vagaId}`, [
        {
          op: "replace",
          path: "/status",
          value: "ATIVO",
        },
      ])
      .then(() => {
        queryClient.invalidateQueries([`vaga-${vagaId}`]);
        queryClient.invalidateQueries(["vagas"]);
        toast.success("Incrições reabertas com sucesso!", {
          toastId: "vaga-aberta",
        });
      })
      .catch((err) => {
        toast.error("Erro ao abrir inscrições!");
        console.error(err);
      });
  };
  const close = async (vagaId?: number | string) => {
    await api
      .patch<vaga>(`/vaga/${vagaId}`, [
        {
          op: "replace",
          path: "/status",
          value: "INATIVO",
        },
      ])
      .then(() => {
        queryClient.invalidateQueries([`vaga-${vagaId}`]);
        queryClient.invalidateQueries(["vagas"]);
        toast.success("Vaga encerrada com sucesso!", {
          toastId: "vaga-encerrada",
        });
      })
      .catch((err) => {
        toast.error("Erro ao encerrar inscrições!");
        console.error(err);
      });
  };
  return { subscribe, unsubscribe, open, close };
};
