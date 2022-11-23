const { Cust } = require('../models/Customer');

class Customer 
{
    #cusNo
    #cusName
    #cusTel
    #cusAddr

    constructor()
    {

    }

    insert(CusNo, CusName, CusTel, CusAddr)
    {
        this.#cusNo = CusNo;
        this.#cusName = CusName;
        this.#cusTel = CusTel;
        this.#cusAddr = CusAddr;

        var newCus = 
            {
                cusNo: this.#cusNo,
                cusName: this.#cusName,
                cusTel: this.#cusTel,
                cusAddr: this.#cusAddr
            };
        

        var customer = new Cust(newCus);
        customer.save();
    }
}

module.exports = { Customer };