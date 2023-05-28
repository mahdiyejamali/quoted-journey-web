import { Drawer, IconButton } from "@mui/material";
import ColorSelect from "./ColorSelect";
import FontSelect from "./FontSelect";
import FontSizeSlider from "./FontSizeSlider";
import ShadowSwitch from "./ShadowSwitch";
import styled from '@emotion/styled';
import ThemeSelect from "./ThemeSelect";
import { ChevronLeft } from "@mui/icons-material";
import QuoteGenreSelect from "./QuoteGenreSelect";

const SideBarWrapper = styled.div`
    width: 23rem;
`;

const SideBarItem =  styled.div`
    margin-top: 1rem;
    margin-bottom: 1rem;
`;

const SideBarItemsWrapper = styled.div`
    margin-top: 1rem;
    margin-bottom: 1rem;
    margin-left: 1rem;
    margin-right: 1rem;
    padding: 1rem;
    border: 1px solid #A0A0A0;
    border-radius: 5px;
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
            <div style={{marginTop: '.5rem', marginLeft: '.5rem'}}>
                <IconButton size="large" onClick={toggleSideBar}>
                    <ChevronLeft />
                </IconButton>
            </div>

            <SideBarWrapper>
                <SideBarItemsWrapper>
                    <SideBarItem>
                        <FontSizeSlider />
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
                </SideBarItemsWrapper>

                <SideBarItemsWrapper>
                    <QuoteGenreSelect />
                </SideBarItemsWrapper>

                <SideBarItemsWrapper>
                    <ThemeSelect />
                </SideBarItemsWrapper>

                <SideBarItem></SideBarItem>

            </SideBarWrapper>
        </Drawer>
    )
}
