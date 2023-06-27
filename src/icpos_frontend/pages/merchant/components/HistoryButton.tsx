import { Button } from "../../../components/ui/button";
import { Link } from "@tanstack/router";

export default function ReceiveButton() {
  return (
    <Link to="/history">
      <Button size={"lg"} className="w-48">
        History
      </Button>
    </Link>
  );
}
