#!env node

const fs = require('fs');
const args = process.argv.slice(2)

function usage() {
    console.log(`${process.argv[1]} csv`)
}

function _quote(s) {
    return '"' + s.replace('"', '\"') + '"'
}

const csvKeys = [
    ['from_identifiers', link => link.fromEntity.identifiers[0]],
    ['from_title',       link => link.fromEntity.name],
    ['from_type',        link => link.fromEntity.entityType],
    ['to_identifiers',   link => link.toEntity.identifiers[0]],
    ['to_title',         link => link.toEntity.name],
    ['to_type',          link => link.toEntity.entityType],
]


if (args[0] === 'csv') {
    fs.readFile('db.json', {encoding:'utf8'}, (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                console.error("ERROR: Run 'make db.json' to download the JSON dump")
                process.exit(1)
            } else {
                console.error(err)
                process.exit(2)
            }
        }
        console.log(csvKeys.map(csvDef => csvDef[0]).join(','))
        JSON.parse(data).forEach(link => {
            console.log(csvKeys.map(csvDef => _quote(csvDef[1](link))).join(','))
        })
    })
} else {
    usage()
}
