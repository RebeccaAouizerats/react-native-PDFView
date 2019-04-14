import { requireNativeComponent, ViewPropTypes, Platform } from 'react-native';
import PropTypes from 'prop-types';

const sharedPropTypes = {
  /**
   * A String value. Defines the resource to render. Can be one of:
   *   - url. Example: http://www.pdf995.com/samples/pdf.pdf
   *   - base64. Example: 'JVBERi0xLjcKCjEgMCBvYmogICUgZW50...'
   *   - fileName - Not implemented
   */
  resource: PropTypes.string,

  /**
   * A String value. Defines the resource type. Can be one of:
   *   - "url", for url
   *   - "base64", for base64 data
   *   - "file", for local files
   */
  resourceType: PropTypes.string,

  /**
   * A String value. Defines encoding type. Can be one of:
   *   - "utf-8", default
   *   - "utf-16"
   */
  textEncoding: PropTypes.string,

  /**
   * A Number value. Fades in the webview (in ms) on load successfully (iOS Only):
   *   - 0.0, default
   */
  fadeInDuration: PropTypes.number,
  ...ViewPropTypes,
};

const componentInterfaceIOS = {
  name: 'PDFView',
  propTypes: {
    /**
     * A Function. Invoked on load error with {nativeEvent: {error}}.
     */
    onError: PropTypes.func,

    /**
     * A Function. Invoked when load completes successfully.
     */
    onLoad: PropTypes.func,

    ...sharedPropTypes,
  },
};

const componentInterfaceAndroid = {
  name: 'PDFView',
  propTypes: {
    /**
     * A Function. Invoked on load error with {nativeEvent: {error}}.
     */
    onErrorRaised: PropTypes.func,

    /**
     * A Function. Invoked when load completes successfully.
     */
    onLoadSuccess: PropTypes.func,

    importantForAccessibility: PropTypes.string,
    accessibilityLabel: PropTypes.string,
    accessibilityComponentType: PropTypes.string,
    accessibilityLiveRegion: PropTypes.string,
    testID: PropTypes.string,
    renderToHardwareTextureAndroid: PropTypes.string,
    onLayout: PropTypes.bool,

    ...sharedPropTypes,
  },
};

export default requireNativeComponent(
  'PDFView',
  Platform.OS === 'ios' ? componentInterfaceIOS : componentInterfaceAndroid,
);
