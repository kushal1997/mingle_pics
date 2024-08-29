import FileUploader from "@/components/fileUploader";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useUserAuth } from "@/context/userAuthContext";
import { createPost } from "@/repository/post.service";
import { FileEntry, PhotoMeta, PostType } from "@/types";
import * as React from "react";
import { useNavigate } from "react-router-dom";

interface IPostProps {}

const Post: React.FunctionComponent<IPostProps> = () => {
  const navigate = useNavigate();
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

  const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Uploaded file", fileEntry);
    console.log("creat post data", post);

    const photoMeta: PhotoMeta[] =
      fileEntry.files
        ?.filter((file) => file.cdnUrl !== null && file.uuid !== null) // Filter out null values
        .map((file) => ({
          cdnUrl: file.cdnUrl as string, // Assert that cdnUrl is a string
          uuid: file.uuid as string, // Assert that uuid is a string
        })) || []; // Provide a default empty array if fileEntry.files is undefined

    if (user !== null) {
      const newPost: PostType = {
        ...post,
        userId: user?.uid || null,
        photos: photoMeta,
      };

      console.log("Our final post would be like ", newPost);
      await createPost(newPost);
      navigate("/");
    } else {
      navigate("/login");
    }
  };
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
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setPost({ ...post, caption: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col">
                <Label className="mb-4" htmlFor="photo">
                  Photos
                </Label>
                <FileUploader files={fileEntry} onChange={setFileEntry} />
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
