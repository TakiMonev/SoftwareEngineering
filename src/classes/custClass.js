
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

    Insert(CusNo, CusName, CusTel, CusAddr)
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

    async Delete(del)
    {
        const customer = await Cust.findOne({ cusNo: del });
        
        if (customer === null) 
        {
            console.log("Data not found");
            return null;
        }

        const ret = await Cust.findOneAndDelete({ cusNo: del });
        return ret;
    }

    async Update(before, after)
    {
        const customer = await Cust.findOne({ cusNo: before });
        
        if (customer === null) 
        {
            console.log("Data not found");
            return null;
        }

        const ret = await Cust.updateOne({ cusNo: before }, { cusNo: after });

        return ret;
    }
}

module.exports = { Customer };