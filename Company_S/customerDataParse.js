const fs = require('fs')

fs.readFile('./data.json', 'utf8', (err, jsonString) => {
    if (err) {
        console.log("File read failed: ", err);
        return;
    }
    try {
        const data = JSON.parse(jsonString);
        const invalidRecords = parse(data);
        for (const record of invalidRecords) {
            console.log(record);
        }
    } catch (err) {
        console.error(err);
    }
});

// script ran in terminal to print output:
// node customerDataParse.js > output.txt
// 9595 IDs were recorded

const parse = (data) => {
    const invalidRecords = new Set();
    const nameMap = {};
    const addressMap = {};

    for (let i = 0; i < data.length; i++) {
        const currRecord = data[i];

        const currName = currRecord.name;
        const currAddress = currRecord.address;
        const currZip = currRecord.zip;
        const currId = currRecord.id;

        if (isNameNullMissingBlank(currRecord)) {
            if (!isAddressNullMissingBlank(currRecord))
                addValue(addressMap, currAddress, currId);
        }

        if (isAddressNullMissingBlank(currRecord)) {
            if (!isNameNullMissingBlank(currRecord))
                addValue(nameMap, currName, currId);
        }

        if (nameMap.hasOwnProperty(currName)) {
            invalidRecords.add(currId);
            for (const id of nameMap[currName]) {
                invalidRecords.add(id);
            }
            nameMap[currName] = [];
        }

        if (addressMap.hasOwnProperty(currAddress)) {
            invalidRecords.add(currId);
            for (const id of addressMap[currAddress]) {
                invalidRecords.add(id);
            }
            addressMap[currAddress] = [];
        }

        if (!isNameNullMissingBlank(currRecord))
            addValue(nameMap, currName, currId);

        if (!isAddressNullMissingBlank(currRecord))    
            addValue(addressMap, currAddress, currId);

        if (!currRecord.hasOwnProperty('zip') 
            || currZip === null 
            || currZip.length !== 5)
        {
            invalidRecords.add(currId);
            continue;
        } else {
            for (const c of currZip) {
                if (c < '0' || c > '9') {
                    invalidRecords.add(currId);
                }
            }
        }
    }

    return invalidRecords;
}

const addValue = (map, key, value) => {
    map[key] = map[key] || [];
    map[key].push(value);
}

const isNameNullMissingBlank = (record) => {
    if (!record.hasOwnProperty('name')) {
        return true;
    }
    return record.name === null
            || record.name.length === 0; 
}

const isAddressNullMissingBlank = (record) => {
    if (!record.hasOwnProperty('address')) {
        return true;
    }
    return record.address === null
            || record.address.length === 0;
}