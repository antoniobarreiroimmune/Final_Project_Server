const { Procedure } = require('../models/procedure.model');
const { Pathology } = require('../models/pathology.model');

const procedureController = {
    createProcedure: async (req, res) => {
        try {
            const procedure = new Procedure(req.body);
            await procedure.save();
            res.status(201).json(procedure);
        } catch (error) {
            res.status(400).json(error);
        }
    },

    getAllProcedures: async (req, res) => {
        try {
            const procedures = await Procedure.find({});
            res.json(procedures);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getOneProcedure: async (req, res) => {
        const { id } = req.params;
        try {
            const procedure = await Procedure.findById(id);
            if (!procedure) {
                return res.status(404).json({ message: "Procedure not found." });
            }
            res.json(procedure);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    updateProcedure: async (req, res) => {
        const { id } = req.params;
        const updates = req.body;
        try {
            let procedure = await Procedure.findById(id);
            if (!procedure) {
                return res.status(404).json({ message: "Procedure not found." });
            }
            Object.keys(updates).forEach(update => {
                procedure[update] = updates[update];
            });
            await procedure.save();
            if (updates.procedureCompleted && procedure.procedureCompleted) {
                const pathology = new Pathology(procedure.toObject());
                await pathology.save();
                return res.json(pathology);
            }
            res.json(procedure);
        } catch (error) {
            res.status(400).json(error);
        }
    }
};

module.exports = procedureController;
