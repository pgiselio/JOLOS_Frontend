import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";

type ppType = {
  id: string;
  arquivo: {
    nome: string;
    tipoArquivo: string;
    dados: string;
  };
};
export function GetProfilePic(id: string) {
  const { data } = useQuery(
    ["profilePic-" + id],
    async () => {
      const response = await api.get<ppType>(`/imagem/fotoPerfil/${id}`);
      if (response.data) {
        const blob = b64toBlob(response.data?.arquivo.dados, "image/png");
        const url = URL.createObjectURL(blob);
        return url;
      }
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 30, // 30 seconds
    }
  );
  return data;
}
export const b64toBlob = (b64Data: any, contentType = "", sliceSize = 512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
};
