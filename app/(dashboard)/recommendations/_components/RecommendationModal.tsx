"use client";

import { ReactNode, useEffect } from "react";
import { X } from "lucide-react";

interface RecommendationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export default function RecommendationModal({
  isOpen,
  onClose,
  title = "AI Grooming Assistant",
  children,
}: RecommendationModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl rounded-3xl bg-white shadow-2xl animate-in fade-in zoom-in duration-300"
      >
        {/* Header */}
        <div className="flex items-center justify-between rounded-t-3xl bg-[#445D42] px-8 py-5">
          <div>
            <h2 className="text-2xl font-bold text-white">
              🤖 {title}
            </h2>

            <p className="mt-1 text-sm text-green-100">
              Get personalized grooming recommendations.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-full bg-white/20 p-2 text-white transition hover:bg-white hover:text-[#445D42]"
          >
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[75vh] overflow-y-auto p-8">
          {children}
        </div>
      </div>
    </div>
  );
}