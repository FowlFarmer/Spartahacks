from flask import Flask, jsonify
from pymongo import MongoClient
import os
from dotenv import load_dotenv
from routes.photo_routes import photo_bp  # Import the blueprint

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Connect to MongoDB (global connection)
mongo_uri = os.getenv('MONGO_URI')
client = MongoClient(mongo_uri)
db = client['FreezeFrame']

# Register the blueprint for photo routes
app.register_blueprint(photo_bp)

@app.route('/')
def home():
    try:
        collections = db.list_collection_names()
        return jsonify({
            "message": "MongoDB connection successful!",
            "collections": collections
        })
    except Exception as e:
        return jsonify({"error": "Failed to fetch collections", "details": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
