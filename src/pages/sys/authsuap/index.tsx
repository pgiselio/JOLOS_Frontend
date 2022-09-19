import { LoadingPage } from "../../../components/loadingPage";
import { SuapClient } from "../../../services/suapapi/client";
import { SuapApiSettings } from "../../../services/suapapi/settings";

export default function VerificarAlunoPage() {
  const NewSuapClient = SuapClient({
    authHost: SuapApiSettings.SUAP_URL,
    clientID: SuapApiSettings.CLIENT_ID,
    redirectURI: SuapApiSettings.REDIRECT_URI,
    scope: SuapApiSettings.SCOPE,
  });
  NewSuapClient.init();
  setTimeout(() => {
    window.opener && window.opener.postMessage("reload")
    var daddy = window.self;
    daddy.opener = window.self;
    daddy.close();
    window.location.href = "/sys/"
  }, 200)
  return (
    <div className="content">
      <LoadingPage/>
    </div>
  );
}
