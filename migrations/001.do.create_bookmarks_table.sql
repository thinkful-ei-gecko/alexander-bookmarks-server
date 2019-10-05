CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE bookmark_rating AS ENUM (
    '1',
    '2',
    '3',
    '4',
    '5'
);

create table bookmarks (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    title text NOT NULL,
    link text NOT NULL,
    descrip text DEFAULT '',
    rating INTEGER DEFAULT -1
);