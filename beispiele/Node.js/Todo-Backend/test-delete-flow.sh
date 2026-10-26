./create-items.sh

curl --silent http://localhost:3000/api/v1/todos | jq

curl -X DELETE http://localhost:3000/api/v1/todos/2

curl --silent http://localhost:3000/api/v1/todos | jq