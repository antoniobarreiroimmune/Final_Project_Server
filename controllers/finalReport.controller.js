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

    getFinalReportById: async (req, res) => {
        const { id } = req.params;
    
        try {
            const report = await FinalReport.findById(id);
    
            if (!report) {
                return res.status(404).json({ message: "Report not found." });
            }
    
            res.json(report);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    updateReport: async (req, res) => {
        const { id } = req.params;
        const updates = req.body;
    
        const allowedUpdates = ['finalReport', 'finalReportCompleted', 'guardValidate', 'pathologyValidate'];

        const filteredUpdates = Object.keys(updates).reduce((acc, key) => {
            if (allowedUpdates.includes(key)) {
                acc[key] = updates[key];
            }
            return acc;
        }, {});

        try {
            let report = await FinalReport.findById(id);

            if (!report) {
                return res.status(404).json({ message: "Report not found." });
            }

            Object.keys(filteredUpdates).forEach(update => {
                report[update] = filteredUpdates[update];
            });

            await report.save();

         if (filteredUpdates.finalReportCompleted && report.finalReportCompleted) {
                const archive = new Archive(report.toObject());

                await archive.save();
                return res.json(archive);
            }

            res.json(report);
    }       
        catch (error) {
            res.status(400).json(error);
        }
    },



};

module.exports = finalReportController;
