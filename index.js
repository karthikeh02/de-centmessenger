/**
 * De Messenger - Decentralized E2E Encrypted Messenger
 * @format
 */

// Polyfills MUST be imported before anything else
import './src/utils/polyfills';

import { AppRegistry } from 'react-native';
import App from './src/app/App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
