curl -i -X POST http://localhost:3000/api/v1/todos/ \
    -H "Content-Type: application/json" \
    -d '{ "title": "Todo 1", "id": 1 }'


curl -i -X POST http://localhost:3000/api/v1/todos/ \
    -H "Content-Type: application/json" \
    -d '{ "title": "Todo 2", "id": 2 }'

curl -i -X POST http://localhost:3000/api/v1/todos/ \
    -H "Content-Type: application/json" \
    -d '{ "title": "Todo 3", "id": 3 }'