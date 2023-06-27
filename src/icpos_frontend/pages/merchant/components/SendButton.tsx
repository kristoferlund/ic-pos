import { Button } from "../../../components/ui/button";
import { Link } from "@tanstack/router";

export default function ReceiveButton() {
  return (
    <Link to="/send">
      <Button size={"lg"} className="w-48">
        Send
      </Button>
    </Link>
  );
}
