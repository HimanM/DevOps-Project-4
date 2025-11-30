"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

interface ImageModalProps {
    isOpen: boolean;
    onClose: () => void;
    imageSrc: string;
    altText: string;
}

export function ImageModal({ isOpen, onClose, imageSrc, altText }: ImageModalProps) {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="relative w-full h-full flex items-center justify-center p-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-50 p-2 bg-black/50 rounded-full text-white hover:bg-white/20 transition-colors backdrop-blur-md"
                        >
                            <X size={32} />
                        </button>
                        <img
                            src={imageSrc}
                            alt={altText}
                            className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg shadow-2xl border border-white/10"
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
