import { createContext, useEffect,useState, type ReactNode } from "react";
    export type User = {
    _id: string;
    name: string;
    email: string;
    language_preference: string;
    dob?: string;
    gender?: string
}
type AuthContextType = {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    token : string | null;
    isLoggedIn: boolean;
    login: (user: User, token: string) => void;
    logout: () => void;
}
export const AuthContext = createContext<AuthContextType|null>(null);

export const AuthProvider = ({children}:{children:ReactNode})=>{
    const [user, setUser] = useState<User|null>(null);
    const [token,setToken] = useState<string|null>(null);

    useEffect(()=>{
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");
        if(storedUser && storedToken){
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
        }
    },[]);

    const login = (user:User, token:string) =>{
        setUser(user);
        setToken(token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
    }
    const logout = () =>{
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");

    }
    const isLoggedIn = !!token;
    const value = {
        user,setUser,
        token,
        isLoggedIn,
        login,
        logout
    }
    return (
        <AuthContext.Provider value = {value}>
            {children}
        </AuthContext.Provider>
    )
};


