import {createContext,useEffect,useReducer} from  "react" 
import  Reducer  from "./Reducer";


const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user")) || null,//If user is in local storage, then it will be stored in user, otherwise it will be null
    isFetching: false,
    error: false,

};

export const AuthContext = createContext(INITIAL_STATE);
export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user));
    },[state.user]);

    return ( 
        <AuthContext.Provider value={{
            user: state.user,
            isFetching: state.isFetching,
            error: state.error,
            dispatch
        }}>
            {children}
        </AuthContext.Provider>)

}   