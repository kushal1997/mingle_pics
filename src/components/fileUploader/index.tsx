import * as React from "react";
import {
  FileUploaderRegular,
  OutputCollectionState,
  OutputCollectionStatus,
  OutputFileEntry,
  type UploadCtxProvider,
} from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";
import { FileEntry } from "@/types";

interface IFileUploaderProps {
  files: FileEntry;
  onChange: (fileEntry: FileEntry) => void;
  preview: boolean;
}

const FileUploader: React.FunctionComponent<IFileUploaderProps> = ({
  files,
  onChange,
  preview,
}) => {
  const [uploadedFiles, setUploadedFiles] = React.useState<
    OutputFileEntry<"success">[]
  >([]);
  const ctxProviderRef = React.useRef<InstanceType<UploadCtxProvider>>(null);

  const handleRemoveClick = (uuid: OutputFileEntry["uuid"]) => {
    console.log("file remove button clicked", uuid);

    const updatedFiles = files.files.filter((f) => f.uuid !== uuid);
    console.log("deleted files ======= ", updatedFiles);

    onChange({ files: updatedFiles });
  };

  const resetUploaderState = () =>
    ctxProviderRef.current?.uploadCollection.clearAll();

  const handleModalCloseEvent = () => {
    resetUploaderState();
    const updatedFiles = [...files.files, ...uploadedFiles];
    console.log("updatedFiles=========", updatedFiles);
    onChange({ files: updatedFiles });
    setUploadedFiles([]);
  };
  const handleUploadChange = (
    event: OutputCollectionState<OutputCollectionStatus, "maybe-has-group">
  ) => {
    console.log("Upload event:", event.allEntries); // Log the entire event to inspect it
    setUploadedFiles(
      event.allEntries.filter(
        (f) => f.status === "success"
      ) as OutputFileEntry<"success">[]
    );
  };
  React.useEffect(() => {
    if (uploadedFiles.length > 0)
      console.log("uploadedFiles:  ", uploadedFiles);
    console.log("no sucessly uploaded files");
  }, [uploadedFiles]);
  return (
    <>
      <FileUploaderRegular
        pubkey={import.meta.env.VITE_UPLOAD_CARE_PUBLIC_KEY}
        imgOnly={true}
        sourceList="local, url, camera, dropbox"
        classNameUploader="my-config uc-light"
        apiRef={ctxProviderRef}
        onChange={handleUploadChange}
        onModalClose={handleModalCloseEvent}
        multiple={preview}
        confirmUpload={true}
        removeCopyright={true}
      />
      {preview ? (
        <div className="grid grid-cols-2 gap-4 mt-8">
          {files.files?.map((file) => (
            <>
              <div className="relative" key={file.uuid}>
                <img
                  src={`${file.cdnUrl}-/format/webp/-/quality/smart/-/stretch/fill/`}
                  alt={`${file.cdnUrl}`}
                  key={file.uuid}
                />
                <div className="flex cursor-pointer justify-center absolute -right-2 -top-2 bg-white border-2 border-slate-800 rounded-full w-7 h-7 hover:bg-pink-200  ">
                  <button
                    className="text-slate-800 text-center"
                    type="button"
                    onClick={() => handleRemoveClick(file.uuid)}
                  >
                    ❌
                  </button>
                </div>
              </div>
            </>
          ))}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default FileUploader;
