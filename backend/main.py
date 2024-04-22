from fastapi import FastAPI


app = FastAPI()

@app.get("/")
def main():
    return {"version": "0.0.1"}