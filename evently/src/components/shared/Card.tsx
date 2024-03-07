import { IEvent } from "@/lib/database/models/event.model";
import { formatDateTime } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import { Delete } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { DeleteConfirmation } from "./DeleteConformation";


type CardProps = {
  event: IEvent;
  hasOrderList?: boolean;
  hidePrice?: boolean;
};

const Card = ({ event, hasOrderList, hidePrice }: CardProps) => {
    const { sessionClaims } = auth();
    const userId = sessionClaims?.user_id as string;
  
    const isEventCreator = userId === event.organizer?._id.toString();
  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px] ">
      <Link
        href={`/events/${event._id}`}
        style={{ backgroundImage: `url(${event.imageUrl})` }}
        className="flex-center flex-grow bg-cover bg-grey-50"
      />

    {isEventCreator && !hidePrice && (
        <div className="right-2 top-2 absolute flex flex-col rounded-xl gap-4 bg-white p-3 shadow-sm transition-all">
            <Link href={`/events/${event._id}/update`}>
               <Image
               src={"/assets/icons/edit.svg"}
                alt="edit"
                width={20}
                height={20}
               />
            </Link>
            <DeleteConfirmation eventId={event._id}/>
        </div>
    )}

      <div className="flex flex-col gap-3 p-5 min-h-[230px] md:gap-4">
        {!hidePrice && (
          <div className="flex gap-2 ">
            <span className="p-semibold-14 w-min rounded-full text-green-60 px-4 py-1 bg-green-100">
              {event.isFree ? "Free" : `₹${event.price}`}
            </span>
            <p className="p-semibol-14 w-min rounded-full bg-grey-500/10 px-4 py-1 text-grey-500 line-clamp-1">
              {event.category?.name}
            </p>
          </div>
        )}
        <p className="p-medium-16 p-medium-18 text-grey-500">
          {formatDateTime(event.startDateTime).dateTime}
        </p>
        <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black">
          {event.title}
        </p>
        <div className="w-full flex-between">
          <p className="p-medium-14 md:p-medium-16 text-grey-600">
            {event.organizer?.firstName} {event.organizer?.lastName}
          </p>

          {hasOrderList && ( 
            <Link className="flex gap-2" href={`/orders?eventId=${event._id}`}>
              <p className="text-primary-500">Order Details</p>
              <Image
                style={{ width: "10px", height: "10px" }}
                alt="search"
                width={10}
                height={10}
                src="/assets/icons/arrow.svg"
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
