## TODO:

- add token to raise limit of gh users(60 => 500 ph)
- test all new features
- start with UI

## Requirements

- Heroku Account - https://heroku.com
- Postgres DB in Heroku. Video [CLICK](https://cdn.rawgit.com/SaraVieira/graphql-workshop/13d73f3b/howtoheroku.mp4)

## Start

```
concurrently: npm run start
/server: npm run dev
/client: npm run start
```

## Backend

- open http://localhost:4000
- use SCHEMA for Queries, Mutations

```
query FindDonate {
  donates(filter: { title_iLike_starts: "ti" }) {
    id
    title
    donators {
      name
    }
  }
}
```
