import moment from "moment";
import fetch from 'node-fetch';

const DeepEqual = (obj1, obj2) => {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

export const checkFlights = async (oldInfo) => {
    const url = `http://localhost:5000/api/flights`
    const urlWithParams = url + '?' + new URLSearchParams({
        // TODO: ставить текущую дату
        date: moment(`2022-10-20`)
            .format('\'YYYY-MM-DD\'')
    }).toString()


    let newInfo = await fetch(urlWithParams).then(response => response.json());
    return (DeepEqual(oldInfo, newInfo)) ?
         {info: false} :  {info: true, value: newInfo}

}


