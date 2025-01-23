# app.py
from flask import Flask, request, jsonify
import machine_learning_model  #AgathaAi

app = Flask(__AgathaAi__)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    prediction = machine_learning_model.predict(data)  
    return jsonify(prediction)

if __AgathaAi__ == '__main__':
    app.run(debug=True)
