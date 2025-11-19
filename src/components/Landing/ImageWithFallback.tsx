"use client";
import Image from "next/image";
import { useState } from "react";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
}

// Placeholder service URLs based on image type
const getPlaceholder = (imageName: string, width: number, height: number) => {
  // Using placeholder.com service with appropriate colors for the product
  const colors = {
    "wrist-stacked": "10b981,34d399", // emerald greens
    "memory-metal": "10b981,84cc16", // green to lime
    "product-parameters": "f0fdf4,dcfce7", // light greens
    "packaging-green": "10b981,22c55e", // greens
    "packaging-peach": "fef3c7,fbbf24", // peach/beige
    "waterproof-test": "06b6d4,3b82f6", // blue for water
    "bubble-360": "10b981,84cc16", // greens
    "repellent-cores": "10b981,34d399", // emerald greens
    "comparison-chart": "f0fdf4,dcfce7", // light greens
    "pure-plant": "10b981,84cc16", // greens
  };

  const imageKey = imageName.replace(".jpg", "").replace("/images/landing/", "");
  const colorPair = colors[imageKey as keyof typeof colors] || "10b981,34d399";
  
  return `https://via.placeholder.com/${width}x${height}/${colorPair}/ffffff?text=${encodeURIComponent(imageName.split("/").pop() || "Image")}`;
};

export default function ImageWithFallback({
  src,
  alt,
  width = 800,
  height = 600,
  fill = false,
  className = "",
  priority = false,
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(getPlaceholder(src, width, height));
    }
  };

  if (fill) {
    return (
      <Image
        src={imgSrc}
        alt={alt}
        fill
        className={className}
        priority={priority}
        onError={handleError}
        unoptimized={hasError} // Disable optimization for placeholder
      />
    );
  }

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      onError={handleError}
      unoptimized={hasError} // Disable optimization for placeholder
    />
  );
}

