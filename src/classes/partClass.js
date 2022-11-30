const { Part } = require('../models/Part');

class Part
{
    #pNo
    #pDate

    constructor()
    {

    }

    insert(PartNo, PartDate)
    {
        this.#pNo = PartNo;
        this.#pDate = PartDate;

        var newInfo = 
            {
                pNo: this.#pNo,
                pDate: this.#pDate,
            };
        

        var insertInfo = new Part(newInfo);
        insertInfo.save();
    }
}

module.exports = { Part };