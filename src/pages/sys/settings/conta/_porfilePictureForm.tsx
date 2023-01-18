import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAuth } from "../../../../hooks/useAuth";
import { api } from "../../../../services/api";
import AvatarEditor from "react-avatar-editor";
import { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { queryClient } from "../../../../services/queryClient";
import { ProfilePicFormStyle } from "./styles";
import { Button } from "../../../../components/button";
import { useProfilePic } from "../../../../hooks/useProfilePic";

export function ProfilePictureForm({
  closeModal,
}: {
  closeModal?: () => void;
}) {
  const auth = useAuth();
  const [zoom, setZoom] = useState<number>(1);
  const [rotate, setRotate] = useState<number>(0);
  const [actualProfilePic, setActualProfilePic] = useState<any>(undefined);
  const [newProfilePic, setnewProfilePic] = useState<File | undefined>(
    undefined
  );
  const emptyImage =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
  const emptyImageBlobfied = useRef<any>("");
  const [isEmptyImage, setIsEmptyImage] = useState(false);
  const { data: queryImage } = useProfilePic(auth.userInfo?.id);
  useEffect(() => {
    const parseImages = async () => {
      await (await fetch(emptyImage))
        .blob()
        .then((response: any) => (emptyImageBlobfied.current = response));
      await (await fetch(queryImage + ""))
        .blob()
        .then((response: any) => setActualProfilePic(response));
    };
    parseImages();
  }, []);
  useEffect(() => {
    if (typeof actualProfilePic === typeof new Blob()) {
      setIsEmptyImage(
        emptyImageBlobfied.current.size === actualProfilePic.size
      );
    } else {
      setIsEmptyImage(false);
    }
  });
  const avatarRef = useRef<AvatarEditor>(null);
  const { getRootProps, getInputProps, open } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxFiles: 1,
    noClick: true,
    multiple: false,
    onDrop: (acceptedFiles) => {
      setnewProfilePic(acceptedFiles[0]);
      setRotate(0);
      setZoom(1);
    },
    onDropRejected: (rejectedFiles) => {
      toast.error("Arquivo não suportado!");
    }
  });
  const { handleSubmit } = useForm({
    defaultValues: {
      arquivo: newProfilePic,
    },
  });

  async function onSubmit() {
    const formData = new FormData();
    const file = avatarRef.current!.getImageScaledToCanvas().toDataURL();
    const blob = await (await fetch(file)).blob();
    formData.append("arquivo", blob);
    await api
      .post(`/imagem/uploadFotoPerfil/${auth.userInfo?.id}`, formData)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Foto de perfil enviada com sucesso!");
          // queryClient.invalidateQueries(["profilePic-" + auth.userInfo?.id]);
          queryClient.setQueryData(["profilePic-" + auth.userInfo?.id], file);
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
  async function removerFotoDePerfil() {
    const formData = new FormData();
    formData.append("arquivo", emptyImageBlobfied.current);
    await api
      .post(`/imagem/uploadFotoPerfil/${auth.userInfo?.id}`, formData)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Foto de perfil removida com sucesso!");
          setnewProfilePic(undefined);
          setIsEmptyImage(true);
          queryClient.setQueryData(
            ["profilePic-" + auth.userInfo?.id],
            emptyImage
          );
          closeModal && closeModal();
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
    <ProfilePicFormStyle
      onSubmit={handleSubmit(onSubmit)}
      id="profile-pic-form"
    >
      <div {...getRootProps({ className: "dropzone" })}>
        <div className="preview">
          <AvatarEditor
            style={{
              background: "url(/images/default_profile_pic.svg) no-repeat",
              backgroundSize: 200,
              borderRadius: 5,
            }}
            ref={avatarRef}
            image={
              newProfilePic || (!isEmptyImage && queryImage ? queryImage : "")
            }
            scale={zoom}
            backgroundColor="#ffffff"
            color={[230, 230, 230, 0.4]}
            border={0}
            width={200}
            height={200}
            borderRadius={100}
            rotate={rotate}
          />
        </div>
        <input {...getInputProps()} />
      </div>
      <div className="controls">
        <div className="zoom">
          <button
            type="button"
            title="Reduzir foto"
            onClick={() => {
              if (zoom > 1) {
                setZoom(zoom - 0.1);
              }
            }}
          >
            <i className="fa-solid fa-minus"></i>
          </button>
          <input
            type="range"
            min="1"
            max="2"
            step="0.01"
            value={zoom + ""}
            onChange={(event: any) => {
              setZoom(parseFloat(event.target.value));
            }}
            name=""
            id=""
          />
          <button
            type="button"
            title="Ampliar foto"
            onClick={() => {
              if (zoom < 2) {
                setZoom(zoom + 0.1);
              }
            }}
          >
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>

        <button
          type="button"
          title="Girar foto à esquerda"
          onClick={() => {
            setRotate(rotate - 90);
          }}
        >
          <i className="fa-solid fa-arrow-rotate-left"></i>
        </button>
        <button
          type="button"
          title="Girar foto à direita"
          onClick={() => {
            setRotate(rotate + 90);
          }}
        >
          <i className="fa-solid fa-arrow-rotate-right"></i>
        </button>
      </div>
      <Button
        type="button"
        className="select-new less-radius secondary"
        onClick={open}
      >
        <i className="fa-solid fa-camera"></i> Selecionar nova foto
      </Button>
      <Button
        type="button"
        className="select-new less-radius secondary"
        onClick={() => removerFotoDePerfil()}
      >
        <i className="fa-solid fa-trash"></i> Remover foto atual
      </Button>
    </ProfilePicFormStyle>
  );
}
