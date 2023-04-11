import { selectTextShadowState, setTextShadowState } from "@/store/slices/quoteSlice";
import { FormControlLabel, Switch } from "@mui/material"
import { useDispatch, useSelector } from "react-redux";

export default function ShadowSwitch() {
    const textShadowState = useSelector(selectTextShadowState);

    const dispatch = useDispatch();
    const handleChange = (_: any, value: boolean) => dispatch(setTextShadowState(value))

    return (
        <FormControlLabel 
            control={<Switch checked={textShadowState} onChange={handleChange} />}
            label="Shadow"
        />
    );
}