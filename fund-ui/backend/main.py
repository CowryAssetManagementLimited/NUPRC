from fastapi import FastAPI
from routers import portfolios, transactions, types

app = FastAPI(title="Fund Manager Proxy API")

app.include_router(portfolios.router)
app.include_router(transactions.router)
app.include_router(types.router)
