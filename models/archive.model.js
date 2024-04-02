const mongoose = require('mongoose');
const {finalReportSchema} = require('./finalReport.model');

const archiveSchema = new mongoose.Schema({
    ...finalReportSchema.obj,
    archivedAt: {
        type: Date,
        required: true,
        default: Date.now
    }
},{ timestamps: true});

const Archive = mongoose.model('Archive', archiveSchema);

module.exports = Archive;