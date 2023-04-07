import { selectTextShadow, setTextShadow } from "@/store/slices/quoteSlice";
import { FormControlLabel, Switch } from "@mui/material"
import { useDispatch, useSelector } from "react-redux";

interface ShadowSwitchProps {
}

export default function ShadowSwitch(props: ShadowSwitchProps) {
    const textShadow = useSelector(selectTextShadow);

    const dispatch = useDispatch();
    const handleChange = (_: any, value: boolean) => dispatch(setTextShadow(value))

    return (
        <FormControlLabel 
            control={<Switch checked={textShadow} onChange={handleChange} />}
            label="Shadow"
        />
    );
}