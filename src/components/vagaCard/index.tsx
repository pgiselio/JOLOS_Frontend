import { Link } from "react-router-dom";
import { vaga } from "../../types/vagaType";
import { PillItem, PillList } from "../pill";
import { ProfilePic } from "../profile-pic/profile-pic";
import { VagaCardStyle } from "./style";

type vagaObj = {
  vaga: vaga;
};
export function VagaCard({ vaga }: vagaObj) {
  const date = new Date(vaga.dataCriacao);
  const dateFormatted = new Intl.DateTimeFormat(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date.getTime() + Math.abs(date.getTimezoneOffset() * 60000));
  return (
    <VagaCardStyle className="vaga">
      <div className="vaga-data">
        <div className="vaga-header">
          <div className="photo-align">
            <Link to={`../profile/${vaga?.empresa?.id}`}>
              <ProfilePic userId={vaga?.empresa?.id}/>
            </Link>

            <div>
              <div className="vaga-titles">
                <h3>
                  <Link to={`${vaga.id}`} className="vagas-detalhes-btn" title={vaga.titulo}>
                    {vaga.titulo}
                  </Link>
                </h3>

                <div className="sub">
                  <Link to={`../profile/${vaga?.empresa?.id}`}>
                    {vaga?.empresa?.dadosPessoa.nome}
                  </Link>
                  <span className="vaga-date">{dateFormatted}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="vaga-text">
          <PillList>
            <PillItem
              className={
                "card-pill status " + (vaga.status === "ATIVO" && "active")
              }
              title="Estado da vaga"
            >
              <span>{vaga.status === "ATIVO" ? "ATIVO" : "INATIVO"}</span>
            </PillItem>
            <PillItem className="card-pill" title="Curso alvo">
              <i className="fas fa-book-open"></i>
              <span className="vaga-city">{vaga.cursoAlvo}</span>
            </PillItem>
            <PillItem className="card-pill" title="Localização">
              <i className="fas fa-map-marker-alt"></i>
              <span className="vaga-city">{vaga.localizacao}</span>
            </PillItem>
          </PillList>
        </div>

        <div className="vagas-bottom">
          <Link to={`${vaga.id}/candidatos`} className="vagas-candidatos">
            <i className="fas fa-user"></i>
            <span>
              {vaga.alunos.length}
              {vaga.alunos.length > 1 || vaga.alunos.length === 0
                ? " Candidatos"
                : " Candidato"}
            </span>
          </Link>
          <Link to={`${vaga.id}`} className="vagas-detalhes-btn">
            Mais detalhes
          </Link>
        </div>
      </div>
    </VagaCardStyle>
  );
}
