# Zona de Conforto

Para executar o projeto copie o arquivo `varenv` para `.env`, atualize algumas variáveis de ambiente, principalmente a `JWT_SECRET_KEY` e as credenciais do banco de dados.

Após isso, execute:

```bash
docker compose up -d
```

Se não tive o docker instalado acesso o site: [Docker](https://docs.docker.com/engine/install/)

## Criando usuário administador

Acesse o container com o nome `zc-web` e execute o comando:

```bash
pnpm db:seed
```

Para visualizar os dados que estão no banco de dados, você pode utilizar o Prisma Studio.
Ainda no terminal do container, execute:

```bash
npx prisma studio
```

O docker compose já está configurado para expor a porta 5555, acesse o `localhost:5555` para ter acesso a interface do Prisma Studio.

### Comandos do Prisma

```bash
    Set up a new local Prisma Postgres `prisma dev`-ready project
    $ prisma init

    Start a local Prisma Postgres server for development
    $ prisma dev

    Generate artifacts (e.g. Prisma Client)
    $ prisma generate

    Browse your data
    $ prisma studio

    Create migrations from your Prisma schema, apply them to the database, generate artifacts (e.g. Prisma Client)
    $ prisma migrate dev

    Pull the schema from an existing database, updating the Prisma schema
    $ prisma db pull

    Push the Prisma schema state to the database
    $ prisma db push

    Validate your Prisma schema
    $ prisma validate

    Format your Prisma schema
    $ prisma format

    Display Prisma version info
    $ prisma version

    Display Prisma debug info
    $ prisma debug
```
