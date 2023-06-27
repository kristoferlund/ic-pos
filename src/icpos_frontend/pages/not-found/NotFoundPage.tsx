import Header from "../../components/Header";
import Main from "../../components/Main";
import Page from "../../components/Page";
import { HeartCrack } from "lucide-react";

export default function ReceivePage() {
  return (
    <Page authentication={false}>
      <Header>
        <div />
        Not found
        <div />
      </Header>
      <Main>
        <div className="flex flex-col items-center justify-center min-h-screen space-y-5">
          <HeartCrack className="w-32 h-32" />
        </div>
      </Main>
    </Page>
  );
}
