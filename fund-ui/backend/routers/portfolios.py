from fastapi import APIRouter, Query
from pydantic import BaseModel
from datetime import date
from services.hostcomply import proxy_request

router = APIRouter(prefix="/api/portfolios", tags=["Portfolios"])

class PortfolioCreate(BaseModel):
    investmentTypeCode: str
    investmentDescription: str
    principal: float
    rate: float
    isTenuredInvestment: bool
    commencementDate: date
    tenor: int
    currency: str
    hcdtTrustCode: str
    fmHostComplyCode: str = None  # auto-filled by proxy_request if None

@router.get("/")
def list_portfolios(
    HCDTTrustCode: str = None,
    fmHostComplyCode: str = None,
    Page: int = 1,
    Size: int = 10,
    ShouldPaginate: bool = True,
    Search: str = None
):
    params = {
        "HCDTTrustCode": HCDTTrustCode,
        "fmHostComplyCode": fmHostComplyCode,
        "Page": Page,
        "Size": Size,
        "ShouldPaginate": ShouldPaginate
    }
    if Search:
        params["Search"] = Search
    return proxy_request("GET", "/portfolios", params=params)

@router.post("/")
def create_portfolio(body: PortfolioCreate):
    return proxy_request("POST", "/portfolios", body=body.dict())
