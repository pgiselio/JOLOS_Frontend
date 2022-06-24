import { useEffect, useState } from "react";
import { useVaga } from ".";
import { Box, BoxMessage, BoxTitle } from "../../../../components/box";
import { Button } from "../../../../components/button";
import CircularProgressFluent from "../../../../components/circular-progress-fluent";
import { ProfilePic } from "../../../../components/profile-pic/profile-pic";
import { api } from "../../../../services/api";
import { User } from "../../../../types/user";

export function VagaCandidatoPage() {
  const { data } = useVaga();
  const [candidatos, setCandidatos] = useState<User[]>([]);
  const [checked, setChecked] = useState([]);

  useEffect(() => {
    data?.alunos.forEach(async (candidato) => {
      await api
        .get<User>(`/usuario/${candidato}`)
        .then((response) => {
          if(!candidatos.includes(response.data))
            setCandidatos(c => c.concat(response.data));          
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }, [data?.alunos]);
  if (!data) {
    return (
      <p
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          padding: "30px",
        }}
      >
        <CircularProgressFluent
          color="var(--accent-color)"
          height="30px"
          width="30px"
          duration=".9s"
        />
        Carregando...
      </p>
    );
  }
  return (
    <Box>
      <BoxTitle>
        <input type="checkbox" name="" id="candidato-checkall" />
        <label htmlFor="candidato-checkall">Selecionar tudo</label>
      </BoxTitle>

      <span>
        {data.alunos.length > 0 ? (
          <ul className="lista-candidatos">
            {candidatos.length > 0 ? (
              console.log(candidatos),
              candidatos.map((candidato) => {
                return (
                  <li className="candidato" key={candidato.id}>
                    <button>
                      <input
                        type="checkbox"
                        name=""
                        className="candidato-list-check"
                      />
                      <a
                        href={"../../profile/" + candidato.id}
                        className="candidato-group"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <ProfilePic className="candidato-pic" />
                        <div className="candidato-info">
                          <h3>{candidato.aluno?.dadosPessoa.nome}</h3>
                          <span>{candidato.email}</span>
                        </div>
                      </a>
                    </button>
                  </li>
                );
              })
            ) : (
              <p
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                  padding: "30px",
                }}
              >
                <CircularProgressFluent
                  color="var(--accent-color)"
                  height="30px"
                  width="30px"
                  duration=".9s"
                />
                Carregando...
              </p>
            )}

            <div className="lista-candidatos-actions">
              <Button className="less-radius">Baixar currículos</Button>
            </div>
          </ul>
        ) : (
          <span>
            <BoxMessage>
              <span>Sem candidatos para essa vaga</span>
            </BoxMessage>
          </span>
        )}
      </span>
    </Box>
  );
}
