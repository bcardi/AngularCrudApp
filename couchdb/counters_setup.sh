echo %1
curl -X PUT http://127.0.0.1:5984/counters
curl -X PUT http://127.0.0.1:5984/counters/_design/api --data-binary @counters_design.json