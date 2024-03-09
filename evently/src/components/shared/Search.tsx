"use client";
import Image from "next/image";
import React, { use, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

const Search = ({ placeholder }: { placeholder: string }) => {
  const router = useRouter();
  const [Query, setQuery] = useState("");
  const searchParams = useSearchParams();
  useEffect(() => {
    const delayBounceFn = setTimeout(() => {
        let newUrl = "";
      if (Query) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "query",
          value: Query,
        });
      } else {
        newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ["query"],
        });
      }
        router.push(newUrl, { scroll: false });
    }, 300);
    return () => clearTimeout(delayBounceFn);
  }, [Query,searchParams,router]);

  return (
    <>
      <div className="flex-center w-full min-h-[54px] overflow-hidden rounded-full bg-grey-50 px-4 py-2 ">
        <Image
          src="/assets/icons/search.svg"
          alt="search"
          width={20}
          height={20}
        />
        <Input
          type="text"
          placeholder={placeholder}
          className="p-regular-16 border-0 bg-grey-50 outline-offset-0 placeholder:text-grey-500 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    </>
  );
};

export default Search;
