class SalesOrder {
    constructor() {
        this.tranid = '';
        this.date = '';
        this.entity;
        this.lineitems = [];
        this.priceInfo = [];
    }
}

class Item {
    constructor() {
        this.itemId = '';
        this.description = '';
        this.priceLevels = [];
    }
}

class PriceLevels {
    constructor(qty, price) {
        this.qty = qty;
        this.price = price;
    }
}