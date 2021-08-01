import React, {useEffect} from 'react';
import {Accordion} from 'react-bootstrap'


const FAQ = (props) => {


    useEffect(() => {

    })

    return (
        <Accordion defaultActiveKey="0">
            {
                props.data.map((el, i) => {
                    return <Accordion.Item eventKey={i} key={i}>
                        <Accordion.Header>{el.question[props.i18n.language]}</Accordion.Header>
                        <Accordion.Body>
                            {el.answer[props.i18n.language]}
                        </Accordion.Body>
                    </Accordion.Item>
                })
            }
        </Accordion>
    );
};

FAQ.propTypes = {};

export default FAQ;
