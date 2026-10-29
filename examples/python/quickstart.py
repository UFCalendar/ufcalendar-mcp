"""Next UFC card and its main event, with the official Python client.

pip install httpx   ·   export UFCALENDAR_API_KEY=ufcalendar_...
Free key (1,000 requests/month, no card): https://www.ufcalendar.com/account/api
"""
import os
import httpx

API = "https://api.ufcalendar.com/v1"
headers = {"Authorization": f"Bearer {os.environ['UFCALENDAR_API_KEY']}"}

events = httpx.get(f"{API}/events", params={"org": "ufc", "status": "upcoming", "limit": 1}, headers=headers).json()
event = events["data"][0]
print(event["title"], event["starts_at"])
