const workspaceModel = require('../Models/workspaceModel');

async function createWorkspace(req,res) {
    const Workspace = new workspaceModel({
        username: req.body.username,
        name: req.body.name,
        level: req.body.level,
        section: req.body.sec,
        group: req.body.group,
        roll_start: req.body.start,
        roll_end: req.body.end,
        total: req.body.total,
        year: req.body.year,
        main: req.body.main,
        description: req.body.description
    });

    //console.log(Workspace);

    try{
        const { newWorkspace } = require('../DB/workspaceDB');
        const isCreated = await newWorkspace(Workspace);
        if(isCreated){
            res.status(200).json({ message: 'Workspace Created!' });
        }else{
            res.status(401).json({ error: 'Workspace Creation Failed!' });
        }
    }
    catch(err){
        console.log(`Error creating workspace: ${err}`);
        res.status(500).json({ error: 'Internal error, please try again.' });
    }

}

module.exports = {
    createWorkspace
}