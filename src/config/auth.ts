export default {
  jwt: {
    secret: process.env.APP_SECRET || 'your_secret',
    expiresIn: '1d',
  },
};
