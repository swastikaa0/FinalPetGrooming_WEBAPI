"use client";

import { Sparkles, Scissors, ArrowLeft, CheckCircle } from "lucide-react";

interface Recommendation {
  title: string;
  reason: string;
}

interface RecommendationResultProps {
  recommendations: Recommendation[];
  onBack: () => void;
  onClose: () => void;
}

export default function RecommendationResult({
  recommendations,
  onBack,
  onClose,
}: RecommendationResultProps) {
  return (
    <div>

      {/* Header */}
      <div className="mb-8 text-center">

        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#445D42] text-white">
          <Sparkles size={32} />
        </div>

        <h2 className="text-3xl font-bold text-[#445D42]">
          AI Recommendation
        </h2>

        <p className="mt-2 text-gray-500">
          Based on your pet's information, we recommend the following services.
        </p>

      </div>

      {/* Recommendations */}

      <div className="space-y-5">

        {recommendations.map((item, index) => (

          <div
            key={index}
            className="rounded-2xl border border-green-200 bg-green-50 p-6 shadow-sm transition hover:shadow-lg"
          >

            <div className="flex items-start gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#445D42] text-white">
                <Scissors size={22} />
              </div>

              <div className="flex-1">

                <div className="flex items-center gap-2">

                  <h3 className="text-xl font-bold text-[#445D42]">
                    {item.title}
                  </h3>

                  <CheckCircle
                    size={18}
                    className="text-green-600"
                  />

                </div>

                <p className="mt-2 text-gray-600">
                  {item.reason}
                </p>

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* Tips */}

      <div className="mt-8 rounded-2xl bg-yellow-50 border border-yellow-200 p-5">

        <h4 className="font-semibold text-yellow-800">
         Grooming Tip
        </h4>

        <p className="mt-2 text-sm text-yellow-700">
          Regular grooming helps reduce shedding, prevents skin infections,
          and keeps your pet healthy and comfortable.
        </p>

      </div>

      {/* Buttons */}

      <div className="mt-8 flex gap-4">

        <button
          onClick={onBack}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#445D42] py-3 font-semibold text-[#445D42] transition hover:bg-[#445D42] hover:text-white"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <button
          onClick={onClose}
          className="flex-1 rounded-xl bg-[#445D42] py-3 font-semibold text-white transition hover:bg-[#354832]"
        >
          Close
        </button>

      </div>

    </div>
  );
}