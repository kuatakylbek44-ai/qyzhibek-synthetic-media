module.exports = {
            content: ['./index.html', './assets/site.js'],
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                    },
                    colors: {
                        darkbg: '#090d16',
                        cardbg: 'rgba(17, 24, 39, 0.65)',
                        neonPurple: '#8b5cf6',
                        neonCyan: '#06b6d4',
                    },
                    animation: {
                        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                        'float': 'float 6s ease-in-out infinite',
                    },
                    keyframes: {
                        float: {
                            '0%, 100%': { transform: 'translateY(0)' },
                            '50%': { transform: 'translateY(-10px)' },
                        }
                    }
                }
            }
        };
