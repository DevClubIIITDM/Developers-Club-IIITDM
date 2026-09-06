const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({

  Event_name: {

    type: String,

    // required: true,

  },

  Event_details: {

    type: String,

    // required: true,

  },

  Project_Discription: {

    type: String,

  },

  Event_outcome: {

    type: String,

  },

  Event_lead: {

    type: String,

  },

  location: {

    type: String,

  },

  Event_team: {

    type: [{

      name: String,

      linkedin: String,

      github: String

    }],

  },

  date: {

    type: Date,

    // required: true,

  },

  Photos: {

    type: [[String]],

    // Nested array for photo URLs

  },

  Resources: {

    type: [[String]],

    // Nested array for resource URLs

  },

  // Project GitHub is kept as an optional field

  project_github: {

    type: String,

  },

});

module.exports =
  mongoose.models.Event ||
  mongoose.model('Event', EventSchema);