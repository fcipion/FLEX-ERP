export const formatFileSize = (bits) => {
  if (bits === 0) return "0 bits";

  const units = ["bits", "Kb", "Mb", "Gb", "Tb"];
  const base = 1024;
  const decimals = 2;

  const sizeIndex = Math.floor(Math.log2(bits) / Math.log2(base));
  const formattedSize = parseFloat(
    (bits / Math.pow(base, sizeIndex)).toFixed(decimals)
  );

  return `${formattedSize} ${units[sizeIndex]}`;
};
