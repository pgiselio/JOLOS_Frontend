import { useTabs } from "react-headless-tabs";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { notification } from "../../types/notification";
import { relativeTimeFromDates } from "../../utils/relativeDate";
import CircularProgressFluent from "../circular-progress-fluent";
import { NotificationCard } from "./notification-card";
import { StyledNotifications } from "./style";

export function Notifications() {
  const auth = useAuth();
  const [selectedTab, setSelectedTab] = useTabs(["new", "read"]);

  const { data: notificationsDataRead } = useQuery(
    ["notifications-read"],
    async () => {
      const response = await api.get<notification[]>(
        `/notificacao/usuario/${auth.email}/visualizadas`
      );
      return response.data;
    },
    {
      staleTime: 1000 * 60, // 1 minute to refetch
      refetchInterval: 1000 * 60, // 1 minutes to refetch
    }
  );

  function markAsRead(id: number) {
    api.patch(`/notificacao/marcarComoLido/${id}`);

    const previousNotifications =
      queryClient.getQueryData<notification[]>(["notifications-new"]);

    if (previousNotifications) {
      const nextNotifications = previousNotifications.filter(
        (notification: notification) => notification.id !== id
      );
      queryClient.setQueryData(["notifications-new"], nextNotifications);
    }
    queryClient.invalidateQueries(["notifications-read"]);
  }

  return (
    <StyledNotifications className="notification-container">
      <div className="notification-header">
        <div className="title">
          <h3>Notificações</h3>
        </div>
        <div className="buttons">
          <button
            type="button"
            onClick={() => setSelectedTab("new")}
            className={selectedTab === "new" ? "active" : ""}
          >
            Novas
          </button>
          <button
            type="button"
            onClick={() => setSelectedTab("read")}
            className={selectedTab === "read" ? "active" : ""}
          >
            Lidas
          </button>
        </div>
      </div>
      <div className="notification-cards">
        {selectedTab === "new" &&
          (auth.notificationNew ? (
            auth.notificationNew.length === 0 ? (
              <div className="notification-card no-notifications">
                No momento você não tem notificações novas!
              </div>
            ) : (
              auth.notificationNew.map((notification: notification) => {
                if (notification && !notification.visualizado) {
                  return (
                    <NotificationCard
                      titulo={notification.titulo}
                      detalhes={notification.descricao}
                      key={notification.id}
                      onClick={() => markAsRead(notification.id)}
                      title="Clique para marcar como lido"
                      date={
                        relativeTimeFromDates(
                          new Date(
                            Date.parse(notification.data) - 1000 * 60 * 60 * 3
                          )
                        ) || ""
                      }
                    />
                  );
                } else {
                  return null;
                }
              })
            )
          ) : (
            <p
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                paddingTop: "30px",
              }}
            >
              <CircularProgressFluent
                color="var(--accent-color)"
                height="30px"
                width="30px"
                duration=".9s"
              />
              Carregando...
            </p>
          ))}

        {selectedTab === "read" &&
          (notificationsDataRead ? (
            notificationsDataRead.length === 0 ? (
              <div className="notification-card no-notifications">
                Sem notificações lidas!
              </div>
            ) : (
              notificationsDataRead.map((notification: notification) => {
                if (notification && notification.visualizado) {
                  return (
                    <NotificationCard
                      titulo={notification.titulo}
                      detalhes={notification.descricao}
                      key={notification.id}
                      read
                      date={
                        relativeTimeFromDates(
                          new Date(
                            Date.parse(notification.data) - 1000 * 60 * 60 * 3
                          )
                        ) || ""
                      }
                    />
                  );
                } else {
                  return null;
                }
              })
            )
          ) : (
            <p
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                paddingTop: "30px",
              }}
            >
              <CircularProgressFluent
                color="var(--accent-color)"
                height="30px"
                width="30px"
                duration=".9s"
              />
              Carregando...
            </p>
          ))}
      </div>
    </StyledNotifications>
  );
}
