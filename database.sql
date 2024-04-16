-- These two lines make it so that every single SQL query in
-- this file can be ran all at once to "reset" the database:
DROP TRIGGER IF EXISTS "on_volcanoes_update" ON "volcanoes";
DROP TABLE IF EXISTS "volcanoes";

-- Table Schema Template:
CREATE TABLE "volcanoes" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(500) NOT NULL,
  "erupting_now" BOOLEAN,
  "last_year_erupted" INTEGER,
  "country" VARCHAR(500) NOT NULL,
  "pic" VARCHAR(500),
  "inserted_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Seed Data Template:
INSERT INTO "volcanoes"
  ( name, erupting_now, last_year_erupted, country, pic )
  VALUES
  ('Haleakala', false, 1480, 'United States', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Haleakala_crater_%281%29.jpg/1920px-Haleakala_crater_%281%29.jpg'),
  ('Lassen', false, 1921, 'United States','https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Lassen_Peak_and_Lake_Helen.jpg/568px-Lassen_Peak_and_Lake_Helen.jpg'),
  ('Mount St. Helens', false, 1980, 'United States','https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/MSH82_st_helens_plume_from_harrys_ridge_05-19-82.jpg/1920px-MSH82_st_helens_plume_from_harrys_ridge_05-19-82.jpg'),
  ('Fernadina', true, 2024, 'Ecuador','https://eoimages.gsfc.nasa.gov/images/imagerecords/152000/152538/fernandinavolcano_oli_20240307_lrg.jpg'),
  ('Santa Maria', true, 2024, 'Guatamala','https://en.wikipedia.org/wiki/Santa_María_(volcano)#/media/File:Santiaguito_from_Santamaria.jpg'),
  ('Kilauea', false, 2023, 'United States','https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Kilauea_Fissure_8_cone_erupting_on_6-28-2018.jpg/1920px-Kilauea_Fissure_8_cone_erupting_on_6-28-2018.jpg'),
  ('Stromboli', true, 2024, 'Italy','https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Aerial_image_of_Stromboli_%28view_from_the_northeast%29.jpg/1920px-Aerial_image_of_Stromboli_%28view_from_the_northeast%29.jpg');

-- Creates a trigger that handles the updated_at magic:
  -- https://x-team.com/blog/automatic-timestamps-with-postgresql/
CREATE OR REPLACE FUNCTION set_updated_at_to_now()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_volcanoes_update
BEFORE UPDATE ON volcanoes
FOR EACH ROW
EXECUTE PROCEDURE set_updated_at_to_now();
