const { FinalReport } = require('../models/finalReport.model');
const Archive = require('../models/archive.model');

const finalReportController = {
    
    getAllReports: async (req, res) => {
        try {
            const reports = await FinalReport.find({});
            res.json(reports);  
        } catch (error) {
            res.status(500).json(error);  
        }
    },

    updateReport: async (req, res) => {
        const { id } = req.params;
        const updates = req.body;
    
        try {
            let finalReport = await FinalReport.findById(id);
    
            if (!finalReport) {
                return res.status(404).json({ message: "Report not found." });  
            }
    
            Object.keys(updates).forEach(update => {
                finalReport[update] = updates[update];
            });
    
            await finalReport.save();
    
            if (updates.finalReportCompleted && finalReport.finalReportCompleted) {
                const archive = new Archive(finalReport.toObject());  
                
                await archive.save();
                return res.json(archive);  
            }
    
            res.json(finalReport);  
        } catch (error) {
            res.status(400).json(error);  
        }
    }
};

module.exports = finalReportController;
