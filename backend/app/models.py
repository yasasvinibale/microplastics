from datetime import datetime
from typing import Optional

from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey, create_engine
from sqlalchemy.orm import declarative_base, relationship, sessionmaker

from .core.config import settings

Base = declarative_base()


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, default="user", nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    results = relationship("Result", back_populates="owner")


class Result(Base):
    __tablename__ = "results"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    plastic_present = Column(Boolean, default=False)
    particle_count = Column(Integer, default=0)
    safety = Column(String, default="unknown")
    size_range = Column(String, default="")
    polymer_type = Column(String, default="")
    confidence = Column(String, default="")
    created_at = Column(DateTime, default=datetime.utcnow)

    owner = relationship("User", back_populates="results")


# Database setup
engine = create_engine(
    settings.SQLALCHEMY_DATABASE_URI,
    connect_args={"check_same_thread": False} if settings.SQLALCHEMY_DATABASE_URI.startswith("sqlite") else {},
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def init_db():
    Base.metadata.create_all(bind=engine)
