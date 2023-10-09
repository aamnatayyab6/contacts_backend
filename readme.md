## Backend hosted on Render: Check [Here](https://contacts-backend-hhfn.onrender.com/api/contacts)

Backend: NodeJS (=> 16.19.1), Prisma, SQLite

## How to use on local machine:

1. Clone the repository.
2. Install backend:

```bash
npm install
```

3. Run on localhost:3001:

```bash
npm start
```

4. To run prisma studio on localhost:555:

```bash
npx prisma studio
```

Note: This prisma studio will host only local database (different from render). The application is connected to the sqlite database
generated on render which can not be accessed directly. The contacts.db, schema files and prisma studio however show how local database works generally.