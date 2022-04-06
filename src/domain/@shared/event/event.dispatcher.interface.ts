import EventHandlerInterface from "./event.handler.interface";
import EventInterface from "./event.interface";

export default interface EventDispatcherInterface {
  notify(event: EventInterface): void;
  register(eventeventName: string, Handler: EventHandlerInterface): void;
  unregister(eventName: string, Handler: EventHandlerInterface): void;
  unregisterAll(): void;
}
