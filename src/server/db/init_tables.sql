-- This file initiables all tables and their corresponding schemas for our database backend

CREATE TABLE IF NOT EXISTS camera_status(
    cam_id                 int,
    cam_status             int,
    most_recent_pic        varchar(80)
);


CREATE TABLE IF NOT EXISTS events(
    cam_id                 int,
    events                 int,
    datetimes              varchar(80)
);

INSERT INTO camera_status (cam_id, cam_status, most_recent_pic) VALUES (1, 2, 'GMU');
INSERT INTO camera_status (cam_id, cam_status, most_recent_pic) VALUES (3, 4, 'JMU');

INSERT INTO events (cam_id, events, datetimes) VALUES (5, 6, 'today');
INSERT INTO events (cam_id, events, datetimes) VALUES (7, 8, 'yesterday');