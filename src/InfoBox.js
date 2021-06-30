
import React from 'react';
import "./InfoBox.css";
import { Card, CardContent, Typography } from '@material-ui/core';
function InfoBox({ title, cases, total, isRed, active, ...props }) {
    return (

        <Card onClick={props.onClick}
            className={`infoBox ${active && "infoBox--selected"} ${active && isRed && "infoBox--red"}`}>
            <CardContent>
                <Typography className="infoBox_total" color="textSecondary">
                    {title}
                </Typography>
                <h3 className={`infoBox_cases ${!isRed && "infoBox__cases--green"}`}>{cases} cases</h3>
                <Typography className="infoBox_total" color="textSecondary">
                    {total} total
                </Typography>
            </CardContent>
        </Card>

    )
}

export default InfoBox;

