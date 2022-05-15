module.exports = {
    sortAirports: (airportsRaw) => {
        let collator = new Intl.Collator();
        return airportsRaw.sort(function (a, b) {
            return collator.compare(a.airport_name, b.airport_name);
        })
    }
}
