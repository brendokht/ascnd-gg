"use client";

import { Button } from "@ascnd-gg/ui/components/ui/button";
import { FileUploadDialog } from "@ascnd-gg/website/components/dialogs/file-upload-dialog";

export default function FileUploadTest() {
  return (
    <FileUploadDialog shape="rectangle">
      <Button>Upload File</Button>
    </FileUploadDialog>
  );
}
