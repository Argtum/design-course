function older()
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
        if (maxAge == undefined)
        {
            maxAge = staff[key];
            staffName = key;
            continue;
        } 
        else if (maxAge < staff[key]) 
        {
            maxAge = staff[key];
            staffName = key;
        }
    }
    
    let olderStaff =
    {
        name: staffName,
        age: maxAge
    };
    return olderStaff;
}

var olderStaff = older()

alert(olderStaff.name + ': ' + olderStaff.age);