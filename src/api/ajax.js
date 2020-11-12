import axios from 'axios'

export default function ajax(url, data={}, type='GET'){
    if (type === 'GET'){
        let param = ''

        Object.keys(data).forEach(key => {
            param += key + '=' + data[key] + '&'
        })

        if(param){
            param = param.substring(0, param.length-1)
        }
        return axios.get(url + '?' + param)
    }

    else{
        return axios.post(url, data)
    }
}

