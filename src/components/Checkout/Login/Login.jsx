import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../components/ui/dialog"; // Adjust based on your UI library
import AuthLoginOrSignUp from "../../../Pages/Auth/AuthBlocks/AuthLoginOrSignUp/AuthLoginOrSignUp";

const LoginOrGuest = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSignUpClick = () => {
    const redirect = searchParams.get("redirect") || "/register";
    navigate(redirect);
  };

  return (
    <div data-widget="LoginOrGuest" className="flex px-6 justify-center">
      <div className="text-center w-full max-w-md">
        <h2 className="text-20 text-black font-semibold mb-5">
          Sign in to your account
        </h2>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button
              className="w-full"
              variant="black"
              size="xl"
              onClick={() => setIsModalOpen(true)}
            >
              Login / Continue
            </Button>
          </DialogTrigger>
          <DialogContent>
            <AuthLoginOrSignUp />
          </DialogContent>
        </Dialog>
        <p className="mt-4 text-sm text-muted-foreground">
          Don’t have an account?{" "}
          <span
            onClick={handleSignUpClick}
            className="text-blue-600 cursor-pointer"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginOrGuest;
