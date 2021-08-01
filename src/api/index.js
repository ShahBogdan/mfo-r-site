import axios from 'axios'

const getCompanies =  () => {
    return  axios.get('https://mfo-rating.traffic-trade.com/api/companies')
}
const getFaq =  () => {
    return  axios.get('https://mfo-rating.traffic-trade.com/api/faq')
}

export {getCompanies,getFaq}