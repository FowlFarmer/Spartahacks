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

# # Photo upload route
# # POST /upload: Uploads photo metadata to MongoDB.
# @photo_bp.route('/upload', methods=['POST'])
# def upload_photo():
#     try:
#         # Parse and validate request data
#         data = request.json
#         if not data or not data.get("user") or not data.get("photo_url"):
#             return jsonify({"error": "Missing 'user' or 'photo_url'"}), 400

#         # Insert photo data into the 'photos' collection
#         photo_data = {
#             "user": data["user"],
#             "photo_url": data["photo_url"],
#             "upload_time": datetime.datetime.utcnow()
#         }

#         result = db['photos'].insert_one(photo_data)

#         return jsonify({
#             "message": "Photo uploaded successfully!",
#             "photo_id": str(result.inserted_id)
#         }), 201

#     except Exception as e:
#         print(f"Error during photo upload: {str(e)}")
#         return jsonify({"error": "Internal Server Error", "details": str(e)}), 500

@photo_bp.route('/upload', methods=['POST'])
def upload_photo():
    try:
        # Parse and validate request data
        data = request.json
        if not data or not data.get("user") or not data.get("photo_url"):
            return jsonify({"error": "Missing 'user' or 'photo_url'"}), 400

        # Validate user existence (Optional if users collection is set up)
        existing_user = db['users'].find_one({"username": data["user"]})
        if not existing_user:
            return jsonify({"error": f"User '{data['user']}' not found. Please register first."}), 400

        # Check for duplicate photo uploads
        existing_photo = db['photos'].find_one({"user": data["user"], "photo_url": data["photo_url"]})
        if existing_photo:
            return jsonify({"error": "Duplicate photo. This photo has already been uploaded by the user."}), 409

        # Enforce weekly photo upload limit
        one_week_ago = datetime.datetime.utcnow() - datetime.timedelta(weeks=1)
        photo_count = db['photos'].count_documents({
            "user": data["user"],
            "upload_time": {"$gte": one_week_ago}
        })

        if photo_count >= 20:
            return jsonify({"error": "Weekly upload limit reached. You can only upload 20 photos per week."}), 429

        # Insert photo data
        photo_data = {
            "user": data["user"],
            "photo_url": data["photo_url"],
            "upload_time": datetime.datetime.utcnow()
        }

        result = db['photos'].insert_one(photo_data)

        return jsonify({
            "message": "Photo uploaded successfully!",
            "photo_id": str(result.inserted_id),
            "user": data["user"],
            "upload_time": photo_data["upload_time"]
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
