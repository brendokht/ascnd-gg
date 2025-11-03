"use client";

import { Fragment } from "react";
import { createStageSchema, createEventDataSchema } from "@ascnd-gg/types";
import type {
  CreateEventData,
  CreateStage,
  StageTypeSummary,
  TitleData,
  TitleViewModel,
  StageTypeViewModel,
  TitleMapViewModel,
  TitleCharacterViewModel,
  TitleItemViewModel,
  TitleGamemodeViewModel,
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
import { useFieldArray, useForm, useFormContext } from "react-hook-form";
import { FileUploadDialog } from "../dialogs/file-upload-dialog";
import { useEffect, useState } from "react";
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
import { Plus, X } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@ascnd-gg/ui/components/ui/card";
import { fetchApi } from "@ascnd-gg/website/lib/fetch-utils";

const { useStepper, steps, utils } = defineStepper(
  {
    id: "event",
    label: "Event",
    schema: createEventDataSchema,
  },
  {
    id: "stages",
    label: "Stages",
    schema: createStageSchema,
  },
);

const now = new Date();
const nowPlusWeek = new Date(now.getTime());
nowPlusWeek.setDate(nowPlusWeek.getDate() + 7);
const nowPlusTwoWeeks = new Date(now.getTime());
nowPlusTwoWeeks.setDate(nowPlusTwoWeeks.getDate() + 14);

// TODO: Add max width and height to logo and banner preview

export default function CreateEventForm({
  titles,
  stageTypes,
}: {
  titles: Array<TitleViewModel> | null;
  stageTypes: Array<StageTypeViewModel> | null;
}) {
  const stepper = useStepper();

  const form = useForm({
    resolver: zodResolver(stepper.current.schema),
    mode: "onChange",
    defaultValues: {
      displayName: "",
      titleId: "",
      scheduledAt: new Date(nowPlusWeek).toISOString(),
      scheduledEndAt: new Date(nowPlusTwoWeeks).toISOString(),
    },
  });

  const [title, setTitle] = useState<TitleViewModel | undefined>();
  const [titleData, setTitleData] = useState<TitleData>();

  const onSubmit = (values: z.infer<typeof stepper.current.schema>) => {
    console.log(`Form values for step ${stepper.current.id}:`, values);

    stepper.switch({
      event: async () => {
        const eventData = values as CreateEventData;
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
      console.log("Creating event");
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
            event: () => <EventForm titles={titles} />,
            stages: () => (
              <StagesForm
                stageTypes={stageTypes}
                title={title}
                titleData={titleData}
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

function EventForm({ titles }: { titles: Array<TitleViewModel> | null }) {
  const formContext = useFormContext<CreateEventData>();

  const [logoPreview, setLogoPreview] = useState<string>("");
  const [bannerPreview, setBannerPreview] = useState<string>("");

  const onScheduledAtDateChange = (date: Date | undefined) => {
    formContext.setValue("scheduledAt", date!.toISOString());
  };

  const onScheduledEndAtDateChange = (date: Date | undefined) => {
    formContext.setValue("scheduledEndAt", date!.toISOString());
  };

  return (
    <div className="mb-8 space-y-4 px-3">
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
      <FormField
        control={formContext.control}
        name="scheduledAt"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Start Date</FormLabel>
            <FormDescription>Your event&apos;s start date</FormDescription>
            <FormControl>
              <DateTimePicker
                defaultTime={new Date(nowPlusWeek)}
                onDateChange={onScheduledAtDateChange}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={formContext.control}
        name="scheduledEndAt"
        render={({ field }) => (
          <FormItem>
            <FormLabel>End Date</FormLabel>
            <FormDescription>Your event&apos;s end date</FormDescription>
            <FormControl>
              <DateTimePicker
                defaultTime={new Date(nowPlusTwoWeeks)}
                onDateChange={onScheduledEndAtDateChange}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

function StagesForm({
  stageTypes,
  title,
  titleData,
}: {
  stageTypes: Array<StageTypeSummary> | null;
  title: TitleViewModel | undefined;
  titleData: TitleData | undefined;
}) {
  const formContext = useFormContext<CreateStage>();

  useEffect(() => {
    console.log(formContext.formState.errors);
  }, [formContext.formState.errors]);

  useEffect(() => {}, [title]);

  const stagesArray = useFieldArray({
    control: formContext.control,
    name: "stages",
  });

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

  const [logoPreview, setLogoPreview] = useState<string>("");
  const [bannerPreview, setBannerPreview] = useState<string>("");

  const onScheduledAtDateChange = (date: Date | undefined, idx: number) => {
    formContext.setValue(`stages.${idx}.scheduledAt`, date!.toISOString());
  };

  const onScheduledEndAtDateChange = (date: Date | undefined, idx: number) => {
    formContext.setValue(`stages.${idx}.scheduledEndAt`, date!.toISOString());
  };

  return (
    <div className="min-h-98 space-y-4">
      {stagesArray.fields.map((stage, idx) => (
        <Card key={stage.id}>
          <CardHeader>
            <CardTitle>Stage {idx + 1}</CardTitle>
            <CardAction>
              <Button
                onClick={() => stagesArray.remove(idx)}
                variant={"destructive"}
                className="w-full"
              >
                <X />
                Remove
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
              name={`stages.${idx}.stageSettings.allowDraws`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Allows Draws</FormLabel>
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
            {/* TODO: Add phase sub form? */}
            {/* <FormField
              control={formContext.control}
              name={`stages.${idx}.phases`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phases</FormLabel>
                  <FormDescription>
                    The phases for this stage (comma separated)
                  </FormDescription>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => {
                        const raw = e.target.value;
                        // store as array of strings
                        field.onChange(raw.split(",").map((s) => s.trim()));
                      }}
                      value={
                        Array.isArray(field.value)
                          ? field.value.join(", ")
                          : field.value
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
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
                    formContext.setValue(`stages.${idx}.logo`, undefined);
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
              name={`stages.${idx}.logo`}
              render={() => (
                <FormItem>
                  <FormLabel>Logo</FormLabel>
                  <FormDescription>The logo for the stage</FormDescription>
                  <FormControl>
                    <FileUploadDialog
                      shape="circle"
                      item="logo"
                      onSubmit={(fileUrl, fileBlob) => {
                        formContext.setValue(`stages.${idx}.logo`, fileBlob);
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
                    formContext.setValue(`stages.${idx}.banner`, undefined);
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
              name={`stages.${idx}.banner`}
              render={() => (
                <FormItem>
                  <FormLabel>Banner</FormLabel>
                  <FormDescription>The banner for the stage</FormDescription>
                  <FormControl>
                    <FileUploadDialog
                      shape="rectangle"
                      item="banner"
                      onSubmit={(fileUrl, fileBlob) => {
                        formContext.setValue(`stages.${idx}.banner`, fileBlob);
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
                            onCheckedChange={(v) => field.onChange(v === true)}
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
                            onCheckedChange={(v) => field.onChange(v === true)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                            onCheckedChange={(v) => field.onChange(v === true)}
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
                            onCheckedChange={(v) => field.onChange(v === true)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                        <SelectItem value="SEED">Seed</SelectItem>
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
            <FormField
              control={formContext.control}
              name={`stages.${idx}.scheduledAt`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormDescription>
                    Your event&apos;s start date
                  </FormDescription>
                  <FormControl>
                    <DateTimePicker
                      defaultTime={new Date(nowPlusWeek)}
                      onDateChange={(date) =>
                        onScheduledAtDateChange(date, idx)
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
              name={`stages.${idx}.scheduledEndAt`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date</FormLabel>
                  <FormDescription>Your event&apos;s end date</FormDescription>
                  <FormControl>
                    <DateTimePicker
                      defaultTime={new Date(nowPlusTwoWeeks)}
                      onDateChange={(date) =>
                        onScheduledEndAtDateChange(date, idx)
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
      ))}
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
            scheduledAt: new Date(nowPlusWeek).toISOString(),
            scheduledEndAt: new Date(nowPlusTwoWeeks).toISOString(),
            phases: [
              {
                formatId: "019a33f2-fe1a-7c92-9ac6-cc614016572d",
                matchIndexEnd: 1,
                matchIndexStart: 1,
              },
            ],
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
