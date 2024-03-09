import Link from "next/link";
import { Button } from "../../components/ui/button";
import Image from "next/image";
import Collection from "@/components/shared/Collection";
import { getAllEvents } from "@/lib/actions/event.actions";
import Search from "@/components/shared/Search";
import { SearchParamProps } from "@/types";
import Category from "@/lib/database/models/category.model";
import CategoryFilter from "@/components/shared/CategoryFilter";

export default async function Home({searchParams}:SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = searchParams?.query as string || "";
  const category = searchParams?.category as string  || "";

  const events = await getAllEvents({
    query: searchText,
    category: category,
    limit: 6,
    page: page,
  });
 
  console.log(events);

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0 ">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">
              Host, Connect, Celebrate: Your Event, Our Platform!
            </h1>
            <p className="p-regular-20 md:p-regular-24">
              Book and learn helpful tips from 3,168+ mentors in world-class
              companies with our global community.
            </p>
            <Button asChild className="w-full sm:w-fit button" size="lg">
              <Link href="#events">Explore Now</Link>
            </Button>
          </div>
          <Image
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
            src="/assets/images/hero.png"
            alt="hero"
            width={1000}
            height={1000}
          />
        </div>
      </section>
      <section
        id="events"
        className="wrapper my-8 flex flex-col gap-8 md:gap-12"
      >
        <h2 className="h2-bold">
          Trust by <br />
          Thousand of Events{" "}
        </h2>

        <div className="flex flex-col w-full md:flex-row gap-5">
          <Search placeholder="Search Title..."/> 
          <CategoryFilter/>
        </div>

        <Collection
          data={events?.data}
          emptytitle="No Events Found"
          emptyStateSubtext="comeback later for more events."
          collectionType="All_events"
          limit={6}
          page={page}
          totalPages={events?.totalPages}
        />
      </section>
    </>
  );
}
