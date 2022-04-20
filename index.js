import express from "express";
import cors from "cors";

const holidays = [
    { date: "1/1/2022", name: "Confraternização mundial" },
    { date: "1/3/2022", name: "Carnaval" },
    { date: "4/17/2022", name: "Páscoa" },
    { date: "4/21/2022", name: "Tiradentes" },
    { date: "5/1/2022", name: "Dia do trabalho" },
    { date: "6/16/2022", name: "Corpus Christi" },
    { date: "9/7/2022", name: "Independência do Brasil" },
    { date: "10/12/2022", name: "Nossa Senhora Aparecida" },
    { date: "11/2/2022", name: "Finados" },
    { date: "11/15/2022", name: "Proclamação da República" },
    { date: "12/25/2022", name: "Natal" }
];

const app = express();
app.use(cors());

app.get("/holidays", (request, response) => {
    response.send(holidays);
});

app.get('/holidays/:month', (request, response) => {
    const month = parseInt(request.params.month);

    response.send(holidays.filter(days => {
        const date = new Date(days.date);
        if (date.getMonth() === month-1) {
            return true;
        }
        return false;
    }));
});

app.get("/is-today-holiday", (request, response) => {
    let today = new Date();
    let holiday = null;

    holidays.forEach(days => {
        if (today.toLocaleDateString() === days.date) {
            holiday = days.name;
        }
    });

    response.send(holiday ? `Sim, hoje é ${holiday}` : "Não, hoje não é feriado");
});

app.listen(4000, () => {
    console.log("Servidor online");
});
