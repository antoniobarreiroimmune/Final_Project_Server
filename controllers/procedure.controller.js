const {Procedure} = require('../models/procedure.model');
const {Pathology} = require('../models/pathology.model');

const procedureController = {
    createProcedure: async (req, res) => {
        try {
            const procedure = new Procedure(req.body);
            await procedure.save();
            res.status(201).send(procedure);
        } catch (error) {
            res.status(400).send(error);
        }
    },

    getAllProcedures: async (req, res) => {
        try {
            const procedures = await Procedure.find({});
            res.send(procedures);
        } catch (error) {
            res.status(500).send(error);
        }
    },

    getOneProcedure: async (req, res) => {
        const { id } = req.params;

        try {
            const procedure = await Procedure.findById(id);

            if (!procedure) {
                return res.status(404).send({ message: "Procedure not found." });
            }

            res.send(procedure);
        } catch (error) {
            res.status(500).send(error);
        }
    },

    updateProcedure: async (req, res) => {
        const { id } = req.params;
        const updates = req.body;
    
        try {
            let procedure = await Procedure.findById(id);
    
            if (!procedure) {
                return res.status(404).send({ message: "Procedure not found." });
            }
    
            Object.keys(updates).forEach(update => {
                procedure[update] = updates[update];
            });
    
            await procedure.save();
    
            if (updates.procedureCompleted && procedure.procedureCompleted) {
                const pathology = new Pathology(procedure.toObject());
                
                
              
    
                await pathology.save();
                return res.send(pathology);
            }
    
            res.send(procedure);
        } catch (error) {
            res.status(400).send(error);
        }
    }
    
};

module.exports = procedureController;
