function main()
{
    var user = {};

    addProperties(user, "name", 'Вася');
    addProperties(user, "surname", 'Петров');
    showObject(user);
    addProperties(user, "name", 'Сергей');
    showObject(user);
    deleteproperties(user, "name");
    showObject(user);

    function deleteproperties(object, value)
    {
        delete object[value];
    }

    function addProperties(objectName, propertiesName, value)
    {
        objectName[propertiesName] = value;
    }

    function showObject(object)
    {
        console.log(object);
    }
}

main();