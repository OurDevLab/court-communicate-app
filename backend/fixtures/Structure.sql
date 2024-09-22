INSERT INTO "Court"(court_id, name, seat, court_type, president_court_id) VALUES (1, "Naczelny Sąd Administracyjny", "central", "SPECIAL", 1);
\copy "Court"(court_id, name, seat, court_type, parent_court_id) FROM './fixtures/Courts.csv' DELIMITER ',' CSV HEADER;

ALTER SEQUENCE "Court_court_id_seq" RESTART WITH 20;

INSERT INTO "Department"(id, name, court_id) VALUES (1,'Kancelaria Prezesa NSA', 1);
\copy "Department"(id, name, court_id, parent_department_id) FROM './fixtures/Departments.csv' DELIMITER ',' CSV HEADER;

ALTER SEQUENCE "Department_department_id_seq" RESTART WITH 20;
