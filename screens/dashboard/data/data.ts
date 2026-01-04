export const COLORS = [
  "#1ABC9C", // teal
  "#2ECC71", // green
  "#3498DB", // blue
  "#9B59B6", // purple
  "#E67E22", // orange
  "#E74C3C", // red
  "#F1C40F", // yellow
  "#16A085", // dark teal
  "#27AE60", // dark green
  "#2980B9", // dark blue
  "#8E44AD", // dark purple
  "#D35400", // dark orange
  "#C0392B", // dark red
  "#F39C12", // dark yellow
  "#7F8C8D", // gray
  "#34495E", // navy
  "#00B894", // mint
  "#6C5CE7", // violet
  "#FAB1A0", // pastel peach
  "#55EFC4", // aqua
  "#FF6B6B", // coral
  "#FFE66D", // light yellow
  "#4B0082", // indigo
  "#FF4500", // orange-red
  "#00CED1", // dark turquoise
  "#ADFF2F", // green-yellow
  "#FF1493", // deep pink
  "#FFD700", // gold
  "#40E0D0", // turquoise
  "#FF69B4", // hot pink
];

// Single shuffle, then scatter into 3 visually balanced groups
const shuffled = [...COLORS].sort(() => Math.random() - 0.5);

export const COLORS1 = shuffled.filter((_, i) => i % 3 === 0);
export const COLORS2 = shuffled.filter((_, i) => i % 3 === 1);
export const COLORS3 = shuffled.filter((_, i) => i % 3 === 2);
