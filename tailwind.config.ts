module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        duolingo: {
          green: '#58cc02',
          greenDark: '#46a302',
          greenSoft: '#d7f7c4',
          yellow: '#ffc800',
          red: '#ff4b4b',
          blue: '#1cb0f6',
          purple: '#ce82ff',
          ink: '#3c3c3c',
          muted: '#6b7280',
          cream: '#f7f7f7',
          white: '#ffffff'
        }
      },
      boxShadow: {
        duo: '0 10px 30px rgba(22, 22, 22, 0.08)'
      },
      borderRadius: {
        duo: '1.5rem'
      }
    }
  },
  plugins: []
};
