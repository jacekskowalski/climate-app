import './App.css';
import React, { FunctionComponent } from 'react';
import { Card, Button, Accordion } from 'react-bootstrap';

interface IDescription {

    name: any,
    value: any
}

export const CountryComponent: FunctionComponent<IDescription> = ({name, value}) => {
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
                        <Card.Body>{value}</Card.Body>
                    </Accordion.Collapse>
                </Card>
                </Accordion>
            </>
        )
}