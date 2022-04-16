import { useAuth } from "../../hooks/useAuth";
import { ProfilePic } from "../profile-pic/profile-pic";
import { SidebarItem } from "./sidebar-item";
import { SidebarAside } from "./style";

export function SidebarList() {
  function checkSidebarState() {
    const mq = window.matchMedia("(min-width: 766px)");

    if (mq.matches && localStorage.getItem("toggle-sidemenu") === "yes") {
      document.body.classList.add("toggle-sidemenu");
    }
  }
  checkSidebarState();
  const auth = useAuth();
  function nomePessoa(): string {
    if(!auth.userInfo?.id){
      return "Carregando...";
    }
    return auth.userInfo?.aluno?.dadosPessoa.nome || auth.userInfo?.empresa?.dadosPessoa.nome || "ADMIN";
  }
  return (
    <SidebarAside className="side-bar">
      <div className="side-bar-container">
        <div className="min-perfil">
          <ProfilePic />
          <div className="min-perfil-details">
            <h3 className="min-perfil-name">{nomePessoa()}</h3>
            <span className="min-perfil-detail">{auth?.email}</span>
          </div>
        </div>

        <nav className="sidebar-items">
          <ul>
            <SidebarItem to="" icon="fas fa-home" label="Início" end />
            <SidebarItem to="vagas" icon="fas fa-briefcase" label="Vagas" />
            <SidebarItem to="forum" icon="fas fa-comments" label="Fórum" />
            {nomePessoa() !== "ADMIN" && (
              <SidebarItem to={`profile/${auth.userInfo?.id}`} icon="fas fa-user" label="Perfil" />
            )}

            <SidebarItem
              to="settings"
              icon="fas fa-cog"
              label="Configurações"
            />
            <div className="menu-separator"></div>
            <SidebarItem
              to="/logout"
              icon="fas fa-sign-out-alt"
              label="Sair"
              className="sair"
            />
          </ul>
        </nav>
      </div>
    </SidebarAside>
  );
}
