"use client";
import { IEvent } from "@/lib/database/models/event.model";
import { useUser } from "@clerk/nextjs";
import React from "react";
import { Button } from "../ui/button";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import Link from "next/link";
import Checkout from "./Checkout";
import { loadStripe } from "@stripe/stripe-js";
import { checkoutOrder } from "@/lib/actions/order.action";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const CheckoutButton = ({ event }: { event: IEvent }) => {
  const hasEventFinished = new Date(event.endDateTime) < new Date();
  const { user } = useUser();
  const userId = user?.publicMetadata.user_id as string;

  React.useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);
    
  return (
    <>
      <div className="flex gap-3 items-center">
        {/* cannot by pass event */}
        {hasEventFinished ? (
          <Button className="button button--disabled bg-red-600">
            sorry, tickets are no longer available.
          </Button>
        ) : (
          <>
            {" "}
            {/* user not logged in */}
            <SignedOut>
              <Button asChild className="button button--disabled">
                <Link href="/sign-in">Login to buy ticket</Link>
              </Button>
            </SignedOut>
            <SignedIn>
              <Checkout event={event} userId={userId} />
            </SignedIn>
          </>
        )}

        {/* user logged in */}
      </div>
    </>
  );
};

export default CheckoutButton;
