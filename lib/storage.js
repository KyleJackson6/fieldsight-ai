/**
 * Helper to interact with IndexedDB for storing large 
 * base-64 Image mappings per report safely.
 */

const DB_NAME = "FieldSightAI_Storage";
const STORE_NAME = "ReportImages";
const DB_VERSION = 1;

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "reportId" });
      }
    };

    request.onsuccess = (event) => resolve(event.target.result);
    request.onerror = (event) => reject(event.target.error);
  });
}

export async function saveReportImages(reportId, flaggedImages) {
  try {
    const db = await openDB();
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);

    const dataPayload = {
      reportId: reportId,
      images: flaggedImages, // array including massive base64 .annotatedImage strings
      savedAt: Date.now()
    };

    return new Promise((resolve, reject) => {
      const request = store.put(dataPayload);
      request.onsuccess = () => resolve(true);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error("Failed to save images to IndexedDB:", error);
    return false;
  }
}

export async function getReportImages(reportId) {
  try {
    const db = await openDB();
    const transaction = db.transaction(STORE_NAME, "readonly");
    const store = transaction.objectStore(STORE_NAME);

    return new Promise((resolve, reject) => {
      const request = store.get(reportId);
      request.onsuccess = (event) => {
        if (event.target.result) {
          resolve(event.target.result.images);
        } else {
          resolve([]); 
        }
      };
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error("Failed to load images from IndexedDB:", error);
    return [];
  }
}

export async function deleteReportImages(reportId) {
  try {
    const db = await openDB();
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);

    return new Promise((resolve, reject) => {
      const request = store.delete(reportId);
      request.onsuccess = () => resolve(true);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error("Failed to delete images from IndexedDB:", error);
    return false;
  }
}
