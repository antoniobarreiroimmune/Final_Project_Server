const { Procedure } = require('../models/procedure.model');
const { Pathology } = require('../models/pathology.model');

const procedureController = {
    createProcedure: async (req, res) => {
        try {
            const allowedFields = [
                'name', 'firstName', 'lastName', 'dni', 'address', 'location',
                'isGenderViolence', 'isDomesticViolence', 'judicialBody',
                'observations', 'procedureReport', 'procedureCompleted',
                'guardInfo'
            ];

            const validData = {};
            allowedFields.forEach(field => {
                if (req.body.hasOwnProperty(field)) {
                    validData[field] = req.body[field];
                }
            });

            const currentYear = new Date().getFullYear();

            const lastProcedure = await Procedure.findOne({
                procedureNumber: { $gte: currentYear * 10000 }
            }).sort({ procedureNumber: -1 });

            let lastNumber = 0;
            if (lastProcedure) {

                lastNumber = lastProcedure.procedureNumber % 10000;
            }

            const newProcedureNumber = currentYear * 10000 + (lastNumber + 1);

            validData.procedureNumber = newProcedureNumber;

            const procedure = new Procedure(validData);
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

            const allowedUpdates = [
                'name', 'firstName', 'lastName', 'dni', 'location',
                'isGenderViolence', 'isDomesticViolence', 'judicialBody',
                'observations', 'procedureReport', 'procedureCompleted',
                'guardInfo','address'
            ];

            allowedUpdates.forEach(field => {
                if (updates.hasOwnProperty(field)) {
                    procedure[field] = updates[field];
                }
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
