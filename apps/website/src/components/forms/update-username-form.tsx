"use client";

import { updateUsernameSchema } from "@ascnd-gg/types";
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

export default function UpdateUsernameForm({
  currentUsername,
}: {
  currentUsername: string | undefined;
}) {
  const { refreshUserState } = useAuth();

  const form = useForm<z.infer<typeof updateUsernameSchema>>({
    resolver: zodResolver(updateUsernameSchema),
    defaultValues: {
      username: currentUsername,
    },
  });

  const onSubmit = async (values: z.infer<typeof updateUsernameSchema>) => {
    const availableRes = await authClient.isUsernameAvailable({
      username: values.username,
    });

    if (availableRes.error) {
      console.error(availableRes.error);
      return;
    }

    if (!availableRes.data.available) {
      form.setError("username", {
        type: "duplicate",
        message: "This username has already been taken",
      });
      return;
    }

    const updateRes = await authClient.updateUser({
      username: values.username,
      displayUsername: values.username,
    });

    if (updateRes.error) {
      console.error(availableRes.error);
      return;
    }

    await refreshUserState();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">Username</FormLabel>
              <FormDescription>
                Your public username. It is not case sensitive
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
