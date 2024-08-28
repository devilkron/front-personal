import React from "react";
import QRCode from "react-qr-code";
export default function qrline() {
  return (
    <div className="h-screen">
      <div className="flex justify-center text-2xl">Scan แอดไลน์</div>
      <div className="flex justify-center mt-5">
        <QRCode
          value="<https://line.me/ti/p/ru7MKZjV4t
>"
        />
      </div>
    </div>
  );
}
