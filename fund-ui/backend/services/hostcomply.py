import requests
from fastapi import HTTPException
from config import BASE_URL, FM_HOST_COMPLY_CODE, HEADERS

def proxy_request(method: str, path: str, params=None, body=None):
    try:
        params = params or {}
        body = body or {}

        if method.upper() == "GET":
            params["fmHostComplyCode"] = FM_HOST_COMPLY_CODE
        else:  # POST/PUT etc.
            body["fmHostComplyCode"] = FM_HOST_COMPLY_CODE

        resp = requests.request(
            method=method,
            url=f"{BASE_URL}{path}",
            headers=HEADERS,
            params=params,
            json=body
        )

        print(f"🔎 DEBUG {method} {path} ->", resp.status_code, resp.text)

        if resp.status_code != 200:
            raise HTTPException(status_code=resp.status_code, detail=resp.json())
        return resp.json()

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
