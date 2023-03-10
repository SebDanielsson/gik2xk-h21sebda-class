# GIK2XK-h21sebda-lecture1

## Usage

### Start the database

```sh
docker run -d --name gik2xk_blog_db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=blog -p 5432:5432 -v gik2xk_blog_db:/var/lib/postgresql/data postgres
```

### Start the backend

```sh
npm run start
```
