from pydantic_settings import BaseSettings
from pydantic import AnyHttpUrl
from typing import List
import secrets


class Settings(BaseSettings):
    PROJECT_NAME: str = "Microplastics API"
    API_V1_STR: str = ""

    # Security
    SECRET_KEY: str = secrets.token_urlsafe(32)
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 12  # 12 hours

    # CORS
    BACKEND_CORS_ORIGINS: List[AnyHttpUrl] | List[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ]

    # Database
    SQLALCHEMY_DATABASE_URI: str = "sqlite:///./microplastics.db"

    class Config:
        case_sensitive = True


settings = Settings()
