const emailjs = require("@emailjs/browser")
const { publicKey, serviceID, templateID } = require("../config/email.config");

const sendEmail = async (template_params) => {
    const server = emailjs.send({
        publicKey,
        serviceID,
        templateID,
        template_params
    }).then((response) => {
        console.log("Email sent successfully", response.status, response.text);
    }).catch((error) => {
        console.error("Failed to send email", error);
    });
};

module.exports = { sendEmail };