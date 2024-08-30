import { OutputFileEntry } from "@uploadcare/react-uploader";
import { User } from "firebase/auth";

export interface UserLogIn {
    email:string;
    password:string;
}
export interface UserSignIn {
    email:string;
    password:string;
    confirmPassword:string;
}
export interface FileEntry{
    files:OutputFileEntry[];
}
export interface PhotoMeta{
    cdnUrl:string;
    uuid:string;
}
export interface PostType{
    caption:string;
    photos:PhotoMeta[];
    likes:number;
    userlikes:[];
    userId:string | null;
    username?:string,
    photoURL?:string,
    date:Date;
}

export interface DocumentResponse{
    id?:string;
    caption?:string;
    photos?:PhotoMeta[];
    likes?:number;
    userlikes?:[];
    userId?:string | null;
    username?:string,
    photoURL?:string,
    date?:Date;
}

export interface ProfileInfo{
    user?:User;
    displayName?:string;
    photoURL?:string;
}

export interface UserProfile{
    userId?:string,
    displayName?:string;
    photoURL?:string;
    userBio?:string;
}

export interface ProfileResponse{
    id?:string;
    userId?:string,
    displayName?:string;
    photoURL?:string;
    userBio?:string;
}