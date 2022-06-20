import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, BoxContent } from "../../../components/box";
import { Button } from "../../../components/button";
import { FabButton } from "../../../components/fab";
import { HeaderTitle } from "../../../components/header-title";
import { OutsetHeadersCornerRadius } from "../../../components/outset-radius-to-headers";
import { ProfilePic } from "../../../components/profile-pic/profile-pic";
import { Container } from "./styles";

const CreateNewFAB = styled(FabButton)`
  display: fixed;
  @media (min-width: 766px) {
    display: none;
  }
`;
const CreateNewButton = styled(Button)`
  display: none;
  @media (min-width: 766px) {
    display: flex;
  }
`;

export default function ForumPage() {
  return (
    <Container>
      <OutsetHeadersCornerRadius>
        <HeaderTitle>
            <CreateNewFAB className="FabCreateNew" type="button">
              <i className="fas fa-filter"></i>
            </CreateNewFAB>
            <h2>Fórum</h2>
            <CreateNewButton
              className="outlined"
              key="create-new-vaga-btn"
              id="filtro"
            >
              Filtros <i className="fas fa-filter"></i>
            </CreateNewButton>
        </HeaderTitle>
      </OutsetHeadersCornerRadius>
      <div className="content">
        <Box>
          <BoxContent className="topics">
            <div className="topic">
              <Link to="12" className="pessoa-forum-group">
                <div className="vaga-forum-info">
                  <h3>
                    Assistente administrativo{" "}
                    <span className="topicID">#12</span>
                  </h3>
                  <div className="topic-meta">
                    <span>Nome empresa </span>
                    <span>- 02/03/2002</span>
                  </div>
                </div>
                <div className="last-answer">
                  <i className="fa-solid fa-arrow-turn-up"></i>
                  <div className="answer-content">
                    <ProfilePic className="candidato-pic" />
                    <span className="pessoa-forum-info">
                      <span className="name">Alvaro</span>
                      <p className="message">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry?
                      </p>
                    </span>
                  </div>
                </div>
              </Link>
            </div>
            <div className="topic">
              <Link to="12" className="pessoa-forum-group">
                <div className="vaga-forum-info">
                  <h3>Bolsista desenvolvedor de software</h3>
                  <div className="topic-meta">
                    <span>Jolos Company </span>
                    <span>- 02/03/2002</span>
                  </div>
                </div>
                <div className="last-answer">
                  <i className="fa-solid fa-arrow-turn-up"></i>

                  <div className="answer-content">
                    <ProfilePic className="candidato-pic" />
                    <span className="pessoa-forum-info">
                      <span className="name">
                        Alvaro - <span>há 2 min</span>
                      </span>
                      <p className="message">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Pellentesque et tortor felis. Duis et metus sodales,
                        tempus neque et, facilisis libero. Mauris in leo ornare,
                        suscipit metus sit amet, porttitor erat. Cras hendrerit,
                        turpis sed posuere auctor, ligula eros iaculis sem, non
                        laoreet odio dui sed nisi. Donec ut tortor in eros
                        dapibus dictum ac quis lectus. Sed tortor arcu, lacinia
                        eu ante id, vulputate eleifend nibh. Fusce suscipit,
                        arcu in consequat sodales, lacus tellus faucibus tellus,
                        at accumsan ligula lorem vitae orci. Proin turpis
                        sapien, pulvinar sit amet lectus non, hendrerit ornare
                        justo. In vel ullamcorper mi, eu ultrices purus. Cras
                        imperdiet molestie auctor. Integer a viverra sapien.
                      </p>
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </BoxContent>
        </Box>
      </div>
    </Container>
  );
}
