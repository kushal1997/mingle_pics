import { avatar } from "@/assets/images";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { useUserAuth } from "@/context/userAuthContext";
import { getPostByUserId } from "@/repository/post.service";
import { getUserProfile } from "@/repository/user.service";
import { DocumentResponse, PostType, ProfileResponse } from "@/types";
import { Edit2Icon, HeartIcon } from "lucide-react";
import * as React from "react";
import { useNavigate } from "react-router-dom";

interface IProfileProps {}

const Profile: React.FunctionComponent<IProfileProps> = () => {
  const { user } = useUserAuth();
  const navigate = useNavigate();
  const initialUserInfo: ProfileResponse = {
    id: "",
    userId: user?.uid,
    userBio: "Please update your bio",
    photoURL: user?.photoURL ? user?.photoURL : "",
    displayName: user?.displayName ? user?.displayName : "",
  };
  const [userInfo, setUserInfo] =
    React.useState<ProfileResponse>(initialUserInfo);
  const [data, setData] = React.useState<DocumentResponse[]>([]);

  const getAllPost = async (id: string) => {
    try {
      const querySnapshot = await getPostByUserId(id);
      const tempArr: DocumentResponse[] = [];
      if (querySnapshot.size > 0) {
        querySnapshot.forEach((doc) => {
          const data = doc.data() as PostType;
          const responseObj: DocumentResponse = {
            id: doc.id,
            ...data,
          };
          console.log("the response object is", responseObj);
          tempArr.push(responseObj);
        });
        setData(tempArr);
      } else {
        console.log("No such document");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const renderPosts = () => {
    return data?.map((el) => {
      return (
        <div key={el.photos[0].uuid} className="relative">
          <div className="absolute group transition-all duration-300 bg-transparent hover:bg-slate-950 hover:bg-opacity-75 top-0 bottom-0 left-0 right-0 w-full h-full">
            <div className="flex flex-col justify-center items-center w-full h-full">
              <HeartIcon className="hidden group-hover:block fill-white" />
              <div className="hidden group-hover:block text-white">
                {el.likes} likes
              </div>
            </div>
          </div>
          <img
            src={`${el.photos[0].cdnUrl}-/progressive/yes/-/scale_crop/300x300/center/`}
          />
        </div>
      );
    });
  };
  const editProfile = () => {
    navigate("/edit-profile", { state: userInfo });
  };

  const getUserProfileInfo = async (userId: string) => {
    const data: ProfileResponse = await getUserProfile(userId);
    if (data.displayName) {
      setUserInfo(data);
    }
  };

  React.useEffect(() => {
    if (user != null) {
      console.log("user profile data is ", user);

      getAllPost(user.uid);
      getUserProfileInfo(user.uid);
    }
  }, [user]);
  return (
    <Layout>
      <div className="flex justify-center">
        <div className="border max-w-3xl w-full">
          <h3 className="bg-slate-800 text-white text-center text-lg p-1">
            Profile
          </h3>
          <div className="p-8 pb-4 border-b">
            <div className="flex flex-row items-center pb-2 mb-2">
              <div className="mr-2">
                <img
                  src={userInfo.photoURL ? userInfo.photoURL : avatar}
                  alt="avatar"
                  className="w-28 h-28 rounded-full border-2 border-slate-800 object-cover"
                />
              </div>
              <div className="text-xl ml-3">
                {userInfo.displayName ? userInfo.displayName : "Guest User"}
                <div className="text-xl ">{user?.email ? user.email : ""} </div>
              </div>
            </div>

            <div className="mb-4">{userInfo.userBio}</div>
            <div>
              <Button onClick={editProfile}>
                <Edit2Icon className="mx-2 h-4 w-4" /> Edit Profile
              </Button>
            </div>
          </div>
          <div className="p-8">
            <h2 className="mb-5">My Posts</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {data ? renderPosts() : <div>...loading</div>}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
