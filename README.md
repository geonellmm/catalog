# Catalog API

## Tech Stack

- NestJS
- Typescript
- Prisma
- Swagger
- Postgres
- Docker

## Running the Server
This setup ensures that your NestJS application, along with Prisma migrations and seeders, runs smoothly with PostgreSQL in a Dockerized environment.

### Prerequisites
1. Docker: Ensure Docker is installed on your machine. You can download and install it from Docker's official website.
2. Docker Compose: Ensure Docker Compose is installed. It usually comes bundled with Docker Desktop.

### 1. Clone the Repository
Clone your project repository to your local machine.
```bash
git clone https://github.com/your-repo/wristcheck_server.git
cd wristcheck_server
```

### 2. Set Executable Permissions on the Host System
Make sure the entrypoint.sh script has executable permissions on your host system:
```bash
chmod +x /path/to/your/project/entrypoint.sh
```

### 3. Set Up Environment Variables
Ensure your .env file is correctly set up with the following variables:
```bash
DATABASE_URL=
JWT_SECRET_KEY=
PORT=
```

### 4. Build and Start the Containers
Use Docker Compose to build and start the containers.
```bash
docker compose build
docker compose up -d
```

### 5. Access the APIs
Once the containers are up and running, you can access the APIs at http://localhost:3000 and the documentation at http://localhost:3000/api#/

### 6. Stopping the Application
To stop the application, press Ctrl+C in the terminal where Docker Compose is running, and then run:
```bash
docker compose down
```