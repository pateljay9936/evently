import Collection from "@/components/shared/Collection";
import { Button } from "@/components/ui/button";
import { getEventsByUser } from "@/lib/actions/event.actions";
import { getOrdersByUser } from "@/lib/actions/order.action";
import { IOrder } from "@/lib/database/models/order.model";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs";
import { get } from "http";
import Link from "next/link";
import React from "react";

const  ProfilePage = async ({searchParams} : SearchParamProps) => {
  const {sessionClaims} = auth();
  const userId = sessionClaims?.user_id as string;
  const ordersPage = Number(searchParams?.ordersPage )|| 1;
  const eventsPage = Number(searchParams?.eventsPage )|| 1;
  const organizedEvents = await getEventsByUser({userId, page: eventsPage});
  const orders = await getOrdersByUser({userId, page: ordersPage});
  const orderedEvents = orders?.data.map((order:IOrder) => order.event) || [];
  console.log({orderedEvents});
  return (
    <>
      {/* MY TICKETS */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">My Tickets</h3>
          <Button asChild size="lg" className="button sm:flex hidden">
            <Link href="/#events">EXPLORE MORE EVENTS</Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
      <Collection
          data={orderedEvents}
          emptytitle="No Events Tickets purchased yet"
          emptyStateSubtext="No worries, plenty of exciting events to explore!"
          collectionType="My_Tickets"
          limit={3}
          page={ordersPage}
          totalPages={orders?.totalPages}
          urlParamsName="ordersPage"
          />
      </section>
      {/* EVENTS ORGANIzED */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">Events Organized</h3>
          <Button asChild size="lg" className="button sm:flex hidden">
            <Link href="/events/create">CREATE MORE EVENTS</Link>
          </Button>
        </div>
      </section>
      <section className="wrapper my-8">
      <Collection
          data={organizedEvents?.data}
          emptytitle="No Events Have Benn Created Yet"
          emptyStateSubtext="Go Create some now!"
          collectionType="Events_Organized"
          limit={3}
          page={eventsPage}
          totalPages={organizedEvents?.totalPages}
          urlParamsName="eventsPage"
        />
      </section>

    </>
  );
};
export default ProfilePage;
