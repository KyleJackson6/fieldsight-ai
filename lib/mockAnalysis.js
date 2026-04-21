export const mockHeatmapData = [
  { x: 120, y: 200, intensity: 0.8 },
  { x: 300, y: 150, intensity: 0.3 },
  { x: 500, y: 400, intensity: 0.6 },
  { x: 350, y: 300, intensity: 0.5 },
  { x: 200, y: 350, intensity: 0.9 },
  { x: 450, y: 100, intensity: 0.4 }
];

export const formatPercent = (value) => `${(value * 100).toFixed(1)}%`;

export const simulateBulkAnalysis = async (filesCount) => {
  return new Promise((resolve) => {
    // Simulate some variable delay 1.5s to 3s
    setTimeout(() => {
      resolve({
        totalProcessed: filesCount || 120,
        flaggedImagesCount: 15,
        affectedPercentage: 0.12, // 12%
        averageSeverity: 'Medium-High',
        averageConfidence: 0.88,
        estimatedDryingTime: '3-5 Days',
        riskLevel: 'Elevated',
        timestamp: new Date().toLocaleString(),
        recommendation: 'Monitor drainage in the northeastern quadrant. Consider immediate sub-soiling if no rain is expected.',
        flaggedImages: [
          { id: 1, severity: 'High', conf: 0.92, img: '/demo/thumb1.png' },
          { id: 2, severity: 'Medium', conf: 0.85, img: '/demo/thumb2.png' },
          { id: 3, severity: 'Low', conf: 0.76, img: '/demo/thumb3.png' },
        ]
      });
    }, 2000);
  });
};

export const simulateSingleAnalysis = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        waterDetected: true,
        confidence: 0.89,
        severity: 'High',
        recommendation: 'Significant pooling detected. Evaluate localized drainage.',
        overlayImage: "/window.svg" // mock placeholder for overlay
      });
    }, 1500);
  });
};

export const runRealInference = async (file) => {
  const apiUrl = process.env.NEXT_PUBLIC_INFERENCE_API_URL || "http://localhost:8000";
  
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${apiUrl}/predict`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorDetails = await response.text();
    throw new Error(`Inference failed: ${response.status} ${errorDetails}`);
  }

  const data = await response.json();
  return {
    ...data,
    overlayImage: "/window.svg" // fallback if needed
  };
};

export const runRealBulkInference = async (files) => {
  const flaggedImages = [];
  let totalProcessed = 0;
  let totalConfidence = 0;
  let highSeverityCount = 0;
  let mediumSeverityCount = 0;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    try {
      const result = await runRealInference(file);
      totalProcessed++;
      if (result.waterDetected) {
        flaggedImages.push({
          id: i + 1,
          severity: result.severity,
          conf: result.confidence,
          annotatedImage: result.annotatedImage,
          fileName: file.name
        });
        totalConfidence += result.confidence;
        
        if (result.severity === 'High') highSeverityCount++;
        else if (result.severity === 'Medium') mediumSeverityCount++;
      }
    } catch (e) {
      console.error(`Failed to analyze file ${file.name}`, e);
    }
  }

  const flaggedImagesCount = flaggedImages.length;
  const affectedPercentage = totalProcessed > 0 ? flaggedImagesCount / totalProcessed : 0;
  const averageConfidence = flaggedImagesCount > 0 ? totalConfidence / flaggedImagesCount : 0;
  
  let riskLevel = "Normal";
  let averageSeverity = "Low";
  let recommendation = "No substantial pooling detected. Field conditions look stable.";
  let estimatedDryingTime = "1-2 Days";

  if (affectedPercentage > 0.2 || highSeverityCount > 2) {
    riskLevel = "Elevated";
    averageSeverity = "High";
    estimatedDryingTime = "5-7 Days";
    recommendation = "Significant pooling detected across multiple zones. Immediate intervention and sub-soiling may be required.";
  } else if (affectedPercentage > 0.05 || mediumSeverityCount > 2) {
    riskLevel = "Moderate";
    averageSeverity = "Medium";
    estimatedDryingTime = "3-5 Days";
    recommendation = "Moderate pooling detected in localized sectors. Monitor drainage over the next few days.";
  } else if (flaggedImagesCount > 0) {
    riskLevel = "Low";
    recommendation = "Minor pooling detected. Keep under observation.";
  }

  return {
    totalProcessed,
    flaggedImagesCount,
    affectedPercentage,
    averageSeverity,
    averageConfidence,
    estimatedDryingTime,
    riskLevel,
    timestamp: new Date().toLocaleString(),
    recommendation,
    flaggedImages
  };
};
