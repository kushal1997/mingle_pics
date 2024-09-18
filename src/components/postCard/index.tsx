import { type DocumentResponse } from "@/types";
import * as React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { HeartIcon, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUserAuth } from "@/context/userAuthContext";
import { updateLikesOnPost } from "@/repository/post.service";

interface IPostCardProps {
  data: DocumentResponse;
}
type LikesInfoType = {
  likes: number;
  isLike: boolean;
};

const PostCard: React.FunctionComponent<IPostCardProps> = ({ data }) => {
  const { user } = useUserAuth();
  const [likesInfo, setLikesInfo] = React.useState<LikesInfoType>({
    likes: data.likes!,
    isLike: data.userlikes?.includes(user?.uid!) ? true : false,
  });

  const updateLike = async (isVal: boolean) => {
    setLikesInfo({
      likes: isVal ? likesInfo.likes + 1 : likesInfo.likes - 1,
      isLike: !likesInfo.isLike,
    });
    if (user && user.uid) {
      if (isVal) {
        data.userlikes?.push(user.uid);
      } else {
        data.userlikes?.splice(data.userlikes.indexOf(user.uid));
      }
    }
    await updateLikesOnPost(
      data.id!,
      data.userlikes!,
      isVal ? likesInfo.likes + 1 : likesInfo.likes - 1
    );
  };
  return (
    <>
      <Card className="mb-6">
        <CardHeader className="flex flex-col p-3 ">
          <CardTitle className="text-sm text-center flex justify-start items-center gap-3">
            <span className="mt-2">
              <img
                src={data.photoURL}
                alt=""
                className="w-10 h-10 rounded-full border-2 border-slate-800 object-cover"
              />
            </span>
            <span>{data.username}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <img src={data.photos ? data.photos[0].cdnUrl : ""} alt="" />
        </CardContent>
        <CardFooter className="flex flex-col p-3">
          <div className="flex justify-between w-full mb-3">
            <HeartIcon
              className={cn(
                "mr-3",
                "cursor-pointer",
                likesInfo.isLike ? "fill-red-500" : "fill-none"
              )}
              onClick={() => updateLike(!likesInfo.isLike)}
            />
            <MessageCircle className="mr-3" />
          </div>
          <div className="w-full text-sm">{likesInfo.likes} Likes</div>
          <div className="w-full text-sm">
            <span className=" font-semibold">{data.username} : </span>{" "}
            {data.caption}
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default PostCard;
