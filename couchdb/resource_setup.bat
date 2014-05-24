echo %1
curl -X PUT http://127.0.0.1:5984/%1
curl -X PUT http://127.0.0.1:5984/%1/_design/api --data-binary @resource_design.json
curl -X PUT http://127.0.0.1:5984/counters/%1 --data "{\"_id\": \"%1\",\"count\": 0}"