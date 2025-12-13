# In-App Notifications System

This document explains how the in-app notification system works, how it can be used by both backend and frontend developers, and provides examples of implementation.

## Overview

The in-app notification system allows users to receive notifications directly within the application UI about various events such as:

- Medical record updates
- Test results availability
- Appointment reminders
- Prescription updates
- Payment confirmations
- System announcements

These notifications complement email and SMS notifications, providing users with an in-app notification center.

## Backend Implementation

### Models

The system uses an `InAppNotification` model that stores notification data:

```python
class InAppNotification(models.Model):
    """Model for in-app notifications"""
    user = models.ForeignKey('api.CustomUser', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    message = models.TextField()
    notification_type = models.CharField(max_length=50)
    reference_id = models.CharField(max_length=100, null=True, blank=True)
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    read_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ['-created_at']
```

### API Endpoints

The following API endpoints are available for managing notifications:

| Method | Endpoint                                 | Description                           |
|--------|------------------------------------------|---------------------------------------|
| GET    | `/api/notifications/`                    | List all notifications for user       |
| GET    | `/api/notifications/{id}/`               | Get a single notification details     |
| POST   | `/api/notifications/{id}/mark_as_read/`  | Mark a notification as read           |
| POST   | `/api/notifications/mark_all_as_read/`   | Mark all notifications as read        |
| DELETE | `/api/notifications/{id}/delete/`        | Delete a specific notification        |
| DELETE | `/api/notifications/delete_all/`         | Delete all notifications              |
| DELETE | `/api/notifications/delete_read/`        | Delete all read notifications         |

All endpoints require authentication. Users can only access their own notifications.

### Creating Notifications

Backend developers can create notifications in several ways:

#### 1. Using the `create_notification` classmethod

```python
from api.models.notifications.in_app_notification import InAppNotification

# Create a notification for a user
InAppNotification.create_notification(
    user=user,
    title="Test Results Available",
    message="Your blood test results are now available.",
    notification_type="test_result",
    reference_id="TEST-12345"  # Optional reference ID
)
```

#### 2. Using appointment notifications system

The AppointmentNotification class already has a `_send_in_app()` method that creates in-app notifications:

```python
# From api/models/medical/appointment_notification.py
def _send_in_app(self):
    """Create in-app notification"""
    from api.models.notifications import InAppNotification
    
    InAppNotification.objects.create(
        user=self.recipient,
        title=self.subject,
        message=self.message,
        notification_type='appointment',
        reference_id=self.appointment.appointment_id
    )
```

#### 3. Testing with management command

For testing, use the `create_test_notifications` management command:

```bash
# Create 5 test notifications for a specific user
python manage.py create_test_notifications --email=user@example.com

# Create 10 test notifications for all non-staff users
python manage.py create_test_notifications --count=10
```

### Automatic Cleanup of Old Notifications

The system includes a management command to automatically clean up old notifications:

```bash
# Delete all notifications older than 7 days (default)
python manage.py cleanup_old_notifications

# Delete notifications older than 14 days
python manage.py cleanup_old_notifications --days=14

# Delete only read notifications older than 30 days
python manage.py cleanup_old_notifications --days=30 --read-only

# Show what would be deleted without actually deleting (dry run)
python manage.py cleanup_old_notifications --dry-run
```

We recommend setting up a scheduled task (e.g., cron job) to run this command regularly:

```bash
# Example crontab entry to run every day at 2 AM
0 2 * * * cd /path/to/project && python manage.py cleanup_old_notifications --days=7 --read-only
```

### Common Use Cases

#### Medical Test Results

```python
def notify_test_results(patient, test):
    InAppNotification.create_notification(
        user=patient,
        title="Test Results Available",
        message=f"Your {test.name} results are now available.",
        notification_type="test_result",
        reference_id=test.id
    )
```

#### Appointment Reminders

