"use client";

import { createHubSchema, type CreateHub } from "@ascnd-gg/types";
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
import { FileUploadDialog } from "../dialogs/file-upload-dialog";
import { useState } from "react";
import Image from "next/image";
import { Spinner } from "@ascnd-gg/ui/components/ui/spinner";

export default function CreateHubForm() {
  const router = useRouter();

  const form = useForm<CreateHub>({
    resolver: zodResolver(createHubSchema),
    defaultValues: {
      displayName: "",
    },
  });

  const [logoPreview, setLogoPreview] = useState<string>("");
  const [bannerPreview, setBannerPreview] = useState<string>("");

  const onSubmit = async (values: CreateHub) => {
    const formData = new FormData();

    if (values.displayName) formData.append("displayName", values.displayName);
    if (values.logo) formData.append("logo", values.logo ?? new Blob());
    if (values.banner) formData.append("banner", values.banner ?? new Blob());

    const { data, error } = await postApi<{ name: string }>(`/hubs`, formData);

    if (error) {
      if (error.statusCode === 409)
        form.setError("displayName", {
          message: error.message,
          type: "conflict",
        });
      else form.setError("root", { message: error.message, type: "error" });
      return;
    }

    if (!data) {
      form.setError("root", {
        message: "Something went wrong. Please try again.",
        type: "error",
      });
      return;
    }

    toast.success("Success", {
      description: "Your hub has been successfully created.",
    });

    router.push(`/hubs/${data.name}`);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
        <div className="mb-8 space-y-4">
          <FormField
            control={form.control}
            name="displayName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hub Name</FormLabel>
                <FormDescription>Your hub&apos;s name</FormDescription>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {logoPreview && (
            <>
              <div className="relative aspect-square">
                <Image
                  src={logoPreview}
                  alt="Image Preview"
                  loading="eager"
                  fill
                  quality={25}
                  placeholder="empty"
                  className="rounded-full"
                />
              </div>
              <Button
                variant={"destructive"}
                className="w-full"
                onClick={() => {
                  form.setValue("logo", undefined);
                  setLogoPreview("");
                }}
                type="button"
              >
                Clear
              </Button>
            </>
          )}
          <FormField
            control={form.control}
            name="logo"
            render={() => (
              <FormItem>
                <FormLabel>Hub Logo</FormLabel>
                <FormDescription>Your hub&apos;s logo</FormDescription>
                <FormControl>
                  <FileUploadDialog
                    shape="circle"
                    item="logo"
                    onSubmit={(fileUrl, fileBlob) => {
                      form.setValue("logo", fileBlob);
                      setLogoPreview(fileUrl);
                    }}
                  >
                    <Button variant={"outline"}>Upload Logo</Button>
                  </FileUploadDialog>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {bannerPreview && (
            <>
              <div className="aspect-rectangle relative">
                <Image
                  src={bannerPreview}
                  alt="Image Preview"
                  loading="eager"
                  fill
                  quality={25}
                  placeholder="empty"
                />
              </div>
              <Button
                variant={"destructive"}
                className="w-full"
                onClick={() => {
                  form.setValue("banner", undefined);
                  setBannerPreview("");
                }}
                type="button"
              >
                Clear
              </Button>
            </>
          )}
          <FormField
            control={form.control}
            name="banner"
            render={() => (
              <FormItem>
                <FormLabel>Hub Banner</FormLabel>
                <FormDescription>Your hub&apos;s banner</FormDescription>
                <FormControl>
                  <FileUploadDialog
                    shape="rectangle"
                    item="banner"
                    onSubmit={(fileUrl, fileBlob) => {
                      form.setValue("banner", fileBlob);
                      setBannerPreview(fileUrl);
                    }}
                  >
                    <Button variant={"outline"}>Upload Banner</Button>
                  </FileUploadDialog>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-4 md:flex-row-reverse md:justify-between">
          <Button
            type="submit"
            disabled={
              !form.formState.isDirty ||
              !form.formState.isValid ||
              form.formState.isSubmitting
            }
          >
            {form.formState.isSubmitting && <Spinner />}
            Create
          </Button>
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
