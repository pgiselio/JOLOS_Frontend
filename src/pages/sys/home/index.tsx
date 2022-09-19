import { useEffect, useRef, useState } from "react";
import { Button } from "../../../components/button";
import { Notifications } from "../../../components/notifications/notifications-list";
import { SuapClient } from "../../../services/suapapi/client";
import { SuapApiSettings } from "../../../services/suapapi/settings";

export default function HomePage() {
  const NewSuapClient = SuapClient({
    authHost: SuapApiSettings.SUAP_URL,
    clientID: SuapApiSettings.CLIENT_ID,
    redirectURI: SuapApiSettings.REDIRECT_URI,
    scope: SuapApiSettings.SCOPE,
  });
  NewSuapClient.init();
  const [resourceResponse, setResourceResponse] = useState("");
  const Callback = (response: any) => {
    setResourceResponse(JSON.stringify(response.data));
    console.log(resourceResponse)
  };
  useEffect(() => {
    if (NewSuapClient.isAuthenticated()) {
      NewSuapClient.getResource(SuapApiSettings.SCOPE, Callback);
    }
  }, []);

  window.addEventListener("message", (event) => {
    if (event.data === "reload")
      window.location.href = window.location.href;
  }, false);
  return (
    <>
      <div className="content">
        <Notifications />
        <p>
          Logado com o suap:
          {!NewSuapClient.isAuthenticated() ? (
            <span>
              {" "}
              NÃO{" "}
              <a
                href={NewSuapClient.getLoginURL() + ""}
                target="popup"
                onClick={() => {
                  window.open(
                    NewSuapClient.getLoginURL() + "",
                    "popup",
                    "width=600,height=600,scrollbars=no,resizable=no,left=" +
                      (window.screen.width - 600) / 2 +
                      ",top=" +
                      (window.screen.height - 600) / 2
                  );
                  return false;
                }}
              >
                Verificar
              </a>
            </span>
          ) : (
            <span>
              {" "}
              <strong>SIM</strong> <Button onClick={() => NewSuapClient.logout()}>Logout</Button>
              <textarea defaultValue={resourceResponse}></textarea>
            </span>
          )}
        </p>
      </div>
    </>
  );
}
