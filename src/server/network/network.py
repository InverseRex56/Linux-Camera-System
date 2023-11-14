import json
from datetime import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy 

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@db:5432/db'
CORS(app)
db = SQLAlchemy(app)

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

@app.route('/get_status_data', methods=['GET'])
def get_status_data():
    data_db = Status.query.all()
    data_list = []

    for status in data_db:
        data_list.append({
            'cam_id': status.cam_id,
            'status': status.status,
            'most_recent_pic': status.most_recent_pic
        })

    return jsonify({'data': data_list})

@app.route('/get_event_data', methods=['GET'])
def get_event_data():
    data_db = Event.query.all()
    data_list = []

    for event in data_db:
        data_list.append({
            'cam_id': event.cam_id,
            'event': event.event,
            'sent_at': event.sent_at
        })

    return jsonify({'data': data_list})

@app.route('/replace_row_data_for_status', methods=['POST'])
def replace_row_data_for_status():
    data = request.get_json()
    
    # Assuming data contains 'cam_id', 'status', and 'most_recent_pic'
    # Replace the row in the database using the received data
    status_to_replace = Status.query.get(data['cam_id'])
    
    if status_to_replace:
        status_to_replace.status = data['status']
        status_to_replace.most_recent_pic = data['most_recent_pic']
        db.session.commit()
        return status_to_replace.jsonify()

    return jsonify({'message': 'Row not found'}), 404
    
@app.route('/replace_row_data_for_events', methods=['POST'])
def replace_row_data_for_events():
    data = request.get_json()
    
    # Assuming data contains 'cam_id', 'event', and 'sent_at'
    # Replace the row in the database using the received data
    event_to_replace = Event.query.get(data['cam_id'])
    
    if event_to_replace:
        event_to_replace.event = data['event']
        event_to_replace.sent_at = data['sent_at']
        db.session.commit()
        return event_to_replace.jsonify()

    return jsonify({'message': 'Row not found'}), 404

@app.route('/delete_data_in_row_for_status', methods=['POST'])
def delete_data_in_row_for_status():
    data = request.get_json()
    
    # Assuming data contains 'cam_id' representing the cam_id to be deleted
    try:
        cam_id_to_delete = int(data['cam_id'])
        status_to_delete = Status.query.get(cam_id_to_delete)

        if status_to_delete:
            db.session.delete(status_to_delete)
            db.session.commit()
            return jsonify({'message': f'Row {cam_id_to_delete} deleted successfully'})

        return jsonify({'message': 'Row not found'}), 404
    except ValueError:
        return jsonify({'message': 'Invalid cam_id value'}), 400

@app.route('/delete_data_in_row_for_events', methods=['POST'])
def delete_data_in_row_for_events():
    data = request.get_json()
    
    # Assuming data contains 'cam_id' representing the cam_id to be deleted
    try:
        cam_id_to_delete = int(data['cam_id'])
        event_to_delete = Event.query.get(cam_id_to_delete)

        if event_to_delete:
            db.session.delete(event_to_delete)
            db.session.commit()
            return jsonify({'message': f'Row {cam_id_to_delete} deleted successfully'})

        return jsonify({'message': 'Row not found'}), 404
    except ValueError:
        return jsonify({'message': 'Invalid cam_id value'}), 400


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
        db.session.add(Event(1,2))
        db.session.add(Event(3,4))
        db.session.add(Status(5,6, "SEVEN"))
        db.session.add(Status(8,9, "TEN"))
        db.session.commit()
        app.run(host='0.0.0.0', port=8080)
