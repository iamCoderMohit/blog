const colors = [
  "#6366F1", // Indigo
  "#8B5CF6", // Violet
  "#EC4899", // Pink
  "#F43F5E", // Rose
  "#EF4444", // Red
  "#F97316", // Orange
  "#F59E0B", // Amber
  "#EAB308", // Yellow
  "#84CC16", // Lime
  "#22C55E", // Green
  "#10B981", // Emerald
  "#14B8A6", // Teal
  "#06B6D4", // Cyan
  "#0EA5E9", // Sky Blue
  "#3B82F6", // Blue
  "#2563EB", // Royal Blue
  "#4F46E5", // Deep Indigo
  "#6B7280", // Neutral Gray
  "#64748B", // Slate
  "#334155", // Charcoal
];

export const getRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};
