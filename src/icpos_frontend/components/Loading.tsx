import { Loader2 } from "lucide-react";
import Main from "./Main";

export default function Loading() {
  return (
    <Main>
      <div className="flex flex-col items-center justify-center min-h-screen space-y-5">
        <Loader2 className="w-32 h-32 animate-spin" />
      </div>
    </Main>
  );
}
