/* @flow */
import React from 'react';
import { Platform } from 'react-native';
import RNPDFView from './RNPDFView';

export type UrlProps = {
  /**
   * `method` is the HTTP Method to use. Defaults to GET if not specified.
   */
  method?: string,

  /**
   * `headers` is an object representing the HTTP headers to send along with the
   * request for a remote image.
   */
  headers?: { [key: string]: string },

  /**
   * `body` is the HTTP body to send with the request. This must be a valid
   * UTF-8 string, and will be sent exactly as specified, with no
   * additional encoding (e.g. URL-escaping or base64) applied.
   */
  body?: string,
};

type Props = {
  /**
   * A Function. Invoked on load error with {nativeEvent: {error}}.
   */
  onError: (Error) => void,

  /**
   * A Function. Invoked when load completes successfully.
   */
  onLoad: () => void,

  /**
   * A Function. Invoked when page is changed.
   * @param {Number} page - The active page.
   * @param {Number} pageCount - Total pages.
   */
  onPageChanged: (page: number, pageCount: number) => void,

  /**
   * A String value. Defines the resource to render. Can be one of:
   *   - url. Example: http://www.pdf995.com/samples/pdf.pdf
   *   - base64. Example: 'JVBERi0xLjcKCjEgMCBvYmogICUgZW50...'
   *   - fileName - Example: Platform.OS === 'ios' ?
   *       'test-pdf.pdf' : '/sdcard/Download/test-pdf.pdf'
   */
  resource: string,

  /**
   * A String value. Defines the resource type. Can be one of:
   *   - "url", for url
   *   - "base64", for base64 data
   *   - "file", for local files
   */
  resourceType: 'url' | 'base64' | 'file',

  urlProps?: UrlProps,

  /**
   * A String value. Defines encoding type. Can be one of:
   *   - "utf-8", default
   *   - "utf-16"
   */
  textEncoding: 'utf-8' | 'utf-16',

  /**
   * A Number value. Fades in effect (in ms) on load successfully:
   *   - 0.0, default
   */
  fadeInDuration: number,
};

class PDFView extends React.Component<Props, *> {
  static defaultProps = {
    onError: () => {},
    onLoad: () => {},
    onPageChanged: () => {},
    fadeInDuration: 0.0,
    resourceType: 'url',
    textEncoding: 'utf-8',
    urlProps: {},
  };


  constructor(props: Props) {
    super(props);
    this.onError = this.onError.bind(this);
    this.onPageChanged = this.onPageChanged.bind(this);
  }


  onError: (event: any) => void;
  onError(event: any) {
    const { nativeEvent } = event || {};
    this.props.onError(nativeEvent || new Error('unknown error'));
  }

  onPageChanged: (event: any) => void;
  onPageChanged(event: any) {
    const { nativeEvent = {} } = event || {};
    const { page = -1, pageCount = -1 } = nativeEvent;
    this.props.onPageChanged(page, pageCount);
  }

  render() {
    const {
      onError,
      onPageChanged,
      ...remainingProps
    } = this.props;
    
    if (Platform.OS === 'ios') {
      return (
        <RNPDFView
          {...remainingProps}
          onError={this.onError}
          onPageChanged={this.onPageChanged}
        />
      );
    } else {
      Object.defineProperty(remainingProps, 'onLoadSuccess',
        Object.getOwnPropertyDescriptor(remainingProps, 'onLoad'));
      delete remainingProps['onLoad'];
      delete remainingProps['onError'];
      return (
        <RNPDFView
          {...remainingProps}
          onErrorRaised={this.onError}
          onPageChanged={this.onPageChanged}
        />
      );
    }
  }
}


export default PDFView;
