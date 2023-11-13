import json
from datetime import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy 

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@db:5432/db'
CORS(app)
db = SQLAlchemy(app)

# Create an empty list to store received data
received_data_list = []

class Status(db.Model):
    __tablename__ = 'Status'

    cam_id = db.Column(db.Integer, primary_key=True)
    status = db.Column(db.Integer)
    most_recent_pic = db.Column(db.String(100))
    
    def __init__(self, cam_id, status, most_recent_pic):
        self.cam_id = cam_id
        self.status = status
        self.most_recent_pic = most_recent_pic

    def jsonify(self):
        return {"cam_id": self.cam_id, "status": self.status, "most_recent_pic": self.most_recent_pic}


@app.route('/send_status', methods = ['POST'])
def cam_status():
    data = request.get_json()
    status = Status(data['cam_id'], data['status'], data['most_recent_pic'])
    db.session.add(status)
    db.session.commit()
    return status.jsonify()

class Event(db.Model):
    __tablename__ = 'Event'

    cam_id = db.Column(db.Integer, primary_key=True)
    event = db.Column(db.Integer)
    sent_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def __init__(self, cam_id, event):
        self.cam_id = cam_id
        self.event = event

    def jsonify(self):
        return {"cam_id": self.cam_id, "event": self.event, "sent_at": self.sent_at}


@app.route('/send_event', methods = ['POST'])
def cam_events():
    data = request.get_json()
    event = Event(data['cam_id'], data['event'])
    db.session.add(event)
    db.session.commit()
    return event.jsonify()

@app.route('/', methods=['POST'])
def receive_data():
    data = request.json
    
    # Append the received data to the list
    received_data_list.append(data)
    
    print("Received data:")
    print(data)
    
    return "Config updated successfully"

@app.route('/get_received_data', methods=['GET'])
def get_received_data():
    # Return the list of received data as JSON
    return json.dumps(received_data_list)

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
        db.session.add(Event(1,2))
        db.session.add(Event(3,4))
        db.session.add(Status(5,6, "SEVEN"))
        db.session.add(Status(8,9, "TEN"))
        db.session.commit()
        app.run(host='0.0.0.0', port=8080)
