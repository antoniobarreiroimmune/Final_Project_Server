const { Pathology } = require('../models/pathology.model');
const { FinalReport } = require('../models/finalReport.model');


const pathologyController = {

    getAllPathologys: async (req, res) => {
        try {
            const pathologies = await Pathology.find({});
            res.json(pathologies);  
        } catch (error) {
            res.status(500).json(error);  
        }
    },

    getPathologyById: async (req, res) => {
        const { id } = req.params;
    
        try {
            const pathology = await Pathology.findById(id);
    
            if (!pathology) {
                return res.status(404).json({ message: "Pathology not found." });
            }
    
            res.json(pathology);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    updatePathology: async (req, res) => {
        const { id } = req.params;
        const updates = req.body; 
        
        const allowedUpdates = ['pathologyReport', 'pathologyCompleted', 'pathologyInfo','histopathology','toxics','biology'];
    
        const filteredUpdates = Object.keys(updates).reduce((acc, key) => {
            if (allowedUpdates.includes(key)) {
                acc[key] = updates[key];
            }
            return acc;
        }, {});
    
        try {
            let pathology = await Pathology.findById(id);
    
            if (!pathology) {
                return res.status(404).json({ message: "Pathology not found." });
            }
    
            Object.keys(filteredUpdates).forEach(update => {
                pathology[update] = filteredUpdates[update];
            });
    
            await pathology.save();
    
            if (filteredUpdates.pathologyCompleted && pathology.pathologyCompleted) {
                const finalReport = new FinalReport(pathology.toObject());
    
                await finalReport.save();
                return res.json(finalReport);
            }
    
            res.json(pathology);
        } catch (error) {
            res.status(400).json(error);
        }
    },
    

};

module.exports = pathologyController;
