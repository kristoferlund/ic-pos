import { Button } from "./ui/button";
import { Inbox } from "lucide-react";
import { Link } from "@tanstack/router";

export default function ReceiveButton() {
  return (
    <Link to="/history">
      <Button size={"lg"} className="w-56">
        <Inbox className="w-4 h-4 mr-2" />
        History
      </Button>
    </Link>
  );
}
