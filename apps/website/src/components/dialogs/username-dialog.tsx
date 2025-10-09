"use client";

import { updateUsernameSchema, UpdateUsername } from "@ascnd-gg/types";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Spinner } from "@ascnd-gg/ui/components/ui/spinner";
import { Alert, AlertTitle } from "@ascnd-gg/ui/components/ui/alert";
import { Info } from "lucide-react";

export function UsernameDialog() {
  const router = useRouter();
  const { requiresUsername, setRequiresUsername } = useAuth();

  const form = useForm<UpdateUsername>({
    resolver: zodResolver(updateUsernameSchema),
    defaultValues: {
      displayUsername: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: UpdateUsername) => {
    const availableRes = await authClient.isUsernameAvailable({
      username: values.displayUsername,
    });

    if (availableRes.error) {
      form.setError("displayUsername", {
        message: "Something went wrong. Please try again.",
        type: "error",
      });
      return;
    }

    if (!availableRes.data.available) {
      form.setError("displayUsername", {
        type: "duplicate",
        message: "This username has already been taken.",
      });
      return;
    }

    const updateRes = await authClient.updateUser({
      username: values.displayUsername,
      displayUsername: values.displayUsername,
    });

    if (updateRes.error) {
      form.setError("root", {
        message: "Something went wrong. Please try again.",
        type: "error",
      });
      return;
    }

    toast.success("Success", {
      description:
        "Your username has been set. You can now continue using Ascnd GG.",
    });

    setRequiresUsername(false);

    router.refresh();
  };

  return (
    <Dialog open={requiresUsername} modal={true}>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader>
              <DialogTitle>Choose a username</DialogTitle>
              <DialogDescription>
                To continue using Ascnd GG, you must choose a unique username to
                indentify yourself to others.
              </DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name="displayUsername"
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
              <Button
                type="submit"
                disabled={
                  !form.formState.isDirty ||
                  !form.formState.isValid ||
                  form.formState.isSubmitting
                }
              >
                {form.formState.isSubmitting && <Spinner />}
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
        <Alert>
          <Info />
          <AlertTitle>You can always update your username later.</AlertTitle>
        </Alert>
      </DialogContent>
    </Dialog>
  );
}
