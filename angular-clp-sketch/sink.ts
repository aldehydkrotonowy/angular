
const isFunction = (fn: any) => typeof fn === 'function';
export interface SubscriptionLike {
  unsubscribe(): void;
}
export class Subsink {
  protected _subs: SubscriptionLike[] = [];

  constructor() {}

  add(...subscriptions: SubscriptionLike[]) : void {
    this._subs = this._subs.concat(subscriptions);
  }

  set sink(subscription: SubscriptionLIke) {
    this._subs.push(subscription);
  }

  unsubscribe(): void {
    this._subs.forEach((sub) => sub && isFunction(sub.unsubscribe) && sub.unsubscribe());
    this._subs = [];
  }
}