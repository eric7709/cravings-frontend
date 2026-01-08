export const COLORS = [
  "#B11226", // dark red
  "#0B7D3E", // dark green
  "#0A3D62", // dark blue
  "#B8860B", // dark yellow (golden)
  "#5E2B97", // dark purple
  "#C24G00", // dark orange
  "#1B4F72", // deep navy blue
];


// Single shuffle, then scatter into 3 visually balanced groups
const shuffled = [...COLORS].sort(() => Math.random() - 0.5);

export const DOUGHNUTCOLORS = shuffled.filter((_, i) => i % 3 === 0);
