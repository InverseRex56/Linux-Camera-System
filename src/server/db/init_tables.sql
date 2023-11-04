-- This file initiables all tables and their corresponding schemas for our database backend

CREATE TABLE IF NOT EXISTS status(
    cam_id                 int,
    cam_status             int,
    most_recent_pic        varchar(80)
);


CREATE TABLE IF NOT EXISTS events(
    cam_id                 int,
    events                 int,
    datetimes              varchar(80)
);