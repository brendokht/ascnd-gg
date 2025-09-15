"use client";

import { updateNameSchema } from "@ascnd-gg/types";
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
import { useAuth } from "@ascnd-gg/website/context/auth-context";
import { authClient } from "@ascnd-gg/website/lib/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

export default function UpdateNameForm({
  currentName,
}: {
  currentName: string | undefined;
}) {
  const { refreshUserState } = useAuth();

  const form = useForm<z.infer<typeof updateNameSchema>>({
    resolver: zodResolver(updateNameSchema),
    defaultValues: {
      name: currentName,
    },
  });

  const onSubmit = async (values: z.infer<typeof updateNameSchema>) => {
    const updateRes = await authClient.updateUser({
      name: values.name,
    });

    if (updateRes.error) {
      console.error(updateRes.error);
      return;
    }

    await refreshUserState();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">Full Name</FormLabel>
              <FormDescription>
                Your full name. This is not public
              </FormDescription>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={!form.formState.isValid}>
          Submit
        </Button>
      </form>
    </Form>
  );
}
