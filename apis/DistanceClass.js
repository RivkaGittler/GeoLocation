class Distance {
    constructor() {
        this.source = null;
        this.destination = null;
        this.distance = null;
    }

    setSource(source) {
        this.source = source;
        return this;
    }

    setDestination(destination) {
        this.destination = destination;
        return this;
    }

    setDistance(distance) {
        this.distance = distance;
        return this;
    }

    get(callback) {

        var list = {};

        list.source = this.source;
        list.destination = this.destination;
        list.distance = this.distance;

        callback(list);
    }
}
module.exports = Distance;