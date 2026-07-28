"use client";

import { useState, ChangeEvent } from "react";
import { Sparkles, PawPrint, Scissors, X } from "lucide-react";

interface RecommendationFormProps {
  onClose?: () => void;
}

export default function RecommendationForm({
  onClose,
}: RecommendationFormProps) {
  const [form, setForm] = useState({
    petType: "Dog",
    breed: "",
    age: "",
    coatLength: "Short",
    shedding: "Low",
    skin: "Normal",
    problem: "",
  });

  const [recommendations, setRecommendations] = useState<
    { title: string; reason: string }[]
  >([]);

  const handleChange = (
    e: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const generateRecommendation = () => {
    const result: { title: string; reason: string }[] = [];

    if (form.coatLength === "Long") {
      result.push({
        title: "Full Grooming",
        reason:
          "Long-coated pets require regular trimming and brushing to avoid tangles.",
      });

      result.push({
        title: "Coat Trimming",
        reason:
          "Keeps your pet clean, comfortable and prevents matting.",
      });
    }

    if (form.shedding === "High") {
      result.push({
        title: "De-shedding Treatment",
        reason:
          "Reduces loose fur and minimizes excessive shedding.",
      });
    }

    if (form.skin === "Sensitive") {
      result.push({
        title: "Hypoallergenic Shampoo",
        reason:
          "Special shampoo designed for pets with sensitive skin.",
      });
    }

    const problem = form.problem.toLowerCase();

    if (problem.includes("nail")) {
      result.push({
        title: "Nail Trimming",
        reason:
          "Long nails can cause pain and affect walking posture.",
      });
    }

    if (problem.includes("ear")) {
      result.push({
        title: "Ear Cleaning",
        reason:
          "Helps prevent infections and keeps ears healthy.",
      });
    }

    if (problem.includes("mat")) {
      result.push({
        title: "De-matting",
        reason:
          "Safely removes tangled fur without hurting your pet.",
      });
    }

    if (problem.includes("flea")) {
      result.push({
        title: "Anti-Flea Treatment",
        reason:
          "Removes fleas and protects your pet's skin and coat.",
      });
    }

    if (result.length === 0) {
      result.push({
        title: "Basic Grooming",
        reason:
          "A complete bath, brushing and hygiene session is recommended.",
      });
    }

    setRecommendations(result);
  };

  return (
    <div className="w-full">

      {/* Header */}
      <div className="mb-8 text-center">

        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#445D42] text-white">

          <Sparkles size={30} />

        </div>

        <h2 className="text-3xl font-bold text-[#445D42]">
          AI Grooming Assistant
        </h2>

        <p className="mt-2 text-gray-600">
          Tell us about your pet and receive personalized grooming recommendations.
        </p>

      </div>

      {/* Form */}
      <div className="grid gap-6 md:grid-cols-2">

        <div>
          <label className="font-semibold text-gray-700">
            Pet Type
          </label>

          <select
            name="petType"
            value={form.petType}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border p-3 focus:border-[#445D42] focus:outline-none"
          >
            <option>Dog</option>
            <option>Cat</option>
          </select>
        </div>

        <div>
          <label className="font-semibold text-gray-700">
            Breed
          </label>

          <input
            name="breed"
            value={form.breed}
            onChange={handleChange}
            placeholder="Golden Retriever"
            className="mt-2 w-full rounded-xl border p-3 focus:border-[#445D42] focus:outline-none"
          />
        </div>

        <div>
          <label className="font-semibold text-gray-700">
            Age
          </label>

          <input
            type="number"
            name="age"
            value={form.age}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border p-3 focus:border-[#445D42] focus:outline-none"
          />
        </div>

        <div>
          <label className="font-semibold text-gray-700">
            Coat Length
          </label>

          <select
            name="coatLength"
            value={form.coatLength}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border p-3 focus:border-[#445D42] focus:outline-none"
          >
            <option>Short</option>
            <option>Medium</option>
            <option>Long</option>
          </select>
        </div>

        <div>
          <label className="font-semibold text-gray-700">
            Shedding
          </label>

          <select
            name="shedding"
            value={form.shedding}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border p-3 focus:border-[#445D42] focus:outline-none"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <div>
          <label className="font-semibold text-gray-700">
            Skin Condition
          </label>

          <select
            name="skin"
            value={form.skin}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border p-3 focus:border-[#445D42] focus:outline-none"
          >
            <option>Normal</option>
            <option>Sensitive</option>
          </select>
        </div>

      </div>

      <div className="mt-6">

        <label className="font-semibold text-gray-700">
          Grooming Concerns
        </label>

        <textarea
          name="problem"
          rows={4}
          value={form.problem}
          onChange={handleChange}
          placeholder="Example: My dog has long nails, matted fur and sheds a lot."
          className="mt-2 w-full rounded-xl border p-3 focus:border-[#445D42] focus:outline-none"
        />

      </div>

      <button
        onClick={generateRecommendation}
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-[#445D42] py-4 text-lg font-semibold text-white transition hover:bg-[#354832]"
      >
        <Sparkles size={20} />
        Generate Recommendation
      </button>

      {recommendations.length > 0 && (
        <div className="mt-10">

          <div className="mb-5 flex items-center gap-2">

            <PawPrint className="text-[#445D42]" />

            <h3 className="text-2xl font-bold text-[#445D42]">
              Recommended Services
            </h3>

          </div>

          <div className="space-y-4">

            {recommendations.map((item, index) => (
              <div
                key={index}
                className="rounded-2xl border-l-4 border-[#445D42] bg-green-50 p-5 shadow-sm"
              >
                <div className="flex items-center gap-3">

                  <Scissors className="text-[#445D42]" />

                  <h4 className="text-lg font-bold">
                    {item.title}
                  </h4>

                </div>

                <p className="mt-2 text-gray-600">
                  {item.reason}
                </p>

              </div>
            ))}

          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-gray-700 py-3 font-semibold text-white hover:bg-gray-800"
            >
              <X size={18} />
              Close
            </button>
          )}

        </div>
      )}

    </div>
  );
}