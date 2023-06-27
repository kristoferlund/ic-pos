import { Button } from "../../components/ui/button";
import ConfigForm from "../../components/ConfigForm";
import Header from "../../components/Header";
import { Link } from "@tanstack/router";
import Page from "../../components/Page";
import { X } from "lucide-react";

export default function ConfigPage() {
  return (
    <>
      <Header>
        <Link to="/merchant">
          <Button variant="ghost" size="icon">
            <X className="w-4 h-4" />
          </Button>
        </Link>
        <span>Configure Store</span>
        <div className="w-4 h-4" />
      </Header>
      <Page>
        <ConfigForm />
      </Page>
    </>
  );
}
