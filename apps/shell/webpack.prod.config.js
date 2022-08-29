const { withModuleFederation } = require('@nrwl/angular/module-federation');
const config = require('./module-federation.config');
module.exports = withModuleFederation({
  ...config,
  remotes: [
    [
      'features-staff-manager',
      'https://d29841px54vil9.cloudfront.net/staff-manager',
    ],
    [
      'features-authentication',
      'https://d29841px54vil9.cloudfront.net/authentication',
    ],
    ['features-videoroom', 'https://d29841px54vil9.cloudfront.net/videroom'],
    [
      'features-edit-person',
      'https://d29841px54vil9.cloudfront.net/edit-person',
    ],
    [
      'features-patient-manager',
      'https://d29841px54vil9.cloudfront.net/patient-manager',
    ],
    [
      'features-profile-manager',
      'https://d29841px54vil9.cloudfront.net/profile-manager',
    ],
    [
      'features-password-change',
      'https://d29841px54vil9.cloudfront.net/password-change',
    ],
    [
      'features-shifts-manager',
      'https://d29841px54vil9.cloudfront.net/shifts-manager',
    ],
    [
      'features-medical-records-manager',
      'https://d29841px54vil9.cloudfront.net/medical-records-manager',
    ],
    [
      'features-reservations-manager',
      'https://d29841px54vil9.cloudfront.net/reservations-manager',
    ],
  ],
  /*
   * Remote overrides for production.
   * Each entry is a pair of an unique name and the URL where it is deployed.
   *
   * e.g.
   * remotes: [
   *   ['app1', 'https://app1.example.com'],
   *   ['app2', 'https://app2.example.com'],
   * ]
   */
});
