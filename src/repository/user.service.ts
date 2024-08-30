import { db } from "@/firebaseConfig";
import {  ProfileResponse, UserProfile } from "@/types";
import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";

const COLLECTION_NAME = "users";

export const createUserProfile = (user: UserProfile) => {
  try {
    return addDoc(collection(db, COLLECTION_NAME), user);
  } catch (error) {
    console.error(error);
  }
};

export const getUserProfile = async (userId: string) => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where("userId", "==", userId)
    );
    const querySnapshot = await getDocs(q);
    let tempdata: ProfileResponse = {};
    if (querySnapshot.size > 0) {
      querySnapshot.forEach((doc) => {
        const data = doc.data() as UserProfile;
        tempdata = {
          id: doc.id,
          ...data,
        };
      });
      return tempdata;
    } else {
      console.error("No such document");
      return tempdata;
    }
  } catch (error) {
    console.error(error);
  }
};

export const updateuserProfile=async(id:string,user:UserProfile)=>{
    const docRef=doc(db,COLLECTION_NAME,id);
    return updateDoc(docRef,{...user})
}
