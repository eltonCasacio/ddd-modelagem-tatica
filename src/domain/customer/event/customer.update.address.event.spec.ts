import EventDispatcher from "../../@shared/event/event-dispatcher";
import CustomerUpdateAddressEvent from "./customer-update-address-event";
import EnviaConsoleLogHandler from "../../customer/event/handler/envia-console-log.handler";

describe("Domain events CustomerUpdateAddressEvent unit test", () => {
  it("should dispatch handle when Customer Address is changed", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new EnviaConsoleLogHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");
    eventDispatcher.register("CustomerUpdateAddressEvent", eventHandler);

    const customerEventCreated = new CustomerUpdateAddressEvent({
      id: "1",
      name: "Elton John",
      address: {
        street: "Rua 1",
        number: "1",
        city: "São Paulo",
        state: "SP",
        country: "Brasil",
      },
    });

    eventDispatcher.notify(customerEventCreated);
    expect(spyEventHandler).toHaveBeenCalledTimes(1);
  });
});
