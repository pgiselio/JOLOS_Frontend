export const SuapApiSettings = {
    CLIENT_ID:"bRbpKQw1PEjWIlb9r1Kza83A42h9AAh5UmaYwMwQ",
    REDIRECT_URI: process.env.NODE_ENV === "development" ? "http://localhost:3000/auth/suap/" : "https://ifjobs.vercel.app/auth/suap/",
    SUAP_URL: "https://suap.ifrn.edu.br",
    SCOPE: "identificacao email documentos_pessoais",
}
