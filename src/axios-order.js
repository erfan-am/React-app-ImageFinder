import axios from 'axios';

const instance=axios.create({
    baseURL:'https://burger-bdc39.firebaseio.com/'
});

export default instance