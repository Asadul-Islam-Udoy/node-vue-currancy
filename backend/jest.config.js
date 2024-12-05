module.exports = {
    preset: 'ts-jest',  // Use ts-jest preset for TypeScript
    testEnvironment: 'node',  // Use Node.js environment for testing
    testMatch: ['**/?(*.)+(spec|test).ts'],  // Match .ts files with .spec or .test suffix
    globals: {
      'ts-jest': {
        isolatedModules: true,  // Enable faster testing by isolating modules
      },
    },
  };
  