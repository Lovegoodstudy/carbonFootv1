function storageInit() {
    localStorage.setItem('carbonFootList', JSON.stringify([]));
    id = 0;
}

function getCarbonFootData() {
    let carbonFootList = JSON.parse(localStorage.getItem('carbonFootList'));
    return carbonFootList;
}

function addCarbonFoot(itemInfo) {
    let carbonFootList = JSON.parse(localStorage.getItem('carbonFootList'));
    id++;
    itemInfo.id = id;
    carbonFootList.push(itemInfo);
    localStorage.setItem('carbonFootList', JSON.stringify(carbonFootList));
}

function deleteCarbonFoot(id) {
    let carbonFootList = JSON.parse(localStorage.getItem('carbonFootList'));
    for (let key in carbonFootList) {
        if (carbonFootList[key].id === id) {
            carbonFootList.splice(key, 1);
        }
    }
    localStorage.setItem('carbonFootList', JSON.stringify(carbonFootList));
}