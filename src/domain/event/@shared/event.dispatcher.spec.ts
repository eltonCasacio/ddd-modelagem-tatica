import EventDispatcher from "./event-dispatcher";
import SendEmailWhenProducIsCreatedHandler from "../product/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../product/produt-created.event";

describe("Domain events unit test", () => {
  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProducIsCreatedHandler();
    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
  });

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();

    const eventHandler = new SendEmailWhenProducIsCreatedHandler();
    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

    eventDispatcher.unregister("ProductCreatedEvent", eventHandler);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);
  });

  it("should when event handler not exists, throw an error", () => {
    const eventDispatcher = new EventDispatcher();

    const eventHandler = new SendEmailWhenProducIsCreatedHandler();
    expect(() => {
      eventDispatcher.unregister("ProductCreatedEvent", eventHandler);
    }).toThrowError("Event handler not exists");
  });

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();

    const eventHandler = new SendEmailWhenProducIsCreatedHandler();
    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();
  });

  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProducIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

    const productCreatedEvent = new ProductCreatedEvent({
      id: "1",
      name: "Product 1",
      description: "Product 1 description",
      price: 100,
      quantity: 10,
    });

    eventDispatcher.notify(productCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });

  it("should throw error if event handler not registred when notfy all", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProducIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    const productCreatedEvent = new ProductCreatedEvent({
      id: "1",
      name: "Product 1",
      description: "Product 1 description",
      price: 100,
      quantity: 10,
    });

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();

    expect(() => {
      eventDispatcher.notify(productCreatedEvent);
      expect(spyEventHandler).toHaveBeenCalled();
    }).toThrowError("Event handler not exists");
  });
});
