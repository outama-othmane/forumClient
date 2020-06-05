module.exports = {
purge: [],
theme: {
	screens: {
		sm: '768px',
		md: '992px',
		lg: '1200px',
	},
	container: {
      center: true,
    },
	extend: {
		colors: {
			'white': '#FFF',
			'gray': {
				200: '#edf2f7',
				300: '#e2e8f0',
				500: '#a0aec0',
				600: '#718096',
				700: '#4a5568',
				900: '#1a202c',
			},
			'blue': {
				400: '#06f',
			},
		},
		opacity: {
       		'10': '0.1',
		},
		spacing: {
			'12-5': '3.125rem',
		},
		minHeight: {
			'screen-16': 'calc(100vh - 4rem)'
		},
		inset: {
			'3': '0.75rem'
		}
	},
},
variants: {
	// appearance: ['responsive'],
 //    backgroundColor: ['responsive', 'hover', 'focus'],
 //    fill: [],
},
plugins: [],
}
