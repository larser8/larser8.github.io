const workers = [
    {"name":"John","salary":500},
    {"name":"Mike","salary":1300},
    {"name":"Linda","salary":1500}
];

const getWorthyWorkers = workersArr => {
    const getworthyWorkers = [];

    workersArr.forEach(currentWorker =>{
        if (currentWorker.salary > 1000){
            worthyWorkers.push(currentWorker.name)
        }
    })
    return worthyWorkers;
    // for (let i = 0; i < workersArr.lenght; i++){
    //     const currentWorker = workersArr[i];

    //     if (currentWorker.salary > 1000){
    //         WorthyWorkers.push(currentWorker.name);
    //     }
    // }

    return getWorthyWorkers;
};

console.log(getWorthyWorkers(workers));