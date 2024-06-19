from flask import Flask
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from flask import jsonify
from flask import request
from flask_cors import CORS
import os
import requests

app = Flask(__name__)
cors = CORS(app, resources={r"/token": {"origins": "http://localhost:3000"}, 
            r"/get-recipes": {"origins": "http://localhost:3000"}, 
            r"/get-recipe-details": {"origins": "http://localhost:3000"}})

app.config["JWT_SECRET_KEY"] = os.environ.get("JWT_SECRET", "secret")
jwt = JWTManager(app)

@app.route('/')
def index():
    return 'Hello, World!'

@app.route("/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email != "test" or password != "test":
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)

@app.route('/get-recipes', methods=['GET'])
@jwt_required()
def get_recipes():
    category = request.args.get('category')
    if not category:
        return jsonify({'error': 'Category is required'}), 400

    url = f'https://www.themealdb.com/api/json/v1/1/filter.php?i={category}'
    response = requests.get(url)

    if response.status_code != 200:
        return jsonify({'error': 'Failed to fetch data'}), 500

    return jsonify(response.json())

@app.route('/get-recipe-details', methods=['GET'])
@jwt_required()
def get_recipe_details():
    id = request.args.get('id')
    if not id:
        return jsonify({'error': 'id is required'}), 400

    url = f'https://www.themealdb.com/api/json/v1/1/lookup.php?i={id}'
    response = requests.get(url)

    if response.status_code != 200:
        return jsonify({'error': 'Failed to fetch data'}), 500

    return jsonify(response.json())

if __name__ == '__main__':
    app.run(debug=True)