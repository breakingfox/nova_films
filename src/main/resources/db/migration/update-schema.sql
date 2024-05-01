CREATE SEQUENCE IF NOT EXISTS token_seq START WITH 1 INCREMENT BY 50;

CREATE TABLE token
(
    id         INTEGER NOT NULL,
    token      VARCHAR(255),
    token_type VARCHAR(255),
    revoked    BOOLEAN NOT NULL,
    expired    BOOLEAN NOT NULL,
    user_id    BIGINT,
    CONSTRAINT pk_token PRIMARY KEY (id)
);

ALTER TABLE user_
    ADD role VARCHAR(255);

ALTER TABLE token
    ADD CONSTRAINT uc_token_token UNIQUE (token);

ALTER TABLE token
    ADD CONSTRAINT FK_TOKEN_ON_USER FOREIGN KEY (user_id) REFERENCES user_ (id);

ALTER TABLE movie
    ALTER COLUMN thumbnail TYPE VARCHAR(255) USING (thumbnail::VARCHAR(255));

ALTER TABLE movie
    ALTER COLUMN video_url TYPE VARCHAR(255) USING (video_url::VARCHAR(255));