```python
def remind_appointment(appointment):
    InAppNotification.create_notification(
        user=appointment.patient,
        title="Appointment Reminder",
        message=f"Reminder: Your appointment with Dr. {appointment.doctor.user.get_full_name()} is tomorrow at {appointment.appointment_date.strftime('%I:%M %p')}",
        notification_type="appointment",
        reference_id=appointment.appointment_id
    )
```

#### System Announcements

```python
def announce_new_feature(feature_name, feature_description):
    users = CustomUser.objects.filter(is_active=True)
    for user in users:
        InAppNotification.create_notification(
            user=user,
            title=f"New Feature: {feature_name}",
            message=feature_description,
            notification_type="system_announcement"
        )
```

## Frontend Implementation

Frontend developers need to implement the UI components to display and interact with notifications.

### Fetching Notifications

```javascript
// Fetch all notifications for the current user
async function fetchNotifications() {
  try {
    const response = await fetch('/api/notifications/', {
      headers: {
        'Authorization': `Bearer ${authToken}`, // Include authentication token
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch notifications');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return [];
  }
}
```

### Marking Notifications as Read

```javascript
// Mark a specific notification as read
async function markAsRead(notificationId) {
  try {
    const response = await fetch(`/api/notifications/${notificationId}/mark_as_read/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    return response.ok;
  } catch (error) {
    console.error('Error marking notification as read:', error);
    return false;
  }
}

