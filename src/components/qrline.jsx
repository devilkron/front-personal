import React from "react";
import QRCode from "react-qr-code";
export default function qrline() {
  return (
    <div className="flex justify-center">
      QR CODE
      <QRCode
        value="<https://line.me/ti/p/ru7MKZjV4t
>"
      />
    </div>
  );
}
