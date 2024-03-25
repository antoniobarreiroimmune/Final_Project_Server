const mongoose = require('mongoose');

const procedureSchema = new mongoose.Schema({
  guardId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'The user is mandatory'],
    ref: 'User'
  },
  name: {
    type: String,
    required: [true, 'The name is mandatory'],
    trim: true
  },
  firstName: {
    type: String,
    required: [true, 'The first surname is mandatory'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'The second surname is mandatory'],
    trim: true,
  },
  dni: {
    type: String,
    required: [true, 'The DNI is mandatory'],
    unique: true,
  },
  location: {
    type: String,
    required: [true, 'The location is mandatory'],
    trim: true
  },
  observations: {
    type: String,
    required: false,
    trim: true
  },
  isGenderViolence: {
    type: Boolean,
    required: true,
    default: false
  },
  isDomesticViolence: {
    type: Boolean,
    required: true,
    default: false
  },
  judicialBody: {
    type: String,
    required: true,
    enum: ['Primera Instancia n1 A Coruña', 'Primera Instancia n2 A Coruña', 'Primera Instancia n3 A Coruña', 'Primera Instancia n4 A Coruña'],
    default: ''
  },
  procedureReport: {
    type: String,
    required: false,
    default: '',
    trim: true
  },
  procedureCompleted: {
    type: Boolean,
    required: true,
    default: false
  }
}, { timestamps: true }); 

const Procedure = mongoose.model('Procedure', procedureSchema);

module.exports = { Procedure, procedureSchema };
