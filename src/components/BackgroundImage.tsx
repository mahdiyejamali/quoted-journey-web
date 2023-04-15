// Src: https://github.com/TomDoesTech/perfect-background-image-tutorial/
import { useEffect, useState } from "react";
import Image from "next/image";
import styled from '@emotion/styled';
import { useSelector } from "react-redux";
import { selectSrcImage } from "@/store/slices/themeSlice";

const Box = styled.div`
  position: fixed;
  zindex: 0;
  top: 0;
`;

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

function BackgroundImage() {
    const backgroundSrcImage = useSelector(selectSrcImage);
    const [width, setWidth] = useState<number>();
    const [height, setheight] = useState<number>();

    useEffect(() => {
        const { width, height } = getWindowDimensions();
        setWidth(width);
        setheight(height);
    }, []);

    useEffect(() => {
        function handleResize() {
        const { width, height } = getWindowDimensions();
        setWidth(width);
        setheight(height);
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (width && height) {
        return (
            <Box>
                <Image
                    src={backgroundSrcImage}
                    alt="Background Image"
                    width={width}
                    height={height}
                />
            </Box>
        );
    }

    return null;
}

export default BackgroundImage;