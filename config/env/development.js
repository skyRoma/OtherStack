'use strict';

module.exports = {
    db: 'mongodb://localhost/mean-dev',
    app: {
        title: 'SHARIng - learn more '
    },
    vkontakte: {
        clientID: process.env.VKONTAKTE_ID || '6',
        clientSecret: process.env.VKONTAKTE_SECRET || 'ce',
        callbackURL: '/auth/vkontakte/callback'
    },
    twitter: {
        clientID: process.env.TWITTER_KEY || 'OV',
        clientSecret: process.env.TWITTER_SECRET || 'zs',
        callbackURL: '/auth/twitter/callback'
    },
    facebook: {
        clientID: process.env.FACEBOOK_ID || '171',
        clientSecret: process.env.FACEBOOK_SECRET || '3ce96',
        callbackURL: '/auth/facebook/callback'
    },
    mailer: {
        from: process.env.MAILER_FROM || 'onm',
        options: {
            service: process.env.MAILER_SERVICE_PROVIDER || 'Gl',
            auth: {
                user: process.env.MAILER_EMAIL_ID || 'ol.',
                pass: process.env.MAILER_PASSWORD || 'vit24'
            }
        }
    }
};

