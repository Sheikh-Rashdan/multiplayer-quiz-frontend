import { useState } from "react";

function useToggle(value) {
    const [state, setState] = useState(value);

    function toggleState() {
        setState(!state);
    }

    return [state, toggleState];
}

export default useToggle;