function getOlderStuff()
{
    const staff = {
        "Вася": -23,
        "Петя": -27,
        "Даша": -22,
    };
    
    let staffName = '';
    let maxAge;

    console.log(maxAge);
    
    for (const key in staff) {
        if (maxAge < staff[key] || maxAge == undefined)
        {
            maxAge = staff[key];
            staffName = key;
        }
    }

    return {
        name: staffName,
        age: maxAge
    }
}

var olderStaff = getOlderStuff()

alert(olderStaff.name + ': ' + olderStaff.age);