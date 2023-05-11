export class NotificationType {
  notificationName: string;
  wantsToBeNotifiedByThis: boolean;

  constructor(notificationName: string, wantsToBeNotifiedByThis: boolean) {
    this.notificationName = notificationName;
    this.wantsToBeNotifiedByThis = wantsToBeNotifiedByThis;
  }
}
