import React, { createContext, useContext, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { nanoid } from 'nanoid';
import { AnimatePresence } from 'framer-motion';
// local imports
import Alert from './Alert';

// export context
export const NotifyContext = createContext({});
// export hook
export const useNotify = () => useContext(NotifyContext);

// <div className="container m-auto z-10 absolute w-full" style={{ top: '75px' }}>

// used to add elements to the DOM
function useCreateDomElement() {
  const [domElement, setDomElement] = React.useState(null);

  React.useEffect(() => {
    const root = document.getElementById('root');
    const element = document.createElement('div');
    element.id = 'notifications';
    element.classList.add('container');
    element.classList.add('flex');
    element.classList.add('flex-col');
    element.classList.add('items-center');
    element.classList.add('m-auto');
    root.appendChild(element);
    setDomElement(element);

    return () => root.removeChild(element);
  }, []);

  return domElement;
}

function useNotifications() {
  // build array of alerts
  const [notifications, setNotifications] = React.useState([]);

  // return cache
  const notify = useCallback((notificationPayload) => {
    const id = nanoid();

    function removeNotification() {
      // eslint-disable-next-line no-shadow
      setNotifications((notifications) =>
        notifications.filter((n) => n.id !== id)
      );
    }

    // eslint-disable-next-line no-shadow
    setNotifications((notifications) => [
      ...notifications,
      // default on close action
      { id, onClose: removeNotification, ...notificationPayload },
    ]);

    setTimeout(removeNotification, 5000);
  }, []);

  return { notify, notifications };
}

// eslint-disable-next-line react/prop-types
export default function NotificationProvider({ children }) {
  // adding to the bottom of the body
  const notificationRoot = useCreateDomElement();
  // using our hook for that array of alerts
  const { notify, notifications } = useNotifications();

  return (
    <>
      <NotifyContext.Provider value={notify}>{children}</NotifyContext.Provider>
      {notificationRoot &&
        createPortal(
          <div
            className="container m-auto z-20 absolute w-full"
            style={{ top: '74px' }}
          >
            <AnimatePresence>
              {notifications.map((alert) => (
                // eslint-disable-next-line react/jsx-props-no-spreading
                <Alert key={alert.id} {...alert} />
              ))}
            </AnimatePresence>
          </div>,
          notificationRoot
        )}
    </>
  );
}
