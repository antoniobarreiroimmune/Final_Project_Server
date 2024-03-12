const mongoose = require('mongoose');

const pathologySchema = new mongoose.Schema({
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
    
    createdAt: {
      type: Date,
      default: Date.now 
    },
    updatedAt: {
      type: Date,
      default: Date.now
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
      default: 'First Instance n1 A Coruña' 
    },
    completed: {
      type: Boolean,
      required: true,
      default: false 
    }
});


pathologySchema.pre('save', function(next) {
    if (this.isModified() || this.isNew) {
        this.updatedAt = Date.now();
    }
    next();
});

const Pathology = mongoose.model('Pathology', pathologySchema);

module.exports = Pathology;
