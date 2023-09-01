import cv2
import zmq

# Initialize the webcam
cap = cv2.VideoCapture(0)  # 0 corresponds to the default webcam

# Initialize the video writer
fourcc = cv2.VideoWriter_fourcc(*'XVID')
out = cv2.VideoWriter('output.avi', fourcc, 20.0, (640, 480))

# Initialize the ZMQ context and socket
context = zmq.Context()
socket = context.socket(zmq.PUSH)
socket.bind("tcp://*:5555")  # Bind to a port for communication

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # Display the captured frame
    cv2.imshow("Webcam Feed", frame)
    print("Frame displayed")

    # Write the frame to the video file
    out.write(frame)
    print("Frame written to video file")

    # Break down the frame to bytes and send it to the ZMQ socket
    _, img_encoded = cv2.imencode(".jpg", frame)
    img_byte_array = img_encoded.tobytes()
    # socket.send(img_byte_array)
    print("Frame sent to ZMQ socket")

    # Check for key press (waitKey) to allow for Ctrl+C interruption
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break
    print("repeat")

# Release the OpenCV window, camera, video writer, and ZMQ socket
cv2.destroyAllWindows()
cap.release()
out.release()
socket.close()

# comments
# using gpu to speed up yolo and reduce power usage.
# this comes with decoder.
#midnigt synth serendipity