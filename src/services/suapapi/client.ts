import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useRef } from "react";
/**
 * Classe que representa um token de autorização.
 *
 * @constructor
 *
 * @param {string} token - A sequência de caracteres que representa o Token.
 * @param {number} expirationTime - Número de segundos que o token durará.
 * @param {string} scope - A lista de escopos (separados por espaço) que foi autorizado pelo usuário.
 */
var Token = function ({
  value,
  expirationTime,
  scope,
}: {
  value?: string | null;
  expirationTime: number;
  scope?: string | null;
}) {
  /* Atributos */
  const startTime = useRef<number>(new Date().getTime()); // O valor em milissegundos.
  const finishTime = useRef<Date | null>(
    new Date(startTime.current + expirationTime * 1000)
  ); // O objeto Date.
  // Cria os cookies para o token, seu momento da expiração e seus escopos.

  if (!Cookies.get("suapToken") && value && finishTime.current) {
    Cookies.set("suapToken", value, { expires: finishTime.current });
  } else {
    value = Cookies.get("suapToken");
  }

  if (!Cookies.get("suapTokenExpirationTime") && finishTime.current) {
    Cookies.set("suapTokenExpirationTime", finishTime.current + "", {
      expires: finishTime.current,
    });
  } else {
    finishTime.current = new Date(Cookies.get("suapTokenExpirationTime") || "");
  }

  if (!Cookies.get("suapScope") && scope) {
    Cookies.set("suapScope", scope, { expires: finishTime.current });
  } else {
    scope = Cookies.get("suapScope");
  }

  const getValue = function () {
    return value;
  };

  const getExpirationTime = function () {
    return finishTime.current;
  };

  const getScope = function () {
    return scope;
  };

  const isValid = () => {
    if (Cookies.get("suapToken") && value != null) {
      return true;
    }
    return false;
  };

  const revoke = function () {
    value = null;
    startTime.current = new Date().getTime();
    finishTime.current = null;

    if (Cookies.get("suapToken")) {
      Cookies.remove("suapToken");
    }

    if (Cookies.get("suapTokenExpirationTime")) {
      Cookies.remove("suapTokenExpirationTime");
    }

    if (Cookies.get("suapScope")) {
      Cookies.remove("suapScope");
    }
  };
  return { getValue, getExpirationTime, getScope, isValid, revoke };
};

type clientProps = {
  authHost: String;
  clientID: String;
  redirectURI: String;
  scope: String;
};

/**
 * Classe principal do SDK e seu construtor, que inicializa os principais atributos.
 *
 * @constructor
 *
 * @param {string} authHost - URI do host de autenticação.
 * @param {string} clientID - ID da aplicação registrado no SuapClient.
 * @param {string} redirectURI - URI de redirecionamento da aplicação cadastrada no SuapClient.
 *
 */
export const SuapClient = ({
  authHost,
  clientID,
  redirectURI,
  scope,
}: clientProps) => {
  /* Atributos privados */
  var resourceURL = authHost + "/api/eu/";
  var authorizationURL = authHost + "/o/authorize/";
  var logoutURL = authHost + "/o/revoke_token/";

  var responseType = "token";
  var grantType = "implict"; // Necessário para utilizar Oauth2 com Javascript

  // Remove a '/' caso ela já esteja inserida no auth_host.
  if (authHost.charAt(authHost.length - 1) == "/") {
    authHost = authHost.substr(0, authHost.length - 1);
  }

  var dataJSON: any;
  let token: any;

  /* Métodos privados */

  /**
   * Extrai o token da URL e retorna-o.
   *
   * @return {string} O token de autorização presente na URL de retorno.
   */
  const extractToken = () => {
    var match = document.location.hash.match(/access_token=(\w+)/);
    if (match != null) {
      return !!match && match[1];
    }
    return null;
  };

  /**
   * Extrai os escopos autorizados da URL e retorna-os caso o usuário já esteja autenticado.
   * @return {string} Escopos autorizados pelo usuário (separados por espaço).
   */
  var extractScope = function () {
    var match = document.location.hash.match(/scope=(.*)/);
    if (match != null) {
      return match[1].split("+").join(" ");
    }
    return null;
  };

  /**
   * Extrai o tempo de duração do token (em segundos) da URL.
   * @return {number} Tempo de duração do token.
   */
  var extractDuration = function () {
    var match = document.location.hash.match(/expires_in=(\d+)/);

    if (match != null) {
      return Number(!!match && match[1]);
    }

    return 0;
  };

  // var getCookie = function (name: any) {
  //   var value = "; " + document.cookie;
  //   var parts = value.split("; " + name + "=");
  //   if (parts && parts.length == 2) return parts.pop().split(";").shift();
  // };

  /* Métodos públicos */

  /**
   * Inicializa os objetos token e o dataJSON.
   *
   */
  const init = () => {
    token = Token({
      value: extractToken(),
      expirationTime: extractDuration(),
      scope: extractScope(),
    });
    dataJSON = {};
  };

  /**
   * Retorna o objeto token.
   *
   * @return {string} token se o usuário estiver autenticado; null caso contrário.
   */
  const getToken = () => {
    return token;
  };

  /**
   * Retorna o objeto dataJSON, que contém os dados retornados após a requisição Ajax.
   *
   * @return {Object} O objeto JSON com os dados requisitados.
   */
  const getDataJSON = () => {
    return dataJSON;
  };

  /**
   * Retorna a URI de redirecionamento.
   *
   * @return {string} URI de redirecionamento.
   */
  const getRedirectURI = () => {
    return redirectURI;
  };

  /**
   * Retorna se o usuário está autenticado ou não com base no estado do token.
   * @return {Boolean} true se o usuário estiver autenticado; false caso contrário.
   */
  const isAuthenticated = (): boolean => {
    return token.isValid();
  };

  /**
   * Cria a URL de login com todos os parâmetros da aplicação.
   * @return {string} A URL de login do SuapClient.
   */
  const getLoginURL = () => {
    var loginUrl =
      authorizationURL +
      "?response_type=" +
      responseType +
      "&grant_type=" +
      grantType +
      "&client_id=" +
      clientID +
      "&scope=" +
      scope +
      "&redirect_uri=" +
      redirectURI;
    return loginUrl;
  };

  /**
   * Cria a URL de cadastro com retorno.
   * @return {string} A URL de cadastro do SuapClient.
   */
  const getRegistrationURL = () => {
    var registrationUrl =
      authHost + "/register/" + "?redirect_uri=" + redirectURI;
    return registrationUrl;
  };

  const getResource = async (scope: string, callback: any) => {
    await axios
      .get(resourceURL, {
        data: { scope: scope },
        headers: {
          Authorization: "Bearer " + token.getValue(),
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        callback(response);
      })
      .catch((response) => {
        alert("Falha na comunicação com o SUAP");
        console.log(response);
      });
  };

  const login = () => {
    window.location.href = getLoginURL();
  };

  const logout = () => {
    var bodyFormData = new FormData();
    bodyFormData.append('token', token.getValue());
    bodyFormData.append('client_id', clientID +"");
    axios
      .post(logoutURL, bodyFormData)
      .then((response) => {
        token.revoke();
        window.location.href = redirectURI + "";
        return true;
      })
      .catch((response) => {
        alert("Falha na comunicação com o SUAP");
        console.log(response);
        return false;
      });
  };
  return {
    init,
    login,
    logout,
    getResource,
    getRegistrationURL,
    isAuthenticated,
    getLoginURL,
    getRedirectURI,
    getDataJSON,
    getToken,
  };
};
