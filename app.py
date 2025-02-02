from flask import Flask, jsonify

# Initialize Flask app
app = Flask(__name__)

# Test route to check server functionality
@app.route('/')
def home():
    return jsonify({"message": "Hello, Vivian! Your server is running successfully."})

# Run the server
if __name__ == '__main__':
    app.run(debug=True)
