import cv2
import numpy as np
from flask import Flask, request, jsonify

from mmdet.apis import init_detector, inference_detector

# Initialize COCO model
config_file = 'path_to_config_file'  # Replace with the actual path
checkpoint_file = 'path_to_checkpoint_file'  # Replace with the actual path
model = init_detector(config_file, checkpoint_file)

app = Flask(__name__)

def detect_objects(frame):
    # Perform COCO inference
    result = inference_detector(model, frame)
    
    # ... (Process the detections and draw bounding boxes as needed)
    # Modify this function according to your needs

@app.route('/receive_frame', methods=['POST'])
def receive_frame():
    try:
        # Receive the image as a file in the POST request
        if 'image' not in request.files:
            return jsonify({"message": "No image provided"}), 400

        image_file = request.files['image']
        nparr = np.fromstring(image_file.read(), np.uint8)
        frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        # Detect objects
        detected_objects = detect_objects(frame)

        # ... (Your code to draw bounding boxes and process the frame)
        # Modify this part according to your needs

        return jsonify({"message": "Frame received and processed successfully"})

    except Exception as e:
        return jsonify({"message": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5555)
