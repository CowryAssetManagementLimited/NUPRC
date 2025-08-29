from fastapi import APIRouter
from pydantic import BaseModel
from datetime import date
from services.hostcomply import proxy_request

router = APIRouter(prefix="/api/transactions", tags=["Transactions"])

class TransactionCreate(BaseModel):
    InvestmentTypeCode: str
    TransactionDate: date
    DailyYield: float
    InterestRate: float
    InvestmentPortfolioId: str
    fmHostComplyCode: str = None  # auto-filled from .env via proxy_request

@router.get("/")
def list_transactions(
    startDate: date = None,
    endDate: date = None,
    hcdtTrustCode: str = None,
    fmHostComplyCode: str = None,
    page: int = 1,
    size: int = 10,
    shouldPaginate: bool = True,
    search: str = None
):
    params = {
        "startDate": startDate,
        "endDate": endDate,
        "hcdtTrustCode": hcdtTrustCode,
        "fmHostComplyCode": fmHostComplyCode,
        "page": page,
        "size": size,
        "shouldPaginate": shouldPaginate
    }
    if search:
        params["search"] = search
    return proxy_request("GET", "/transactions", params=params)

@router.post("/")
def create_transaction(body: TransactionCreate):
    return proxy_request("POST", "/transactions", body=body.dict())
