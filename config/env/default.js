'use strict';

module.exports = {
  app: {
    title: 'Cadeaufinder',
    description: 'Premium cadeaus, dagelijks verzameld, geselecteerd en gefilterd.',
    keywords: 'premium, cadeau, cadeaus, voor hem, voor haar, voor kids',
    googleAnalyticsTrackingID: process.env.GOOGLE_ANALYTICS_TRACKING_ID || 'GOOGLE_ANALYTICS_TRACKING_ID'
  },
  port: process.env.PORT || 3000,
  templateEngine: 'swig',
  sessionSecret: 'MEAN',
  sessionCollection: 'sessions',
  logo: 'modules/core/img/brand/logo.png',
  favicon: 'modules/core/img/brand/favicon.ico'
};
