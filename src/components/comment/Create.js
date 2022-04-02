import {TextField} from "@mui/material"
import React from "react";
import {styled} from "@mui/system";

const BoxComment = styled(TextField)({

        "& .MuiOutlinedInput-root": {
            padding: 0,
            borderRadius: 12,
        },

        "& .MuiOutlinedInput-input": {
            borderWidth: 0,
            outline: "none",
            padding: 8,
            fontSize: 12,
        },
    },
);
const Create = ({onCreate, focus = false, placeholder = ""}) => {

    const ref = React.useRef(null)
    React.useEffect(() => {
        if (focus) onComment();
    }, [focus])
    const onComment = () => {
        ref.current.focus();
    }
    const [value, setValue] = React.useState('')
    const handleChange = (e) => setValue(e.target.value)
    const onKeyPress = (e) => {
        if (e.key === 'Enter') {
            onCreate(value);
            e.target.blur();
            setValue('');
        } else {
            setValue(e.target.value)
        }
    }
    return (
        <BoxComment
            inputProps={{
                ref,
                sx: {
                    fontWeight: placeholder ? "600" : "400",
                }
            }}
            placeholder={placeholder}
            multiline
            fullWidth
            value={value}
            onChange={handleChange}
            onKeyPress={onKeyPress}
        />
    );
}
export default Create;
