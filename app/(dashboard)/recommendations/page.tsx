import RecommendationForm from "../recommendations/_components/RecommendationForm";

export default function RecommendationPage() {
  return (
    <div className="min-h-screen bg-[#F8F6F1] px-8 py-10">
      <div className="mx-auto max-w-4xl">

        <div className="mb-10 text-center">

          <h1 className="text-4xl font-bold text-[#445D42]">
            AI Grooming Recommendation
          </h1>

          <p className="mt-3 text-gray-600">
            Tell us about your pet and we'll recommend the most suitable grooming services.
          </p>

        </div>

        <RecommendationForm />

      </div>
    </div>
  );
}