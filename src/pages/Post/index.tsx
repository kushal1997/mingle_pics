// import FileUploader from "@/components/fileUploader/file";
import FileUploader from "@/components/fileUploader";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useUserAuth } from "@/context/userAuthContext";
import {  FileEntry, PostType } from "@/types";
import * as React from "react";

interface IPostProps {}

const Post: React.FunctionComponent<IPostProps> = () => {
  const { user } = useUserAuth();
  const [fileEntry, setFileEntry] = React.useState<FileEntry>({
    files: [],
  });
  const [post, setPost] = React.useState<PostType>({
    caption: "",
    photos: [],
    likes: 0,
    userlikes: [],
    userId: null,
    date: new Date(),
  });

  const handleSubmit=async( e: React.MouseEvent<HTMLFormElement> )=>{
    e.preventDefault();

    console.log("Uploaded file",fileEntry);
    console.log("creat post data",post);
    
    

  }
  return (
    <Layout>
      <div className="flex justify-center w-full">
        <div className="border w-full max-w-3xl">
          <h3 className="text-center bg-slate-800 text-white text-lg p-1">
            {" "}
            Create Post{" "}
          </h3>
          <div className="p-8">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col">
                <Label className="mb-4" htmlFor="caption">
                  Photo Caption
                </Label>
                <Textarea
                  className="mb-8"
                  id="caption"
                  placeholder="What's in your photo"
                  value={post.caption}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>)=>setPost({...post,caption:e.target.value})}
                />
              </div>
              <div className="flex flex-col">
                <Label className="mb-4" htmlFor="photo">
                  Photos
                </Label>
                <FileUploader files={fileEntry} onChange={setFileEntry}/>
              </div>
              <div>
                <Button className="mt-8 w-32" type="submit">
                  Post
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Post;
