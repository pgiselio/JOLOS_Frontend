export const SuapApiSettings = {
    CLIENT_ID:"bRbpKQw1PEjWIlb9r1Kza83A42h9AAh5UmaYwMwQ",
    REDIRECT_URI: process.env.NODE_ENV === "development" ? "http://localhost:3000/sys/authsuap/" : "https://ifjobs.vercel.app/sys/authsuap/",
    SUAP_URL: "https://suap.ifrn.edu.br",
    SCOPE: "identificacao email documentos_pessoais",
}
