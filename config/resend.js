import { Resend } from 'resend';

const resend = new Resend('re_UyS2VvPe_3dwb9VVXqrCoZcqza9XpY8yE');

resend.emails.send({
  from: 'onboarding@resend.dev',
  to: 'puje27509@gmail.com',
  subject: 'Hello World',
  html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
});