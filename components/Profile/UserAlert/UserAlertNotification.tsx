import { NotificationType } from "models/NotificationType";

export default function UserAlertNotification({
  notificationTypes,
  onProductNotificationChange,
}: {
  notificationTypes: NotificationType[];
  onProductNotificationChange: (notificationType: NotificationType) => void;
}) {
  let notificationVias = notificationTypes.length;
  if (notificationVias == 0) return <p className="font-sm">Sin vías de aviso disponibles.</p>;
  let notifications: any[] = [];
  notificationTypes.map((notificationType) => {
    notifications.push(getNotificationCheckbox(notificationType, onProductNotificationChange));
  });
  return <div className={`flex align-center justify-center gap-8`}>{notifications}</div>;
}

function getNotificationCheckbox(
  notificationType: NotificationType,
  onProductNotificationChange: (notificationType: NotificationType) => void
): JSX.Element {
  function toggleNotification(
    notificationType: NotificationType,
    onProductNotificationChange: (notificationType: NotificationType) => void
  ) {
    notificationType.wantsToBeNotifiedByThis = !notificationType.wantsToBeNotifiedByThis;
    onProductNotificationChange(notificationType);
  }

  return (
    <div key={notificationType.notificationName} className="grid text-center">
      <div>
        <p className="text-xs">{notificationType.notificationName}</p>
      </div>
      <div>
        <input
          type="checkbox"
          className="accent-blue-500"
          name={`${notificationType.notificationName}Notification`}
          defaultChecked={notificationType.wantsToBeNotifiedByThis}
          onChange={() => toggleNotification(notificationType, onProductNotificationChange)}
        />
      </div>
    </div>
  );
}
