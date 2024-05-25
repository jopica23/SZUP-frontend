import React from "react";

export default function Modal({children}) {
    return (
        <div
            id="defaultModal"
            className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full flex justify-center items-center"
        >
            <div className="relative w-full h-full max-w-2xl md:h-auto">
                <div className="relative bg-white rounded-lg shadow-xl">{children}</div>
            </div>
        </div>
    );
}