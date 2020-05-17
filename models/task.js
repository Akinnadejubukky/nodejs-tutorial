const mongoose = require('mongoose');
require('./../config');


const TaskSchema = new mongoose.Schema({
    name: mongoose.SchemaTypes.String
}, {
    timestamps: true
});

const Task = mongoose.model('Task', TaskSchema, 'tasks');


module.exports = {
   TaskSchema,
   Task
};