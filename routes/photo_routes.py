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

        # Insert photo data into the 'photos' collection
        photo_data = {
            "user": data["user"],
            "photo_url": data["photo_url"],
            "upload_time": datetime.datetime.utcnow()
        }

        result = db['photos'].insert_one(photo_data)

        return jsonify({
            "message": "Photo uploaded successfully!",
            "photo_id": str(result.inserted_id)
        }), 201

    except Exception as e:
        print(f"Error during photo upload: {str(e)}")
        return jsonify({"error": "Internal Server Error", "details": str(e)}), 500

# # Route to retrieve all uploaded photos
# # GET /photos: Retrieves all uploaded photos and returns them as JSON.
# @photo_bp.route('/photos', methods=['GET'])
# def get_photos():
#     try:
#         # Fetch all photos from the 'photos' collection
#         photos = list(db['photos'].find({}, {'_id': 1, 'user': 1, 'photo_url': 1, 'upload_time': 1}))

#         # Convert ObjectId and datetime to string for JSON serialization
#         for photo in photos:
#             photo['_id'] = str(photo['_id'])
#             photo['upload_time'] = photo['upload_time'].strftime('%Y-%m-%d %H:%M:%S')

#         return jsonify({"photos": photos}), 200

#     except Exception as e:
#         print(f"Error retrieving photos: {str(e)}")
#         return jsonify({"error": "Internal Server Error", "details": str(e)}), 500
