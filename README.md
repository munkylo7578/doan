# Docker Guide (Client App + Admin App)

This guide explains how to run **both projects** with Docker:

- `adminapp` on **http://localhost:7000**
- `clientapp` on **http://localhost:7001**

## Documentation

Project documentation is available here:

- https://drive.google.com/file/d/1M9NkKgXiJky3PGXNURIuMwJOfItorSnr/view?usp=sharing

## Prerequisites

- Install **Docker Desktop**
- Make sure Docker is running

## Run Both Apps

From the project root (`doan`), run:

```bash
docker compose up --build -d
```

Open in browser:

- Admin App: http://localhost:7000
- Client App: http://localhost:7001

## Run Only One App (Optional)

```bash
docker compose up --build -d adminapp
```

```bash
docker compose up --build -d clientapp
```

## Useful Commands

### View logs

```bash
docker compose logs -f
```

Or for a single service:

```bash
docker compose logs -f adminapp
```

```bash
docker compose logs -f clientapp
```

### Stop both apps

```bash
docker compose stop
```

### Stop one app

```bash
docker compose stop adminapp
```

```bash
docker compose stop clientapp
```

### Remove containers

```bash
docker compose down
```

### Rebuild and run again

```bash
docker compose up --build -d
```
