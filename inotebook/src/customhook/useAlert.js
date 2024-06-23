import { useDispatch } from "react-redux"
import { clearAlert, setAlerts } from "../redux/slice/AlertSlice";

// Here we create custom hook means own function.
const useAlert =  () => {
    const dispatch = useDispatch();

    const showAlert = ({type , message}) => {
        console.log({type , message});
        dispatch(setAlerts({type , message}));

        setTimeout(() => {
            dispatch(clearAlert());
        }, 1000);
    }

    return showAlert;  //we return function as we know when we use the hook so we use a variable where we assign the value from hook to that variable that's why we return a fucntion.
}


export default useAlert;