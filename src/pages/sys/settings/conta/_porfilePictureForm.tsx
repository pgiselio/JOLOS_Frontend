import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "../../../../components/button";
import { useAuth } from "../../../../hooks/useAuth";
import { api } from "../../../../services/api";

export function ProfilePictureForm() {
  const auth = useAuth();
  const {
    register,
    handleSubmit,
  } = useForm({
    defaultValues: {
      arquivo: "",
    },
  });

  async function onSubmit(data: any) {
    const formData = new FormData();
    const file = data.arquivo[0];
    formData.append("arquivo", file);
    await api
      .post(`/imagem/uploadFotoPerfil/${auth.userInfo?.id}`, formData)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Foto de perfil enviada com sucesso!");
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
      });
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="file" accept="image/*" {...register("arquivo")} />
      <Button type="submit">Enviar</Button>
    </form>
  );
}
