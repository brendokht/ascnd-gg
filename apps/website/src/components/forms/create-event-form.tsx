"use client";

import { Fragment, useEffect, type ReactNode } from "react";
import { createEventSchema } from "@ascnd-gg/types";
import type {
  TitleData,
  TitleViewModel,
  StageTypeViewModel,
  TitleMapViewModel,
  TitleCharacterViewModel,
  TitleItemViewModel,
  TitleGamemodeViewModel,
  MatchFormatViewModel,
  CreateEvent,
  HubSummary,
  EventViewModel,
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
import { Checkbox } from "@ascnd-gg/ui/components/ui/checkbox";
import { MultiSelect, type Option } from "@ascnd-gg/ui/components/multi-select";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useFieldArray,
  useForm,
  useFormContext,
  UseFormReturn,
} from "react-hook-form";
import { FileUploadDialog } from "../dialogs/file-upload-dialog";
import { useState } from "react";
import Image from "next/image";
import { Textarea } from "@ascnd-gg/ui/components/ui/textarea";
import DateTimePicker from "@ascnd-gg/ui/components/date-time-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ascnd-gg/ui/components/ui/select";
import { defineStepper } from "@ascnd-gg/ui/components/stepper";
import * as z from "zod";
import { Separator } from "@ascnd-gg/ui/components/ui/separator";
import { ArrowDown, ArrowUp, Plus, X } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@ascnd-gg/ui/components/ui/card";
import { fetchApi, postApi } from "@ascnd-gg/website/lib/fetch-utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ascnd-gg/ui/components/ui/dialog";
import { ScrollArea } from "@ascnd-gg/ui/components/ui/scroll-area";
import { cn } from "@ascnd-gg/ui/lib/utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@ascnd-gg/ui/components/ui/avatar";
import { objectToFormData } from "@ascnd-gg/website/lib/form-data-helper";

type EventData = Omit<CreateEvent, "stages">;
type StagesData = Pick<CreateEvent, "stages">;

const { useStepper, steps, utils } = defineStepper(
  {
    id: "event",
    label: "Event",
    schema: createEventSchema.omit({ stages: true }),
  },
  {
    id: "stages",
    label: "Stages",
    schema: createEventSchema.pick({ stages: true }),
  },
);

const now = new Date();
const nowPlusWeek = new Date(now.getTime());
nowPlusWeek.setDate(nowPlusWeek.getDate() + 7);
const nowPlusTwoWeeks = new Date(now.getTime());
nowPlusTwoWeeks.setDate(nowPlusTwoWeeks.getDate() + 14);

// TODO: Add max width and height to logo and banner preview

