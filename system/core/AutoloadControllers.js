const load_controllers = () => {
    const fs = require('fs');
    const path = require('path');
    const controller_directory = '../../application/controllers';

    const controller_path = path.join(__dirname, controller_directory);
    const controller_files = fs.readdirSync(controller_path);
    /* Store a list of controllers */
    const controllers = {};
    /* Read the files in the controller directory */
    for (const file of controller_files) {
        const controller_name = file.replace('.js', '');
        const controller = require(path.join(controller_path, file));
        controllers[controller_name] = controller;
    }

    return controllers;
}

module.exports = load_controllers();