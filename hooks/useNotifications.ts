import { useState, useCallback, useMemo } from 'react';
import { Notification, User } from '../types';

export const useNotifications = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const addNotification = useCallback((user: User, stressLevel: number) => {
        const now = new Date();
        const newNotification: Notification = {
            id: `${user.id}-${now.getTime()}`,
            user: {
                id: user.id,
                name: user.name,
            },
            stressLevel,
            timestamp: `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`,
            read: false,
        };
        setNotifications(prev => [...prev, newNotification]);
    }, []);

    const markAllAsRead = useCallback(() => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    }, []);

    const unreadCount = useMemo(() => {
        return notifications.filter(n => !n.read).length;
    }, [notifications]);

    return {
        notifications,
        unreadCount,
        addNotification,
        markAllAsRead,
    };
};
