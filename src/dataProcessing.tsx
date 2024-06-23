// src/dataProcessing.ts

import data from "./agriculture_data.json";

interface CropData {
  year: string; // Assuming Year is a string in the format "Financial Year (Apr - Mar), YYYY"
  crop: string;
  production: number;
  yield: number;
  area: number;
}

interface AggregatedData {
  year: string;
  maxCrop: string;
  minCrop: string;
}

interface AverageData {
  crop: string;
  avgYield: number;
  avgArea: number;
}

export const processData = (): {
  aggregatedData: AggregatedData[];
  averageData: AverageData[];
} => {
  const cropData: CropData[] = data.map((entry: any) => ({
    year: entry.Year,
    crop: entry["Crop Name"],
    production: entry["Crop Production (UOM:t(Tonnes))"] || 0,
    yield: entry["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"] || 0,
    area: entry["Area Under Cultivation (UOM:Ha(Hectares))"] || 0,
  }));

  const years = [...new Set(cropData.map((d) => d.year))];
  const crops = [...new Set(cropData.map((d) => d.crop))];

  const aggregatedData: AggregatedData[] = years.map((year) => {
    const yearData = cropData.filter((d) => d.year === year);
    const maxCrop = yearData.reduce(
      (max, crop) => (crop.production > max.production ? crop : max),
      yearData[0]
    );
    const minCrop = yearData.reduce(
      (min, crop) => (crop.production < min.production ? crop : min),
      yearData[0]
    );

    return {
      year,
      maxCrop: maxCrop.crop,
      minCrop: minCrop.crop,
    };
  });

  const averageData: AverageData[] = crops.map((crop) => {
    const cropEntries = cropData.filter((d) => d.crop === crop);
    const avgYield =
      cropEntries.reduce((sum, entry) => sum + entry.yield, 0) /
      cropEntries.length;
    const avgArea =
      cropEntries.reduce((sum, entry) => sum + entry.area, 0) /
      cropEntries.length;

    return {
      crop,
      avgYield: parseFloat(avgYield.toFixed(3)),
      avgArea: parseFloat(avgArea.toFixed(3)),
    };
  });

  return { aggregatedData, averageData };
};
