import Mailgen from 'mailgen'

export const resetPasswordMsg = (url, username) =>{
    var mailGenerator = new Mailgen({
        theme: 'default',
        product: {
            // Appears in header & footer of e-mails
            name: 'Electro Mart',
            link: 'https://mailgen.js/'
        }
    });
    
    var response = {
        body: {
            name: username,
            intro: 'Please use the button below to reset your password.',
            action: {
                instructions: 'To reset your password, please click here:',
                button: {
                    color: '#22BC66', // Optional action button color
                    text: 'Reset your password',
                    link: url
                }
            },
            outro: 'This reset button is valid for only 10 minutes.'
        }
    };

    let message = mailGenerator.generate(response);

    return message;
};