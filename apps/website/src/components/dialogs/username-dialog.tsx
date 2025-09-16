"use client";

import { updateUsernameSchema } from "@ascnd-gg/types";
import { Button } from "@ascnd-gg/ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@ascnd-gg/ui/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ascnd-gg/ui/components/ui/form";
import { Input } from "@ascnd-gg/ui/components/ui/input";
import { useAuth } from "@ascnd-gg/website/context/auth-context";
import { authClient } from "@ascnd-gg/website/lib/auth";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

export function UsernameDialog() {
  const router = useRouter();
  const { requiresUsername, setRequiresUsername } = useAuth();

  const form = useForm<z.infer<typeof updateUsernameSchema>>({
    resolver: zodResolver(updateUsernameSchema),
    defaultValues: {
      username: "",
    },
    mode: "onChange",
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

    setRequiresUsername(false);

    router.refresh();
  };

  return (
    <Dialog open={requiresUsername} modal={true}>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader>
              <DialogTitle>Choose a username</DialogTitle>
              <DialogDescription>
                To continue using Ascnd GG, you must choose a username
              </DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Your username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button disabled={!form.formState.isValid} type="submit">
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
