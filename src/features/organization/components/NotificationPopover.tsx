
import React, { useState } from 'react';
import {
    Bell,
    Check,
    Clock,
    AlertCircle,
    MessageSquare,
    Info,
    X,
    CheckCircle2
} from 'lucide-react';

interface Notification {
    id: string;
    title: string;
    message: string;
    time: string;
    type: 'alert' | 'message' | 'system' | 'success';
    read: boolean;
}

const MOCK_NOTIFICATIONS: Notification[] = [
    {
        id: '1',
        title: 'Critical Alert',
        message: 'ER Department is understaffed by 3 nurses.',
        time: '10 mins ago',
        type: 'alert',
        read: false
    },
    {
        id: '2',
        title: 'New Message',
        message: 'Dr. Sarah sent a request for approve leave.',
        time: '25 mins ago',
        type: 'message',
        read: false
    },
    {
        id: '3',
        title: 'System Update',
        message: 'System maintenance scheduled for 2:00 AM.',
        time: '1 hour ago',
        type: 'system',
        read: true
    },
    {
        id: '4',
        title: 'Shift Approved',
        message: 'Your shift change request has been approved.',
        time: '2 hours ago',
        type: 'success',
        read: true
    }
];

interface NotificationPopoverProps {
    isOpen: boolean;
    onClose: () => void;
    onMarkAllRead?: () => void;
}

const NotificationPopover: React.FC<NotificationPopoverProps> = ({
    isOpen,
    onClose,
    onMarkAllRead
}) => {
    const [activeTab, setActiveTab] = useState<'all' | 'alert' | 'message'>('all');
    const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);

    if (!isOpen) return null;

    const filteredNotifications = activeTab === 'all'
        ? notifications
        : notifications.filter(n => n.type === activeTab);

    const markAsRead = (id: string) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const getIcon = (type: Notification['type']) => {
        switch (type) {
            case 'alert': return <AlertCircle size={16} className="text-red-500" />;
            case 'message': return <MessageSquare size={16} className="text-blue-500" />;
            case 'system': return <Info size={16} className="text-gray-500" />;
            case 'success': return <CheckCircle2 size={16} className="text-green-500" />;
            default: return <Bell size={16} className="text-gray-500" />;
        }
    };

    const getBgColor = (type: Notification['type']) => {
        switch (type) {
            case 'alert': return 'bg-red-50';
            case 'message': return 'bg-blue-50';
            case 'system': return 'bg-gray-50';
            case 'success': return 'bg-green-50';
            default: return 'bg-gray-50';
        }
    };

    return (
        <>
            <div className="fixed inset-0 z-40" onClick={onClose} />
            <div className="absolute right-0 top-full mt-4 w-80 md:w-96 bg-white/90 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/50 z-50 animate-in fade-in zoom-in-95 duration-200 origin-top-right ring-1 ring-black/5 overflow-hidden">

                {/* Header */}
                <div className="px-4 py-3 border-b border-gray-100/50 flex items-center justify-between bg-white/50">
                    <h3 className="font-semibold text-gray-800">Notifications</h3>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={onMarkAllRead}
                            className="text-xs font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-2 py-1 rounded transition-colors"
                        >
                            Mark all read
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="px-2 pt-2 flex gap-1 border-b border-gray-100/50">
                    <button
                        onClick={() => setActiveTab('all')}
                        className={`flex-1 pb-2 text-sm font-medium transition-colors relative ${activeTab === 'all' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        All
                        {activeTab === 'all' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />}
                    </button>
                    <button
                        onClick={() => setActiveTab('alert')}
                        className={`flex-1 pb-2 text-sm font-medium transition-colors relative ${activeTab === 'alert' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Alerts
                        {activeTab === 'alert' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />}
                    </button>
                    <button
                        onClick={() => setActiveTab('message')}
                        className={`flex-1 pb-2 text-sm font-medium transition-colors relative ${activeTab === 'message' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Messages
                        {activeTab === 'message' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />}
                    </button>
                </div>

                {/* List */}
                <div className="max-h-[400px] overflow-y-auto">
                    {filteredNotifications.length > 0 ? (
                        <div className="divide-y divide-gray-100/50">
                            {filteredNotifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className={`p-4 hover:bg-gray-50/50 transition-colors group relative ${!notification.read ? 'bg-blue-50/30' : ''}`}
                                >
                                    <div className="flex gap-3">
                                        <div className={`mt-0.5 w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${getBgColor(notification.type)}`}>
                                            {getIcon(notification.type)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start mb-0.5">
                                                <p className={`text-sm font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-600'}`}>
                                                    {notification.title}
                                                </p>
                                                {!notification.read && (
                                                    <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-1.5" />
                                                )}
                                            </div>
                                            <p className="text-xs text-gray-500 line-clamp-2 mb-1.5 leading-relaxed">
                                                {notification.message}
                                            </p>
                                            <p className="text-[10px] text-gray-400 flex items-center gap-1">
                                                <Clock size={10} />
                                                {notification.time}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Hover Action */}
                                    {!notification.read && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                markAsRead(notification.id);
                                            }}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white shadow-sm border border-gray-100 text-gray-400 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0"
                                            title="Mark as read"
                                        >
                                            <Check size={14} />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-12 text-center text-gray-500">
                            <Bell size={24} className="mx-auto mb-2 opacity-20" />
                            <p className="text-sm">No notifications found</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-3 bg-gray-50/50 border-t border-gray-100/50 text-center">
                    <button className="text-xs font-medium text-gray-600 hover:text-gray-900 transition-colors">
                        View all activity
                    </button>
                </div>
            </div>
        </>
    );
};

export default NotificationPopover;
