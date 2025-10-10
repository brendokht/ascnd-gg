"use client";

import {
  editTeamSchema,
  type EditTeam,
  type TeamSummary,
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

export default function EditTeamForm({
  team,
  callback,
}: {
  team: TeamSummary;
  callback?: () => void;
}) {
  const router = useRouter();

  const form = useForm<EditTeam>({
    resolver: zodResolver(editTeamSchema),
    defaultValues: {
      displayName: team?.displayName ?? "",
    },
    reValidateMode: "onChange",
  });

  useEffect(() => {
    async function getBlobs() {
      if (team?.logo) {
        const logoBlob = await fetch(team.logo).then(
          async (res) => await res.blob(),
        );
        form.setValue("logo", logoBlob);
      }
      if (team?.banner) {
        const bannerBlob = await fetch(team.banner).then(
          async (res) => await res.blob(),
        );
        form.setValue("banner", bannerBlob);
      }
    }

    getBlobs();
  }, [team, form]);

  const [logoPreview, setLogoPreview] = useState<string>(team?.logo ?? "");
  const [bannerPreview, setBannerPreview] = useState<string>(
    team?.banner ?? "",
  );

  const onSubmit = async (values: EditTeam) => {
    const formData = new FormData();

    if (form.formState.dirtyFields.displayName)
      formData.append("displayName", values.displayName ?? "");
    if (form.formState.dirtyFields.logo)
      formData.append("logo", values.logo ?? new Blob());
    if (form.formState.dirtyFields.banner)
      formData.append("banner", values.banner ?? new Blob());

    const { data, error } = await patchApi<{ name: string }>(
      `/teams/${team.id}`,
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
      description: "Your team has been successfully updated.",
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
                <FormLabel>Team Logo</FormLabel>
                <FormDescription>Your team&apos;s logo</FormDescription>
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
                <FormLabel>Team Banner</FormLabel>
                <FormDescription>Your team&apos;s banner</FormDescription>
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
