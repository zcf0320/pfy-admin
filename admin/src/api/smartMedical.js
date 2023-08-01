import Axios from 'axios';
export default {
    getBoardData() {
        return Axios.get(
            `${process.env.VUE_APP_BASE_API}questionnaire/statistics/board/getBoard`
        );
    }
};
