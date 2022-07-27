import { CSSProperties } from "react";
import { useQuery } from "react-query";
import { api } from "../../services/api";
import { b64toBlob } from "../../utils/getProfilePic";
import { isBlank } from "../../utils/isBlank";
import { StyledProfilePic } from "./style";

type ProfilePicType = {
  url?: string;
  style?: CSSProperties;
  className?: string;
  userId?: string | number;
};
type ppType = {
  id: string;
  arquivo: {
    nome: string;
    tipoArquivo: string;
    dados: string;
  };
};
export function ProfilePic(props: ProfilePicType) {
  const { data } = useQuery(
    "profilePic-" + props.userId,
    async () => {
      const response = await api.get<ppType>(`/imagem/fotoPerfil/${props.userId}`);
      if (response.data) {
        const blob = b64toBlob(response.data?.arquivo.dados, "image/png");
        const url = URL.createObjectURL(blob);
        return url;
      }
    },
    {
      enabled: !!props.userId,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 30, // 30 seconds
      
    }
  );
  return (
    <StyledProfilePic
      className={"profile-pic " + (props.className ?? "")}
      style={props.style}
    >
      <span className="default-profile">
        <svg
          id="defaultProfilePicSVG"
          data-name="defaultProfilePicSVG"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 574 574"
        >
          <defs>
            <style>
              {`
                .cls-1 {
                  fill: #555d60;
                }
                .cls-2 {
                  fill: #c3c7c9;
                }
              `}
            </style>
          </defs>
          <g>
            <circle className="cls-1" cx="287" cy="287" r="287" />
            <path
              className="cls-2"
              d="M650.47,261a104,104,0,1,1-104,104A104,104,0,0,1,650.47,261ZM650,675.34a266.26,266.26,0,0,0,185.41-74.83c-40.1-52.84-108.23-87.62-185.55-87.62S504.55,547.6,464.43,600.35A266.25,266.25,0,0,0,650,675.34Z"
              transform="translate(-363 -111)"
            />
          </g>
        </svg>
      </span>

      {(!isBlank(props.url) || !isBlank(data)) && (
        <>
          <img className="img-perfil" src={props.url || data} alt="" />
          <span className="pp-border"></span>
        </>
      )}
    </StyledProfilePic>
  );
}
