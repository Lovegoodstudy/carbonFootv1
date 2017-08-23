let typeArr = [];
let itemArr = [];

$.ajax({
    url: 'http://119.29.101.205:8081/type',
    type : 'get',
    async : false,
    success : function (data) {
        typeArr = data;
    }
});

$.ajax({
    url: 'http://119.29.101.205:8081/item',
    type : 'get',
    async : false,
    success : function (data) {
        itemArr = data;
    }
});

function getTypeArrData() {
    return typeArr;
}

function getTypeByName(name) {
    for (let type of typeArr) {
        if (type.name === name) {
            return type;
        }
    }
}

function getItemArrData(type) {
    let itemArrSelectById = [];
    for (let item of itemArr) {
        if (item.typeId === type.id) {
            itemArrSelectById.push(item);
        }
    }
    return itemArrSelectById;
}

function getItemByName(name) {
    for (let item of itemArr) {
        if (item.name === name) {
            return item;
        }
    }
}

function getCarbonAmount() {
    let carbonFootList = getCarbonFootData();
    let amount = 0;
    for (let carbonFoot of carbonFootList) {
        amount += carbonFoot.carbonAmount;
    }
    return amount;
}