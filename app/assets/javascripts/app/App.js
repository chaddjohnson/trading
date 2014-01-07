Ext.application({
  name: 'Trading',
  appFolder: 'assets/app',

  controllers: ['Application'],

  launch: function() {
    require(['dependencies'], function() {
      var quoteServiceClient = new (require('quote_service_client'))({
        server: 'localhost',  // TODO Make this configurable
        port: 4000
      });

      quoteServiceClient.onConnected(function() {
        // TODO Figure out authentication.
        quoteServiceClient.login('02a802ea14021c90749ca3e57e77d854');
      });

      Ext.create('Trading.view.Application', {
        quoteServiceClient: quoteServiceClient
      });
    });
  }
});