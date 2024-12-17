from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from models import User, Base
from database import engine, get_db
import random
import string
from datetime import datetime, UTC
from passlib.context import CryptContext
from pydantic import BaseModel
from typing import Optional
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize database tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Configure CORS
origins = [
    "http://localhost:3000",
    "http://localhost:80",
    "http://localhost",
    "http://frontend:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Pydantic models for request bodies
class UserCreate(BaseModel):
    username: str
    email: str
    password: str

class UserValidate(BaseModel):
    username: str
    code: str

class UserSignIn(BaseModel):
    username: str
    password: str

class UserSignOut(BaseModel):
    username: str

class UserResponse(BaseModel):
    username: str
    email: str
    is_validated: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

@app.get("/users")
async def list_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    return [{"username": user.username,
             "email": user.email,
             "is_validated": user.is_validated,
             "created_at": user.created_at} for user in users]

@app.post("/register")
async def register(user: UserCreate, db: Session = Depends(get_db)):
    logger.info(f"Attempting to register user: {user.username}")
    
    db_user = db.query(User).filter(User.username == user.username).first()
    if db_user:
        logger.warning(f"Registration failed: Username {user.username} already exists")
        raise HTTPException(status_code=400, detail="Username already registered")
    
    validation_code = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
    hashed_password = pwd_context.hash(user.password)
    
    db_user = User(
        username=user.username,
        email=user.email,
        password=hashed_password,
        validation_code=validation_code
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    logger.info(f"Successfully registered user: {user.username}")
    return {"message": "Registration successful", "validation_code": validation_code}

@app.post("/validate")
async def validate(user: UserValidate, db: Session = Depends(get_db)):
    logger.info(f"Attempting to validate user: {user.username}")
    
    db_user = db.query(User).filter(User.username == user.username).first()
    if not db_user or db_user.validation_code != user.code:
        logger.warning(f"Validation failed for user: {user.username}")
        raise HTTPException(status_code=400, detail="Invalid validation code")
    
    db_user.is_validated = True
    db_user.validation_code = None
    db.commit()
    
    logger.info(f"Successfully validated user: {user.username}")
    return {"message": "Account validated successfully"}

@app.post("/signin")
async def signin(user: UserSignIn, db: Session = Depends(get_db)):
    logger.info(f"Signin attempt for user: {user.username}")
    
    db_user = db.query(User).filter(User.username == user.username).first()
    if not db_user:
        logger.warning(f"Signin failed: User not found: {user.username}")
        raise HTTPException(status_code=400, detail="User not found")
    if not db_user.is_validated:
        logger.warning(f"Signin failed: User not validated: {user.username}")
        raise HTTPException(status_code=400, detail="Account not validated")
    if not pwd_context.verify(user.password, db_user.password):
        logger.warning(f"Signin failed: Invalid password for user: {user.username}")
        raise HTTPException(status_code=400, detail="Invalid password")
    
    logger.info(f"Successful signin for user: {user.username}")
    return {"message": "Signed in successfully", "username": user.username}

@app.post("/signout")
async def signout(user: UserSignOut):
    logger.info(f"User signed out: {user.username}")
    return {"message": "Signed out successfully"}

@app.get("/home")
async def home(username: Optional[str] = None):
    if username:
        logger.info(f"Home page access by user: {username}")
        return {"message": f"Welcome {username}!"}
    logger.info("Home page access by guest")
    return {"message": "Welcome guest!"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}