export default function CreateEventForm({
  hubs,
  titles,
  stageTypes,
  matchFormats,
}: {
  hubs: Array<HubSummary> | null;
  titles: Array<TitleViewModel> | null;
  stageTypes: Array<StageTypeViewModel> | null;
  matchFormats: Array<MatchFormatViewModel> | null;
}) {
  const router = useRouter();
  const stepper = useStepper();

  const form = useForm({
    resolver: zodResolver(stepper.current.schema),
    mode: "onChange",
    defaultValues: {
      displayName: "",
      titleId: "",
      hubId: "",
    },
  });

  const [title, setTitle] = useState<TitleViewModel | undefined>();
  const [titleData, setTitleData] = useState<TitleData>();

  const onSubmit = async (values: z.infer<typeof stepper.current.schema>) => {
    console.log(`Form values for step ${stepper.current.id}:`, values);

    stepper.switch({
      event: async () => {
        const eventData = values as Omit<CreateEvent, "stages">;
        setTitle(titles?.find((e) => e.id === eventData.titleId));

        // TODO: Test all games ensuring proper event set up

        const titleMapsPromise = fetchApi<Array<TitleMapViewModel>>(
          `/titles/${eventData.titleId}/maps`,
        );
        const titleCharactersPromise = fetchApi<Array<TitleCharacterViewModel>>(
          `/titles/${eventData.titleId}/characters`,
        );
        const titleItemsPromise = fetchApi<Array<TitleItemViewModel>>(
          `/titles/${eventData.titleId}/items`,
        );
        const titleGamemodesPromise = fetchApi<Array<TitleGamemodeViewModel>>(
          `/titles/${eventData.titleId}/gamemodes`,
        );

        const [
          titleMapsResult,
          titleCharactersResult,
          titleItemsResult,
          titleGamemodesResult,
        ] = await Promise.allSettled([
          titleMapsPromise,
          titleCharactersPromise,
          titleItemsPromise,
          titleGamemodesPromise,
        ]);

        let titleMaps: Array<TitleMapViewModel> | null = null;
        let titleCharacters: Array<TitleCharacterViewModel> | null = null;
        let titleItems: Array<TitleItemViewModel> | null = null;
        let titleGamemodes: Array<TitleGamemodeViewModel> | null = null;

        if (titleMapsResult?.status === "fulfilled") {
          const { data: titleMapsData, error: titleMapsError } =
            titleMapsResult.value;

          if (titleMapsError) titleMaps = null;
          else titleMaps = titleMapsData ?? [];
        }

        if (titleCharactersResult?.status === "fulfilled") {
          const { data: titleCharactersData, error: titleCharactersError } =
            titleCharactersResult.value;

          if (titleCharactersError) titleCharacters = null;
          else titleCharacters = titleCharactersData ?? [];
        }

        if (titleItemsResult?.status === "fulfilled") {
          const { data: titleItemsData, error: titleItemsError } =
            titleItemsResult.value;

          if (titleItemsError) titleItems = null;
          else titleItems = titleItemsData ?? [];
        }

        if (titleGamemodesResult?.status === "fulfilled") {
          const { data: titleGamemodesData, error: titleGamemodesError } =
            titleGamemodesResult.value;

          if (titleGamemodesError) titleGamemodes = null;
          else titleGamemodes = titleGamemodesData ?? [];
        }

        setTitleData({
          maps: titleMaps ?? undefined,
          characters: titleCharacters ?? undefined,
          items: titleItems ?? undefined,
          gamemodes: titleGamemodes ?? undefined,
        });
      },
    });

    if (stepper.isLast) {
      const fullValues = form.getValues() as CreateEvent;
      const formData = objectToFormData(fullValues);

      const { data, error } = await postApi<EventViewModel>(
        "/events",
        formData,
      );

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
        description: "Your event has been successfully created.",
      });

      router.push(`/events/${data.name}`);
    } else {
      stepper.next();
    }
  };

  const currentIndex = utils.getIndex(stepper.current.id);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-sm">
              Step {currentIndex + 1} of {steps.length}
            </span>
          </div>
        </div>
        <nav aria-label="Event Creation Steps" className="group my-4">
          <ol
            className="flex items-center justify-between gap-2"
            aria-orientation="horizontal"
          >
            {stepper.all.map((step, index, array) => (
              <Fragment key={step.id}>
                <li className="flex flex-shrink-0 items-center gap-4">
                  <Button
                    type="button"
                    role="tab"
                    variant={index <= currentIndex ? "default" : "secondary"}
                    aria-current={
                      stepper.current.id === step.id ? "step" : undefined
                    }
                    aria-posinset={index + 1}
                    aria-setsize={steps.length}
                    aria-selected={stepper.current.id === step.id}
                    className="flex size-10 items-center justify-center rounded-full"
                    onClick={async () => {
                      const valid = await form.trigger();
                      //must be validated
                      if (!valid) return;
                      //can't skip steps forwards but can go back anywhere if validated
                      if (index - currentIndex > 1) return;
                      stepper.goTo(step.id);
                    }}
                  >
                    {index + 1}
                  </Button>
                  <span className="text-sm font-medium">{step.label}</span>
                </li>
                {index < array.length - 1 && (
                  <Separator
                    className={`flex-1 ${
                      index < currentIndex ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </Fragment>
            ))}
          </ol>
        </nav>
        <div className="space-y-4">
          {stepper.switch({
            event: () => <EventForm hubs={hubs} titles={titles} />,
            stages: () => (
              <StagesForm
                stageTypes={stageTypes}
                title={title}
                titleData={titleData}
                matchFormats={matchFormats}
              />
            ),
          })}
          <div className="flex justify-end gap-4">
            <Button
              variant="secondary"
              onClick={stepper.prev}
              disabled={stepper.isFirst}
            >
              Back
            </Button>
            <Button type="submit">
              {stepper.isLast ? "Complete" : "Next"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

function EventForm({
  hubs,
  titles,
}: {
  hubs: Array<HubSummary> | null;
  titles: Array<TitleViewModel> | null;
}) {
  const formContext = useFormContext<EventData>();

  const [logoPreview, setLogoPreview] = useState<string>("");
  const [bannerPreview, setBannerPreview] = useState<string>("");

  return (
    <>
      <FormField
        control={formContext.control}
        name="displayName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormDescription>Your event&apos;s name</FormDescription>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={formContext.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormDescription>Your event&apos;s description</FormDescription>
            <FormControl>
              <Textarea className="max-h-36" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={formContext.control}
        name="hubId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Hub</FormLabel>
            <FormDescription>
              The hub for the event to be hosted under
            </FormDescription>
            <FormControl>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                {...field}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Hub" />
                </SelectTrigger>
                <SelectContent>
                  {hubs?.map((hub) => {
                    return (
                      <SelectItem key={hub.id} value={hub.id}>
                        <Avatar>
                          <AvatarImage
                            src={hub.logo}
                            alt={`${hub.displayName}'s logo`}
                          />
                          <AvatarFallback>
                            {hub.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        {hub.displayName}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={formContext.control}
        name="titleId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormDescription>
              The title to be played in your event
            </FormDescription>
            <FormControl>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                {...field}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Title" />
                </SelectTrigger>
                <SelectContent>
                  {titles?.map((title) => {
                    return (
                      <SelectItem key={title.id} value={title.id}>
                        {title.displayName}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
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
              formContext.setValue("logo", undefined);
              setLogoPreview("");
            }}
            type="button"
          >
            Clear
          </Button>
        </>
      )}
      <FormField
        control={formContext.control}
        name="logo"
        render={() => (
          <FormItem>
            <FormLabel>Logo</FormLabel>
            <FormDescription>Your event&apos;s logo</FormDescription>
            <FormControl>
              <FileUploadDialog
                shape="circle"
                item="logo"
                onSubmit={(fileUrl, fileBlob) => {
                  formContext.setValue("logo", fileBlob);
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
              formContext.setValue("banner", undefined);
              setBannerPreview("");
            }}
            type="button"
          >
            Clear
          </Button>
        </>
      )}
      <FormField
        control={formContext.control}
        name="banner"
        render={() => (
          <FormItem>
            <FormLabel>Banner</FormLabel>
            <FormDescription>Your event&apos;s banner</FormDescription>
            <FormControl>
              <FileUploadDialog
                shape="rectangle"
                item="banner"
                onSubmit={(fileUrl, fileBlob) => {
                  formContext.setValue("banner", fileBlob);
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
    </>
  );
}

function StagesForm({
  stageTypes,
  matchFormats,
  title,
  titleData,
}: {
  stageTypes: Array<StageTypeViewModel> | null;
  matchFormats: Array<MatchFormatViewModel> | null;
  title: TitleViewModel | undefined;
  titleData: TitleData | undefined;
}) {
  const formContext = useFormContext<StagesData>();

  const stagesArray = useFieldArray({
    control: formContext.control,
    name: "stages",
  });

  const onStartDateChange = (date: Date | undefined, idx: number) => {
    formContext.setValue(`stages.${idx}.scheduledAt`, date!.toISOString(), {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const onEndDateChange = (date: Date | undefined, idx: number) => {
    formContext.setValue(`stages.${idx}.scheduledEndAt`, date!.toISOString(), {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const onRegistrationStartDateChange = (
    date: Date | undefined,
    idx: number,
  ) => {
    formContext.setValue(
      `stages.${idx}.registrationStartDate`,
      date!.toISOString(),
      { shouldValidate: true, shouldDirty: true },
    );
  };

  const onRegistrationEndDateChange = (date: Date | undefined, idx: number) => {
    formContext.setValue(
      `stages.${idx}.registrationEndDate`,
      date!.toISOString(),
      { shouldValidate: true, shouldDirty: true },
    );
  };

  useEffect(() => {
    console.log("errors", formContext.formState.errors.stages);
  }, [formContext.formState.errors]);

  return (
    <div className="min-h-98 space-y-4">
      {stagesArray.fields.map((stage, idx) => (
        <Card key={stage.id}>
          <CardHeader>
            <CardTitle>Stage {idx + 1}</CardTitle>
            <CardAction className="space-x-2">
              {idx !== 0 && stagesArray.fields.length > 1 && (
                <Button
                  onClick={() => {
                    stagesArray.swap(idx, idx - 1);
                  }}
                  size={"icon-sm"}
                >
                  <ArrowUp />
                </Button>
              )}
              {idx !== stagesArray.fields.length - 1 &&
                stagesArray.fields.length > 1 && (
                  <Button
                    onClick={() => {
                      stagesArray.swap(idx, idx + 1);
                    }}
                    size={"icon-sm"}
                  >
                    <ArrowDown />
                  </Button>
                )}
              <Button
                onClick={() => stagesArray.remove(idx)}
                variant={"destructive"}
                size={"icon-sm"}
              >
                <X />
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={formContext.control}
              name={`stages.${idx}.displayName`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormDescription>The stage&apos;s name</FormDescription>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formContext.control}
              name={`stages.${idx}.description`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormDescription>
                    The stage&apos;s description
                  </FormDescription>
                  <FormControl>
                    <Textarea className="max-h-36" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formContext.control}
              name={`stages.${idx}.typeId`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormDescription>
                    The type of stage to be played
                  </FormDescription>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      {...field}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {stageTypes?.map((title) => {
                          return (
                            <SelectItem key={title.id} value={title.id}>
                              {title.displayName}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formContext.control}
              name={`stages.${idx}.scheduledAt`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormDescription>
                    Your stage&apos;s start date
                  </FormDescription>
                  <FormControl>
                    <DateTimePicker
                      onDateChange={(date) => onStartDateChange(date, idx)}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formContext.control}
              name={`stages.${idx}.scheduledEndAt`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date</FormLabel>
                  <FormDescription>Your stage&apos;s end date</FormDescription>
                  <FormControl>
                    <DateTimePicker
                      onDateChange={(date) => onEndDateChange(date, idx)}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formContext.control}
              name={`stages.${idx}.registrationStartDate`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Registration Start Date</FormLabel>
                  <FormDescription>
                    Your stage&apos;s registration start date
                  </FormDescription>
                  <FormControl>
                    <DateTimePicker
                      onDateChange={(date) =>
                        onRegistrationStartDateChange(date, idx)
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formContext.control}
              name={`stages.${idx}.registrationEndDate`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Registration End Date</FormLabel>
                  <FormDescription>
                    Your stage&apos;s registration end date
                  </FormDescription>
                  <FormControl>
                    <DateTimePicker
                      onDateChange={(date) =>
                        onRegistrationEndDateChange(date, idx)
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem>
              <FormLabel>Stage Settings</FormLabel>
              <FormDescription>Your stage&apos;s settings</FormDescription>
              <StageSettingsDialog
                formContext={formContext}
                idx={idx}
                titleData={titleData}
              >
                <Button
                  variant={"secondary"}
                  className={cn(
                    "w-full",
                    formContext.formState.errors.stages &&
                      formContext.formState.errors.stages[idx]?.stageSettings &&
                      "ring-destructive/20 dark:ring-destructive/40 ring-2",
                  )}
                >
                  Edit Stage Settings
                </Button>
              </StageSettingsDialog>
              <FormMessage>
                {formContext.formState.errors.stages &&
                  formContext.formState.errors.stages[idx]?.stageSettings &&
                  "There are errors in Stage Settings"}
              </FormMessage>
            </FormItem>
            <FormItem>
              <FormLabel>Phases</FormLabel>
              <FormDescription>Your stage&apos;s phases</FormDescription>
              <PhasesDialog
                formContext={formContext}
                stageIdx={idx}
                matchFormats={matchFormats}
              >
                <Button
                  variant={"secondary"}
                  className={cn(
                    "w-full",
                    (formContext.formState.errors.stages?.[idx]?.phases?.root
                      ?.message ||
                      formContext.formState.errors.stages?.[idx]?.phases
                        ?.message) &&
                      "ring-destructive/20 dark:ring-destructive/40 ring-2",
                  )}
                >
                  Edit Phases
                </Button>
              </PhasesDialog>
              <FormMessage>
                {formContext.formState.errors.stages?.[idx]?.phases?.root
                  ?.message ||
                  formContext.formState.errors.stages?.[idx]?.phases?.message ||
                  (formContext.formState.errors.stages?.[idx]?.phases &&
                    "There are errors in one of the Phases")}
              </FormMessage>
            </FormItem>
          </CardContent>
        </Card>
      ))}
      <FormMessage>
        {Array.isArray(formContext.formState.errors.stages) &&
          formContext.formState.errors.stages.some(Boolean) && (
            <>
              There are errors in{" "}
              {formContext.formState.errors.stages
                .map((e, idx) => (e ? `Stage ${idx + 1}` : null))
                .filter(Boolean)
                .join(", ")}
            </>
          )}
      </FormMessage>
      <FormMessage>
        {formContext.formState.errors.stages?.root?.message ||
          formContext.formState.errors.stages?.message}
      </FormMessage>
      <Button
        className="w-full"
        onClick={() => {
          stagesArray.append({
            displayName: "",
            typeId: "",
            phases: [],
            scheduledAt: "",
            registrationStartDate: "",
            stageSettings: {
              minTeams: 2,
              maxTeams: 128,
              teamSize: 5,
              allowDraws: title?.allowsDraws,
              drawPolicy: "",
              numberOfSubstitutes: 1,
              numberOfCoaches: 1,
              gamemodePoolIds: [],
              perGameGamemodeVeto: false,
              perMatchGamemodeVeto: false,
              mapPoolIds: [],
              perGameMapVeto: false,
              perMatchMapVeto: false,
              characterPoolIds: [],
              perGameCharacterVeto: false,
              perMatchCharacterVeto: false,
              itemPoolIds: [],
              perGameItemVeto: false,
              perMatchItemVeto: false,
              perGameSideVeto: false,
              perMatchSideVeto: false,
              seedingType: "RANDOM",
              joinType: "OPEN",
            },
          });
        }}
      >
        <Plus />
        Add Stage
      </Button>
    </div>
  );
}

function StageSettingsDialog({
  children,
  formContext,
  idx,
  titleData,
}: {
  children: ReactNode;
  formContext: UseFormReturn<StagesData>;
  idx: number;
  titleData: TitleData | undefined;
}) {
  const [selectedTitleMaps, setSelectedTitleMaps] = useState<Array<Option>>([]);
  const [selectedTitleCharacters, setSelectedTitleCharacters] = useState<
    Array<Option>
  >([]);
  const [selectedTitleItems, setSelectedTitleItems] = useState<Array<Option>>(
    [],
  );
  const [selectedTitleGamemodes, setSelectedTitleGamemodes] = useState<
    Array<Option>
  >([]);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Stage {idx + 1} Settings</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Stage Settings for Stage {idx + 1}
        </DialogDescription>
        <ScrollArea type="always" className="h-102">
          <div className="mr-3 space-y-4">
            <FormField
              control={formContext.control}
              name={`stages.${idx}.stageSettings.allowDraws`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Allows Draws</FormLabel>
                  <FormControl>
                    <Checkbox
                      id={field.name}
                      checked={Boolean(field.value)}
                      onCheckedChange={(v) => {
                        // Ensure drawPolicy is blank if no draws are allowed
                        if (v === false)
                          formContext.setValue(
                            `stages.${idx}.stageSettings.drawPolicy`,
                            "",
                          );
                        field.onChange(v === true);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {formContext.watch(`stages.${idx}.stageSettings.allowDraws`) ===
              true && (
              <FormField
                control={formContext.control}
                name={`stages.${idx}.stageSettings.drawPolicy`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Draw Policy</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        {...field}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ALLOW_DRAW">Allow Draw</SelectItem>
                          <SelectItem value="TIEBREAKER">Tiebreaker</SelectItem>
                          <SelectItem value="ADMIN_DECISION">
                            Admin Decision
                          </SelectItem>
                          <SelectItem value="FALLBACK">
                            Fallback to Leaderboard
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={formContext.control}
              name={`stages.${idx}.stageSettings.minTeams`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Minimum Number of Teams</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value || "0", 10))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formContext.control}
              name={`stages.${idx}.stageSettings.maxTeams`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maximum Number of Teams</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value || "0", 10))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formContext.control}
              name={`stages.${idx}.stageSettings.teamSize`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Team Size</FormLabel>
                  <FormControl>
                    <Select
                      name={field.name}
                      value={String(field.value)}
                      onValueChange={(v) => field.onChange(v === "true")}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1v1</SelectItem>
                        <SelectItem value="2">2v2</SelectItem>
                        <SelectItem value="3">3v3</SelectItem>
                        <SelectItem value="4">4v4</SelectItem>
                        <SelectItem value="5">5v5</SelectItem>
                        <SelectItem value="6">6v6</SelectItem>
                        <SelectItem value="7">7v7</SelectItem>
                        <SelectItem value="8">8v8</SelectItem>
                        <SelectItem value="9">9v0</SelectItem>
                        <SelectItem value="10">10v10</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formContext.control}
              name={`stages.${idx}.stageSettings.numberOfSubstitutes`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number Of Substitutes</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value || "", 10))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formContext.control}
              name={`stages.${idx}.stageSettings.numberOfCoaches`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number Of Coaches</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value || "", 10))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {titleData &&
              titleData.gamemodes &&
              titleData.gamemodes.length > 0 && (
                <>
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={formContext.control}
                      name={`stages.${idx}.stageSettings.perGameGamemodeVeto`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Per Game Gamemode Veto</FormLabel>
                          <FormControl>
                            <Checkbox
                              id={field.name}
                              checked={Boolean(field.value)}
                              onCheckedChange={(v) =>
                                field.onChange(v === true)
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={formContext.control}
                      name={`stages.${idx}.stageSettings.perMatchGamemodeVeto`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Per Match Gamemode Veto</FormLabel>
                          <FormControl>
                            <Checkbox
                              id={field.name}
                              checked={Boolean(field.value)}
                              onCheckedChange={(v) =>
                                field.onChange(v === true)
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={formContext.control}
                    name={`stages.${idx}.stageSettings.gamemodePoolIds`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gamemode Pool</FormLabel>
                        <FormControl>
                          <MultiSelect
                            options={titleData.gamemodes!.map((gamemode) => {
                              return {
                                label: gamemode.displayName,
                                value: gamemode.id,
                              };
                            })}
                            selected={selectedTitleGamemodes}
                            onValueChange={(val) => {
                              const ids = val.flatMap((v) => v.value);
                              setSelectedTitleGamemodes(val);
                              formContext.setValue(
                                `stages.${idx}.stageSettings.gamemodePoolIds`,
                                ids,
                              );
                            }}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
            {titleData && titleData.maps && titleData.maps.length > 0 && (
              <>
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={formContext.control}
                    name={`stages.${idx}.stageSettings.perGameMapVeto`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Per Game Map Veto</FormLabel>
                        <FormControl>
                          <Checkbox
                            id={field.name}
                            checked={Boolean(field.value)}
                            onCheckedChange={(v) => field.onChange(v === true)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formContext.control}
                    name={`stages.${idx}.stageSettings.perMatchMapVeto`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Per Match Map Veto</FormLabel>
                        <FormControl>
                          <Checkbox
                            id={field.name}
                            checked={Boolean(field.value)}
                            onCheckedChange={(v) => field.onChange(v === true)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={formContext.control}
                  name={`stages.${idx}.stageSettings.mapPoolIds`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Map Pool</FormLabel>
                      <FormControl>
                        <MultiSelect
                          options={titleData.maps!.map((map) => {
                            return {
                              label: map.displayName,
                              value: map.id,
                            };
                          })}
                          selected={selectedTitleMaps}
                          onValueChange={(val) => {
                            const ids = val.flatMap((v) => v.value);
                            setSelectedTitleMaps(val);
                            formContext.setValue(
                              `stages.${idx}.stageSettings.mapPoolIds`,
                              ids,
                            );
                          }}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            {titleData &&
              titleData.characters &&
              titleData.characters.length > 0 && (
                <>
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={formContext.control}
                      name={`stages.${idx}.stageSettings.perGameCharacterVeto`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Per Game Character Veto</FormLabel>
                          <FormControl>
                            <Checkbox
                              id={field.name}
                              checked={Boolean(field.value)}
                              onCheckedChange={(v) =>
                                field.onChange(v === true)
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={formContext.control}
                      name={`stages.${idx}.stageSettings.perMatchCharacterVeto`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Per Match Character Veto</FormLabel>
                          <FormControl>
                            <Checkbox
                              id={field.name}
                              checked={Boolean(field.value)}
                              onCheckedChange={(v) =>
                                field.onChange(v === true)
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={formContext.control}
                    name={`stages.${idx}.stageSettings.characterPoolIds`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Character Pool</FormLabel>
                        <FormControl>
                          <MultiSelect
                            options={titleData.characters!.map((character) => {
                              return {
                                label: character.displayName,
                                value: character.id,
                              };
                            })}
                            selected={selectedTitleCharacters}
                            onValueChange={(val) => {
                              const ids = val.flatMap((v) => v.value);
                              setSelectedTitleCharacters(val);
                              formContext.setValue(
                                `stages.${idx}.stageSettings.characterPoolIds`,
                                ids,
                              );
                            }}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
            {titleData && titleData.items && titleData.items.length > 0 && (
              <>
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={formContext.control}
                    name={`stages.${idx}.stageSettings.perGameItemVeto`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Per Game Item Veto</FormLabel>
                        <FormControl>
                          <Checkbox
                            id={field.name}
                            checked={Boolean(field.value)}
                            onCheckedChange={(v) => field.onChange(v === true)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formContext.control}
                    name={`stages.${idx}.stageSettings.perMatchItemVeto`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Per Match Item Veto</FormLabel>
                        <FormControl>
                          <Checkbox
                            id={field.name}
                            checked={Boolean(field.value)}
                            onCheckedChange={(v) => field.onChange(v === true)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={formContext.control}
                  name={`stages.${idx}.stageSettings.itemPoolIds`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Item Pool</FormLabel>
                      <FormControl>
                        <MultiSelect
                          options={titleData.items!.map((item) => {
                            return {
                              label: item.displayName,
                              value: item.id,
                            };
                          })}
                          selected={selectedTitleItems}
                          onValueChange={(val) => {
                            const ids = val.flatMap((v) => v.value);
                            setSelectedTitleItems(val);
                            formContext.setValue(
                              `stages.${idx}.stageSettings.itemPoolIds`,
                              ids,
                            );
                          }}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={formContext.control}
                name={`stages.${idx}.stageSettings.perGameSideVeto`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Per Game Side Veto</FormLabel>
                    <FormControl>
                      <Checkbox
                        id={field.name}
                        checked={Boolean(field.value)}
                        onCheckedChange={(v) => field.onChange(v === true)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formContext.control}
                name={`stages.${idx}.stageSettings.perMatchSideVeto`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Per Match Side Veto</FormLabel>
                    <FormControl>
                      <Checkbox
                        id={field.name}
                        checked={Boolean(field.value)}
                        onCheckedChange={(v) => field.onChange(v === true)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={formContext.control}
              name={`stages.${idx}.stageSettings.seedingType`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Seeding Type</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      {...field}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="RANDOM">Random</SelectItem>
                        <SelectItem value="MANUAL">Manual</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formContext.control}
              name={`stages.${idx}.stageSettings.joinType`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Join Type</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      {...field}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="OPEN">Open</SelectItem>
                        <SelectItem value="INVITE">Invite Only</SelectItem>
                        <SelectItem value="REQUEST">Request to Join</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

function PhasesDialog({
  children,
  formContext,
  stageIdx,
  matchFormats,
}: {
  children: ReactNode;
  formContext: UseFormReturn<StagesData>;
  stageIdx: number;
  matchFormats: Array<MatchFormatViewModel> | null;
}) {
  const phasesArray = useFieldArray({
    control: formContext.control,
    name: `stages.${stageIdx}.phases`,
  });

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Stage {stageIdx + 1} Phases</DialogTitle>
        </DialogHeader>
        <DialogDescription>Phases for Stage {stageIdx + 1}</DialogDescription>
        <ScrollArea type="always" className="h-102">
          <div className="mr-3 space-y-4">
            {phasesArray.fields.map((phase, idx) => {
              return (
                <Card key={phase.id}>
                  <CardHeader>
                    <CardTitle>Phase {idx + 1}</CardTitle>
                    <CardAction className="space-x-2">
                      {idx !== 0 && phasesArray.fields.length > 1 && (
                        <Button
                          onClick={() => {
                            phasesArray.swap(idx, idx - 1);
                          }}
                          size={"icon-sm"}
                        >
                          <ArrowUp />
                        </Button>
                      )}
                      {idx !== phasesArray.fields.length - 1 &&
                        phasesArray.fields.length > 1 && (
                          <Button
                            onClick={() => {
                              phasesArray.swap(idx, idx + 1);
                            }}
                            size={"icon-sm"}
                          >
                            <ArrowDown />
                          </Button>
                        )}
                      <Button
                        onClick={() => phasesArray.remove(idx)}
                        variant={"destructive"}
                        size={"icon-sm"}
                      >
                        <X />
                      </Button>
                    </CardAction>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={formContext.control}
                      name={`stages.${stageIdx}.phases.${idx}.formatId`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Type</FormLabel>
                          <FormDescription>
                            The type of stage to be played
                          </FormDescription>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              {...field}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Type" />
                              </SelectTrigger>
                              <SelectContent>
                                {matchFormats?.map((format) => {
                                  return (
                                    <SelectItem
                                      key={format.id}
                                      value={format.id}
                                    >
                                      {format.displayName}
                                    </SelectItem>
                                  );
                                })}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={formContext.control}
                      name={`stages.${stageIdx}.phases.${idx}.matchIndexStart`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Starting Match</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) =>
                                field.onChange(
                                  parseInt(e.target.value || "0", 10),
                                )
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={formContext.control}
                      name={`stages.${stageIdx}.phases.${idx}.matchIndexEnd`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ending Match</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) =>
                                field.onChange(
                                  parseInt(e.target.value || "0", 10),
                                )
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </ScrollArea>
        <Button
          className="w-full"
          onClick={() => {
            phasesArray.append({
              formatId: "",
              matchIndexStart: 0,
              matchIndexEnd: 0,
            });
          }}
        >
          <Plus />
          Add Phase
        </Button>
      </DialogContent>
    </Dialog>
  );
}
