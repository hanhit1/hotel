const i18n = require('../config/i18nConfig');

const I18n = (req, res, next) => { 
    i18n.init(req, res);
    const lang = req.headers['language'];
    if (lang) {
        i18n.setLocale(req, lang); 
    }
    next();
};

module.exports = I18n;