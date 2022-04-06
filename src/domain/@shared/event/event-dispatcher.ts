import EventDispatcherInterface from "./event.dispatcher.interface";
import eventHandlerInterface from "./event.handler.interface";
import eventInterface from "./event.interface";

export default class EventDispatcher implements EventDispatcherInterface {
  private eventHandlers: {
    [eventName: string]: eventHandlerInterface<eventInterface>[];
  } = {};

  get getEventHandlers(): { [eventName: string]: eventHandlerInterface[] } {
    return this.eventHandlers;
  }

  notify(event: eventInterface): void {
    const eventName = event.constructor.name;

    try {
      this.getEventHandlers[eventName].forEach((handler) => {
        handler.handle(event);
      });
    } catch (error) {
      throw new Error("Event handler not exists");
    }
  }

  register(eventeventName: string, Handler: eventHandlerInterface<eventInterface>): void {
    if (!this.eventHandlers[eventeventName]) {
      this.eventHandlers[eventeventName] = [];
    }
    this.eventHandlers[eventeventName].push(Handler);
  }

  unregister(eventName: string, Handler: eventHandlerInterface<eventInterface>): void {
    try {
      const handlers = this.getEventHandlers[eventName].filter((handler) => handler !== Handler);
      this.eventHandlers[eventName] = handlers;
    } catch (error) {
      throw new Error("Event handler not exists");
    }
  }

  unregisterAll(): void {
    this.eventHandlers = {};
  }
}
