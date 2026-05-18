const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const auth = require('../middleware/auth');

// GET /api/employees/search
router.get('/search', auth, async (req, res) => {
  try {
    const { department } = req.query;
    let query = {};
    if (department) {
      query.department = { $regex: new RegExp(department, 'i') };
    }
    const employees = await Employee.find(query);
    res.json(employees);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// POST /api/employees
router.post('/', auth, async (req, res) => {
  const { name, email, department, skills, performanceScore, experience } = req.body;

  if (performanceScore === undefined || performanceScore === null) {
      return res.status(400).json({ msg: 'Validation error: Missing performance score' });
  }

  try {
    let employee = await Employee.findOne({ email });
    if (employee) {
      return res.status(400).json({ msg: 'Error message: Duplicate email' });
    }

    employee = new Employee({
      name, email, department, skills, performanceScore, experience
    });

    await employee.save();
    res.json({ msg: 'Employee stored successfully', employee });
  } catch (err) {
    console.error(err.message);
    if (err.name === 'ValidationError') {
        return res.status(400).json({ msg: `Validation error: ${err.message}` });
    }
    res.status(500).send('Server Error');
  }
});

// GET /api/employees
router.get('/', auth, async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// DELETE /api/employees/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    let employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ msg: 'Employee not found' });
    
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Employee removed successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// PUT /api/employees/:id/performance
router.put('/:id/performance', auth, async (req, res) => {
  try {
    const { performanceScore } = req.body;
    let employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ msg: 'Employee not found' });

    employee.performanceScore = performanceScore;
    await employee.save();
    res.json({ msg: 'Updated data shown', employee });
  } catch(err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
});

module.exports = router;
