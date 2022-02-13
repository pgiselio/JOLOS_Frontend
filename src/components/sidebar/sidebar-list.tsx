import { ProfilePic } from '../profile-pic/profile-pic';
import { SidebarItem } from './sidebar-item';
import "./sidebar.css";

function checkSidebarState() {
    const mq = window.matchMedia("(min-width: 766px)");
        
    if (mq.matches && localStorage.getItem('sidebar-collapsed') === ('collapsed')) {
        document.body.classList.add('toggle-sidemenu');
    }  
}

export function SidebarList(){
    checkSidebarState();
    return(
        <aside className="side-bar">
            <div className="side-bar-container">
                <div className="perfil">
                    <ProfilePic/>
                    <h3 className="name-perfil">testando 123</h3>
                </div>

                <div className="data">
                    <ul className="data-items">
                        <SidebarItem to="" icon="fas fa-home" label="Início"/>
                        <SidebarItem to="profile" icon="fas fa-user" label="Dados"/>
                        <SidebarItem to="vagas" icon="fas fa-briefcase" label="Vagas"/>
                        <SidebarItem to="forum" icon="fas fa-comments" label="Fórum"/>
                        <SidebarItem to="logout" icon="fas fa-sign-out-alt" label="Sair" className="sair"/>
                    </ul>
                </div>
            </div>
        </aside>

    );
}