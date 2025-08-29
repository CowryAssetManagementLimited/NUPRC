import requests
from fastapi import HTTPException
from config import BASE_URL, FM_HOST_COMPLY_CODE, HEADERS

def proxy_request(method: str, path: str, params=None, body=None):
    """Generic request proxy to HostComply API"""
    try:
        params = params or {}
        params["fmHostComplyCode"] = FM_HOST_COMPLY_CODE

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
