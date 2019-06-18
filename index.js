const express = require("express");
const fs = require("fs");
const path = require('path');
const util = require('util');
const json = require('comment-json');
const app = express();
const readDir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);
const bodyParser = require('body-parser');
const port = process.env.SERVER_PORT || 8004;
const layoutsFolder = process.env.LAYOUTS_FOLDER || './layouts';


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/layouts', (req, res, next) => {
    const user = getUser(req);
    fetchConfigurations(user).then(layouts => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ layouts }));
    }).catch(err => next(err));
});

app.post('/layouts', (req, res, next) => {
    const user = getUser(req);
    const layout = req.body.layout;
    const file = path.join(layoutsFolder, layout.name + ".json");
    const content = JSON.stringify(layout, undefined, 2);
    fs.writeFileSync(file, content, "utf8");
    console.log(`saving layout ${layout.name} (${layout.type}) for user ${user}`);
    res.status(201);
    res.send();
})

app.delete('/layouts', (req, res, next) => {
    const user = getUser(req);
    const name = req.body.name;
    const type = req.body.type;

    console.log(`removing layout ${name} (${type}) for user ${user}`);
    res.status(204);
    res.send();
});

app.listen(port,
    () => console.log(`Glue42 demo layouts server listening on ${port}. Will load layouts from ${layoutsFolder} folder`));


async function fetchConfigurations(user) {

    console.log(`fetching layouts for ${user}`);

    return readDir(layoutsFolder)
        .then(files => files.map(fn => readFile(path.join(layoutsFolder, fn), 'utf8').then(json.parse)))
        .then(p => Promise.all(p));
}

function getUser(req) {
    return req.header('impersonated_user') || req.header('user');
}

