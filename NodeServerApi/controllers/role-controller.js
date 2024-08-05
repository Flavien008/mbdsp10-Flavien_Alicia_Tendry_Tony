const Role = require('../models/role');

// Get all roles
exports.getAllRoles = async (req, res) => {
    try {
        const roles = await Role.findAll();
        res.json(roles);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching roles', error });
    }
};

// Create a new role
exports.createRole = async (req, res) => {
    const { nom } = req.body;
    try {
        const newRole = await Role.create({ nom });
        res.status(201).json({ message: 'Role created successfully', role: newRole });
    } catch (error) {
        res.status(500).json({ message: 'Error creating role', error });
    }
};

// Update a role
exports.updateRole = async (req, res) => {
    const { id } = req.params;
    const { nom } = req.body;
    try {
        const role = await Role.findByPk(id);
        if (role) {
            role.nom = nom;
            await role.save();
            res.json({ message: 'Role updated successfully', role });
        } else {
            res.status(404).json({ message: 'Role not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating role', error });
    }
};

// Delete a role
exports.deleteRole = async (req, res) => {
    const { id } = req.params;
    try {
        const role = await Role.findByPk(id);
        if (role) {
            await role.destroy();
            res.json({ message: 'Role deleted successfully' });
        } else {
            res.status(404).json({ message: 'Role not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting role', error });
    }
};
