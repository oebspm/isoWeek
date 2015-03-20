function IsoWeek() {
    //nothing to do here yet;
}


IsoWeek.prototype.getDate = function(week) {

    var y = parseInt(week.toString().substr(0, 4));
    var w = parseInt(week.toString().substr(4, 5));

    var simple = new Date(y, 0, 1 + (w - 1) * 7);
    var dow = simple.getDay();
    var weekStart = simple;

    if (dow <= 4)
        weekStart.setDate(simple.getDate() - simple.getDay() + 1);
    else
        weekStart.setDate(simple.getDate() + 8 - simple.getDay());

    return weekStart;
};


IsoWeek.prototype.getWeek = function(d) {
    d = new Date(+d);
    d.setHours(0,0,0);

    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setDate(d.getDate() + 4 - (d.getDay()||7));
    // Get first day of year
    var yearStart = new Date(d.getFullYear(),0,1);
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    // Return ISO week number
    return d.getFullYear().toString().concat(weekNo < 10 ? '0'.concat(weekNo.toString()) : weekNo.toString());
};


IsoWeek.prototype.addWeek = function(week, add) {
    var w = Math.ceil(parseInt(week.toString().substr(4, 5)) + add);

    if (w >= 1 && w <= 52) return week.toString().substr(0, 4).concat(w < 10 ? '0'.concat(w.toString()) : w.toString());
    else {
        var d = this.getDate(week);
        var t = new Date(d);
        t.setDate(d.getDate() + add*7);
        return this.getWeek(t);
    }
};


IsoWeek.prototype.addDay = function(d, days) {
    var today = new Date(d);
    var new_date = new Date(today);
    new_date.setDate(new_date.getDate()+days);
    return new_date;
};


IsoWeek.prototype.dateDiff = function(date1, date2) {
    var timeDiff = date2.getTime() - date1.getTime();
    return Math.round(timeDiff / (1000 * 3600 * 24));
};


IsoWeek.prototype.weekDiff = function(week1, week2) {
    var date1 = this.getDate(week1);
    var date2 = this.getDate(week2);
    return Math.round(this.dateDiff(date1, date2) / 7);
};

IsoWeek.prototype.dateInWeek = function(day, month, week) {
    var monday = this.getDate(week);
    var sunday = this.addDay(monday, 6);
    var date1 = new Date(monday.getFullYear() + '-' + month + '-' + day);
    var date2 = new Date(sunday.getFullYear() + '-' + month + '-' + day);
    monday = Math.round(monday.getTime() / (1000 * 3600 * 24));
    sunday = Math.round(sunday.getTime() / (1000 * 3600 * 24));
    date1 = Math.round(date1.getTime() / (1000 * 3600 * 24));
    date2 = Math.round(date2.getTime() / (1000 * 3600 * 24));

    return ((date1 >= monday && date1 <= sunday) || (date2 >= monday && date2 <= sunday));
};


var isoWeek = new IsoWeek();
exports.isoWeek = isoWeek;
