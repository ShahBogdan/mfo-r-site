import React, {useEffect, useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import FAQ from "../components/faq";
import Footer from "../components/footer";
import {useTranslation} from 'react-i18next';
import {Helmet} from "react-helmet";
import {getFaq} from "../api";
import LoadingScreen from "react-loading-screen";
import ReactGA from 'react-ga';

const Faq = props => {
    const {t, i18n} = useTranslation();
    const [list, setList] = useState(null);
    const [loading, setLoading] = useState(false);

    const faq = async () => {
        await getFaq().then(res => {
            setList(res.data);
            setLoading(false)
        })
    }

    useEffect(() => {
        setLoading(true)
        faq().then();
        ReactGA.pageview(window.location.pathname + window.location.search);
    }, [])

    return (
        <>

            <Helmet>
                <meta charSet="utf-8"/>
                <title>Часто задаваемые вопросы о кредитах</title>
                <link rel="canonical" href="https://eazy-credit.com.ua"/>
            </Helmet>
            {console.log(list)}
            <LoadingScreen
                loading={loading}
                bgColor='#ffba7c'
                spinnerColor='#1736a2'
                textColor='#676767'
                logoSrc='/logo.png'
                className='bg-danger'
                text='Подбираем для вас лучшее предложение'
            >
                <Container>
                    <p className='fs-3 mt-3 fw-light text-center'>{t('Часто задаваемые вопросы')}</p>
                </Container>
                <Container fluid={true} className='bg-grey mt-1 mb-5 pb-5 pt-1'>
                    <Container className='mt-5'>
                        <Row>
                            <Col>
                                {list && <FAQ i18n={i18n} data={list}/>}
                            </Col>
                        </Row>
                    </Container>
                </Container>
                <Container>
                    <Footer/>
                </Container>
            </LoadingScreen>
        </>


    );
};

Faq.propTypes = {};

export default Faq;
