"use client";

import { updateNameSchema, type UpdateName } from "@ascnd-gg/types";
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
import { Spinner } from "@ascnd-gg/ui/components/ui/spinner";
import { authClient } from "@ascnd-gg/website/lib/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function UpdateNameForm({
  currentName,
}: {
  currentName: string | undefined;
}) {
  const form = useForm<UpdateName>({
    resolver: zodResolver(updateNameSchema),
    defaultValues: {
      name: currentName,
    },
    mode: "onChange",
  });

  const onSubmit = async (values: UpdateName) => {
    const newName = values.name.trim();

    const updateRes = await authClient.updateUser({
      name: newName,
    });

    if (updateRes.error) {
      form.setError("name", {
        message: updateRes.error.message,
        type: "error",
      });
      return;
    }

    toast.success("Success", {
      description: "Name has been successfully updated.",
    });

    form.reset({ name: newName });
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
      </form>
    </Form>
  );
}
