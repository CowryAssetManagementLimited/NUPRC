import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("API_KEY")
BASE_URL = os.getenv("BASE_URL")
FM_HOST_COMPLY_CODE = os.getenv("FM_HOST_COMPLY_CODE")

HEADERS = {
    "x-api-key": API_KEY,
    "Content-Type": "application/json"
}
