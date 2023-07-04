import Header from "../../components/Header";
import Main from "../../components/Main";
import Page from "../../components/Page";
import { HeartCrack } from "lucide-react";

export default function NotFoundPage() {
  return (
    <Page>
      <Header>
        <div />
        Not found
        <div />
      </Header>
      <Main>
        <div className="flex flex-col items-center justify-center p-5 pb-10 space-y-5 grow">
          <HeartCrack className="w-32 h-32" />
        </div>
      </Main>
    </Page>
  );
}
