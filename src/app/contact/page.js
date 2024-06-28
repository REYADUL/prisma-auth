import React from 'react';

const ContactPage = async() => {
    const response = await fetch('http://localhost:3000/api/user');
    // console.log(response.json());
    const final = await response.json();
    console.log(final);
    return (
        <div>
            <h1>From contact page</h1>
        </div>
    );
};

export default ContactPage;

