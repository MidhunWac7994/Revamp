import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../../components/ui/button";


const LoginOrGuest = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleLoginClick = () => {
    
    const redirect = searchParams.get("redirect") || "/dashboard";
    navigate(redirect);
  };

  return (
    <div data-widget="LoginOrGuest" className="flex px-6 justify-center">
      <div className="text-center w-full max-w-md">
        <h2 className="text-20 text-black font-semibold mb-5">
          {("Sign in to your account")}
        </h2>
        <Button
          onClick={handleLoginClick}
          className="w-full"
          variant="black"
          size="xl"
        >
          {("Login_Continue")}
        </Button>
        
        <p className="mt-4 text-sm text-muted-foreground">
          {("Don’t have an account?")}{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 cursor-pointer"
          >
            {("Sign up")}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginOrGuest;
