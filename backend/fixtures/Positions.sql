\copy "Position"(id, name, position_type) FROM './fixtures/Positions.csv' DELIMITER ',' CSV HEADER;
ALTER SEQUENCE "Position_id_seq" RESTART WITH 20;
