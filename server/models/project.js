import mongoose from 'mongoose';

const projectSchema = mongoose.Schema({
    projectName: String,
    projectDetails: String,
    projectManager: String,
    name: String,
    creator: String,
    employees: [String],
    techStack: [String],
    selectedFile: String,
    changelogs: { type: [String], default: [] },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var Project = mongoose.model('Project', projectSchema);


export default Project;