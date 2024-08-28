import FileUploader from "@/components/fileUploader";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import * as React from "react";

interface IPostProps {}

const Post: React.FunctionComponent<IPostProps> = () => {
  return (
    <Layout>
      <div className="flex justify-center w-full">
        <div className="border w-full max-w-3xl">
          <h3 className="text-center bg-slate-800 text-white text-lg p-1">
            {" "}
            Create Post{" "}
          </h3>
          <div className="p-8">
            <form>
              <div className="flex flex-col">
                <Label className="mb-4" htmlFor="caption">
                  Photo Caption
                </Label>
                <Textarea
                  className="mb-8"
                  id="caption"
                  placeholder="What's in your photo"
                />
              </div>
              <div className="flex flex-col">
                <Label className="mb-4" htmlFor="photo">
                  Photos
                </Label>
                <FileUploader />
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
