import { ref } from 'vue';

interface Notification {
  id: number;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

const notifications = ref<Notification[]>([]);
let nextId = 0;

export const useNotification = () => {
  const addNotification = (
    message: string,
    type: Notification['type'] = 'info',
    duration = 5000
  ) => {
    const id = nextId++;
    const notification: Notification = {
      id,
      message,
      type,
      duration,
    };

    notifications.value.push(notification);

    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, duration);
    }

    return id;
  };

  const removeNotification = (id: number) => {
    const index = notifications.value.findIndex(n => n.id === id);
    if (index !== -1) {
      notifications.value.splice(index, 1);
    }
  };

  const success = (message: string, duration?: number) => {
    return addNotification(message, 'success', duration);
  };

  const error = (message: string, duration?: number) => {
    return addNotification(message, 'error', duration);
  };

  const warning = (message: string, duration?: number) => {
    return addNotification(message, 'warning', duration);
  };

  const info = (message: string, duration?: number) => {
    return addNotification(message, 'info', duration);
  };

  return {
    notifications,
    addNotification,
    removeNotification,
    success,
    error,
    warning,
    info,
  };
};