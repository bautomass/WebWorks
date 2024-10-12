"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUpload,
  FiDownload,
  FiSliders,
  FiImage,
  FiCrop,
  FiRotateCw,
  FiZoomIn,
  FiZoomOut,
  FiSun,
  FiMoon,
  FiDroplet,
  FiEye,
  FiEyeOff,
  FiFileText,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";
import Header from "../../components/Header";
import imageCompression from "browser-image-compression";

const ImageTool: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [outputFormat, setOutputFormat] = useState<string>("webp");
  const [compressionLevel, setCompressionLevel] = useState<number>(5);
  const [resizeWidth, setResizeWidth] = useState<number>(0);
  const [resizeHeight, setResizeHeight] = useState<number>(0);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState<boolean>(true);
  const [applyWatermark, setApplyWatermark] = useState<boolean>(false);
  const [watermarkText, setWatermarkText] = useState<string>("");
  const [watermarkOpacity, setWatermarkOpacity] = useState<number>(50);
  const [watermarkPosition, setWatermarkPosition] = useState<string>("center");
  const [brightness, setBrightness] = useState<number>(100);
  const [contrast, setContrast] = useState<number>(100);
  const [saturation, setSaturation] = useState<number>(100);
  const [hueRotate, setHueRotate] = useState<number>(0);
  const [blurAmount, setBlurAmount] = useState<number>(0);
  const [sharpenAmount, setSharpenAmount] = useState<number>(0);
  const [grayscale, setGrayscale] = useState<boolean>(false);
  const [sepia, setSepia] = useState<boolean>(false);
  const [invert, setInvert] = useState<boolean>(false);
  const [rotate, setRotate] = useState<number>(0);
  const [flipHorizontal, setFlipHorizontal] = useState<boolean>(false);
  const [flipVertical, setFlipVertical] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const supportedFormats = [
    "webp",
    "jpeg",
    "png",
    "gif",
    "bmp",
    "tiff",
    "avif",
  ];

  useEffect(() => {
    if (selectedFile) {
      drawImageOnCanvas();
    }
  }, [
    selectedFile,
    brightness,
    contrast,
    saturation,
    hueRotate,
    blurAmount,
    sharpenAmount,
    grayscale,
    sepia,
    invert,
    rotate,
    flipHorizontal,
    flipVertical,
  ]);

  const drawImageOnCanvas = () => {
    if (!selectedFile || !canvasRef.current) return;

    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext("2d")!;

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) hue-rotate(${hueRotate}deg) blur(${blurAmount}px)`;
      if (grayscale) ctx.filter += " grayscale(100%)";
      if (sepia) ctx.filter += " sepia(100%)";
      if (invert) ctx.filter += " invert(100%)";

      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotate * Math.PI) / 180);
      ctx.scale(flipHorizontal ? -1 : 1, flipVertical ? -1 : 1);
      ctx.drawImage(img, -img.width / 2, -img.height / 2);
      ctx.restore();

      if (sharpenAmount > 0) {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const sharpenedData = applySharpen(imageData, sharpenAmount);
        ctx.putImageData(sharpenedData, 0, 0);
      }
    };
    img.src = URL.createObjectURL(selectedFile);
  };

  const applySharpen = (imageData: ImageData, amount: number) => {
    const w = imageData.width;
    const h = imageData.height;
    const data = imageData.data;
    const buffer = new Uint8ClampedArray(data);
    const kernel = [0, -1, 0, -1, 5, -1, 0, -1, 0];
    const factor = 1 / 16;
    const bias = 0;

    for (let y = 1; y < h - 1; y++) {
      for (let x = 1; x < w - 1; x++) {
        const px = (y * w + x) * 4;
        let r = 0,
          g = 0,
          b = 0;

        for (let cy = 0; cy < 3; cy++) {
          for (let cx = 0; cx < 3; cx++) {
            const cpx = ((y + cy - 1) * w + (x + cx - 1)) * 4;
            r += data[cpx + 0] * kernel[cy * 3 + cx];
            g += data[cpx + 1] * kernel[cy * 3 + cx];
            b += data[cpx + 2] * kernel[cy * 3 + cx];
          }
        }

        buffer[px + 0] = Math.min(255, Math.max(0, r * factor + bias));
        buffer[px + 1] = Math.min(255, Math.max(0, g * factor + bias));
        buffer[px + 2] = Math.min(255, Math.max(0, b * factor + bias));
      }
    }

    return new ImageData(buffer, w, h);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      setError(null);
    }
  };

  const compressImage = useCallback(async () => {
    if (!selectedFile || !canvasRef.current) {
      setError("Lūdzu, izvēlieties attēlu.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const canvas = canvasRef.current;
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: Math.max(resizeWidth, resizeHeight) || 1920,
        useWebWorker: true,
        fileType: `image/${outputFormat}`,
        initialQuality: (10 - compressionLevel) / 10,
      };

      canvas.toBlob(async (blob) => {
        if (blob) {
          let compressedFile = await imageCompression(
            new File([blob], selectedFile.name, { type: blob.type }),
            options
          );

          if (applyWatermark && watermarkText) {
            compressedFile = await applyWatermarkToImage(compressedFile);
          }

          const reader = new FileReader();
          reader.readAsDataURL(compressedFile);
          reader.onloadend = () => {
            setCompressedImage(reader.result as string);
            setLoading(false);
          };
        }
      }, `image/${outputFormat}`);
    } catch (error) {
      console.error("Kļūda attēla apstrādē:", error);
      setError("Radās kļūda attēla apstrādē. Lūdzu, mēģiniet vēlreiz.");
      setLoading(false);
    }
  }, [
    selectedFile,
    outputFormat,
    compressionLevel,
    resizeWidth,
    resizeHeight,
    applyWatermark,
    watermarkText,
    watermarkOpacity,
    watermarkPosition,
  ]);

  const applyWatermarkToImage = async (file: File): Promise<File> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0);

        ctx.font = "24px Arial";
        ctx.fillStyle = `rgba(255, 255, 255, ${watermarkOpacity / 100})`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        let x, y;
        switch (watermarkPosition) {
          case "top-left":
            x = canvas.width * 0.1;
            y = canvas.height * 0.1;
            break;
          case "top-right":
            x = canvas.width * 0.9;
            y = canvas.height * 0.1;
            break;
          case "bottom-left":
            x = canvas.width * 0.1;
            y = canvas.height * 0.9;
            break;
          case "bottom-right":
            x = canvas.width * 0.9;
            y = canvas.height * 0.9;
            break;
          default:
            x = canvas.width / 2;
            y = canvas.height / 2;
        }

        ctx.fillText(watermarkText, x, y);

        canvas.toBlob((blob) => {
          if (blob) {
            resolve(
              new File([blob], file.name, { type: `image/${outputFormat}` })
            );
          }
        }, `image/${outputFormat}`);
      };
      img.src = URL.createObjectURL(file);
    });
  };

  const handleDownload = () => {
    if (compressedImage) {
      const link = document.createElement("a");
      link.href = compressedImage;
      link.download = `apstrādāts_attēls.${outputFormat}`;
      link.click();
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
      setError(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-extrabold text-gray-900 text-center mb-8"
        >
          Attēlu Apstrādes un Kompresijas Rīks
        </motion.h1>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
          <div className="px-4 py-5 sm:p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="border-dashed border-4 border-gray-300 rounded-xl p-12 mb-6 text-center cursor-pointer hover:border-blue-500 transition duration-300 ease-in-out"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <FiUpload className="mx-auto text-4xl mb-4 text-gray-400" />
              <p className="text-xl mb-2">
                Velciet un nometiet attēlu šeit vai klikšķiniet, lai izvēlētos
                failu
              </p>
              <p className="text-sm text-gray-500">
                {selectedFile
                  ? selectedFile.name
                  : "Atbalstītie formāti: WEBP, JPEG, PNG, GIF, BMP, TIFF, AVIF"}
              </p>
            </motion.div>

            {error && (
              <div
                className="mb-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
                role="alert"
              >
                <p>{error}</p>
              </div>
            )}

            {selectedFile && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">
                  Attēla priekšskatījums
                </h2>
                <canvas
                  ref={canvasRef}
                  className="max-w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Pamata iestatījumi</h3>
                <div>
                  <label
                    htmlFor="output-format"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Izvades formāts
                  </label>
                  <select
                    id="output-format"
                    value={outputFormat}
                    onChange={(e) => setOutputFormat(e.target.value)}
                    className="w-full px-3 py-2 text-gray-700 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    {supportedFormats.map((format) => (
                      <option key={format} value={format}>
                        {format.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="compression-level"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Kompresijas līmenis: {compressionLevel}
                  </label>
                  <input
                    id="compression-level"
                    type="range"
                    min="1"
                    max="9"
                    value={compressionLevel}
                    onChange={(e) =>
                      setCompressionLevel(parseInt(e.target.value))
                    }
                    className="w-full"
                  />
                </div>
                <div>
                  <label
                    htmlFor="resize-width"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Platums (px)
                  </label>
                  <input
                    id="resize-width"
                    type="number"
                    value={resizeWidth}
                    onChange={(e) => setResizeWidth(parseInt(e.target.value))}
                    className="w-full px-3 py-2 text-gray-700 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Oriģinālais platums"
                  />
                </div>
                <div>
                  <label
                    htmlFor="resize-height"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Augstums (px)
                  </label>
                  <input
                    id="resize-height"
                    type="number"
                    value={resizeHeight}
                    onChange={(e) => setResizeHeight(parseInt(e.target.value))}
                    className="w-full px-3 py-2 text-gray-700 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Oriģinālais augstums"
                  />
                </div>
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={maintainAspectRatio}
                      onChange={(e) => setMaintainAspectRatio(e.target.checked)}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span className="ml-2 text-gray-700">
                      Saglabāt proporcijas
                    </span>
                  </label>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Attēla pielāgošana</h3>
                <div>
                  <label
                    htmlFor="brightness"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Spilgtums: {brightness}%
                  </label>
                  <input
                    id="brightness"
                    type="range"
                    min="0"
                    max="200"
                    value={brightness}
                    onChange={(e) => setBrightness(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contrast"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Kontrasts: {contrast}%
                  </label>
                  <input
                    id="contrast"
                    type="range"
                    min="0"
                    max="200"
                    value={contrast}
                    onChange={(e) => setContrast(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label
                    htmlFor="saturation"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Piesātinājums: {saturation}%
                  </label>
                  <input
                    id="saturation"
                    type="range"
                    min="0"
                    max="200"
                    value={saturation}
                    onChange={(e) => setSaturation(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label
                    htmlFor="hue-rotate"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Krāsas maiņa: {hueRotate}°
                  </label>
                  <input
                    id="hue-rotate"
                    type="range"
                    min="0"
                    max="360"
                    value={hueRotate}
                    onChange={(e) => setHueRotate(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Papildu efekti</h3>
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={grayscale}
                      onChange={(e) => setGrayscale(e.target.checked)}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span className="ml-2 text-gray-700">Melnbalts</span>
                  </label>
                </div>
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={sepia}
                      onChange={(e) => setSepia(e.target.checked)}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span className="ml-2 text-gray-700">Sēpija</span>
                  </label>
                </div>
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={invert}
                      onChange={(e) => setInvert(e.target.checked)}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span className="ml-2 text-gray-700">Invertēt krāsas</span>
                  </label>
                </div>
                <div>
                  <label
                    htmlFor="rotate"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Rotācija: {rotate}°
                  </label>
                  <input
                    id="rotate"
                    type="range"
                    min="0"
                    max="360"
                    value={rotate}
                    onChange={(e) => setRotate(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <h3 className="text-lg font-semibold">Ūdenszīme</h3>
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={applyWatermark}
                    onChange={(e) => setApplyWatermark(e.target.checked)}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2 text-gray-700">
                    Pievienot ūdenszīmi
                  </span>
                </label>
              </div>
              {applyWatermark && (
                <>
                  <div>
                    <label
                      htmlFor="watermark-text"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Ūdenszīmes teksts
                    </label>
                    <input
                      id="watermark-text"
                      type="text"
                      value={watermarkText}
                      onChange={(e) => setWatermarkText(e.target.value)}
                      className="w-full px-3 py-2 text-gray-700 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Ievadiet ūdenszīmes tekstu"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="watermark-opacity"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Ūdenszīmes caurspīdīgums: {watermarkOpacity}%
                    </label>
                    <input
                      id="watermark-opacity"
                      type="range"
                      min="0"
                      max="100"
                      value={watermarkOpacity}
                      onChange={(e) =>
                        setWatermarkOpacity(parseInt(e.target.value))
                      }
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="watermark-position"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Ūdenszīmes pozīcija
                    </label>
                    <select
                      id="watermark-position"
                      value={watermarkPosition}
                      onChange={(e) => setWatermarkPosition(e.target.value)}
                      className="w-full px-3 py-2 text-gray-700 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="center">Centrā</option>
                      <option value="top-left">Augšā pa kreisi</option>
                      <option value="top-right">Augšā pa labi</option>
                      <option value="bottom-left">Apakšā pa kreisi</option>
                      <option value="bottom-right">Apakšā pa labi</option>
                    </select>
                  </div>
                </>
              )}
            </div>

            <button
              onClick={compressImage}
              disabled={!selectedFile || loading}
              className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline disabled:opacity-50 transition duration-300 ease-in-out"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Apstrādā...
                </span>
              ) : (
                "Apstrādāt un Lejupielādēt Attēlu"
              )}
            </button>
          </div>
        </div>

        {compressedImage && (
          <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-2xl font-bold mb-4">Apstrādātais Attēls</h2>
              <img
                src={compressedImage}
                alt="Apstrādātais attēls"
                className="max-w-full h-auto rounded-lg shadow-lg mb-4"
              />
              <button
                onClick={handleDownload}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
              >
                Lejupielādēt Apstrādāto Attēlu
              </button>
            </div>
          </div>
        )}

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-2xl font-bold mb-4">Par mūsu rīku</h2>
            <p className="mb-4">
              Mūsu attēlu apstrādes rīks piedāvā plašas iespējas attēlu
              optimizācijai un rediģēšanai. Tas ir veidots, lai nodrošinātu ērtu
              un efektīvu darbu ar attēliem, saglabājot to kvalitāti.
            </p>
            <h3 className="text-lg font-semibold mb-2">Galvenās funkcijas:</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Attēlu kompresija ar minimālu kvalitātes zudumu</li>
              <li>Dažādu izvades formātu atbalsts</li>
              <li>Attēla izmēru maiņa</li>
              <li>Spilgtuma, kontrasta un citu parametru pielāgošana</li>
              <li>Dažādi efekti un filtri</li>
              <li>Ūdenszīmju pievienošana</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};
export default ImageTool;
