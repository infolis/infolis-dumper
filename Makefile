%.json:
	curl -HAccept:application/json 'http://infolis.gesis.org/infolink/search?regex=on&limit=9999999&id=.*&type=$(basename $@)' \
		> $@.tmp && mv $@.tmp $@

%.csv: %.json
	./create.js < $< > $@.tmp && mv $@.tmp $@

%.clean:
	rm -f *.$(basename $@)
	rm -f *.tmp

clean: json.clean csv.clean

all: publication.csv
