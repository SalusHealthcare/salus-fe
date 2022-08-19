module.exports = {
  name: 'features-password-change',
  exposes: {
    './Module':
      'apps/features/password-change/src/app/remote-entry/entry.module.ts',
  },
  shared: (libraryName, sharedConfig) => {
    if (libraryName === '@apollo/client/core') {
      return {
        import: '@apollo/client/core',
        singleton: true,
        version: '3.6.9',
      };
    }
    if (libraryName === '@apollo/client/link/batch') {
      return {
        import: '@apollo/client/link/batch',
        singleton: true,
        version: '3.6.9',
      };
    }

    if (libraryName === '@apollo/client/link/context') {
      return {
        import: '@apollo/client/link/context',
        singleton: true,
        version: '3.6.9',
      };
    }

    if (libraryName === '@angular/core') {
      return {
        import: '@angular/core',
        singleton: true,
        version: '14.0.0',
        requiredVersion: '14.0.0',
      };
    }

    if (libraryName === '@angular/common') {
      return {
        import: '@angular/common',
        singleton: true,
        version: '14.0.0',
        requiredVersion: '14.0.0',
      };
    }

    if (libraryName === '@angular/router') {
      return {
        import: '@angular/router',
        singleton: true,
        version: '14.0.0',
        requiredVersion: '14.0.0',
      };
    }
    if (libraryName === '@angular/common/http') {
      return {
        import: '@angular/common/http',
        singleton: true,
        version: '14.0.0',
        requiredVersion: '14.0.0',
      };
    }
  },
};
