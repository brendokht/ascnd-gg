/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@ascnd-gg/ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ascnd-gg/ui/components/ui/dialog";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@ascnd-gg/ui/components/ui/empty";
import { Input } from "@ascnd-gg/ui/components/ui/input";
import { cn } from "@ascnd-gg/ui/lib/utils";
import { Check, ImageIcon, Upload, X } from "lucide-react";
import { useRef, useState, type ReactNode } from "react";
import { toast } from "sonner";

{
  /* TODO: Support lifted state for form/previewing compatibility} */
}

export function FileUploadDialog({
  children,
  shape,
  item = "file",
  maxFileSizeMB = 4,
  acceptedFileTypes = ["image/png", "image/jpg", "image/jpeg"],
  onSubmit,
}: {
  children: ReactNode;
  shape: "square" | "rectangle" | "circle";
  item?: string;
  maxFileSizeMB?: number;
  acceptedFileTypes?: string[];
  onSubmit: (fileUrl: string, fileBlob: Blob) => void;
}) {
  const maxFileSize = maxFileSizeMB * 1024 * 1024;

  const [fileUrl, setFileUrl] = useState<string | undefined>(undefined);
  const [fileName, setFileName] = useState<string | undefined>(undefined);
  const [fileSize, setFileSize] = useState<number | undefined>(undefined);

  const [dragActive, setDragActive] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileValidation = (file: File) => {
    const selectedFileType = file.type;

    if (!acceptedFileTypes.includes(selectedFileType)) {
      toast.error("Error Selecting Image...", {
        description: `${acceptedFileTypes.map((t, idx) => {
          if (idx === acceptedFileTypes.length - 1)
            return " and .".concat(t.split("/")[1]!).concat(" ");
          else return " .".concat(t.split("/")[1]!);
        })} files only.`,
      });
      return false;
    }

    if (file.size > maxFileSize) {
      toast.error("Errro Selecting Image...", {
        description: `File size must be less than ${maxFileSizeMB} MB`,
      });
      return false;
    }

    return {
      selectedFileType,
      blobUrl: URL.createObjectURL(file),
      name: file.name,
      size: file.size,
    };
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const result = handleFileValidation(file);

      if (!result) {
        e.target.value = "";
        return;
      }

      setFileUrl(result.blobUrl);
      setFileName(result.name);
      setFileSize(result.size);
    }
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const result = handleFileValidation(file);

      if (!result) {
        return;
      }

      setFileUrl(result.blobUrl);
      setFileName(result.name);
      setFileSize(result.size);
    }
  };

  const resetUpload = () => {
    setFileUrl(undefined);
    setFileName("");
    setFileSize(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " bytes";
    else if (bytes < 1048576) {
      const size = (bytes / 1024).toFixed(1);
      return size.endsWith(".0") ? size.slice(0, -2) + " KB" : size + " KB";
    } else {
      const size = (bytes / 1048576).toFixed(1);
      return size.endsWith(".0") ? size.slice(0, -2) + " MB" : size + " MB";
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Upload {item.charAt(0).toUpperCase() + item.slice(1)}
          </DialogTitle>
          <DialogDescription>
            Upload a new {item} by dragging and dropping or selecting a file.
          </DialogDescription>
        </DialogHeader>
        <div className="min-h-130">
          {fileUrl ? (
            <div className={"h-full rounded-sm border py-4"}>
              <div className={cn("flex h-full flex-col justify-between gap-4")}>
                <div className={cn("flex h-full items-center justify-center")}>
                  <div
                    className={cn(
                      "relative w-[90%]",
                      shape === "square" || shape === "circle"
                        ? "aspect-square"
                        : "aspect-rectangle",
                    )}
                  >
                    {/* TODO: Fix slow loading of larger images */}
                    <img
                      src={fileUrl}
                      alt="Preview"
                      className={cn(
                        "h-full w-full object-cover",
                        shape === "circle" && "rounded-full",
                      )}
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 px-4 text-sm">
                  <div className="bg-muted rounded-md p-2">
                    <ImageIcon size={16} />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-medium">{fileName!}</p>
                    <p className="text-muted-foreground text-xs">
                      {formatFileSize(fileSize!)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Empty
              className={cn(
                "hover:bg-muted/35 relative h-full border transition-all duration-200 hover:cursor-pointer",
                dragActive ? "border-primary bg-primary/5" : "border-border",
              )}
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                setDragActive(false);
              }}
              onDragEnd={(e) => {
                e.preventDefault();
                setDragActive(false);
              }}
              onDrop={handleFileDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <EmptyHeader>
                <EmptyMedia variant={"icon"}>
                  <Upload />
                </EmptyMedia>
                <EmptyTitle>Drag & Drop your Items Here</EmptyTitle>
                <EmptyDescription>
                  or click to browse your files.
                </EmptyDescription>
                <EmptyContent>
                  <p className="text-muted-foreground text-xs">
                    {acceptedFileTypes.map((t, idx) => {
                      if (idx === acceptedFileTypes.length - 1)
                        return " and .".concat(t.split("/")[1]!).concat(" ");
                      else return " .".concat(t.split("/")[1]!);
                    })}{" "}
                    files up to 4 MB in size
                  </p>
                </EmptyContent>
              </EmptyHeader>
              <Input
                ref={fileInputRef}
                type="file"
                accept={
                  acceptedFileTypes
                    ? acceptedFileTypes.map((t) => t).join(",")
                    : undefined
                }
                onChange={handleFileChange}
                className="sr-only h-0"
              />
            </Empty>
          )}
        </div>
        <DialogFooter>
          <div
            className={`grid ${fileUrl ? "grid-cols-2" : "grid-cols-2"} w-full gap-3`}
          >
            {fileUrl ? (
              <>
                <Button variant="outline" onClick={resetUpload}>
                  <X />
                  Reset
                </Button>
                <Button
                  onClick={async () => {
                    if (!fileUrl) {
                      toast.error(
                        `Error Submitting ${item.charAt(0).toUpperCase() + item.slice(1)}...`,
                        {
                          description: "No file selected.",
                        },
                      );
                    }

                    const fileRes = await fetch(fileUrl);

                    const fileBlob = await fileRes.blob();

                    onSubmit(fileUrl, fileBlob);

                    setOpen(false);
                  }}
                >
                  <Check />
                  Apply
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  <X />
                  Cancel
                </Button>
                <Button onClick={() => fileInputRef.current?.click()}>
                  <Upload />
                  Select File
                </Button>
              </>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
