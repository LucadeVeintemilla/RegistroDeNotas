// Este archivo contiene información sobre los íconos que deben crearse para la aplicación
// Para una aplicación en producción, se recomienda crear archivos de imagen reales

// Iconos necesarios:
// 1. icon.png - Ícono principal de la aplicación (1024x1024px)
// 2. splash.png - Imagen de splash screen (2048x2048px)
// 3. adaptive-icon.png - Ícono adaptable para Android (1024x1024px)

// Estos archivos deben colocarse en la carpeta assets/ en la raíz del proyecto
// Por ejemplo:
// - assets/icon.png
// - assets/splash.png

// Para crear estos archivos, puedes usar :
// - Adobe Illustrator
// - Figma
// - Canva
// - https://appicon.co/ (generador online)

export const iconoInfo = {
  icono: {
    tamaño: '1024x1024px',
    formato: 'PNG',
    ubicación: '/assets/icon.png'
  },
  splash: {
    tamaño: '2048x2048px',
    formato: 'PNG',
    ubicación: '/assets/splash.png'
  },
  iconoAdaptable: {
    tamaño: '1024x1024px',
    formato: 'PNG',
    ubicación: '/assets/adaptive-icon.png'
  }
};
