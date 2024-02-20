"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { eventFormSchema } from "@/lib/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { eventDefaultValues } from "../../../constants";
import Dropdown from "./Dropdown";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { FileUploader } from "./FileUploader";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Checkbox } from "@/components/ui/checkbox";
import { useUploadThing } from "@/lib/uploadthing";
import { createEvent } from "@/lib/actions/event.actions";
import { useRouter } from "next/navigation";

type EventformProps = {
  userId: string;
  type: "Create" | "Update";
};

export default function Eventform({ userId, type }: EventformProps) {
  const [Files, setFiles] = useState<File[]>([]);

  const initialValues = eventDefaultValues;
  const Router = useRouter();
  const { startUpload } = useUploadThing("imageUploader");

  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof eventFormSchema>) {
    const eventData = values;
    let uploadedImageUrl = values.imageUrl;

    if (Files.length > 0) {
      const uploadedImages = await startUpload(Files);
      if (!uploadedImages) {
        return;
      }
      uploadedImageUrl = uploadedImages[0].url;
    }

    if (type === "Create") {
      try {
        const newEvent = await createEvent({ 
          event: { ...eventData, imageUrl: uploadedImageUrl },
          userId, 
          path: "/profile" });

          if(newEvent) {
            form.reset();
            Router.push(`/events/${newEvent._id}`);
          }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input placeholder="Event title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Dropdown
                      onChangeHandler={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl className="h-72">
                    <Textarea
                      className="textarea rounded-2xl "
                      placeholder="Description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl className="h-72">
                    <FileUploader
                      onFieldChange={field.onChange}
                      imageUrl={field.value}
                      setFiles={setFiles}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl className="h-72">
                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 py-2 px-4">
                      <Image
                        src="/assets/icons/location-grey.svg"
                        alt="location"
                        width={24}
                        height={24}
                      />
                      <Input
                        className="textarea rounded-2xl"
                        placeholder="Event Location or Online"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="startDateTime"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                      <Image
                        src="/assets/icons/calendar.svg"
                        alt="calendar"
                        width={24}
                        height={24}
                        className="filter-grey"
                      />
                      <p className="ml-3 whitespace-nowrap text-grey-600">
                        Start Date:
                      </p>
                      <DatePicker
                        selected={field.value}
                        onChange={(date: Date) => field.onChange(date)}
                        showTimeSelect
                        timeInputLabel="Time:"
                        dateFormat="MM/dd/yyyy h:mm aa"
                        wrapperClassName="datePicker"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endDateTime"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                      <Image
                        src="/assets/icons/calendar.svg"
                        alt="calendar"
                        width={24}
                        height={24}
                        className="filter-grey"
                      />
                      <p className="ml-3 whitespace-nowrap text-grey-600">
                        End Date:
                      </p>
                      <DatePicker
                        selected={field.value}
                        onChange={(date: Date) => field.onChange(date)}
                        showTimeSelect
                        timeInputLabel="Time:"
                        dateFormat="MM/dd/yyyy h:mm aa"
                        wrapperClassName="datePicker"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                      <Image
                        src="/assets/icons/dollar.svg"
                        alt="dollar"
                        width={24}
                        height={24}
                      />
                      <Input
                        type="number"
                        placeholder="Price"
                        {...field}
                        className="p-regular-16 border-0 outline-offset-0 bg-grey-50 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      />

                      <FormField
                        control={form.control}
                        name="isFree"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="flex-item-center">
                                <label
                                  className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                  htmlFor="isFree"
                                >
                                  Free ticket
                                </label>
                                <Checkbox
                                  id="isFree"
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  className="mr-2 h-5 w-5 border-2 border-primary-500"
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl className="h-72">
                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 py-2 px-4">
                      <Image
                        src="/assets/icons/link.svg"
                        alt="link"
                        width={24}
                        height={24}
                      />
                      <Input
                        className="textarea rounded-2xl"
                        placeholder="URL"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            className="button col-span-2 w-full"
            disabled={form.formState.isSubmitting}
            size="lg"
          >
            {form.formState.isSubmitting ? "Submitting..." : `${type} Event`}
          </Button>
        </form>
      </Form>
    </div>
  );
}
