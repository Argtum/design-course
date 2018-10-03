showWeekDay(tranformWeekday(getWeekDay()));

function getWeekDay()
{
    let day = new Date();
    return day.getDay();
}

function tranformWeekday(day)
{
    let weekDay = 'Сегодня '
    let dayOfWeek = '';
    if (day == 0)
        {
            dayOfWeek = weekDay + 'воскресенье';
        }
    else if (day == 1)
        {
            dayOfWeek = weekDay + 'понедельник';
        }
    else if (day == 2)
        {
            dayOfWeek = weekDay + 'вторник';
        }
    else if (day == 3)
        {
            dayOfWeek = weekDay + 'среда';
        }
    else if (day == 4)
        {
            dayOfWeek = weekDay + 'четверг';
        }
    else if (day == 5)
        {
            dayOfWeek = weekDay + 'пятница';
        }
    else if (day == 6)
        {
            dayOfWeek = weekDay + 'суббота';
        }
    return dayOfWeek;
}

function showWeekDay(day)
{
    alert(day);
}