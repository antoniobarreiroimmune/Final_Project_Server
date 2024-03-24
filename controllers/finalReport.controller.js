const {FinalReport} = require('../models/finalReport.model');
const Archive = require('../models/archive.model');

const finalReportController = {
    
    getAllReports: async (req, res) => {
        try {
            const procedures = await FinalReport.find({});
            res.send(procedures);
        } catch (error) {
            res.status(500).send(error);
        }
    },

    updateReport: async (req, res) => {
        const { id } = req.params;
        const updates = req.body;
    
        try {
            let finalReport = await FinalReport.findById(id);
    
            if (!finalReport) {
                return res.status(404).send({ message: "Report not found." });
            }
    
            Object.keys(updates).forEach(update => {
                finalReport[update] = updates[update];
            });
    
            await finalReport.save();
    
            if (updates.finalReportCompleted && finalReport.finalReportCompleted) {
                const Archive = new Archive(finalReport.toObject());
                
                
    
                await Archive.save();
                return res.send(Archive);
            }
    
            res.send(finalReport);
        } catch (error) {
            res.status(400).send(error);
        }
    }
    
};

module.exports = finalReportController;
