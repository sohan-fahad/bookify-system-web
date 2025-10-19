import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserEntity } from "@src/models/entities";
import SessionUtils from "@src/utils/session.utils";

interface IAuthenticationStore {
    isLoggedIn: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    user: UserEntity | null;
    setUser: (user: UserEntity | null) => void;
    token: string | null;
    setToken: (token: string | null) => void;
    logout: () => void;
}

const useAuthenticationStore = create<IAuthenticationStore>()(
    persist(
        (set) => ({
            isLoggedIn: false,
            user: null,
            token: null,
            setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn: isLoggedIn }),
            setUser: (user: UserEntity | null) => set({ user }),
            setToken: (token: string | null) => {
                set({ token });
                SessionUtils.setToken(token || '');
            },
            logout: () => set({
                isLoggedIn: false,
                user: null,
                token: null
            }),
        }),
        {
            name: "auth-storage",
            partialize: (state) => ({
                isLoggedIn: state.isLoggedIn,
                user: state.user,
            }),
        }
    )
);

export default useAuthenticationStore;