angular.module('configurations', [])
    .constant('API_VERSION', '/obsplatform/api/v1')
    .constant('TENANT','default')
    .constant('IDLE_DURATION', 30 * 60)
    .constant('WARN_DURATION', 10)
    .constant('KEEPALIVE_INTERVAL', 15 * 60)
    .constant('SECURITY', 'basicauth')
	.constant('ENCRIPTIONKEY', 'TRIGITAL_009');
// Use SECURITY constant as 'oauth' to enable Oauth2 on community app
