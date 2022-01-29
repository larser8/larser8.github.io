const mixedArray = [3,13,74,14,66,15,22,4];

const isEven = num => {
    return num % 2 === 0; // остаток деления !
}

const filterArray = ( arrToFilter,filterFn )=> {

    const filteredArray = [];

    arrToFilter.forEach(num =>{
        if (filterFn(num)){
            filterArray.push(num);
        }
    })

    return filteredArray;
}

console.log(filterArray(mixedArray, isEven));