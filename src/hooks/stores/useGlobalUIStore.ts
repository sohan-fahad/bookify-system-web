import { create } from "zustand";

interface IGlobalUIStore {
    isAuthModalOpen: boolean;
    setIsAuthModalOpen: (isAuthModalOpen: boolean) => void;
}

const useGlobalUIStore = create<IGlobalUIStore>((set) => ({
    isAuthModalOpen: false,
    setIsAuthModalOpen: (isAuthModalOpen) => set({ isAuthModalOpen }),
}));

export default useGlobalUIStore;