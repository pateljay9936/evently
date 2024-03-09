import { getCategoryById } from "@/lib/actions/category.actions";
import { IEvent } from "@/lib/database/models/event.model";
import React from "react";
import Card from "./Card";
import Paginantion from "./Paginantion";

type CollectionProps = {
  data: IEvent[];
  emptytitle: string;
  emptyStateSubtext: string;
  limit: number;
  totalPages: number | undefined;
  page: number | string;
  urlParamsName?: string;
  collectionType: "Events_Organized" | "My_Tickets" | "All_events";
};

const Collection = ({
  data,
  emptytitle,
  emptyStateSubtext,
  limit,
  totalPages = 0,
  page,
  urlParamsName,
  collectionType,
}: CollectionProps) => {


  return (<>
    {data.length > 0 ? 
    (
        <div className="flex flex-col items-center gap-10">
          <ul className="grid w-full gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {data.map((event) => {
              const hasOrderList = collectionType === "Events_Organized";
              const hidePrice = collectionType === "My_Tickets";
              return (
                <li key={event._id} className="flex justify-center">
                      <Card
                      event={event}
                      hasOrderList={hasOrderList}
                      hidePrice={hidePrice}
                      />
                </li>
              )
            })}
          </ul>

          {totalPages > 1 && (
            <Paginantion
              totalPages={totalPages}
              page={page}
              urlParamsName={urlParamsName}
            />
          )}
        </div>
    ): (
      <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 text-center py-28">
        <h1 className="p-bold-20 md:h5-bold">{emptytitle}</h1>
        <p className="p-regular-14">{emptyStateSubtext}</p>
      </div>
    )}
</>)
}
      
export default Collection;
