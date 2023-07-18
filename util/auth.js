
async function authenticate(email, password){
    let url = 'http://localhost:8181/api/auth/signin';

    const res = await fetch(url, {
        method: 'POST',
        headers: {'content-type':'application/json'},
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    });

    const {token} = await res.json();

    return token;
}


export function login(email, password){
    authenticate(email, password)
}

