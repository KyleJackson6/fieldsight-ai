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
