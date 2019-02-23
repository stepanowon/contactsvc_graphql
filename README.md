# contactsvc2
MongoDB, GraphQL을 이용한 API 서버

------------------------------
### MongoDB Server 기동
* cd ~/mongodb
* mkdir -p data/db
* ./bin/mongod --dbpath data/db --bind_ip localhost --port 27017

### GraphQL Server 기동
* npm install -g babel-cli nodemon
* yarn
* yarn start-dev
---------------------------
## 접근점(Endpoint)
* GraphQL Endpoint : http://localhost:4000/graphql
* Playground Endpoint : http://localhost:4000

## Demo 
* http://sample.bmaster.kro.kr:8080
