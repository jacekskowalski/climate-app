import './App.css';
import React, { FunctionComponent } from 'react';
import { Card, Button, Accordion } from 'react-bootstrap';

export interface IDescription {
    name: string | string[],
    value: number | number[],
    unit: string | string[]
}

export const CountryComponent: FunctionComponent<IDescription> = ({name,value, unit}) => {
    return (
        <>
            <Accordion>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            {name}
                         </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>{value} {unit}</Card.Body>
                    </Accordion.Collapse>
                </Card>
                </Accordion>
            </>
        )
}