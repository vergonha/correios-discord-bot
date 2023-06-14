import moment from "moment";

const getDate = () => {
    return  `[${moment().format('DD/MM/YYYY, h:mm:ss a')}]`
}
