"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { string } from "zod";
import { getAllCategory } from "@/lib/actions/category.actions";
import { ICategoty } from "@/lib/database/models/category.model";

const CategoryFilter = () => {
  const router = useRouter();
  const [Categories, setCategories] = useState<ICategoty[]>([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    const getCategories = async () => {
      const categoryList = await getAllCategory();
      categoryList && setCategories(categoryList as ICategoty[]);
    };
    getCategories();
  }, []);

  const onSelectCategory = (category: string) => {
    let newUrl = "";
    if (category && category !== "All") {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "category",
        value: category,
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["category"],
      });
    }
    router.push(newUrl, { scroll: false });
  };
  return (
    <>
      <Select onValueChange={(value: string) => onSelectCategory(value)}>
        <SelectTrigger className="select-field">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem className="select-item p-regular-14" value="All">
            All
          </SelectItem>
          {Categories.length > 0 &&
            Categories.map((category) => (
              <SelectItem
                className="select-item p-regular-14"
                key={category._id}
                value={category.name}
              >
                {category.name}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </>
  );
};

export default CategoryFilter;
