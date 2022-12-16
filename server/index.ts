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
const port = process.env.PORT || 3000;

const path = require("path");
const clientDir = path.join(__dirname, "../../client/dist");

app.use(express.json())
app.use(express.static(clientDir));

app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(clientDir, "index.html"))
})

app.use(authenticateToken)

app.use('/users', new UsersRoute().getRouter())
app.use('/trainings', new TrainingsRoute().getRouter())
app.use('/sets', new SetsRoute().getRouter())
app.use('/exercises', new ExercisesRoute().getRouter())
app.use('/bodyCompositions', new BodyCompositionsRoute().getRouter())
app.use('/bodyCompositionCategories', new BodyCompositionCategoriesRoute().getRouter())


app.listen(port, () => {
    console.log('Server app listening on port ' + port);
});