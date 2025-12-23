import React, { useState } from "react";


export interface NotificationItem {
    id:string,
    message: string,
    type: string,
    duration: number
}

export interface NotificationContextType {
    showNotification: (notification: NotificationItem) => void;
}

export const NotificationContext = React.createContext<NotificationContextType | null>(null);

interface ContextProps {
    children: React.ReactNode
}
export const NotificationProvider :React.FC<ContextProps> = ({children}) => {
      const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const showNotification = (notification:NotificationItem ) => {
      setNotifications([...notifications, notification]);
      setTimeout(() => {
          setNotifications(prev => prev.filter(n => (n.id!==notification.id)));
      }, notification.duration);
      // Exercice: Limiter le nb de notifications à 3 en modifiant le state notifications
  }
    return (
        <NotificationContext.Provider value={{showNotification}}>
            {children}
             <div id="notification-container">
        {
          notifications.map((n,index) => (
            <div className={`notification ${n.type}`}>
              {n.message}
            </div>
          )

          )
        }
        </div>
        </NotificationContext.Provider>
    )
}