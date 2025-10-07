"use client";

import { updateUsernameSchema, type UpdateUsername } from "@ascnd-gg/types";
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
import { authClient } from "@ascnd-gg/website/lib/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function UpdateUsernameForm({
  currentUsername,
}: {
  currentUsername: string | undefined;
}) {
  const form = useForm<UpdateUsername>({
    resolver: zodResolver(updateUsernameSchema),
    defaultValues: {
      displayUsername: currentUsername,
    },
  });

  const onSubmit = async (values: UpdateUsername) => {
    const newUsername = values.displayUsername.trim();

    const availableRes = await authClient.isUsernameAvailable({
      username: newUsername,
    });

    if (availableRes.error) {
      console.error(availableRes.error);
      return;
    }

    if (!availableRes.data.available) {
      form.setError("displayUsername", {
        type: "duplicate",
        message: "This username has already been taken",
      });
      return;
    }

    const updateRes = await authClient.updateUser({
      username: newUsername,
      displayUsername: newUsername,
    });

    if (updateRes.error) {
      console.error(availableRes.error);
      return;
    }

    toast.success("Success", {
      description: "Username has been successfully updated.",
    });

    form.reset({ displayUsername: newUsername });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="displayUsername"
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
        <Button
          type="submit"
          disabled={
            !form.formState.isValid ||
            form.formState.isLoading ||
            !form.formState.dirtyFields.displayUsername
          }
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
