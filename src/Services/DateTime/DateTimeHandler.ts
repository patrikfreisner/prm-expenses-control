// IMPORTANT NOTES...
// Always use non handled date variables, everytime a date variables pass throught a function it values change too;
// Never use .setTime(<number>) because os timezones difference, as i know browser already handle TZ problems;
// Never use .setDate(31) because there is some months without 31 days;

export function getLastMonth(date: Date = new Date()): Date {
    // Always create a new Date variable to avoid changing origin variable value, causing problems in current scope logic;
    var _d: Date = new Date(date);
    _d.setDate(1);
    _d.setMonth(_d.getMonth() - 1);

    return _d;
}

export function getNextMonth(date: Date = new Date()): Date {
    // Always create a new Date variable to avoid changing origin variable value, causing problems in current scope logic;
    var _d: Date = new Date(date);
    _d.setDate(1);
    if (_d.getMonth() == 11) {
        _d = new Date(_d.getFullYear() + 1, 0, 1);
    } else {
        _d = new Date(_d.getFullYear(), _d.getMonth() + 1, 1);
    }

    return _d;
}