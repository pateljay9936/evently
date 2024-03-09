"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { use } from "react";
import { Button } from "../ui/button";
import { formUrlQuery } from "@/lib/utils";

type PaginationProps = {
  totalPages: number;
  page: string | number;
  urlParamsName?: string;
};
const Paginantion = ({ totalPages, page, urlParamsName }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onClick = (btnType: string) => {
    const pageValue = btnType === "prev" ? Number(page) - 1 : Number(page) + 1;
    
    const  newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: urlParamsName || "page",
        value: pageValue.toString(), 
      });
    
    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="flex gap-2">
      <Button
        size="lg"
        variant="outline"
        className="w-28"
        disabled={Number(page) <= 1}
        onClick={() => onClick("prev")}
      >
        Previous
      </Button>
      <Button
      size="lg"
      variant="outline"
      className="w-28"
      disabled={Number(page) >= totalPages}
      onClick={() => onClick("next")}>Next</Button>
    </div>
  );
};

export default Paginantion;
