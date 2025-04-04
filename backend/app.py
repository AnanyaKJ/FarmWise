from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from PIL import Image
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

model = load_model('C:/Users/Ananya K.J/plant_disease_model.keras')

class_indices = {
    'Apple__Apple_scab': 0, 'Apple_Black_rot': 1, 'Apple_Cedar_apple_rust': 2, 'Apple__healthy': 3,
    'Blueberry__healthy': 4, 'Cherry(including_sour)__Powdery_mildew': 5, 'Cherry(including_sour)___healthy': 6,
    'Corn_(maize)__Cercospora_leaf_spot Gray_leaf_spot': 7, 'Corn(maize)__Common_rust': 8, 'Corn_(maize)___Northern_Leaf_Blight': 9,
    'Corn_(maize)__healthy': 10, 'Grape_Black_rot': 11, 'Grape_Esca(Black_Measles)': 12, 'Grape__Leaf_blight(Isariopsis_Leaf_Spot)': 13,
    'Grape__healthy': 14, 'Orange_Haunglongbing(Citrus_greening)': 15, 'Peach__Bacterial_spot': 16, 'Peach__healthy': 17,
    'Pepper,bell_Bacterial_spot': 18, 'Pepper,_bell_healthy': 19, 'Potato_Early_blight': 20, 'Potato__Late_blight': 21,
    'Potato__healthy': 22, 'Raspberry_healthy': 23, 'Soybean_healthy': 24, 'Squash_Powdery_mildew': 25, 'Strawberry__Leaf_scorch': 26,
    'Strawberry__healthy': 27, 'Tomato_Bacterial_spot': 28, 'Tomato_Early_blight': 29, 'Tomato__Late_blight': 30,
    'Tomato__Leaf_Mold': 31, 'Tomato_Septoria_leaf_spot': 32, 'Tomato__Spider_mites Two-spotted_spider_mite': 33,
    'Tomato__Target_Spot': 34, 'Tomato_Tomato_Yellow_Leaf_Curl_Virus': 35, 'Tomato_Tomato_mosaic_virus': 36, 'Tomato__healthy': 37
}
class_labels = {v: k for k, v in class_indices.items()}


@app.route('/predict', methods=['POST'])
def predict():
    try:
     
        img = Image.open(request.files['file'])
        img = img.resize((224, 224))  
        img_array = np.array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)  
        
        
        predictions = model.predict(img_array)
        predicted_class = np.argmax(predictions[0])
        predicted_label = class_labels[predicted_class]
        
        return jsonify({"prediction": predicted_label})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)