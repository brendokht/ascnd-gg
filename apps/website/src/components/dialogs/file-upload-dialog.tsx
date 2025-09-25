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
import { Input } from "@ascnd-gg/ui/components/ui/input";
import { cn } from "@ascnd-gg/ui/lib/utils";
import { Check, ImageIcon, Upload, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState, type ReactNode } from "react";
import { toast } from "sonner";

export function FileUploadDialog({
  children,
  shape,
  item = "file",
  maxFileSizeMB = 4,
  acceptedFileTypes = ["image/png", "image/jpg", "image/jpeg"],
}: {
  children: ReactNode;
  shape: "square" | "rectangle";
  item?: string;
  maxFileSizeMB?: number;
  acceptedFileTypes?: string[];
}) {
  const maxFileSize = maxFileSizeMB * 1024 * 1024;

  const [file, setFile] = useState<string | undefined>(undefined);
  const [fileName, setFileName] = useState<string | undefined>(undefined);
  const [fileSize, setFileSize] = useState<number | undefined>(undefined);

  const [dragActive, setDragActive] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileValidation = (file: File) => {
    const selectedFileType = file.type;

    console.log(file);

    if (!acceptedFileTypes.includes(selectedFileType)) {
      toast.error("Image submission error", {
        description: `${acceptedFileTypes.map((t, idx) => {
          if (idx === acceptedFileTypes.length - 1)
            return " and .".concat(t.split("/")[1]!).concat(" ");
          else return " .".concat(t.split("/")[1]!);
        })} files only.`,
      });
      return false;
    }

    if (file.size > maxFileSize) {
      toast.error("Image submission error", {
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

      setFile(result.blobUrl);
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

      setFile(result.blobUrl);
      setFileName(result.name);
      setFileSize(result.size);
    }
  };

  const resetUpload = () => {
    setFile(undefined);
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
        <div>
          {file ? (
            <div className={"rounded-sm border py-4"}>
              <div className="flex flex-col gap-4">
                <div
                  className={cn(
                    "flex items-center justify-center",
                    shape === "square" ? "aspect-square" : "aspect-rectangle",
                  )}
                >
                  <div className="relative size-[90%]">
                    <Image src={file} alt="Image Preview" loading="lazy" fill />
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
            <div
              className={cn(
                "bg-background hover:bg-muted/50 relative flex cursor-pointer flex-col items-center justify-center rounded-sm border py-8 transition-all duration-200",
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
              <div className="flex size-full flex-col items-center justify-center gap-2">
                <div
                  className={cn(
                    "rounded-full p-4",
                    dragActive ? "bg-primary/20" : "bg-muted",
                  )}
                >
                  <Upload size={48} />
                </div>
                <div>
                  <p>Drag & drop your {item} here</p>
                  <p className="text-center text-sm">
                    or click to browse your files
                  </p>
                </div>
                <p className="text-muted-foreground text-xs">
                  {acceptedFileTypes.map((t, idx) => {
                    if (idx === acceptedFileTypes.length - 1)
                      return " and .".concat(t.split("/")[1]!).concat(" ");
                    else return " .".concat(t.split("/")[1]!);
                  })}{" "}
                  files up to 4 MB in size
                </p>
              </div>
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
            </div>
          )}
        </div>
        <DialogFooter>
          <div
            className={`grid ${file ? "grid-cols-2" : "grid-cols-2"} w-full gap-3`}
          >
            {file ? (
              <>
                <Button variant="outline" onClick={resetUpload}>
                  <X />
                  Reset
                </Button>
                <Button onClick={() => console.log("handle submit")}>
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
