import React, { useEffect } from "react";

const CertificateCanvas = ({ name, college, score, canvasRef }) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set canvas dimensions
    canvas.width = 900;
    canvas.height = 600;

    // Gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "#ffffff");
    gradient.addColorStop(1, "#e0f7fa");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Outer border
    ctx.strokeStyle = "#00796b";
    ctx.lineWidth = 15;
    ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

    // Decorative border (dotted)
    ctx.strokeStyle = "#004d40";
    ctx.setLineDash([15, 10]);
    ctx.lineWidth = 5;
    ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100);
    ctx.setLineDash([]); // Reset dash style

    // Title text
    ctx.font = "bold 40px Georgia";
    ctx.fillStyle = "#004d40";
    ctx.textAlign = "center";
    ctx.fillText("Certificate of Achievement", canvas.width / 2, 120);

    // Subtitle
    ctx.font = "italic 20px Georgia";
    ctx.fillStyle = "#00695c";
    ctx.fillText("Presented to", canvas.width / 2, 160);

    // User's name
    ctx.font = "bold 36px Arial";
    ctx.fillStyle = "#1a237e";
    ctx.fillText(name, canvas.width / 2, 220);

    // College information
    ctx.font = "24px Arial";
    ctx.fillStyle = "#01579b";
    ctx.fillText(`from ${college}`, canvas.width / 2, 260);

    // Achievement message
    ctx.font = "20px Arial";
    ctx.fillStyle = "#004d40";
    ctx.fillText(`for achieving a score of ${score} in Bis Quiz Competition`, canvas.width / 2, 310);

    // Date
    ctx.font = "18px Arial";
    ctx.fillStyle = "#004d40";
    ctx.fillText(`Date: ${new Date().toLocaleDateString()}`, canvas.width / 2, 360);

    // Add icon (Trophy)
    const trophy = new Image();
    trophy.src = "/trophy.png"; // Replace with a local image path if necessary
    trophy.onload = () => {
      ctx.drawImage(trophy, canvas.width / 2 - 48, 380, 96, 96);
    };

    // Decorative line
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#1a237e";
    ctx.beginPath();
    ctx.moveTo(100, 500);
    ctx.lineTo(canvas.width - 100, 500);
    ctx.stroke();
  }, [name, college, score, canvasRef]);

  return <canvas ref={canvasRef} id="certificate-canvas" />;
};

export default CertificateCanvas;
