import { Button } from "../../components/ui/button";
import ConfigForm from "./components/ConfigForm";
import Header from "../../components/Header";
import { LogOut } from "lucide-react";
import Main from "../../components/Main";
import Page from "../../components/Page";

export default function InitialConfigPage() {
  return (
    <Page>
      <Header>
        <Button variant="ghost" size="icon">
          <LogOut
            className="w-4 h-4"
            onClick={() => {
              window.location.href = "/";
            }}
          />
        </Button>
        <span>Configure Store</span>
        <div className="w-4 h-4" />
      </Header>
      <Main>
        <div className="flex flex-col items-center justify-between p-5 pb-10 space-y-5 grow">
          <div>
            Before you begin accepting payments, give your store a name!
          </div>
          <div className="grow" />
          <ConfigForm />
        </div>
      </Main>
    </Page>
  );
}
