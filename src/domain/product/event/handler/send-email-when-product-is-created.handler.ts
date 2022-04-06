import EventHandlerInterface from "../../../@shared/event/event.handler.interface";
import eventInterface from "../../../@shared/event/event.interface";

export default class SendEmailWhenProducIsCreatedHandler
  implements EventHandlerInterface
{
  handle(event: eventInterface): void {
    console.debug("Enviando alerta de novo produto criado...");
  }
}
