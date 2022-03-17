const State = require('../models/state');

exports.addstate = async (req, res) => {
    const { isoCode, country, name } = req.body

    const newState = new State({
        isoCode: isoCode,
        country: country,
        name: name,
    });

    const findexist = await State.findOne({name:name})
    if(findexist){
        res.status(400).json({
            status: false,
            msg: "Already Exists",
            data: {}
        })
    } else {
        newState.save()
        .then(
            res.status(200).json({
                status: true,
                msg: "success",
                data: newState
            })
        )
        .catch(error => {
            res.status(400).json({
                status: false,
                msg: "error",
                error: error
            })
        })
    }
    
}

exports.editstate = async (req, res) => {

    const findandUpdateEntry = await State.findOneAndUpdate({ _id: req.params.id }, { $set: req.body },{new: true}).populate('country')

    if (findandUpdateEntry) {
        res.status(200).json({
            status: true,
            msg: "success",
            data: findandUpdateEntry
        })
    }
    else {
        res.status(400).json({
            status: false,
            msg: "error",
            error: "error"
        })
    }
}


exports.onestate = async (req, res) => {
    const findone = await State.findOne({ _id: req.params.id }).populate('country')
    if (findone) {
        res.status(200).json({
            status: true,
            msg: "success",
            data: findone
        })
    }
    else {
        res.status(400).json({
            status: false,
            msg: "error",
            error: "error"
        })
    }
}


exports.allstate = async (req, res) => {
    const findall = await State.find().populate('country').sort({isoCode:1})
    if (findall) {
        res.status(200).json({
            status: true,
            msg: "success",
            data: findall
        })
    } else {
        res.status(400).json({
            status: false,
            msg: "error",
            error: "error"
        })
    }

}

exports.deletestate = async (req, res) => {
    try {
        const deleteentry = await State.deleteOne({ _id: req.params.id })
        res.status(200).json({
            status: true,
            msg: "success",
            data: deleteentry
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            msg: "error",
            error: error
        })
    }
}
