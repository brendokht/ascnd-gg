"use client";

import {
  editHubSchema,
  type HubViewModel,
  type EditHub,
} from "@ascnd-gg/types";
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
import { patchApi } from "@ascnd-gg/website/lib/fetch-utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FileUploadDialog } from "../dialogs/file-upload-dialog";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Spinner } from "@ascnd-gg/ui/components/ui/spinner";
import { Textarea } from "@ascnd-gg/ui/components/ui/textarea";

export default function EditHubForm({
  hub,
  callback,
}: {
  hub: HubViewModel;
  callback?: () => void;
}) {
  const router = useRouter();

  const form = useForm<EditHub>({
    resolver: zodResolver(editHubSchema),
    defaultValues: {
      displayName: hub?.displayName ?? "",
      description: hub?.description ?? "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    async function getBlobs() {
      if (hub?.logo) {
        const logoBlob = await fetch(hub.logo).then(
          async (res) => await res.blob(),
        );
        form.setValue("logo", logoBlob);
      }
      if (hub?.banner) {
        const bannerBlob = await fetch(hub.banner).then(
          async (res) => await res.blob(),
        );
        form.setValue("banner", bannerBlob);
      }
    }

    getBlobs();
  }, [hub, form]);

  const [logoPreview, setLogoPreview] = useState<string>(hub?.logo ?? "");
  const [bannerPreview, setBannerPreview] = useState<string>(hub?.banner ?? "");

  const onSubmit = async (values: EditHub) => {
    const formData = new FormData();

    if (form.formState.dirtyFields.displayName)
      formData.append("displayName", values.displayName ?? "");
    if (form.formState.dirtyFields.description)
      formData.append("description", values.description ?? "");
    if (form.formState.dirtyFields.logo)
      formData.append("logo", values.logo ?? new Blob());
    if (form.formState.dirtyFields.banner)
      formData.append("banner", values.banner ?? new Blob());

    const { data, error } = await patchApi<{ name: string }>(
      `/hubs/${hub.id}`,
      formData,
    );

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
      description: "Your hub has been successfully updated.",
    });

    if (callback) callback();

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
                <FormLabel>Hub Name</FormLabel>
                <FormDescription>Your hub&apos;s name</FormDescription>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hub Description</FormLabel>
                <FormDescription>Your hub&apos;s description</FormDescription>
                <FormControl>
                  <Textarea className="max-h-36" {...field} />
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
                  form.setValue("logo", null, {
                    shouldDirty: true,
                    shouldValidate: true,
                  });
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
                      form.setValue("logo", fileBlob, {
                        shouldDirty: true,
                        shouldValidate: true,
                      });
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
                  form.setValue("banner", null, {
                    shouldDirty: true,
                    shouldValidate: true,
                  });
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
                      form.setValue("banner", fileBlob, {
                        shouldDirty: true,
                        shouldValidate: true,
                      });
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
            Update
          </Button>
        </div>
      </form>
    </Form>
  );
}
