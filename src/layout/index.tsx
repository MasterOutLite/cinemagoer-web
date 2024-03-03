import React from "react";
import ThemeRegistry from "../styles/ThemeRegistry/ThemeRegistry";
import Header from "./Header";
import Footer from "./Footer";


export interface MainProps {
    children: React.ReactNode
}

export default function Main({children}: MainProps) {
    return (
        <ThemeRegistry>
            <Header/>
            <main>
                {children}
            </main>
            <Footer/>
        </ThemeRegistry>

    );
}
