import {authenticateToken} from "./src/middlewares/authenticate";
import {UsersRoute} from "./src/routes/users.route";
import {TrainingsRoute} from "./src/routes/trainings.route";
import {SetsRoute} from "./src/routes/sets.route";
import {ExercisesRoute} from "./src/routes/exercises.route";
import {BodyCompositionsRoute} from "./src/routes/bodyCompositions.route";
import {BodyCompositionCategoriesRoute} from "./src/routes/bodyCompositionCategories.route";
import {Request, Response} from "express";

const express = require('express');
const app = express();
const port = process.env.PORT || 3003;

app.use(express.json())
app.use('/api', authenticateToken)
app.use('/api/users', new UsersRoute().getRouter())
app.use('/api/trainings', new TrainingsRoute().getRouter())
app.use('/api/sets', new SetsRoute().getRouter())
app.use('/api/exercises', new ExercisesRoute().getRouter())
app.use('/api/bodyCompositions', new BodyCompositionsRoute().getRouter())
app.use('/api/bodyCompositionCategories', new BodyCompositionCategoriesRoute().getRouter())

const path = require("path");
const clientDir = path.join(__dirname, "../../client/dist");

app.use(express.static(clientDir));

app.get('/*', (req: Request, res: Response) => {
    res.sendFile(path.join(clientDir, "index.html"))
})


app.listen(port, () => {
    console.log('Server app listening on port ' + port);
});
