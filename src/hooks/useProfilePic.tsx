import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import { b64toBlob } from "../utils/getProfilePic";

type photoQueryType = {
  id: string;
  arquivo: {
    nome: string;
    tipoArquivo: string;
    dados: string;
  };
};
export const useProfilePic = (userId: string | number | undefined) => {
  const query = useQuery(
    ["profilePic-" + userId],
    async () => {
      if (!userId || userId === "undefined"){
        return;
      }
      const response = await api.get<photoQueryType>(
        `/imagem/fotoPerfil/${userId}`
      );
      if (response.data) {
        const blob = b64toBlob(response.data?.arquivo.dados, "image/png");
        const url = URL.createObjectURL(blob);
        return url;
      }
      return null;
    },
    {
      enabled: !!userId,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 30, // 30 seconds
    }
  );
  return query;
};
