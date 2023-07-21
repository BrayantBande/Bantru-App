import React from 'react';
import Layout from './../components/Layout/Layout';
import { BiMailSend, BiPhoneCall, BiSupport } from 'react-icons/bi';

const Contact = () => {
  return (
    <Layout title={'Contact Us'}>
      <div className="row contactus">
        <div className="col-md-6">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{ width: '100%' }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">CONTÁCTANOS</h1>
          <p className="text-justify mt-2">
            Atendemos tus preguntas sobre compras, pagos, etc.
          </p>
          <p className="mt-3">
            <BiMailSend /> : inversionesbantru@gmail.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : 0414-1398228
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : 0424-2194318
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
