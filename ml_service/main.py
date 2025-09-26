from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

app = FastAPI(title="Microplastics ML Predictor Stub")


class PredictPayload(BaseModel):
    """Incoming payload from Node backend/front-end."""
    payload_data: str  # base64 data URL (image) or sensor JSON encoded as string
    user_id: Optional[int] = None
    report_id: Optional[str] = None


def get_stub_result() -> dict:
    """Return a consistent stub result matching UI expectations."""
    return {
        # Core prediction metrics
        "totalCount": 42,
        "microplasticCount": 38,
        "nonMicroplasticCount": 4,
        "purityPercentage": 90.5,  # (4/42) * 100

        # Historical chart simulation value
        "reportMicroCount": 45,

        # Community comparison (used by frontend to update communityAvg)
        "communityAvgMicroCount": 76,

        # Metadata
        "classification": "Polyester Fibers",
        "confidence": 0.95,
        "timestamp": datetime.now().isoformat(),
    }


@app.post("/predict")
async def predict_microplastics(payload: PredictPayload):
    """
    Accepts an image/sensor payload and returns the microplastic analysis result.
    This simulates a successful ML inference.
    """
    if not payload.payload_data:
        raise HTTPException(status_code=400, detail="Missing payload_data in request body.")

    print(f"[{datetime.now().strftime('%H:%M:%S')}] Received /predict request.")
    result = get_stub_result()

    return {
        "status": "success",
        "prediction_result": result,
    }


@app.get("/")
def health() -> dict:
    return {"message": "Microplastics ML Service running on port 8001"}
