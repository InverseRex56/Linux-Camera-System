import cv2
from flask import Flask, Response

app = Flask(__name__)

# Initialize the webcam
cap = cv2.VideoCapture(0)  # 0 corresponds to the default webcam

@app.route('/')
def index():
    return "Welcome to the video streaming server!"

def gen_frames():
    while True:
        ret, frame = cap.read()
        if not ret:
            break

        # Compress the frame using JPEG compression with a quality of 80
        _, img_encoded = cv2.imencode(".jpg", frame, [int(cv2.IMWRITE_JPEG_QUALITY), 80])

        # Yield the compressed image data as a response
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + img_encoded.tobytes() + b'\r\n')

@app.route('/video_feed')
def video_feed():
    return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run(debug=True)






