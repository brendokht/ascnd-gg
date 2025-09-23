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
import { postApi } from "@ascnd-gg/website/lib/fetch-api";
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
    const createRes: { name: string } | false = await postApi("/team", values);

    if (!createRes) {
      console.error("something went wrong, check logs");
      return;
    }

    toast.success("Success", {
      description: "Your team has been successfully created.",
    });

    router.push(`/team/${createRes.name}`);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex grow flex-col justify-between"
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
        <Button type="submit">Create</Button>
      </form>
    </Form>
  );
}
