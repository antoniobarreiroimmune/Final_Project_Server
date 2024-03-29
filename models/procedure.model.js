const mongoose = require('mongoose');

const procedureSchema = new mongoose.Schema({
  guardInfo: {
    guardId: mongoose.Schema.Types.ObjectId,
    name: String,
    firstName: String,
    lastName: String,
    email: String,
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
    required: false
   
  },
  address: {
    type: String,
    default: '',
    trim: true
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point"
    },
    coordinates: {
      type: [Number],
      default: [0, 0]
    },
  },
  observations: {
    type: String,
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
  },
  procedureReport: {
    type: String,
    default: '',
    trim: true
  },
  procedureCompleted: {
    type: Boolean,
    required: true,
    default: false
  }
}, { timestamps: true });


procedureSchema.index({ 'location': '2dsphere' });

const Procedure = mongoose.model('Procedure', procedureSchema);

module.exports = { Procedure, procedureSchema };
