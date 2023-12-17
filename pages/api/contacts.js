import { mailOptions, transporter } from '../../config/nodemailer';

const CONTACT_MESSAGE_FIELDS = {
    name: 'Name',
    email: 'Email',
    subject: 'Subject',
    message: 'Message',
};

const generateEmailContent = data => {
    const stringData = Object.entries(data).reduce(
        (str, [key, val]) =>
            (str += `${CONTACT_MESSAGE_FIELDS[key]}: \n${val} \n \n`),
        '',
    );
    const htmlData = Object.entries(data).reduce((str, [key, val]) => {
        return (str += `<h3 class="form-heading" align="left">${CONTACT_MESSAGE_FIELDS[key]}</h3><p class="form-answer" align="left">${val}</p>`);
    }, '');

    return {
        text: stringData,
        html: `<!DOCTYPE html><html><head><title>
        </title><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><meta http-equiv="X-UA-Compatible" content="IE=edge"/></head><body style="margin: 0 !important; padding: 0 !important; background: #fff"><div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px;  max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"></div><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td bgcolor="#ffffff" align="center" style="padding: 10px 15px 30px 15px" class="section-padding"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px" class="responsive-table"><tr><td><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td style="padding: 0 0 0 0; font-size: 12px; line-height: 25px; color: #232323;" class="padding message-content"><h2>New Contact Message</h2><hr/><div class="form-container">${htmlData}</div>
        </td></tr></table></td></tr></table></td></tr></table></td></tr></table></body></html>`,
    };
};

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const data = req.body;
        if (
            !data ||
            !data.name ||
            !data.email ||
            !data.subject ||
            !data.message
        ) {
            return res.status(400).send({ message: 'Bad request' });
        }

        try {
            await transporter.sendMail({
                ...mailOptions,
                ...generateEmailContent(data),
                subject: data.subject,
            });

            return res.status(200).json({ success: true });
        } catch (err) {
            console.log(err);
            return res.status(400).json({ message: err.message });
        }
    }
    return res.status(400).json({ message: 'Bad request' });
};
export default handler;
