const { Pathology } = require('../models/pathology.model');
const { FinalReport } = require('../models/finalReport.model');
const { create } = require('../models/user.model');

const pathologyController = {

    getAllPathologys: async (req, res) => {
        try {
            const pathologies = await Pathology.find({});
            res.json(pathologies);  
        } catch (error) {
            res.status(500).json(error);  
        }
    },

    updatePathology: async (req, res) => {
        const { id } = req.params;
        const updates = req.body;

        try {
            let pathology = await Pathology.findById(id);

            if (!pathology) {
                return res.status(404).json({ message: "Pathology not found." });  
            }

            Object.keys(updates).forEach(update => {
                pathology[update] = updates[update];
            });

            await pathology.save();

            if (updates.pathologyCompleted && pathology.pathologyCompleted) {
                const finalReport = new FinalReport(pathology.toObject());
                createdAt: pathology.createdAt;
                await finalReport.save();
                return res.json(finalReport);  
            }

            res.json(pathology); 
        } catch (error) {
            res.status(400).json(error);  
        }
    }

};

module.exports = pathologyController;
