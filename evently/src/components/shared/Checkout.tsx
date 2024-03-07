import { IEvent } from "@/lib/database/models/event.model";
import React from "react";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import { checkoutOrder } from "@/lib/actions/order.action";

const Checkout = ({ event, userId }: { event: IEvent; userId: string }) => {
  const onCheckout = async () => {
    const order = {
      eventId: event._id,
      eventTitle: event.title,
      buyerId: userId,
      isFree: event.isFree,
      price: event.price,
    }
    await checkoutOrder(order);
}
  return (
    <>
      <form action={onCheckout} className="post">
        <Button type="submit" role="link" size="lg" className="button sm:w-fit">{event.isFree ? "GET TICKET" : "BUY TICKET"}</Button>
      </form>
    </>
  );
};

export default Checkout;
