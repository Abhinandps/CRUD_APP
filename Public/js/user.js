
/* eslint-disable */

const fetchUserData = async ()=>{
    try{
        const res = await axios.get('http://127.0.0.1:3000/api/v1/user/me')
        const user = res.data.data.data
        // to be continued

    }catch(err){

    }
}

fetchUserData()