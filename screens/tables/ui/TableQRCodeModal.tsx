'use client';
import { useRef } from "react";
import QRCode from "react-qr-code";
import { Printer } from "lucide-react";
import Backdrop from "@/shared/ui/Backdrop";
import { useTableStore } from "@/models/table/store";

export default function TableQRCodeModal() {
  const { activeModal, closeModal, selectedTable } = useTableStore();
  const qrRef = useRef<SVGSVGElement | null>(null);

  if (!selectedTable) return null;

  const baseUrl: string = process.env.NEXT_PUBLIC_ENVIRONMENT == "PRODUCTION" ? "https://main-cravings.vercel.app" : "http://localhost:3000";
  const qrValue: string = `${baseUrl}/book/${selectedTable.id}`;

  const handlePrint = (): void => {
    if (!qrRef.current) return;
    const svgData: string = new XMLSerializer().serializeToString(qrRef.current);

    const printWindow: Window | null = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Print QR Code</title>
          <style>
            body {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
              font-family: 'Segoe UI', sans-serif;
              background: #f8fafc;
            }
            .qr-card {
              padding: 2rem;
              border-radius: 1.25rem;
              background: linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%);
              box-shadow: 0 15px 30px rgba(0,0,0,0.12);
              text-align: center;
              max-width: 300px;
              width: 100%;
            }
            h2 {
              font-size: 1.25rem;
              font-weight: 700;
              margin-bottom: 0.5rem;
              color: #111827;
            }
            p {
              font-size: 0.875rem;
              color: #4b5563;
              margin: 0.25rem 0 1rem;
            }
            a {
              margin-top: 0.75rem;
              display: inline-block;
              font-size: 0.8rem;
              color: #2563eb;
              text-decoration: underline;
            }
            svg {
              width: 220px;
              height: 220px;
              margin-top: 1rem;
            }
          </style>
        </head>
        <body>
          <div class="qr-card">
            <h2>Table #${selectedTable.tableNumber}</h2>
            <p>${selectedTable.tableName}</p>
            ${svgData}
            <a href="${qrValue}" target="_blank" rel="noopener noreferrer">Open Menu</a>
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  return (
    <Backdrop modalOpened={activeModal === "qrcode"} closeModal={closeModal}>
      <div className="flex flex-col items-center justify-center px-4 sm:px-10 py-4 sm:py-6 bg-linear-to-b from-gray-50 to-white rounded-3xl shadow-2xl space-y-2 min-w-70 ">
        {/* Header */}
        <h2 className="text-lg font-extrabold text-gray-800">Table QR Code</h2>

        {/* Table Info */}
        <div className="text-center">
          <p className="text-sm  font-semibold text-gray-700">Table #{selectedTable.tableNumber}</p>
          <p className="text-xs  text-gray-500">{selectedTable.tableName}</p>
        </div>

        {/* QR Code */}
        <div className="flex flex-col items-center bg-white p-3 sm:p-4 rounded-2xl border-gray-200">
          <QRCode ref={qrRef as any} value={qrValue} size={100} />
          <a
            href={qrValue}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 text-xs text-blue-600 hover:underline"
          >
            Open Menu
          </a>
        </div>

        {/* Print Button */}
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 sm:gap-3 px-4 py-2 font-semibold bg-linear-to-r from-green-500 to-green-600 text-white rounded-lg shadow-lg hover:from-green-600 hover:to-green-700 transition  text-sm"
        >
          <Printer size={15} />
          Print QR
        </button>
      </div>
    </Backdrop>
  );
}
