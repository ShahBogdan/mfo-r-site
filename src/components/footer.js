import React from 'react';
import {Col, Container, Nav, Row} from "react-bootstrap";
import {useTranslation} from 'react-i18next';
import {NavLink} from "react-router-dom";

const Footer = props => {
    const {t} = useTranslation();

    return (
        <Container className='mt-5 mb-1'>
            <Row>
                <p className='mt-0 mb-3 text-center'>{t('информация о компании')}</p>
            </Row>
            <Col className='align-self-center justify-content-center text-center'>
                <hr/>
                <Nav
                    activeKey="/home"
                    className='justify-content-center'
                    onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
                >
                    <Nav.Item>
                        <NavLink className='nav-link' to={'/cookies'}>{t('Файлы cookies')}</NavLink>
                    </Nav.Item>
                    <Nav.Item>
                        <NavLink className='nav-link' to={'/uses'}>{t('Использование')}</NavLink>
                    </Nav.Item>
                    <Nav.Item>
                        <NavLink className='nav-link' to={'/security'}>{t('Защита данных')}</NavLink>
                    </Nav.Item>
                </Nav>
                <hr/>
                <p className='text-center'>©2021 easy-credit.com.ua</p>
            </Col>
        </Container>
    );
};

Footer.propTypes = {};

export default Footer;