// Mark all notifications as read
async function markAllAsRead() {
  try {
    const response = await fetch('/api/notifications/mark_all_as_read/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    return response.ok;
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    return false;
  }
}
```

### Deleting Notifications

```javascript
// Delete a specific notification
async function deleteNotification(notificationId) {
  try {
    const response = await fetch(`/api/notifications/${notificationId}/delete/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    return response.ok;
  } catch (error) {
    console.error('Error deleting notification:', error);
    return false;
  }
}

// Delete all read notifications
async function deleteReadNotifications() {
  try {
    const response = await fetch('/api/notifications/delete_read/', {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    return response.ok;
  } catch (error) {
    console.error('Error deleting read notifications:', error);
    return false;
  }
}
```

### UI Components

#### Notification Bell

Create a notification bell component that shows a badge with the count of unread notifications:

```jsx
// React example
function NotificationBell() {
  const [unreadCount, setUnreadCount] = useState(0);
  
  useEffect(() => {
    // Fetch notifications on component mount
    fetchAndCountUnread();
    
    // Set up polling to check for new notifications
    const interval = setInterval(fetchAndCountUnread, 60000);
    return () => clearInterval(interval);
  }, []);
  
  const fetchAndCountUnread = async () => {
    const notifications = await fetchNotifications();
    setUnreadCount(notifications.filter(n => !n.is_read).length);
  };
  
  return (
    <div className="notification-bell">
      <BellIcon />
      {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
    </div>
  );
}
```

#### Notification Dropdown/Panel

Create a dropdown or sidebar panel to display notifications:

```jsx
// React example
function NotificationPanel({ isOpen, onClose }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (isOpen) {
      loadNotifications();
    }
  }, [isOpen]);
  
  const loadNotifications = async () => {
    setLoading(true);
    const data = await fetchNotifications();
    setNotifications(data);
    setLoading(false);
  };
  
  const handleMarkAsRead = async (id) => {
    const success = await markAsRead(id);
    if (success) {
      setNotifications(notifications.map(n => 
        n.id === id ? { ...n, is_read: true } : n
      ));
    }
  };
  
  const handleMarkAllAsRead = async () => {
    const success = await markAllAsRead();
    if (success) {
      setNotifications(notifications.map(n => ({ ...n, is_read: true })));
    }
  };
  
  const handleDeleteNotification = async (id, event) => {
    // Stop event propagation to prevent triggering notification click
    event.stopPropagation();
    
    const success = await deleteNotification(id);
    if (success) {
      setNotifications(notifications.filter(n => n.id !== id));
    }
  };
  
  const handleDeleteReadNotifications = async () => {
    const success = await deleteReadNotifications();
    if (success) {
      setNotifications(notifications.filter(n => !n.is_read));
    }
  };
  
  const handleNotificationClick = (notification) => {
    // Mark as read
    handleMarkAsRead(notification.id);
    
    // Navigate based on notification type
    if (notification.notification_type === 'test_result') {
      // Navigate to test results page
      navigateToTestResults(notification.reference_id);
    } else if (notification.notification_type === 'appointment') {
      // Navigate to appointment details
      navigateToAppointment(notification.reference_id);
    }
    // Handle other types...
  };
  
  return (
    <div className={`notification-panel ${isOpen ? 'open' : ''}`}>
      <div className="notification-header">
        <h3>Notifications</h3>
        <div className="notification-actions">
          <button onClick={onClose}>Close</button>
          <button onClick={handleMarkAllAsRead}>Mark all as read</button>
          <button onClick={handleDeleteReadNotifications}>Delete read</button>
        </div>
      </div>
      
      {loading ? (
        <div className="notification-loading">Loading...</div>
      ) : notifications.length === 0 ? (
        <div className="notification-empty">No notifications</div>
      ) : (
        <div className="notification-list">
          {notifications.map(notification => (
            <div 
              key={notification.id}
              className={`notification-item ${!notification.is_read ? 'unread' : ''}`}
              onClick={() => handleNotificationClick(notification)}
            >
              <div className="notification-content">
                <h4>{notification.title}</h4>
                <p>{notification.message}</p>
                <small>{new Date(notification.created_at).toLocaleString()}</small>
              </div>
              <button 
                className="notification-delete-btn"
                onClick={(e) => handleDeleteNotification(notification.id, e)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

### Suggested UI Design

- **Notification Bell**: Place a bell icon in the header/navbar of your application
- **Badge**: Display a small red badge with the count of unread notifications
- **Dropdown/Panel**: When clicked, show a dropdown or slide-in panel with notifications
- **Notification Items**: Each item should display:
  - Title
  - Message
  - Time/date
  - Visual indication for unread notifications (e.g., bold text or colored border)
  - Delete button to remove individual notifications
- **Actions**: Allow clicking on notifications to:
  - Mark them as read
  - Navigate to related content based on notification type
- **Bulk Actions**: Provide buttons to:
  - Mark all as read
  - Delete all read notifications

### Handling Notification Types

Different notification types may require different actions when clicked:

- **test_result**: Navigate to medical records or test results view
- **appointment**: Navigate to appointment details
- **prescription**: Navigate to prescriptions view
- **payment**: Navigate to payment receipts
- **medical_record**: Navigate to medical records view

## Notification Types and Reference IDs

The system uses `notification_type` and `reference_id` fields to categorize notifications and link them to related objects:

| Notification Type    | Reference ID Example | Description                          |
|----------------------|----------------------|--------------------------------------|
| appointment          | APP12345             | Appointment-related notifications    |
| test_result          | TEST5678             | Lab or test result notifications     |
| medical_record       | MR9012               | Medical record update notifications  |
| prescription         | PRESC3456            | Prescription-related notifications   |
| payment              | PMT7890              | Payment-related notifications        |
| system_announcement  | (usually null)       | System-wide announcements           |

## Best Practices

### Backend

1. **Keep messages concise**: Notification messages should be short and to the point
2. **Include relevant information**: Include just enough information for users to understand the notification
3. **Provide actionable reference**: Use the `reference_id` field to link to related objects
4. **Batch notifications**: For system-wide announcements, use background tasks to create notifications in batches

### Frontend

1. **Real-time updates**: Consider implementing WebSockets for real-time notification updates
2. **Clear indicators**: Use clear visual indicators for unread notifications
3. **Group similar notifications**: Consider grouping similar notifications to avoid overwhelming users
4. **Accessibility**: Ensure notification components are accessible (proper contrast, keyboard navigation, etc.)
5. **Mobile responsiveness**: Ensure the notification UI works well on mobile devices

## Conclusion

The in-app notification system provides a way to communicate important information to users directly within the application. By following the implementation guidelines in this document, both backend and frontend developers can work together to create a seamless notification experience. 