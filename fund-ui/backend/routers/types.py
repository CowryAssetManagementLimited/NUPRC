from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
from services.hostcomply import proxy_request

router = APIRouter(prefix="/api/types", tags=["Types"])

class InvestmentTypeItem(BaseModel):
    InvestmentTypeCode: str
    InvestmentTypeDescription: str

class TypeCreate(BaseModel):
    fmHostComplyCode: str = None  # auto-filled via proxy_request if None
    InvestmentTypes: List[InvestmentTypeItem]

@router.get("/")
def list_types(
    fmHostComplyCode: str = None,
    page: int = 1,
    size: int = 10,
    shouldPaginate: bool = True,
    search: str = None
):
    params = {
        "fmHostComplyCode": fmHostComplyCode,
        "page": page,
        "size": size,
        "shouldPaginate": shouldPaginate
    }
    if search:
        params["search"] = search
    return proxy_request("GET", "/types", params=params)

@router.post("/")
def create_type(body: TypeCreate):
    return proxy_request("POST", "/types", body=body.dict())
