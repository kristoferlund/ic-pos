import { Button } from "../../../components/ui/button";
import { Link } from "@tanstack/router";

export default function ReceiveButton() {
  return (
    <Link to="/receive">
      <Button size={"lg"} className="w-56">
        Receive
      </Button>
    </Link>
  );
}
