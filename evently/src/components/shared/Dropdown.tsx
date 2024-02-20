import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import Category, { ICategoty } from "@/lib/database/models/category.model";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { createCategory, getAllCategory } from "@/lib/actions/category.actions";

type DropdownProps = {
  onChangeHandler: () => void;
  value: string;
};

export default function Dropdown({ onChangeHandler, value }: DropdownProps) {
  const [categories, setcategories] = useState<ICategoty[]>([]);

  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = () => {
    createCategory({ categoryName: newCategory.trim() })
      .then((category) => {
        setcategories((prevState) => [...prevState, category]);
      });
  };

  useEffect(() => {
    const getCategories = async () => {
      const categoryList = await getAllCategory();
      categoryList && setcategories(categoryList as ICategoty[]);
    };
    getCategories();
  }, []);


  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        {categories.length > 0 && categories.map((category) => (
          <SelectItem key={category._id} value={category._id} >
            {category.name}
          </SelectItem>
        ))}


        <AlertDialog>
          <AlertDialogTrigger className="p-medium-14 flex w-full py-3 pl-8 rounded-sm
           text-primary-500 hover:bg-primary-50 focus:text-primary-500">Create new category</AlertDialogTrigger>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>New Category</AlertDialogTitle>
              <AlertDialogDescription>
                <Input placeholder="Category name" type="text" className="input-field mt-3"
                onChange={(e) => setNewCategory(e.target.value)}/>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleAddCategory}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

      </SelectContent>
    </Select>
  );
}
