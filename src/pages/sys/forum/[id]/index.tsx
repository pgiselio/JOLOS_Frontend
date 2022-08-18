import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { Box, BoxContent, BoxTitle } from "../../../../components/box";
import { Button } from "../../../../components/button";
import { HeaderTitle } from "../../../../components/header-title";
import { OutsetHeadersCornerRadius } from "../../../../components/outset-radius-to-headers";

export default function ForumTopicPage() {
  let location = useLocation();
  const navigate = useNavigate();
  let params = useParams();
  return (
    <>
      <section style={{ minHeight: "100vh" }}>
        <OutsetHeadersCornerRadius>
          <HeaderTitle className="header-section">
            <h2>Topic ID: {params.id}</h2>
            <Button
              className="outlined"
              onClick={() =>
                navigate("responder", { state: { modalLocation: location } })
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
              <h3>Topic ID: {params.id}</h3>
            </BoxContent>
          </Box>
          <Box id="newComment">
            <BoxTitle>Comentar</BoxTitle>
            <BoxContent>
              <h3>Topic ID: {params.id}</h3>
            </BoxContent>
          </Box>
        </div>
      </section>
    </>
  );
}
