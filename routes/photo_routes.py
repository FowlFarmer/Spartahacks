from flask import Blueprint, request, jsonify
from bson.objectid import ObjectId
import datetime
from pymongo import MongoClient
import os

photo_bp = Blueprint('photos', __name__)

# Connect to MongoDB again in case of route-level separation
mongo_uri = os.getenv('MONGO_URI')
client = MongoClient(mongo_uri)
db = client['FreezeFrame']

# Photo upload route
# POST /upload: Uploads photo metadata to MongoDB.

@photo_bp.route('/upload', methods=['POST'])
def upload_photo():
    try:
        # Parse and validate request data
        data = request.json
        if not data or not data.get("user") or not data.get("photo_url"):
            return jsonify({"error": "Missing 'user' or 'photo_url'"}), 400

        user = data["user"]
        photo_url = data["photo_url"]

        # **Step 2: Check if user exists in the 'users' collection**
        user_exists = db['users'].find_one({"username": user})
        if not user_exists:
            return jsonify({"error": f"User '{user}' not found. Please register first."}), 404

        # **Step 3: Check for duplicate photo upload**
        duplicate_photo = db['photos'].find_one({"user": user, "photo_url": photo_url})
        if duplicate_photo:
            return jsonify({"error": "Duplicate photo. This photo has already been uploaded by the user."}), 409

        # Insert the new photo
        photo_data = {
            "user": user,
            "photo_url": photo_url,
            "upload_time": datetime.datetime.utcnow()
        }
        result = db['photos'].insert_one(photo_data)

        return jsonify({
            "message": "Photo uploaded successfully!",
            "photo_id": str(result.inserted_id),
            "user": user,
            "upload_time": photo_data["upload_time"].strftime("%Y-%m-%d %H:%M:%S")
        }), 201

    except Exception as e:
        print(f"Error during photo upload: {str(e)}")
        return jsonify({"error": "Internal Server Error", "details": str(e)}), 500


# Get photos for a specific user
# GET /photos?user=<username>: Retrieves all photos uploaded by a specific user and returns as JSON file.
@photo_bp.route('/photos', methods=['GET'])
def get_user_photos():
    try:
        user = request.args.get('user')  # Get user from query parameter

        if not user:
            return jsonify({"error": "Please provide a user"}), 400

        # Query the database for the user's photos
        photos = db['photos'].find({"user": user})

        # Convert MongoDB cursor to a list of dicts
        photo_list = []
        for photo in photos:
            photo['_id'] = str(photo['_id'])  # Convert ObjectId to string
            photo_list.append(photo)

        return jsonify({"photos": photo_list}), 200

    except Exception as e:
        print(f"Error retrieving photos: {str(e)}")
        return jsonify({"error": "Internal Server Error", "details": str(e)}), 500


# POST route in your Flask backend to handle new user registrations.
@photo_bp.route('/register', methods=['POST'])
def register_user():
    try:
        # Parse and validate the request
        data = request.json
        if not data or not data.get("username"):
            return jsonify({"error": "Missing 'username'"}), 400

        username = data["username"]

        # Check if the user already exists
        existing_user = db['users'].find_one({"username": username})
        if existing_user:
            return jsonify({"error": f"User '{username}' already exists."}), 409

        # Insert new user
        user_data = {
            "username": username,
            "created_at": datetime.datetime.utcnow()
        }
        db['users'].insert_one(user_data)

        return jsonify({"message": f"User '{username}' registered successfully!"}), 201

    except Exception as e:
        print(f"Error during user registration: {str(e)}")
        return jsonify({"error": "Internal Server Error", "details": str(e)}), 500
