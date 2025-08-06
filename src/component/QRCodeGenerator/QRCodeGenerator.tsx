import { useState } from "react";
import QRCode from "react-qr-code";

const QRCodeGenerator = () => {
  const [text, setText] = useState<string>("https://google.com");
  const [input, setInput] = useState<string>("");

  const handleGenerate = () => {
    setText(input);
    setInput("");
  };

  return (
    <div className="max-w-md mx-auto flex flex-col">
      <h1 className="text-xl font-bold mb-4">QR Code Generator</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter text or URL"
        className="border px-4 py-2 w-full mb-4 rounded"
      />
      <button
        onClick={handleGenerate}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Generate
      </button>
      <div className="flex justify-center items-center">
        <div className="bg-white p-4">
          <QRCode value={text} size={200} />
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
