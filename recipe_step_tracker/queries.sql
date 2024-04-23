CREATE TABLE recipes (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name varchar(200)
);

CREATE TABLE recipe_steps (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    step text,
    completed boolean,
    recipe_id integer REFERENCES recipes(id)
);

INSERT INTO recipes(name) 
VALUES ('First Recipe');

INSERT INTO recipe_steps(step, completed, recipe_id)
VALUES ('New step', false, 1);