import React from 'react';
import Layout from "../main/Layout";
import {API} from "../config";

const Signup = () => {
    return (
        <Layout
            title="Signup"
            description="Signup to Node React E-commerce App"
        >
            {API}
        </Layout>
    );
};

export default Signup;
