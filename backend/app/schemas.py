from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, EmailStr


# Auth
class UserBase(BaseModel):
    email: EmailStr


class UserCreate(UserBase):
    password: str
    role: str = "user"


class UserLogin(UserBase):
    password: str


class UserOut(UserBase):
    id: int
    role: str
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: str


# Results
class ResultBase(BaseModel):
    plastic_present: bool
    particle_count: int
    safety: str
    size_range: str
    polymer_type: str
    confidence: str


class ResultOut(ResultBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


# Dashboard / Analytics
class Stats(BaseModel):
    total_tests: int
    plastic_detected: int
    average_purity: float


class HistoryItem(BaseModel):
    id: int
    created_at: datetime
    particle_count: int
    plastic_present: bool


class Analytics(BaseModel):
    by_month: List[int]
    avg_particle_count: float
