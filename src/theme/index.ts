export interface Theme {
  background: string
  text: string
  textHover: string
  link: string
  linkHover: string
  border: string
  greenBorder: string
  yellowBorder: string
  yellowBackground: string

  diff: {
    textColor: string
    selectionBackground: string
    gutterInsertBackground: string
    gutterDeleteBackground: string
    gutterSelectedBackground: string
    codeInsertBackground: string
    codeDeleteBackground: string
    codeInsertEditBackground: string
    codeDeleteEditBackground: string
    codeSelectedBackground: string
    omitBackground: string
    decorationGutterBackground: string
    decorationGutter: string
    decorationContentBackground: string
    decorationContent: string
  }

  rowEven: string
  rowOdd: string

  popover: {
    text: string
    background: string
    border: string
  }
}
export const lightTheme: Theme = {
  background: '#FFFFFF',

  text: '#363537',
  textHover: 'rgba(27, 31, 35, 0.6)',
  link: '#045dc1',
  linkHover: '#40a9ff',
  border: '#e8e8e8',
  greenBorder: '#bef5cb',
  yellowBorder: '#ffe58f',
  yellowBackground: '#fffbe6',

  diff: {
    textColor: '#000',
    selectionBackground: '#b3d7ff',
    gutterInsertBackground: '#cdffd8',
    gutterDeleteBackground: '#fadde0',
    gutterSelectedBackground: '#fffce0',
    codeInsertBackground: '#eaffee',
    codeDeleteBackground: '#fdeff0',
    codeInsertEditBackground: '#acf2bd',
    codeDeleteEditBackground: '#f39ea2',
    codeSelectedBackground: '#fffce0',
    omitBackground: '#fafbfc',
    decorationGutterBackground: '#dbedff',
    decorationGutter: '#999',
    decorationContentBackground: '#dbedff',
    decorationContent: '#999',
  },

  // Alternating Row Colors for Binary Download component and Content Loader animation
  rowEven: '#EEEEEE',
  rowOdd: '#FFFFFF',

  // The completed files counter
  popover: {
    background: '#d5eafd',
    text: '#7dadda',
    border: '#1890ff',
  },
}
export const darkTheme: Theme = {
  background: '#0d1117',

  text: '#FAFAFA',
  textHover: '#999999',
  link: '#045dc1',
  linkHover: '#40a9ff',

  border: '#30363d',
  greenBorder: '#bef5cb',
  yellowBorder: '#c69026',
  yellowBackground: '#37332a8a',

  diff: {
    // Color object from https://github.com/otakustay/react-diff-view/blob/master/site/components/DiffView/diff.global.less
    textColor: '#fafafa',
    selectionBackground: '#5a5f80',
    gutterInsertBackground: '#3fb9504d',
    gutterDeleteBackground: '#f8514c4d',
    gutterSelectedBackground: '#5a5f80',
    codeInsertBackground: '#2ea04326',
    codeDeleteBackground: '#f851491a',
    codeInsertEditBackground: '#2ea04366',
    codeDeleteEditBackground: '#f8514c66',
    codeSelectedBackground: '#5a5f80',
    omitBackground: '#101120',
    decorationGutterBackground: '#222',
    decorationGutter: '#388bfd66',
    decorationContentBackground: '#388bfd1a',
    decorationContent: '#7d8590',
  },

  // Alternating Row Colors for Binary Download component and Content Loader animation
  rowEven: '#363537',
  rowOdd: '#222223',

  // The completed files counter
  popover: {
    text: '#7dadda',
    background: '#0E5699',
    border: '#aabbca',
  },
}
