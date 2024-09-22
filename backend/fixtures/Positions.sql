\copy "Position"(id, name, position_type) FROM './fixtures/Positions.csv' DELIMITER ',' CSV HEADER;
ALTER SEQUENCE "JobPosition_job_position_id_seq" RESTART WITH 20;