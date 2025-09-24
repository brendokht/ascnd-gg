"use client";

import { createTeamSchema, createTeamSchemaType } from "@ascnd-gg/types";
import { Button } from "@ascnd-gg/ui/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ascnd-gg/ui/components/ui/form";
import { Input } from "@ascnd-gg/ui/components/ui/input";
import { postApi } from "@ascnd-gg/website/lib/fetch-utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function CreateTeamForm() {
  const router = useRouter();

  const form = useForm<createTeamSchemaType>({
    resolver: zodResolver(createTeamSchema),
    defaultValues: {
      displayName: "",
      logo: undefined,
      banner: undefined,
    },
  });

  const onSubmit = async (values: createTeamSchemaType) => {
    const { data, error } = await postApi<{ name: string }>("/team", values);

    if (error) {
      if (error.statusCode === 409)
        form.setError("displayName", { message: error.message });
      else form.setError("root", { message: error.message });
      return;
    }

    if (!data) {
      form.setError("root", {
        message: "Something went wrong. Please try again.",
      });
      return;
    }

    toast.success("Success", {
      description: "Your team has been successfully created.",
    });

    router.push(`/team/${data.name}`);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex max-w-lg flex-col"
      >
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="displayName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Team Name</FormLabel>
                <FormDescription>Your team&apos;s name</FormDescription>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="logo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Team Logo</FormLabel>
                <FormDescription>Your team&apos;s logo</FormDescription>
                <FormControl>
                  <Input type="file" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="banner"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Team Banner</FormLabel>
                <FormDescription>Your team&apos;s banner</FormDescription>
                <FormControl>
                  <Input type="file" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-4 md:flex-row-reverse md:justify-between">
          <Button type="submit">Create</Button>
          <Button
            type="button"
            variant={"outline"}
            onClick={() => {
              router.back();
            }}
          >
            Back
          </Button>
        </div>
      </form>
    </Form>
  );
}
