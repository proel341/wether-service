class DayWether {
    constructor(date, location, temperatures) {
        this.date = date;
        this.location = location;
        this.temperatures = temperatures;
    }

    _LT_by_time_distance(t1, t2, appropriate_time=new Date()) {
        const dist1 = Math.abs(appropriate_time.getTime() - t1.getTime());
        const dist2 = Math.abs(appropriate_time.getTime() - t2.getTime());
        return dist1 <= dist2; 
    }

    filter_temperatures_by_time(time, precisely=false) {
        const result = new DayWether(this.date, this.location, this.temperatures);
        const T = new Date(`0000T${time.toISOString().split('T')[1]}`)
        if (precisely)
            result.temperatures = result.temperatures.filter(
                temp => temp.time.getTime() === T.getTime()
            );
        else {
            let bestMatch = undefined;
            result.temperatures.forEach(temp => {
                if (bestMatch) {
                    if (this._LT_by_time_distance(temp.time, bestMatch.time, T))
                        bestMatch = temp;
                }
                else bestMatch = temp;
            })
            result.temperatures = [bestMatch];
        }

        if (result.temperatures.length === 0) 
                return null;
            return result;
    }
}

module.exports = DayWether;