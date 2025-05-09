import { createClient } from "@clickhouse/client";
import express from "express";
import bodyParser from "body-parser";

const client = new createClient({
    url: 'http://zenith_seller:zenith@localhost:8123/row_level_poc',
    username: 'zenith_seller',
    password: 'zenith',
    max_open_connections: 5,
    database: 'row_level_poc',
    clickhouse_settings: {
        date_time_input_format: "best_effort",
    },
});

const app = express();
app.use(bodyParser.json())

app.post('/query', async(req, res, next)=>{
    const companyId = req.headers['x-company-id'];
    const query = req.body.query;

    const resultSet = await client.query({
        query,
        format: "JSONEachRow",
        clickhouse_settings: {
            custom_company_id: companyId
        },
      });
    console.log("resultSet is=>", resultSet);
    const result = await resultSet.json();
    console.log("result is=>", result);
    return res.status(200).json(result);
})

app.listen(3636, ()=>{
    console.log("running on 3636")
})