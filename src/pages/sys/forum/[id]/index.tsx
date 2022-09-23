import { useRef } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { Box, BoxContent, BoxTitle } from "../../../../components/box";
import { Button } from "../../../../components/button";
import { HeaderTitle } from "../../../../components/header-title";
import { OutsetHeadersCornerRadius } from "../../../../components/outset-radius-to-headers";
import { ProfilePic } from "../../../../components/profile-pic/profile-pic";
import { ForumTopic, NewAnswer } from "../styles";

export default function ForumTopicPage() {
  let location = useLocation();
  const navigate = useNavigate();
  let params = useParams();
  const answerTextRef = useRef<HTMLTextAreaElement>(null);
  return (
    <>
      <section style={{ minHeight: "100vh" }}>
        <OutsetHeadersCornerRadius>
          <HeaderTitle className="header-section">
            <h2>Nome da vaga aqui #{params.id}</h2>
            <Button
              className="outlined"
              onClick={() =>
                answerTextRef.current?.focus()
              }
              key="criar-resposta"
            >
              <i className="fa-solid fa-reply"></i>
              Responder
            </Button>
          </HeaderTitle>
        </OutsetHeadersCornerRadius>
        <div className="content">
          <Outlet />
          <Box>
            <BoxContent>
              <span>Empresa tal - 22/02/2022</span>
            </BoxContent>
          </Box>
          <Box>
            <BoxContent>
              <h3>Discussões sobre a vaga</h3>
              <br/>
              <ForumTopic>
                <div className="topic-message">
                  <div className="sender-detail">
                    <ProfilePic style={{ width: 50, height: 50 }} />
                    <div>
                      <h4>Álvaro</h4>
                      <span>há 12 minutos</span>
                    </div>
                  </div>
                  <div className="message">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Ex molestiae nam assumenda velit debitis iure! Maiores
                      consectetur, quis, quibusdam nulla, incidunt adipisci modi
                      architecto cumque provident laborum expedita a mollitia
                      fuga esse asperiores. Aspernatur molestiae dignissimos
                      natus! Ex minima adipisci culpa omnis quaerat nihil
                      reiciendis? Porro labore aut officiis iusto asperiores
                      ratione expedita dicta optio fugiat. Nobis explicabo
                      placeat atque ipsa odit dolorem facere provident
                      aspernatur qui, vitae eos vero laudantium ipsam culpa
                      distinctio aliquid ut officia excepturi aperiam laboriosam
                      repellat totam quos cupiditate nemo. Asperiores tempore
                      eos facilis accusamus, quidem modi molestias, doloremque
                      ut dignissimos ratione, voluptatum dolorem quibusdam.
                    </p>
                  </div>
                </div>
                <ForumTopic>
                  <div className="topic-message">
                    <div className="sender-detail">
                      <ProfilePic style={{ width: 50, height: 50 }} />
                      <div>
                        <h4>Lucas</h4>
                        <span>há 10 minutos</span>
                      </div>
                    </div>
                    <div className="message">
                      <p>asdjasl daslkdj aslk daslk ldkja slk</p>
                    </div>
                  </div>
                </ForumTopic>
              </ForumTopic>
              <ForumTopic>
                <div className="topic-message">
                  <div className="sender-detail">
                    <ProfilePic style={{ width: 50, height: 50 }} />
                    <div>
                      <h4>Pedro</h4>
                      <span>há 11 minutos</span>
                    </div>
                  </div>
                  <div className="message">
                    <p>asdjasl daslkdj aslk daslk ldkja slk</p>
                  </div>
                </div>
              </ForumTopic>
            </BoxContent>
          </Box>
          <NewAnswer id="newComment">
            <BoxTitle>Responder</BoxTitle>
            <BoxContent>
              <form action="">
                <textarea
                  name="newanswer"
                  id="newanswerfield"
                  className="new-answer-field"
                  ref={answerTextRef}
                ></textarea>
                <Button type="submit">
                  Enviar <i className="fa-solid fa-paper-plane"></i>
                </Button>
              </form>
            </BoxContent>
          </NewAnswer>
        </div>
      </section>
    </>
  );
}
