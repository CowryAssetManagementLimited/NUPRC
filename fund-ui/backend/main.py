from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import portfolios, transactions, types

app = FastAPI(title="Fund Manager Proxy API")

# CORS settings
origins = ["http://localhost:5173"]  # frontend URL

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(portfolios.router)
app.include_router(transactions.router)
app.include_router(types.router)
