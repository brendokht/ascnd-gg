"use client";

import { Button } from "@ascnd-gg/ui/components/ui/button";
import { FileUploadDialog } from "@ascnd-gg/website/components/dialogs/file-upload-dialog";

export default function FileUploadTest() {
  return (
    <FileUploadDialog
      shape="rectangle"
      onSubmit={(fileUrl, fileBlob) => {
        console.log("fileUrl", fileUrl);
        console.log("fileBlob", fileBlob);
      }}
    >
      <Button>Upload File</Button>
    </FileUploadDialog>
  );
}
