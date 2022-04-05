import EventDispatcher from "../@shared/event-dispatcher";
import CustomerEventCreated from "./customer.created.event";
import EnviaConsoleLog1Handler from "./handler/envia-console-log1.handler";
import EnviaConsoleLog2Handler from "./handler/envia-console-log2.handler";

describe("Domain events CustomerEventCreated unit test", () => {
  it("should dispatch handle EnviaConsoleLog1Handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new EnviaConsoleLog1Handler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");
    eventDispatcher.register("CustomerEventCreated", eventHandler);

    const customerEventCreated = new CustomerEventCreated({
      id: "1",
      name: "Customer 1",
    });

    eventDispatcher.notify(customerEventCreated);
    expect(spyEventHandler).toHaveBeenCalledTimes(1);
  });

  it("should dispatch handle EnviaConsoleLog2Handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new EnviaConsoleLog2Handler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");
    eventDispatcher.register("CustomerEventCreated", eventHandler);

    const customerEventCreated = new CustomerEventCreated({
      id: "1",
    });

    eventDispatcher.notify(customerEventCreated);
    expect(spyEventHandler).toHaveBeenCalledTimes(1);
  });
});
