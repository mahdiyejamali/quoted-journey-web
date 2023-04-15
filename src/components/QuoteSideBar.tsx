import { Button, Drawer, FormControlLabel, IconButton } from "@mui/material";
import ColorSelect from "./ColorSelect";
import FontSelect from "./FontSelect";
import FontSizeSlider from "./FontSizeSlider";
import ShadowSwitch from "./ShadowSwitch";
import styled from '@emotion/styled';
import ThemeSelect from "./ThemeSelect";
import { ChevronLeft, Image as ImageIcon } from "@mui/icons-material";
import QuoteGenreSelect from "./QuoteGenreSelect";
import Link from "next/link";

const SideBarWrapper = styled.div`
    width: 400px;
`;

const SideBarItem =  styled.div`
    margin-top: 30px;
    margin-left: 20px;
    margin-right: 20px;
`;


interface QuoteSideBarProps {
    isOpen: boolean;
    toggleSideBar: () => void;
}

export default function QuoteSideBar(props: QuoteSideBarProps) {
    const {isOpen, toggleSideBar} = props;
    
    return (
        <Drawer
            anchor='right'
            open={isOpen}
            onClose={(event) => {
                // @ts-ignore
                event.stopPropagation()
                toggleSideBar();
            }}
            onClick={(event) => event.stopPropagation()}
        >
            <div>
                <IconButton onClick={toggleSideBar}>
                    <ChevronLeft />
                </IconButton>
            </div>
            <SideBarWrapper>
                <SideBarItem>
                    <Link href="/favorites"><Button variant="outlined" onClick={(event) => event.stopPropagation()}>
                        <ImageIcon style={{marginRight: 5}} />Favorites</Button>
                    </Link>
                </SideBarItem>

                <SideBarItem>
                    <FontSizeSlider />
                </SideBarItem>

                <SideBarItem>
                    <QuoteGenreSelect />
                </SideBarItem>

                <SideBarItem>
                    <FontSelect />
                </SideBarItem>

                <SideBarItem>
                    <ShadowSwitch />
                </SideBarItem>

                <SideBarItem>
                    <ColorSelect />
                </SideBarItem>

                <SideBarItem>
                    <ThemeSelect />
                </SideBarItem>

                <SideBarItem></SideBarItem>
            </SideBarWrapper>
        </Drawer>
    )
}
