const styledComponents =
  process.env.NODE_ENV === 'production'
    ? {
        pure: true
      }
    : {
        pure: true,
        transpiledTemplateLiterals: true,
        displayName: false
      };

module.exports = { styledComponents };
