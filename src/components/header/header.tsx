import { Link, useNavigate } from "react-router-dom";
import { useAppOptions } from "../../hooks/useAppOptions";
import { useAuth } from "../../hooks/useAuth";
import { HeaderSysStyle } from "./style";

export function Header(props: any) {
  const auth = useAuth();
  const appOptions = useAppOptions();
  const navigate = useNavigate();

  return (
    <HeaderSysStyle className="header">
      <nav className="navigate">
        <div className="menu-container">
          <button
            id="btn-collapse-sidemenu"
            onClick={() => appOptions.toggleSidebar()}
            aria-label="Botão de esconder ou mostrar menu lateral"
          >
            <div className="botao-ham">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
          <Link to="/" className="logo-link">
            <img src="/images/logo.svg" className="logo" alt="logo projeto" />
          </Link>

          <button
            className="btn-notify"
            aria-label="Botão de notificações"
            onClick={() => navigate("/sys")}
          >
            <div>
              <i className="fas fa-bell"></i>
              {auth.notificationNew && auth.notificationNew.length > 0 && (
                <span></span>
              )}
            </div>
          </button>
        </div>
      </nav>
    </HeaderSysStyle>
  );
}
