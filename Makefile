db.json:
	curl 'http://infolis.gesis.org/infolink/search?regex=on&id=.*&type=dataset' > $@

db.csv:
	./create.js csv > $@
