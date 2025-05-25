# Trabalho de Redes

## Membros 
<ul>
  <li>Caio Bastros</li>
  <li>Hugo Vargas</li>
  <li>Luiz Gabriel</li>
  <li>Vinicius Fonseca</li>
</ul>

## Como Rodar

### Cloanando o Repositório
```sh
git clone github.com/Luiznunvoa/trabalho-redes
```
```sh
cd trabalho-redes
```

### Inicializando Server

#### Ir para o Repositório da Api e Instalar as dependencias

```sh
cd api
```

```sh
npm i
```

#### Crie o banco de dados

```sh
docker-compose up --build -d
```

#### Crie o arquivo .env

<ul>
  <li>Procure o arquivo <code>.env.example</code> na raiz do projeto</li>
  <li>Renomeie o arquivo para <code>.env</code></li>
</ul>

#### Migre o esquema do banco de dados

```sh
npx prisma migrate dev
```

#### Execute o server

```sh
npm run start:dev
```

### Inicializando Cliente


#### Ir para o Repositório da Cliente e Instalar as dependencias

```sh
cd client
```

```sh
npm i
```

#### Execute o cliente

```sh
npm run dev
```

