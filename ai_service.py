from flask import Flask, request, jsonify
import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression

app = Flask(__name__)

# Mock training data (just for illustration)
data = pd.DataFrame({
    'player_age': [23, 29, 30, 24, 28],
    'past_performance': [15, 25, 30, 20, 18],
    'projected_points': [18, 27, 33, 23, 20]
})

model = LinearRegression()
model.fit(data[['player_age', 'past_performance']], data['projected_points'])

@app.route('/predict', methods=['POST'])
def predict():
    content = request.json
    player_age = content['player_age']
    past_performance = content['past_performance']
    
    prediction = model.predict(np.array([[player_age, past_performance]]))
    return jsonify({'predicted_points': prediction[0]})

if __name__ == '__main__':
    app.run(port=5000)
