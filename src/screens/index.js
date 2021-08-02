import React, {useEffect, useState} from 'react';
import {getCompanies} from '../api/index'
import {Badge, Button, Card, Col, Container, ListGroup, Row, Table} from "react-bootstrap";
import ReactHtmlParser from 'react-html-parser';
import Footer from "../components/footer";
import LoadingScreen from 'react-loading-screen';
import {useTranslation} from 'react-i18next';
import {Helmet} from "react-helmet";
import ReactGA from 'react-ga';

const Main = props => {
    const [list, setList] = useState(null);
    const [showInfoById, setShowInfoById] = useState(null);
    const [loading, setLoading] = useState(false);
    const {t, i18n} = useTranslation();

    const mfo = async () => {
        await getCompanies().then(res => {
            setList(res.data);
            setLoading(false)
        })
    }

    useEffect(() => {
        setLoading(true)
        mfo().then();
        ReactGA.pageview(window.location.pathname + window.location.search);
    }, []);

    const calculate = (index) => {
        if (index <= 2) {
            let color;
            if (index === 0) {
                color = '#038004';
            } else if (index === 1) {
                color = '#3920ef';
            } else {
                color = '#d27420';
            }
            return <Badge className='w-25 position-absolute' style={{background: color}}><i
                className="fas fa-star text-white me-1"/> {'Топ ' + (index + 1)}</Badge>
        }
    }
    const showInfo = (id) => {
        setShowInfoById(id)
    }
    const renderList = () => {
        return list.map((el, index) => {
            let sum = el.maxSum ? Number(el.maxSum.toFixed(0)) : 0
            return (
                <Col key={index} className='col-md-6 col-lg-4 col-xl-3 col-12'>
                    {showInfoById !== el.id ? <Card className='mt-2 mt-sm-2'>
                        {calculate(index)}
                        <Card.Img className='w-75 mx-auto mt-2' variant="top"
                                  style={{maxHeight: '70px', maxWidth: '163px'}}
                                  src={'https://mfo-rating.traffic-trade.com/' + el.img}/>
                        <Card.Body>
                            <Card.Title className='text-center fw-light'>{el.title[i18n.language]}</Card.Title>

                            <Row className='mt-4 text-center'>
                                <Col>
                                    {t("Сумма до")}<br/>
                                    <span className='text-primary   fw-bolder fs-5'>{sum} грн</span>
                                </Col>
                                <Col>
                                    {t("Срок до")}<br/>
                                    <span className='text-primary fw-bolder fs-5'>до {el.terms} {t('дней')}</span>
                                </Col>
                            </Row>

                            <ListGroup className='mt-4 text-center'>
                                <ListGroup.Item
                                    className="bg-grey">{el.percents}% {t('ставка по кредиту')}</ListGroup.Item>
                            </ListGroup>

                            <Table className='mt-3'>
                                <tbody>
                                <tr>
                                    <td className='text-start'>{t('Возраст')}</td>
                                    <td className='text-end'>от {el.age_min} до {el.age_max}</td>
                                </tr>
                                <tr>
                                    <td className='text-start'>{t('Рейтинг')}</td>
                                    <td className='text-end'>{el.rating_main}</td>
                                </tr>

                                </tbody>
                            </Table>

                            <Button className='mt-2 mx-auto d-block' variant="primary"
                                    onClick={() => window.open(el.url, "_blank")}><i
                                className="fas fa-file-invoice-dollar text-white me-2"/>{t('Получить деньги')}</Button>
                            <Button className='mt-3 mx-auto d-block text-decoration-none' variant="link"
                                    onClick={(e) => showInfo(el.id)}> <i
                                className="fas fa-info text-secondary me-1"/> {t('Информация о кредиторе')}</Button>
                        </Card.Body>
                    </Card> : <Card className='mt-2'>
                        {calculate(index)}
                        <Card.Img className='w-75 mx-auto mt-2' variant="top"
                                  src={'https://mfo-rating.traffic-trade.com/' + el.img}/>
                        <Card.Body>
                            <Card.Title className='text-center fw-light'>{el.title[i18n.language]}</Card.Title>

                            <Row className='mt-4 text-center'>
                                {ReactHtmlParser(el.info[i18n.language])}
                            </Row>

                            <Button className='mt-2 mx-auto d-block' variant="primary"
                                    onClick={() => window.location.href = el.url}>{t('Получить деньги')}</Button>

                            <Button className='mt-3 mx-auto d-block' variant="link"
                                    onClick={(e) => setShowInfoById(null)}>{t('Назад')}</Button>
                        </Card.Body>
                    </Card>
                    }

                </Col>)
        })
    }

    const champion = () => {
        let recommendedMfo = list ? list[0] : "";
        return <Row className='align-items-center'>
            <div className='col-12 col-lg-6 text-center text-lg-end'>
                Лидер рейтинга
            </div>
            <div className='col-12 col-lg-6 text-center text-lg-start'>
                <img style={{maxHeight: '70px', maxWidth: '163px'}} src={'https://mfo-rating.traffic-trade.com/' + recommendedMfo.img}/>
            </div>
        </Row>
    }

    return (
        <LoadingScreen
            loading={loading}
            bgColor='#ffba7c'
            spinnerColor='#1736a2'
            textColor='#676767'
            logoSrc='/logo.png'
            className='bg-danger'
            text='Подбираем для вас лучшее предложение'
        >
            <Helmet>
                <meta charSet="utf-8"/>
                <title>Кредиты онлайн на карту за 30 минут | Рейтинг МФО</title>
                <link rel="canonical" href="https://eazy-credit.com.ua"/>
            </Helmet>
            <Container fluid={true} className=' p-0 m-0'>
                <Container className='bg-grey' fluid={true}>
                    <Container className='pb-5 p-0 p-md-3'>
                        <Row className='align-top'>
                            {list && renderList()}
                        </Row>
                    </Container>
                </Container>
                <Footer/>
            </Container>
        </LoadingScreen>
    );
};

Main.propTypes = {};

export default Main;
