const { Empl } = require('../models/Employ');

class Employ
{
    #worName
    #worTel
    #worAddr
    #worPosition

    constructor()
    {

    }

    insert(WorName, WorTel, WorAddr, WorPosition)
    {
        this.#worName = WorName;
        this.#worTel = WorTel;
        this.#worAddr = WorAddr;
        this.#worPosition = WorPosition;

        var newInfo = 
            {
                worName: this.#worName,
                worTel: this.#worTel,
                worAddr: this.#worAddr,
                cusAddr: this.#worAddr
            };
        

        var insertInfo = new Empl(newInfo);
        insertInfo.save();
    }
}

module.exports = { Customer };