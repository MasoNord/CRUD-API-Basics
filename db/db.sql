-- TABLE USER
CREATE TABLE Users (
    id VARCHAR(36) PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    hobbies VARCHAR(8000)
);

INSERT INTO Users (id, username, age, hobbies)
VALUES (
    'f25ba862-397c-4ab5-979b-ca929207a47a',
    "favin",
    12,
    'Fishing, running, sckating'
)
