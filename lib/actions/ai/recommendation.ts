export function getRecommendations(data: any) {
  const services: string[] = [];

  if (data.coatLength === "Long") {
    services.push("Full Grooming");
  }

  if (data.shedding === "High") {
    services.push("De-shedding Treatment");
  }

  if (data.problem === "Matted Fur") {
    services.push("De-matting");
  }

  if (data.problem === "Long Nails") {
    services.push("Nail Trimming");
  }

  return services;
}