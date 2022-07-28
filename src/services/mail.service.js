import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_ADRESS,
        pass: process.env.EMAIL_PASS,
    },
    tls: { rejectUnauthorized: false },
});

const mailOptions = {
    to: '',
    subject: 'BookEx Support',
    html: ' BookEx mail body template',
};

const sendMail = async (_mailOptions) => {
    transporter.sendMail(_mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(`Email sent: ${info.response}`);
        }
    });
};

const sendSubscriptionMail = async (isActivated, receiverMail) => {
    if (receiverMail === null) {
        return;
    }
    console.log('receiver mail:', receiverMail);
    mailOptions.subject = 'Your premium subscription';
    mailOptions.to = receiverMail;
    if (isActivated) {
        mailOptions.html = "Dear User, <br> you successfully activated your premium subscription! <br><b><a href='http://localhost:3000/app'> Go to our app</a> and enjoy your privileges!</b><br><br><b>BookEx Support</b>";
    }
    else {
        mailOptions.html = "Dear User,  <br> you de-activated your premium subscription! <br><b>You can always reactivate your premium membership <a href='http://localhost:3000/app/profile'>here!</a></b><br><br><b>BookEx Support</b>";
    }
    sendMail(mailOptions);
};

const sendRegisterConfirmationMail = async (receiverMail) => {
    if (receiverMail === null) {
        return;
    }
    mailOptions.subject = 'Welcome to BookEx!';
    mailOptions.to = receiverMail;
    mailOptions.html = "Dear User, <br> you successfully registered to BookEx! <br><b><a href='http://localhost:3000/app'>Go to our app</a> and start exploring new book and bookmates!</b><br><br><b>BookEx Support</b>";
    sendMail(mailOptions);
};

const sendNewMessageNotification = async (receiverMail) => {
    if (receiverMail === null) {
        return;
    }
    mailOptions.subject = 'You have a new message!';
    mailOptions.to = receiverMail;
    mailOptions.html = "Dear User, <br> you just received a new message! <br><b><a href='http://localhost:3000/app/bookmates'>Go to our app</a> to read your new message!</b><br><br><b>BookEx Support</b>";
    sendMail(mailOptions);
};

const sendOrderStatusMail = async (receiverMail, orderId, isNewExchangeOffer) => {
    if (receiverMail === null) {
        return;
    }
    if (isNewExchangeOffer) {
        mailOptions.html = `Dear User, <br> you just received a new exchange offer! <br><b>Please <a href='http://localhost:3000/app/bookmates/orders/${orderId}'>click here</a> to see offer!</b><br><br><b>BookEx Support</b>`;
    }
    else {
        mailOptions.html = `Dear User, <br> status of your order has been changed! <br><b>Please <a href='http://localhost:3000/app/bookmates/orders/${orderId}'>click here</a> to see last status of your order!</b><br><br><b>BookEx Support</b>`;
    }
    mailOptions.subject = 'Your order status has changed!';
    mailOptions.to = receiverMail;
    sendMail(mailOptions);
};

const sendBookmateRequestMail = async (firstName, lastName, requestType, receiverMail) => {
    if (receiverMail === null) {
        return;
    }
    if (requestType === 'Received') {
        mailOptions.html = `${firstName} ${lastName} just sent a bookmate request to you! <br><b><a href='http://localhost:3000/app/bookmates'>Go to our app</a> to see the new request!</b><br><br><b>BookEx Support</b>`;
    }
    if (requestType === 'Accepted') {
        mailOptions.html = `${firstName} ${lastName} just accepted your bookmate request! <br><b><a href='http://localhost:3000/app/bookmates'>Go to our app</a> to chat with your new bookmate!</b><br><br><b>BookEx Support</b>`;
    }
    if (requestType === 'Declined') {
        mailOptions.html = `${firstName} ${lastName} just declined your bookmate request. <br><br><b>BookEx Support</b>`;
    }
    mailOptions.subject = 'New info about your bookmate request!';
    mailOptions.to = receiverMail;
    sendMail(mailOptions);
};

export default {
    sendMail, sendSubscriptionMail, sendRegisterConfirmationMail, sendNewMessageNotification, sendOrderStatusMail, sendBookmateRequestMail,
};
