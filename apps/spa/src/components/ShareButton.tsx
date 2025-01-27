import React, { useState } from "react";

interface ShareButtonProps {
  url: string;
}

const ShareButton = ({ url }: ShareButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy URL:", error);
      alert("Failed to copy the URL. Please try again.");
    }
  };

  return (
    <button onClick={handleCopy} className="share-button">
      {copied ? "✅ Game URL Copied" : "📋 Copy Game URL"}
    </button>
  );
};

export default ShareButton;
