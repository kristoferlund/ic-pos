import { Button } from "../../components/ui/button";
import ConfigForm from "../../components/ConfigForm";
import Header from "../../components/Header";
import { LogOut } from "lucide-react";
import Page from "../../components/Page";

export default function InitialConfigPage() {
  return (
    <>
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
      <Page>
        <p>Some smart text about this is the first time etc.</p>
        <ConfigForm />
      </Page>
    </>
  );
}
