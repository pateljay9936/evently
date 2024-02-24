import { getEventsById } from "@/lib/actions/event.actions";
import { SearchParamProps } from "@/types";
import { get } from "http";
import Image from "next/image";
import React from "react";

export default async function EventDetails({params: { id }}: SearchParamProps) {
  const event = await getEventsById(id);
  console.log(event);

  return (
    <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain">
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
        <Image
          src={event.imageUrl}
          alt="hero image"
          width={1000}
          height={1000}
          className="h-full min-h-[300px] object-cover object-center"
        />
      </div>
    </section>
  );
}
