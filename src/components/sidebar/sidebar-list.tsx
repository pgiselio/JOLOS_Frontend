import { useAuth } from "../../hooks/useAuth";
import { useAppOptions } from "../../hooks/useAppOptions";

import { ProfilePic } from "../profile-pic/profile-pic";
import { SidebarItem } from "./sidebar-item";
import { SidebarAside, SidebarOverlay } from "./style";

export function SidebarList() {
  const auth = useAuth();
  const appOptions = useAppOptions();

  function nomePessoa(): string {
    if (!auth.userInfo?.id) {
      return "Carregando...";
    }
    return (
      auth.userInfo?.aluno?.dadosPessoa.nome ||
      auth.userInfo?.empresa?.dadosPessoa.nome ||
      "ADMIN"
    );
  }
  return (
    <>
      <SidebarOverlay
        onClick={() => appOptions.toggleSidebar()}
      ></SidebarOverlay>
      <SidebarAside className="side-bar">
        <div className="side-bar-container">
          <div className="min-perfil">
            <ProfilePic userId={auth.userInfo?.id} />
            <div className="min-perfil-details">
              <h3 className="min-perfil-name">{nomePessoa()}</h3>
              <span className="min-perfil-detail">{auth?.email}</span>
            </div>
          </div>

          <nav className="sidebar-items">
            <ul>
              <SidebarItem to="" icon="fas fa-home" label="Início" end />
              {auth?.authorities?.includes("ADMIN") && (
                <SidebarItem
                  to={`gerenciamento`}
                  icon="fas fa-gauge-high"
                  label="Gerenciamento"
                />
              )}
              <SidebarItem to="vagas" icon="fas fa-briefcase" label="Vagas" />
              <SidebarItem to="forum" icon="fas fa-comments" label="Fórum" />
              {!auth?.authorities?.includes("ADMIN") && (
                <SidebarItem
                  to={`profile/${auth.userInfo?.id}`}
                  icon="fas fa-user"
                  label="Perfil"
                />
              )}

              <SidebarItem
                to="settings"
                icon="fas fa-cog"
                label="Configurações"
              />
              <div className="menu-separator"></div>
              <li>
                <a href="/logout" title="Sair" className="sair">
                  <i className="fas fa-sign-out-alt"></i>
                  <span>Sair</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </SidebarAside>
    </>
  );
}
