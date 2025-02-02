from pymongo import MongoClient

# Replace <your_password> with your actual password
uri = "mongodb+srv://ngvivian:<your_password>@freezeframe.bmx25.mongodb.net/FreezeFrame?retryWrites=true&w=majority"

try:
    print("📡 Attempting to connect to MongoDB...")

    # Connect to MongoDB
    client = MongoClient(uri)
    print("🌐 MongoClient initialized successfully!")

    # Access database
    db = client['FreezeFrame']
    print(f"🔍 Connected to database: FreezeFrame")

    # Test listing collections
    collections = db.list_collection_names()
    print("✅ Successfully connected to MongoDB!")
    print("Collections in the database:", collections)

except Exception as e:
    print(f"❌ Connection failed: {e}")

finally:
    print("📘 Test finished.")
