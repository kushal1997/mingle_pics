import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { userAuthContext, useUserAuth } from "@/context/userAuthContext";
import { UserSignIn } from "@/types";
import * as React from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

interface ISignUpProps {}

const SignUp: React.FunctionComponent<ISignUpProps> = () => {
  const { googleSignIn, signUp } = React.useContext(userAuthContext);
  const navigate = useNavigate();
  const [userData, setUserData] = React.useState<UserSignIn>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const formRef = React.useRef<HTMLFormElement>(null);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState: boolean) => !prevState);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleGoogleSignIn = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/");
    } catch (err) {
      console.log("ERROR: ", err);
    }
  };
  const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userData.email || !userData.password || !userData.confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (userData.password !== userData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      console.log("Form submitted:", userData);
      await signUp(userData.email, userData.password);
      navigate("/");
    } catch (err) {
      console.log("ERROR: ", err);
    }

    // Perform any API calls here

    // Reset the form after submission
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  return (
    <div className="bg-slate-800 w-screen h-screen">
      <div className="container mx-auto p-6 flex h-full">
        <div className="flex justify-center items-center w-full">
          <div className=" rounded-xl border bg-card text-card-foreground shadow-sm">
            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center mb-4">
                  MinglePics
                </CardTitle>
                <CardDescription>
                  Enter your email below to create your account
                </CardDescription>
              </CardHeader>
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="grid gap-2"
              >
                <CardContent className="grid gap-4">
                  <div className="grid  gap-6">
                    {/* <Button variant="outline">
                      <Icons.gitHub className="mr-2 h-4 w-4" />
                      Github
                    </Button> */}
                    <Button variant="outline" onClick={handleGoogleSignIn}>
                      <Icons.google className="mr-2 h-4 w-4" />
                      Google
                    </Button>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid gap-2 relative">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" onChange={handleInputChange} />
                  </div>
                  <div className="grid gap-2 relative">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type={isPasswordVisible ? "text" : "password"}
                      onChange={handleInputChange}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 top-6 flex items-center p-1"
                    >
                      {isPasswordVisible ? (
                        <FiEyeOff className="h-4 w-4" />
                      ) : (
                        <FiEye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                  <Button className="w-full" type="submit">
                    Sign Up
                  </Button>
                  <p className="mt-3 text-sm text-center">
                    Already have an account ? <Link to="/login">Login</Link>
                  </p>
                </CardFooter>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
