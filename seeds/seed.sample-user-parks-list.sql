BEGIN;

TRUNCATE
  user_parks
  RESTART IDENTITY CASCADE;

INSERT INTO user_parks (parks, user_id)
VALUES
  (ARRAY ['fopo', 'goga', 'haha'], 1);
  
COMMIT;