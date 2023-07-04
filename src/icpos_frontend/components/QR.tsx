import { QRCodeSVG } from "qrcode.react";
import ReactDOM from "react-dom";

ReactDOM.render(
  <QRCodeSVG value="https://reactjs.org/" />,
  document.getElementById("mountNode")
);
