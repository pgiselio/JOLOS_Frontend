import { createContext, useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { notification } from "../../types/notification";
import { User } from "../../types/user";
import { IAuthProvider, IContext, IUser } from "./types";
import { getUserLocalStorage, LoginRequest, setUserLocalStorage } from "./util";

export const AuthContext = createContext<IContext>({} as IContext);

export function AuthProvider({ children }: IAuthProvider) {
  let navigate = useNavigate();
  const [user, setUser] = useState<IUser | null>();
  const [loadingUserFromLocalStorage, setLoadingUserFromLocalStorage] =
    useState(true);

  useEffect(() => {
    const user = getUserLocalStorage();
    if (user) {
      setUser(user);
    }
    setLoadingUserFromLocalStorage(false);
  }, []);
  const { data: notificationNew } = useQuery(
    "notifications-new",
    async () => {
      let user = getUserLocalStorage();
      const response = await api.get<notification[]>(
        `/notificacao/usuario/${user.email}`
      );
      return response.data;
    },
    {
      enabled: !!user?.token,
      refetchOnWindowFocus: true,
      staleTime: 1000 * 30, // 30 seconds
      refetchInterval: 1000 * 60 * 1, // 1 minute to refetch automatically
    }
  );

  const { data: userInfo } = useQuery<User>(
    ["meUser"],
    async () => {
      let user = getUserLocalStorage();
      if (!user?.email) {
        logout();
        if (window.location.href.indexOf("sys") > -1) {
          window.location.href = "/entrar?error=invalidCredentials";
        }
      }
      const response = await api
        .get(`/usuario/email/${user.email}`)
        .catch((error) => {
          if (
            error.response.status === 401 ||
            error.response.status === 403 ||
            error.response.status === 500
          ) {
            logout();
          } else {
            return error;
          }
        });
      return response?.data;
    },
    {
      enabled: !!user?.token,
      refetchOnWindowFocus: true,
      staleTime: 1000 * 60, // 1 minute
      refetchInterval: 1000 * 60 * 5, // 5 minutes to refetch automatically
    }
  );

  let authorities = useRef<string[]>([]);
  if (userInfo?.roles) {
    let authoritiesAux: string[] = [];
    userInfo?.roles?.forEach((role: any) => {
      authoritiesAux.push(role.nomeRole);
    });
    authorities.current = authoritiesAux;
  }

  async function signin(email: string, password: string) {
    const response = await LoginRequest(email, password);

    const payload = {
      token: response.Authorization.replace("Bearer ", ""),
      email,
      type: response.usertype,
    };

    setUser(payload);
    setUserLocalStorage(payload);
  }

  function logout() {
    setUser(null);
    setUserLocalStorage(null);
    queryClient.setQueryData("meUser", undefined);
    queryClient.invalidateQueries("meUser");
    queryClient.removeQueries("meUser");
    navigate("/entrar", { replace: true });
  }

  return (
    <AuthContext.Provider
      value={{
        ...user,
        signin,
        logout,
        loadingUserFromLocalStorage,
        userInfo,
        authorities: authorities.current,
        notificationNew,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
