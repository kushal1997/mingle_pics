import * as React from 'react';
import { FileUploaderRegular } from '@uploadcare/react-uploader';
import '@uploadcare/react-uploader/core.css';

interface IFileUploaderProps {
}

const FileUploader: React.FunctionComponent<IFileUploaderProps> = () => {
  return <>
   <FileUploaderRegular pubkey={import.meta.env.VITE_UPLOAD_CARE_PUBLIC_KEY} imgOnly={true}
    sourceList="local, url, camera, dropbox"
    classNameUploader="my-config uc-light" />
  </>;
};

export default FileUploader;
