import { useEffect, useState } from "react";
import axios from 'axios';

const GetData = (url: string) => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjYyOTRiMDA5YTE4ZDY2OTMzMzg3MDRhIiwiaWF0IjoxNzE3NzY2NDY1fQ.tZo16SeX2StDvkHy9PPo6cq9h9POxixCyClMRnt5ghA';
    const [loading, setLoading] = useState(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [data, setData] = useState<any>([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`https://test.globalmove.uz/api/${url}`, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            const responseData = response.data.data || response.data; // Adjust based on actual response structure
            setData(responseData);
            console.log(data);
            setLoading(false);
        })
        .catch(error => {
            setError(error);
            setLoading(false);
        });
    }, [url]); // token is constant, so only url needs to be a dependency

    return [loading, data, error];
};

export default GetData;