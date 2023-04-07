import { Drawer } from "@mui/material";
import ColorSelect from "./ColorSelect";
import FontSelect from "./FontSelect";
import FontSizeSlider from "./FontSizeSlider";
import ShadowSwitch from "./ShadowSwitch";

interface SideBarProps {
    isOpen: boolean;
    toggleSideBar: () => void;
}

export default function SideBar(props: SideBarProps) {
    const {isOpen, toggleSideBar} = props;
    
    return <Drawer
                anchor='right'
                open={isOpen}
                onClose={(event) => {
                    // @ts-ignore
                    event.stopPropagation()
                    toggleSideBar();
                }}
                onClick={(event) => event.stopPropagation()}
            >
                <div style={{width: '400px'}}>
                    <FontSizeSlider />
                    <div className='font-select-wrapper'>
                        <FontSelect />
                    </div>
                    <div className='text-shadow-wrapper'>
                        <ShadowSwitch />
                    </div>
                    <div className='color-button-wrapper'>
                        <ColorSelect />
                    </div>
                </div>
            </Drawer>
}