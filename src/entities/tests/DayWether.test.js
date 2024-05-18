const DayWether = require('../DayWether');
const Temperature = require('../Temperature');

describe('DayWether._LT_by_time_distance', () => {
    test('compares eq dates', () => {
        const dayW = new DayWether();
        const t1 = new Date('2000-01-12T10:00:00Z');
        const t2 = new Date('2000-01-12T10:00:00Z');
        const appropriate_time = new Date('2001-02-12T10:00:00Z');
        expect(dayW._LT_by_time_distance(t1, t2, appropriate_time)).toBe(true)
    });

    test('compares dates 1', () => {
        const dayW = new DayWether();
        const t1 = new Date('2000-01-12T10:00:00Z');
        const t2 = new Date('2008-02-12T10:00:00Z');
        const appropriate_time = new Date('2010-02-12T10:00:00Z');
        expect(dayW._LT_by_time_distance(t1, t2, appropriate_time)).toBe(false)
    });

    test('compares dates 2', () => {
        const dayW = new DayWether();
        const t1 = new Date('2000-01-12T10:00:00Z');
        const t2 = new Date('2003-02-12T10:00:00Z');
        const appropriate_time = new Date('2001-02-12T10:00:00Z');
        expect(dayW._LT_by_time_distance(t1, t2, appropriate_time)).toBe(true)
    });
})

describe('DayWether.filter_temperatures_by_time', () => {
    test('get temperature for about 14 pm, if 14pm exist', () => {
        const T1 = new Temperature(new Date('2003-02-12T13:00:00Z'), 1);
        const T2 = new Temperature(new Date('2003-02-12T17:00:00Z'), 2);
        const T3 = new Temperature(new Date('2003-02-13T14:00:00Z'), 3);
        const T4 = new Temperature(new Date('2003-02-12T11:00:00Z'), 4);
        const T5 = new Temperature(new Date('2003-02-14T01:00:00Z'), 5);
        const T6 = new Temperature(new Date('2003-02-14T23:00:00Z'), 6);

        const dayW = new DayWether(new Date(), null, [T1, T2, T3, T4, T5, T6]);
        const result = dayW.filter_temperatures_by_time(new Date('0000T14:00:00Z'));
        expect(result.temperatures.map(t => t.temperature).toString()).toBe("3");
    });

    test('get temperature for about 14 pm, if 14pm NOT exist', () => {
        const T1 = new Temperature(new Date('2003-02-12T13:00:00Z'), 1);
        const T2 = new Temperature(new Date('2003-02-12T17:00:00Z'), 2);
        const T3 = new Temperature(new Date('2003-02-12T11:00:00Z'), 3);
        const T4 = new Temperature(new Date('2003-02-14T01:00:00Z'), 4);
        const T5 = new Temperature(new Date('2003-02-14T23:00:00Z'), 5);

        const dayW = new DayWether(new Date(), null, [T1, T2, T3, T4, T5]);
        const result = dayW.filter_temperatures_by_time(new Date('0000T14:00:00Z'));
        expect(result.temperatures.map(t => t.temperature).toString()).toBe("1");
    })
})