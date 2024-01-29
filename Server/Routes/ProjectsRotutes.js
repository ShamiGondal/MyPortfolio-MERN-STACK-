// routes.js
const express = require('express');
const router = express.Router();
const Project = require('../Models/ProjectSchema');
const FormDataModel = require('../Models/FormSchema.jsx')


router.post('/addProject', async (req, res) => {
  try {
    const projectData = req.body;
    const project = new Project(projectData);
    await project.save();
    res.status(201).json({ message: 'Project added successfully' });
  } catch (error) {
    console.error('Error storing project:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/getProjects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/getProject/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const project = await Project.findOne({ _id: id });
    res.json(project);
  } catch (error) {
    console.error('Error fetching project:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.put('/updateProject/:id', async (req, res) => {
  const id = req.params.id;
  const updatedProjectData = req.body;

  try {
    const updatedProject = await Project.findOneAndUpdate(
      { _id: id },
      { $set: updatedProjectData },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json({ message: 'Project updated successfully', project: updatedProject });
  } catch (error) {
    console.error('Error updating project:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.delete('/deleteProject/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const deletedProject = await Project.findOneAndDelete({ _id: id });

    if (!deletedProject) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json({ message: 'Project deleted successfully', project: deletedProject });
  } catch (error) {
    console.error('Error deleting project:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.post('/submitForm', async (req, res) => {
  const formData = req.body;

  try {
    // Create a new instance of the FormDataModel with the submitted data
    const newFormData = new FormDataModel(formData);
    
    // Save the form data to the database
    await newFormData.save();

    res.status(200).json({ message: 'Form data submitted successfully' });
  } catch (error) {
    console.error('Error storing form data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to fetch form details
router.get('/getFormDetails', async (req, res) => {
  try {
    // Fetch all form data from the database
    const formDetails = await FormDataModel.find();

    res.status(200).json(formDetails);
  } catch (error) {
    console.error('Error fetching form data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
