import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import { ModalRouter } from "./components/modal-router";
import { RequireAuth } from "./contexts/AuthContext/RequireAuth";

//Pages
import Error404 from "./pages/404";
import CriarNovaVagaPage from "./pages/sys/vagas/criar-nova";
import { VagaCandidatoPage } from "./pages/sys/vagas/[id]/candidatos";
import { VagaSobrePage } from "./pages/sys/vagas/[id]/sobre";
import { VagasList } from "./pages/sys/vagas";
import LogoutPage from "./pages/logout";
import SettingsPage from "./pages/sys/settings";
import VagaPage from "./pages/sys/vagas/[id]";
import { CriarNovaVagaForm } from "./pages/sys/vagas/criar-nova/_form";
import { CadastroLayout } from "./pages/cadastro/layout";
import { LoadingPage } from "./components/loadingPage";
import { LoadingPageLogo } from "./components/loadingPage/logo";
import SettingContaPage from "./pages/sys/settings/conta";
import DownloadCurriculoPage from "./pages/sys/download/curriculo/[id]";
import VerifiqueOSeuEmailPage from "./pages/cadastro/step2";
import NewAnswerForm from "./pages/sys/forum/[id]/reply";
import { CadastroStep3 } from "./pages/cadastro/step3";
import CadastroConcluidoPage from "./pages/cadastro/confirmacao";
import { CadastroProvider } from "./contexts/CadastroContext";
import GerenciamentoPage from "./pages/sys/gerenciamento";
import CadastrarEmpresaPage from "./pages/sys/gerenciamento/cadastrar/empresa";
import PasswordResetPage from "./pages/recuperar-senha";
import HomePage from "./pages/sys/home";
import VerificarAlunoPage from "./pages/authsuap";

const LandingPage = lazy(() => import("./pages"));
const LoginPage = lazy(() => import("./pages/entrar"));
const CadastroPage = lazy(() => import("./pages/cadastro"));
const ForumPage = lazy(() => import("./pages/sys/forum"));
const ForumTopicPage = lazy(() => import("./pages/sys/forum/[id]"));
const ProfilePage = lazy(() => import("./pages/sys/profile/[id]"));
const SystemLayout = lazy(() => import("./pages/sys"));

export const AppRoutes = () => {
  let location = useLocation();
  let state = location.state as {
    modalLocation?: Location;
  };
  return (
    <>
      <Routes location={state?.modalLocation || location}>
        <Route path="*" element={<Error404 />} />
        <Route
          path="/"
          element={
            <Suspense fallback={<LoadingPageLogo />}>
              <LandingPage />
            </Suspense>
          }
        />
        <Route
          path="entrar"
          element={
            <Suspense fallback={<LoadingPageLogo />}>
              <LoginPage />
            </Suspense>
          }
        />
        <Route
          path="cadastro"
          element={
            <Suspense fallback={<LoadingPageLogo />}>
              <CadastroProvider>
                <CadastroLayout />
              </CadastroProvider>
            </Suspense>
          }
        >
          <Route index element={<CadastroPage />} />
          <Route path="step2" element={<VerifiqueOSeuEmailPage />} />
          <Route path="step3" element={<CadastroStep3 />} />
          <Route path="confirmacao" element={<CadastroConcluidoPage />} />
        </Route>
        <Route path="recuperar-senha" element={<PasswordResetPage />} />
        <Route path="logout" element={<LogoutPage />} />
        <Route
          path="download/curriculo/:id"
          element={<DownloadCurriculoPage />}
        />
        <Route
          path="sys"
          element={
            <RequireAuth>
              <Suspense fallback={<LoadingPageLogo />}>
                <SystemLayout />
              </Suspense>
            </RequireAuth>
          }
        >
          <Route path="*" element={<Error404 />} />
          <Route index element={<HomePage />} />
          <Route
            path="profile/:id"
            element={
              <Suspense fallback={<LoadingPage />}>
                <ProfilePage />
              </Suspense>
            }
          />
          <Route path="gerenciamento" element={<GerenciamentoPage />} />
          <Route
            path="gerenciamento/cadastrar/empresa"
            element={<CadastrarEmpresaPage />}
          />

          <Route path="vagas" element={<VagasList />} />
          <Route path="vagas/criar" element={<CriarNovaVagaPage />} />
          <Route path="vagas/:id" element={<VagaPage />}>
            <Route path="" element={<VagaSobrePage />} />
            <Route path="candidatos" element={<VagaCandidatoPage />} />
          </Route>
          <Route
            path="forum"
            element={
              <Suspense fallback={<LoadingPage />}>
                <ForumPage />
              </Suspense>
            }
          />
          <Route
            path="forum/:id"
            element={
              <Suspense fallback={<LoadingPage />}>
                <ForumTopicPage />
              </Suspense>
            }
          >
            <Route
              path="responder"
              element={
                <ModalRouter title="">
                  <NewAnswerForm />
                </ModalRouter>
              }
            />
          </Route>

          <Route path="settings" element={<SettingsPage />}>
            <Route path="conta" element={<SettingContaPage />} />
          </Route>
        </Route>
        <Route path="auth/suap" element={<RequireAuth><VerificarAlunoPage/></RequireAuth>}/>
      </Routes>
      {state?.modalLocation && (
        <ModalRouter title="Criar nova vaga">
          <CriarNovaVagaForm />
        </ModalRouter>
      )}
    </>
  );
};
