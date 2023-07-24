import { getToken } from 'next-auth/jwt';
import { listAllCaledars } from '../calendar-api';

export async function GET(req, res) {

    const token = await getToken({ req });
    console.log(token);
    const accessToken = token.account.access_token;

    let data = await listAllCaledars(accessToken);
    console.log(data);
    data = data.items;
    data = data.map(calendar => ({ "id": calendar.id, "name": calendar.summary }));
    console.log(data); //console
    return data;
};
