import os
import base64
import uuid
import cv2
import numpy as np
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from ultralytics import YOLO

app = FastAPI(title="FieldSight AI Inference Service")

# Allow CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the model once on startup
MODEL_PATH = os.getenv("MODEL_PATH", "/weights/capstone_weights/best (4).pt")
try:
    print(f"Loading YOLO model from {MODEL_PATH}...")
    model = YOLO(MODEL_PATH)
    print("Model loaded successfully.")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

@app.get("/health")
def health_check():
    return {"status": "ok", "model_loaded": model is not None}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if model is None:
        raise HTTPException(status_code=500, detail="Model is not loaded.")

    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Uploaded file is not an image.")

    try:
        # Read the uploaded image
        contents = await file.read()
        nparr = np.frombuffer(contents, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        # Run YOLO inference
        results = model.predict(source=img, conf=0.25)
        
        result = results[0]
        boxes = result.boxes
        
        # Analyze detections
        num_detections = len(boxes)
        water_detected = num_detections > 0
        
        if water_detected:
            # Average confidence of all detections
            avg_conf = float(boxes.conf.mean())
            confidence = avg_conf
            
            # Simple heuristic for severity based on number of detections
            if num_detections > 5:
                severity = "High"
                recommendation = "Significant pooling detected across multiple zones. Evaluate localized drainage and consider intervention."
            elif num_detections > 2:
                severity = "Medium"
                recommendation = "Moderate pooling detected. Monitor drainage in affected areas."
            else:
                severity = "Low"
                recommendation = "Minor pooling detected. Keep under observation."
        else:
            confidence = 1.0
            severity = "None"
            recommendation = "No substantial pooling detected. Field conditions look stable."

        # Draw bounding boxes (annotated image)
        annotated_img = result.plot()
        
        # Encode annotated image to base64
        _, buffer = cv2.imencode('.jpg', annotated_img)
        img_base64 = base64.b64encode(buffer).decode('utf-8')
        annotated_base64_str = f"data:image/jpeg;base64,{img_base64}"

        return JSONResponse(content={
            "waterDetected": water_detected,
            "confidence": confidence,
            "severity": severity,
            "recommendation": recommendation,
            "annotatedImage": annotated_base64_str
        })

    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))
