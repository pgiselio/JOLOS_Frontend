import { CSSProperties } from "react";
import { useProfilePic } from "../../hooks/useProfilePic";
import { isBlank } from "../../utils/isBlank";
import { StyledProfilePic } from "./style";

type ProfilePicType = {
  url?: string;
  style?: CSSProperties;
  className?: string;
  userId?: string | number;
  isCompany?: boolean;
};

export function ProfilePic(props: ProfilePicType) {
  const { data } = useProfilePic(props.userId);
  return (
    <StyledProfilePic
      className={"profile-pic " +(props.isCompany ? "company" : "") +(props.className ?? "")}
      style={{...props.style}}
    >
      <span className="default-profile">
        <svg
          id="defaultProfilePicSVG"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 574.07 574.07"
        >
          <defs>
            <style>
              {`
                .a {
                  fill: #555d60;
                }
                .b {
                  fill: #c3c7c9;
                }
              `}
            </style>
          </defs>
          <g>
            <rect className="a" width="574.07" height="574.07" />
            <path
              className="b"
              d="M453.9,685c-8.21,0-14.42-9-13-18.89C453.45,580,542,513.32,649.35,513.32S845.26,580,857.79,666.11C859.23,676,853,685,844.81,685ZM650,258.43A105.27,105.27,0,1,0,755.25,363.7,105.27,105.27,0,0,0,650,258.43Z"
              transform="translate(-363 -110.93)"
            />
          </g>
        </svg>
      </span>

      {(!isBlank(props.url) || !isBlank(data)) && (
        <>
          <img
            className="img-perfil"
            src={props.url || data || undefined}
            alt=""
          />
          <span className="pp-border"></span>
        </>
      )}
    </StyledProfilePic>
  );
}
