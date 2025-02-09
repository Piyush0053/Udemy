export const theme = {
  colors: {
    primary: '#7289da',
    secondary: '#99aab5',
    success: '#43b581',
    danger: '#f04747',
    warning: '#faa61a',
    background: {
      primary: '#36393f',
      secondary: '#2f3136',
      tertiary: '#202225',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b9bbbe',
      muted: '#72767d',
    },
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  borderRadius: {
    sm: '3px',
    md: '5px',
    lg: '8px',
    full: '50%',
  },
  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1440px',
  },
} as const;