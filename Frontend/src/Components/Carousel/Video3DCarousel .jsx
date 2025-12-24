import React, { useEffect, useRef } from "react";

const Video3DCarousel = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rotationRef = useRef(0);
  const targetRotationRef = useRef(0);
  const isDraggingRef = useRef(false);
  const lastMouseXRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const videos = [
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4"
    ].map((src, i) => {
      const video = document.createElement("video");
      video.src = src;
      video.crossOrigin = "anonymous";
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      video.autoplay = true;
      video.play().catch(() => {});
      return {
        element: video,
        angle: (i / 5) * Math.PI * 2,
        loaded: false
      };
    });

    videos.forEach((v) => {
      v.element.addEventListener("loadeddata", () => {
        v.loaded = true;
      });
    });

    const handleMouseMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = (e.clientY / window.innerHeight) * 2 - 1;

      if (isDraggingRef.current) {
        const deltaX = e.clientX - lastMouseXRef.current;
        targetRotationRef.current += deltaX * 0.01;
        lastMouseXRef.current = e.clientX;
      }
    };

    const handleMouseDown = (e) => {
      isDraggingRef.current = true;
      lastMouseXRef.current = e.clientX;
      canvas.style.cursor = "grabbing";
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
      canvas.style.cursor = "grab";
    };

    const handleWheel = (e) => {
      e.preventDefault();
      targetRotationRef.current += e.deltaY * 0.001;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mouseleave", handleMouseUp);
    canvas.addEventListener("wheel", handleWheel, { passive: false });

    const drawTransformedVideo = (
      video,
      x,
      y,
      width,
      height,
      rotationY,
      opacity,
      attractX,
      attractY
    ) => {
      ctx.save();
      ctx.globalAlpha = opacity;

      const perspective = 1200;
      const angleRad = rotationY;

      const halfW = width / 2;
      const halfH = height / 2;

      const cos = Math.cos(angleRad);
      const sin = Math.sin(angleRad);

      const x1 = x + attractX + -halfW * cos;
      const x2 = x + attractX + halfW * cos;
      const x3 = x + attractX + halfW * cos;
      const x4 = x + attractX + -halfW * cos;

      const z1 = -halfW * sin;
      const z2 = halfW * sin;
      const z3 = halfW * sin;
      const z4 = -halfW * sin;

      const scale1 = perspective / (perspective + z1);
      const scale2 = perspective / (perspective + z2);
      const scale3 = perspective / (perspective + z3);
      const scale4 = perspective / (perspective + z4);

      const px1 = x1 * scale1;
      const px2 = x2 * scale2;
      const px3 = x3 * scale3;
      const px4 = x4 * scale4;

      const py1 = (y + attractY - halfH) * scale1;
      const py2 = (y + attractY - halfH) * scale2;
      const py3 = (y + attractY + halfH) * scale3;
      const py4 = (y + attractY + halfH) * scale4;

      ctx.beginPath();
      ctx.moveTo(px1, py1);
      ctx.lineTo(px2, py2);
      ctx.lineTo(px3, py3);
      ctx.lineTo(px4, py4);
      ctx.closePath();
      ctx.clip();

      const dX1 = px2 - px1;
      const dY1 = py2 - py1;
      const dX2 = px4 - px1;
      const dY2 = py4 - py1;

      ctx.transform(dX1 / width, dY1 / width, dX2 / height, dY2 / height, px1, py1);

      if (video.readyState >= 2) {
        ctx.drawImage(video, 0, 0, width, height);
      } else {
        ctx.fillStyle = "#1a1a1a";
        ctx.fillRect(0, 0, width, height);
      }

      ctx.restore();

      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.strokeStyle = Math.abs(rotationY) < 0.3 ? "#fff" : "rgba(255,255,255,0.4)";
      ctx.lineWidth = Math.abs(rotationY) < 0.3 ? 3 : 1;
      ctx.beginPath();
      ctx.moveTo(px1, py1);
      ctx.lineTo(px2, py2);
      ctx.lineTo(px3, py3);
      ctx.lineTo(px4, py4);
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
    };

    const animate = () => {
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      rotationRef.current += (targetRotationRef.current - rotationRef.current) * 0.1;

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const baseRadius = Math.min(canvas.width, canvas.height) * 0.45;

      const videoData = videos
        .map((v) => {
          const angle = v.angle + rotationRef.current;
          const x3d = Math.sin(angle) * baseRadius;
          const z3d = Math.cos(angle) * baseRadius;

          let normalizedAngle = angle % (Math.PI * 2);
          if (normalizedAngle < 0) normalizedAngle += Math.PI * 2;
          if (normalizedAngle > Math.PI) normalizedAngle = Math.PI * 2 - normalizedAngle;

          const depth = normalizedAngle / Math.PI;
          const rotationY = -angle;

          return {
            ...v,
            angle,
            x3d,
            z3d,
            depth,
            rotationY
          };
        })
        .sort((a, b) => a.z3d - b.z3d);

      videoData.forEach(({ element, x3d, depth, rotationY }) => {
        const scale = 0.7 + (1 - depth) * 0.3;
        const x = centerX + x3d;
        const y = centerY;

        const attractionStrength = (1 - depth) * 0.5;
        const dx = mouseRef.current.x * 120 * attractionStrength;
        const dy = mouseRef.current.y * 80 * attractionStrength;

        const width = 500 * scale;
        const height = 280 * scale;
        const opacity = 0.4 + (1 - depth) * 0.6;

        drawTransformedVideo(element, x, y, width, height, rotationY, opacity, dx, dy);
      });

      ctx.fillStyle = "rgba(255,255,255,0.8)";
      ctx.font = "15px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(
        "Drag or scroll to rotate • Move mouse to attract videos",
        centerX,
        canvas.height - 30
      );

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mouseleave", handleMouseUp);
      canvas.removeEventListener("wheel", handleWheel);

      videos.forEach((v) => {
        v.element.pause();
        v.element.src = "";
      });
    };
  }, []);

  return (
    <div className="w-full h-screen bg-black overflow-hidden relative">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ cursor: "grab" }}
      />
    </div>
  );
};

export default Video3DCarousel;
