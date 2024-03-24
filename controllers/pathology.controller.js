const {Pathology} = require('../models/pathology.model');
const {FinalReport} = require('../models/finalReport.model');

const pathologyController = {
    
    getAllPathologys: async (req, res) => {
        try {
            const procedures = await Pathology.find({});
            res.send(procedures);
        } catch (error) {
            res.status(500).send(error);
        }
    },

    updatePathology: async (req, res) => {
        const { id } = req.params;
        const updates = req.body;
    
        try {
            let pathology = await Pathology.findById(id);
    
            if (!pathology) {
                return res.status(404).send({ message: "Pathology not found." });
            }
    
            Object.keys(updates).forEach(update => {
                pathology[update] = updates[update];
            });
    
            await pathology.save();
    
            if (updates.pathologyCompleted && pathology.pathologyCompleted) {
                const finalReport = new FinalReport(pathology.toObject());
                
                
    
                await finalReport.save();
                return res.send(finalReport);
            }
    
            res.send(pathology);
        } catch (error) {
            res.status(400).send(error);
        }
    }
    
};

module.exports = pathologyController;
