import { useContext } from "react";
import { MyContext } from "../Context/authprovider.context";

const useMyContext = () => {
    return useContext(MyContext);
}

export default useMyContext