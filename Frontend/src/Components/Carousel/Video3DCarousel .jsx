import React, { useEffect, useRef } from "react";

const Video3DCarousel = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rotationRef = useRef(0);
  const targetRotationRef = useRef(0);
  const isDraggingRef = useRef(false);
  const lastMouseXRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    let animationId;

    // Resize canvas to container
    const resize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    window.addEventListener("resize", resize);

    // Videos
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
      return { element: video, angle: (i / 5) * Math.PI * 2, loaded: false };
    });

    videos.forEach((v) => {
      v.element.addEventListener("loadeddata", () => {
        v.loaded = true;
      });
    });

    // Drag rotation
    const handleMouseDown = (e) => {
      isDraggingRef.current = true;
      lastMouseXRef.current = e.clientX;
      canvas.style.cursor = "grabbing";
    };
    const handleMouseUp = () => {
      isDraggingRef.current = false;
      canvas.style.cursor = "grab";
    };
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;

      if (isDraggingRef.current) {
        const deltaX = e.clientX - lastMouseXRef.current;
        targetRotationRef.current += deltaX * 0.01;
        lastMouseXRef.current = e.clientX;
      }
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mousemove", handleMouseMove);

    // Draw video function
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

      if (video.readyState >= 2) ctx.drawImage(video, 0, 0, width, height);
      else {
        ctx.fillStyle = "#1a1a1a";
        ctx.fillRect(0, 0, width, height);
      }

      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      rotationRef.current += (targetRotationRef.current - rotationRef.current) * 0.1;

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const baseRadius = Math.min(canvas.width, canvas.height) * 0.35;

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

          return { ...v, angle, x3d, z3d, depth, rotationY };
        })
        .sort((a, b) => a.z3d - b.z3d);

      const scaleFactor = Math.min(canvas.width, canvas.height) / 800;

      videoData.forEach(({ element, x3d, depth, rotationY }) => {
        const scale = 0.7 + (1 - depth) * 0.3;
        const x = centerX + x3d;
        const y = centerY;

        const attractionStrength = (1 - depth) * 0.5;
        const dx = mouseRef.current.x * 120 * attractionStrength * scaleFactor;
        const dy = mouseRef.current.y * 80 * attractionStrength * scaleFactor;

        const width = 500 * scale * scaleFactor;
        const height = 280 * scale * scaleFactor;
        const opacity = 0.4 + (1 - depth) * 0.6;

        drawTransformedVideo(element, x, y, width, height, rotationY, opacity, dx, dy);
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mousemove", handleMouseMove);

      videos.forEach((v) => {
        v.element.pause();
        v.element.src = "";
      });
    };
  }, []);

  return (
    <div ref={containerRef} className="carousel-wrapper" style={{ position: "relative" }}>
      <canvas
        ref={canvasRef}
        className="carousel-canvas"
        style={{ cursor: "grab", pointerEvents: "auto", display: "block", width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default Video3DCarousel;
