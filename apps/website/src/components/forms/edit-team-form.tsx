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
import { putApi } from "@ascnd-gg/website/lib/fetch-utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FileUploadDialog } from "../dialogs/file-upload-dialog";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function EditTeamForm({
  defaultValues,
}: {
  defaultValues: {
    displayName: string | undefined;
    logo: string | null;
    banner: string | null;
  };
}) {
  const router = useRouter();

  const form = useForm<createTeamSchemaType>({
    resolver: zodResolver(createTeamSchema),
    defaultValues: {
      displayName: defaultValues?.displayName ?? "",
    },
  });

  useEffect(() => {
    async function getBlobs() {
      if (defaultValues?.logo) {
        const logoBlob = await fetch(defaultValues.logo).then(
          async (res) => await res.blob(),
        );
        form.setValue("logo", logoBlob);
      }
      if (defaultValues?.banner) {
        const bannerBlob = await fetch(defaultValues.banner).then(
          async (res) => await res.blob(),
        );
        form.setValue("banner", bannerBlob);
      }
    }

    getBlobs();
  }, [defaultValues, form]);

  const [logoPreview, setLogoPreview] = useState<string>(
    defaultValues?.logo ?? "",
  );
  const [bannerPreview, setBannerPreview] = useState<string>(
    defaultValues?.banner ?? "",
  );

  const onSubmit = async (values: createTeamSchemaType) => {
    const formData = new FormData();

    formData.append("displayName", values.displayName);
    formData.append("logo", values.logo ?? "");
    formData.append("banner", values.banner ?? "");

    const { data, error } = await putApi<{ name: string }>("/team", formData);

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
      description: "Your team has been successfully updated.",
    });

    router.refresh();
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
                <FormLabel>Team Name</FormLabel>
                <FormDescription>Your team&apos;s name</FormDescription>
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
                <FormLabel>Team Logo</FormLabel>
                <FormDescription>Your team&apos;s logo</FormDescription>
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
                <FormLabel>Team Banner</FormLabel>
                <FormDescription>Your team&apos;s banner</FormDescription>
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
              !form.formState.isValid ||
              form.formState.isLoading ||
              !form.formState.dirtyFields
            }
          >
            Update
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
