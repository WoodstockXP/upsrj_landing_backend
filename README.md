<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# UPSRJ Landing (Backend)

## PASOS

1. Clonar repositorio

```
git clone https://github.com/WoodstockXP/upsrj_landing_backend.git
```
```
cd upsrj_landing_backend
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

3. Renombrar ```.env.template``` a ```.env``` y modificar variables de entorno

4. Levantar contenedor de PostgreSQL

```
docker-compose up -d
```

5. Iniciar el servidor de desarrollo 

```
npm run start:dev
```
