import { avatar } from "@/assets/images";
import FileUploader from "@/components/fileUploader";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useUserAuth } from "@/context/userAuthContext";
import { updateUserInfoOnPosts } from "@/repository/post.service";
import {
  createUserProfile,
  updateuserProfile,
} from "@/repository/user.service";
import {type FileEntry,type ProfileInfo,type UserProfile } from "@/types";
import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface IEditProfileProps {}

const EditProfile: React.FunctionComponent<IEditProfileProps> = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id, userId, userBio, displayName, photoURL } = location.state;
  const { user, updateProfileInfo } = useUserAuth();
  const [fileEntry, setFileEntry] = React.useState<FileEntry>({
    files: [],
  });

  const [data, setData] = React.useState<UserProfile>({
    userId,
    userBio,
    displayName,
    photoURL,
  });

  const updateProfile = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (id) {
        const response = await updateuserProfile(id, data);
        console.log("User profile updated", response);
      } else {
        const response = await createUserProfile(data);
        console.log("user profile created", response);
      }
    } catch (error) {
      console.error(error);
    }
    const profileInfo: ProfileInfo = {
      user: user!,
      displayName: data.displayName,
      photoURL: data.photoURL,
    };
    updateProfileInfo(profileInfo);
    updateUserInfoOnPosts(profileInfo)
    navigate("/profile");
  };

  React.useEffect(() => {
    if (fileEntry.files.length > 0) {
      setData({ ...data, photoURL: fileEntry.files[0].cdnUrl || "" });
    }
  }, [fileEntry]);
  return (
    <>
      <Layout>
        <div className="flex justify-center w-full">
          <div className="border w-full max-w-3xl">
            <h3 className="text-center bg-slate-800 text-white text-lg p-1">
              {" "}
              Edit Profile{" "}
            </h3>
            <div className="p-8">
              <form onSubmit={updateProfile}>
                <div className="flex flex-col">
                  <Label className="mb-4" htmlFor="photo">
                    Profile picture
                  </Label>
                  <div className="mb-4">
                    {fileEntry.files.length > 0 ? (
                      <img
                        src={fileEntry.files[0].cdnUrl || ""}
                        alt=""
                        className="w-28 h-28 rounded-full border-2 border-slate-800 object-cover"
                      />
                    ) : (
                      <img
                        src={data.photoURL ? data.photoURL : avatar}
                        alt=""
                        className="w-28 h-28 rounded-full border-2 border-slate-800 object-cover"
                      />
                    )}
                  </div>
                  <FileUploader
                    files={fileEntry}
                    onChange={setFileEntry}
                    preview={false}
                  />
                </div>
                <div className="flex flex-col">
                  <Label className="mb-4" htmlFor="displayName">
                    Display Name
                  </Label>
                  <Input
                    className="mb-8"
                    id="displayName"
                    placeholder="Enter your display name "
                    value={data.displayName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setData({ ...data, displayName: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col">
                  <Label className="mb-4" htmlFor="userBio">
                    Profile Bio
                  </Label>
                  <Textarea
                    className="mb-4"
                    id="userBio"
                    placeholder="Enter something about you"
                    value={data.userBio}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      setData({ ...data, userBio: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Button className="mt-8 w-32 mr-8" type="submit">
                    Update
                  </Button>
                  <Button
                    variant={"destructive"}
                    className="mt-8 w-32 mr-8"
                    type="button"
                    onClick={() => navigate("/profile")}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default EditProfile;
