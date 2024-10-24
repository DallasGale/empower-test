export const convertSpendIntoPercentage = (spend: number, limit: number) => {
  if (!limit) return 0; // Prevent division by zero
  const percentage = (spend / limit) * 100;
  return Math.min(percentage, 100); // Cap at 100%
};
