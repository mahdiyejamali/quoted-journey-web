import { FontStyles } from "@/store/store";
import { useRef } from "react";

function loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(`Failed to load image from url: ${url}`);
        img.src = url;
    });
}

function wrapText(context: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number): void {
    const words = text.split(' ');
    let line = '';

    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const testLine = `${line}${word} `;
        const testWidth = context.measureText(testLine).width;

        if (testWidth > maxWidth && i > 0) {
            context.fillText(line, x, y);
            line = `${word} `;
            y += lineHeight;
        } else {
            line = testLine;
        }
    }

    context.fillText(line, x, y);
}

interface UseHtml2CanvasProps {
    backgroundSrcImage: string,
    fontStyles: FontStyles,
    fontSize: number,
    textColor: string,
    textShadowStatus: boolean,
    currentQuote: string,
}
export default function useHtml2Canvas(props: UseHtml2CanvasProps) {
    const {
        backgroundSrcImage,
        fontStyles,
        fontSize,
        textColor,
        textShadowStatus,
        currentQuote,
    } = props

    const downloadElementRef = useRef<HTMLDivElement>(null);
    const downloadElement = async () => {
        const element = downloadElementRef.current;
      
        if (element) {
          const canvas = document.createElement("canvas");
          canvas.width = element.offsetWidth;
          canvas.height = element.offsetHeight;
      
          const ctx = canvas.getContext("2d");
      
          if (ctx) {
            // Draw background image
            const backgroundImg = await loadImage(backgroundSrcImage);
            ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
        
            // Draw text
            ctx.font = `${fontStyles.fontStyle} ${fontStyles.fontWeight} ${fontSize}px ${fontStyles.fontFamily}`;
            ctx.fillStyle = textColor;
            ctx.shadowColor = textShadowStatus ? "#000000" : "transparent";
            ctx.shadowOffsetX = 1;
            ctx.shadowOffsetY = 1;
            ctx.shadowBlur = 2;
            wrapText(ctx, currentQuote, canvas.width * 0.2, canvas.height * 0.3, canvas.width * 0.6, fontSize * 1.5);
        
            // Download image
            const dataURL = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.href = dataURL;
            link.download = "quote.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
        }
    };

    return [downloadElementRef, downloadElement] as const;
}