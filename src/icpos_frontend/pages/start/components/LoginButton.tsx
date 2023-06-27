import { Button } from "../../../components/ui/button";
import { useAuth } from "../../../auth/hooks/useAuth";

export default function LoginButton() {
  const { login } = useAuth();

  return (
    <Button onClick={login} size={"lg"} className="w-48">
      Login
    </Button>
  );
}
