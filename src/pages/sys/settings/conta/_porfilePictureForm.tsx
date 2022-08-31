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

export function ProfilePictureForm() {
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
  const isEmptyImage = useRef(false);
  useEffect(() => {
    let emptyImageToBlobRequest = async () => {
      await (await fetch(emptyImage)).blob();
    };
    emptyImageBlobfied.current = emptyImageToBlobRequest;
    let actualProfilePicToBlob = async () => {
      await (
        await fetch(
          queryClient.getQueryData(["profilePic-" + auth.userInfo?.id]) || ""
        )
      ).blob();
    };
    setActualProfilePic(actualProfilePicToBlob);
    if (emptyImageBlobfied.current === actualProfilePic) isEmptyImage.current = true;
  }, []);
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
          queryClient.invalidateQueries(["profilePic-" + auth.userInfo?.id]);
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
    const emptyImageBlobfied = await (await fetch(emptyImage)).blob();

    formData.append("arquivo", emptyImageBlobfied);
    await api
      .post(`/imagem/uploadFotoPerfil/${auth.userInfo?.id}`, formData)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Foto de perfil removida com sucesso!");
          queryClient.invalidateQueries(["profilePic-" + auth.userInfo?.id]);
          setnewProfilePic(undefined);
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
              newProfilePic ||
              (isEmptyImage
                ? ""
                : queryClient.getQueryData([
                    "profilePic-" + auth.userInfo?.id,
                  ])) ||
              ""
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
