import { createContext, useContext, useEffect, useRef, useState } from "react";

const AppContext = createContext<any>(undefined);

export const AppProvider = ({ children }: any) => {
    const [isMobile, setIsMobile] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [activeAmenity, setActiveAmenity] = useState<string | null>(null);
    const resetCamRef = useRef<any>(null);
    const [selectedBlock, setSelectedBlock] = useState<string | null>(null);
    const [selectedUnit, setSelectedUnit] = useState<string | null>(null);
    const [activatedMenu, setActivatedMenu] = useState<string>("");

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 800);
        };

        // 监听窗口大小变化
        window.addEventListener("resize", handleResize);
        handleResize(); // 初始化检查窗口大小
    }, []);

    return (
        <AppContext.Provider
            value={{
                isMobile,
                progress,
                setProgress,
                isLoading,
                setIsLoading,
                activeAmenity,
                setActiveAmenity,
                resetCamRef,
                selectedBlock,
                setSelectedBlock,
                selectedUnit,
                setSelectedUnit,
                activatedMenu,
                setActivatedMenu,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
