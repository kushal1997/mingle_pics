import * as React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { img1, img2, img3 } from "@/assets/images";

interface IStoriesProps {}

const Stories: React.FunctionComponent<IStoriesProps> = () => {
  return (
    <>
      <div className="flex justify-between">
        <Avatar className="h-20 w-20 border-4 border-slate-800 object-cover">
          <AvatarImage src={img1} alt="@shadcn" />
        </Avatar>

        <Avatar className="h-20 w-20 border-4 border-slate-800 object-cover">
          <AvatarImage src={img2} alt="@shadcn" />
        </Avatar>


        <Avatar className="h-20 w-20 border-4 border-slate-800 object-cover">
          <AvatarImage src={img3} alt="@shadcn" />
        </Avatar>
      </div>
    </>
  );
};

export default Stories;
