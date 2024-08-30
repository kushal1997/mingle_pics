import * as React from "react";
import { img1, img2, img3, img4 } from "@/assets/images";

interface IStoriesProps {}

const Stories: React.FunctionComponent<IStoriesProps> = () => {
  return (
    <>
      <div className="flex gap-5">
      <img src={img1} alt="" className="h-20 w-20 rounded-full border-4 border-slate-800 object-cover" />
      <img src={img2} alt="" className="h-20 w-20 rounded-full border-4 border-slate-800 object-cover" />
      <img src={img3} alt="" className="h-20 w-20 rounded-full border-4 border-slate-800 object-cover" />
      <img src={img4} alt="" className="h-20 w-20 rounded-full border-4 border-slate-800 object-cover" />
      </div>
    </>
  );
};

export default Stories;
