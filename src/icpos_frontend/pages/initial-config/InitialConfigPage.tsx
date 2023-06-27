import { Button } from "../../components/ui/button";
import ConfigForm from "../../components/ConfigForm";
import Header from "../../components/Header";
import { LogOut } from "lucide-react";
import Page from "../../components/Page";
import Main from "../../components/Main";

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
        <p>Some smart text about this is the first time etc.</p>
        <ConfigForm />
      </Main>
    </Page>
  );
}
