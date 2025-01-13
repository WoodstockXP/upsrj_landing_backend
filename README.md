<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## UPSRJ Landing (Backend)

# PASOS

1. Clonar repositorio

```
git clone entities
```
```
cd entities
```

2. Instalar dependencias

```
npm i @nestjs/config
```
```
npm i @nestjs/typeorm typeorm pg
```
```
npm i pg --save
```
```
npm i class-validator class-transformer
```
```
npm i @nestjs/swagger
```

3. Levandar contenedor de PostgreSQL

```
docker-compose up -d
```

4. Iniciar el servidor de desarrollo 

```
npm run start:dev
```
