from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from LLM.app import AppBuilder
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

class Description(BaseModel):
    description: str

@app.post("/")
async def submit_description(description:Description):

    app_builder = AppBuilder()
    
    return {"message": app_builder.build_app(description.description)}

