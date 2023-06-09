import { FontStyles } from "@/store/store";
import { RefObject, useRef } from "react";

export function loadImageByUrl(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(`Failed to load image from url: ${url}`);
        img.src = url;
    });
}

function wrapText(context: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number): void {
    const lines = text.split('\n');
    let offsetY = 0;

    for (let l = 0; l < lines.length; l++) {
        const words = lines[l].split(' ');
        let line = '';

        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            const testLine = `${line}${word} `;
            const testWidth = context.measureText(testLine).width;

            if (testWidth > maxWidth && i > 0) {
                context.fillText(line, x, y + offsetY);
                line = `${word} `;
                offsetY += lineHeight;
            } else {
                line = testLine;
            }
        }

        context.fillText(line, x, y + offsetY);
        offsetY += lineHeight;
    }
}

export interface Html2CanvasProps {
    backgroundSrcImage: string,
    fontStyles: FontStyles,
    fontSize: number,
    textColor: string,
    textShadowState: boolean,
    currentQuote: string,
    imageSize: {width: number, height: number}
}

export async function createImageCanvas(elementRef: RefObject<HTMLDivElement>, params: Html2CanvasProps) {
    const {
        backgroundSrcImage,
        fontStyles,
        fontSize,
        textColor,
        textShadowState,
        currentQuote,
        imageSize,
    } = params;
    const element = elementRef.current;
    if (element) {
        const canvas = document.createElement("canvas");
        canvas.width = imageSize.width;
        canvas.height = imageSize.height;
    
        const ctx = canvas.getContext("2d");
    
        if (ctx) {
            // Draw background image
            const backgroundImg = await loadImageByUrl(backgroundSrcImage);
            ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
        
            // Draw text
            ctx.font = `${fontStyles.fontStyle} ${fontStyles.fontWeight} ${fontSize}px ${fontStyles.fontFamily}`;
            ctx.fillStyle = textColor;
            ctx.shadowColor = textShadowState ? "#000000" : "transparent";
            ctx.shadowOffsetX = 1;
            ctx.shadowOffsetY = 1;
            ctx.shadowBlur = 2;
            wrapText(ctx, currentQuote, canvas.width * 0.2, canvas.height * 0.3, canvas.width * 0.6, fontSize * 1.5);
        }

        return canvas;
    }

    return null;
}

export const downloadCanvas = (canvas: HTMLCanvasElement | null) => {
    if (canvas) {
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

export default function useHtml2Canvas(props: Html2CanvasProps) {
    const downloadElementRef = useRef<HTMLDivElement>(null);
    const downloadElement = async () => {      
        const canvas = await createImageCanvas(downloadElementRef, props);
        downloadCanvas(canvas);
    };

    return [downloadElementRef, downloadElement] as const;
}