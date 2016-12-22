#!/usr/bin/env node

const fs = require('fs');
const args = process.argv.slice(2)

const INNERSEP = ';'
const SEP = ','

function usage() {
    console.log(`${process.argv[1]} csv`)
}

function _quote(s) {
    if (Array.isArray(s)) s = s.join(INNERSEP);
    return '"' + s.replace('"', '\"') + '"'
}

const csvKeys = [
    ['from_type',        link => link.fromEntity.entityType],
    ['from_identifiers', link => link.fromEntity.identifiers],
    ['to_type',          link => link.toEntity.entityType],
    ['to_identifiers',   link => link.toEntity.identifiers],
    ['from_title',       link => link.fromEntity.name],
    ['to_title',         link => link.toEntity.name],
    ['relation',         link => link.entityRelations],
]


let jsonStr = ''
process.stdin.setEncoding('utf8');
process.stdin.on('readable', () => {
    let chunk;
    while (chunk = process.stdin.read()) jsonStr += chunk;
})
process.stdin.on('end', () => {
    // header
    console.log(csvKeys.map(csvDef => csvDef[0]).join(','))
    // rows
    JSON.parse(jsonStr).forEach(link => {
        // console.error(link)
        console.log(csvKeys.map(csvDef => _quote(csvDef[1](link))).join(','))
    })
})
