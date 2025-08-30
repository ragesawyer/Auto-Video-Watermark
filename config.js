const path = require('path');
const fs = require('fs');

const sharpConfig = {
    frameRate: 30,
    maxFrames: 300,
    defaultWidth: 1920,
    defaultHeight: 1080,
    
    defaultFontSize: 48,
    defaultFontColor: 'white',
    defaultOpacity: 0.7,
    defaultSpeed: 2,
    
    supportedFormats: ['.mp4', '.avi', '.mov', '.mkv', '.wmv', '.flv', '.webm'],
    outputFormats: ['.gif', '.png', '.jpg'],
    
    fonts: {
        primary: 'Arial',
        fallback: 'sans-serif',
        sizes: [16, 24, 32, 48, 64, 96]
    },
    
    batchSize: 10,
    memoryLimit: '2GB'
};

const canvasConfig = {
    resolutions: [
        { width: 1280, height: 720, name: 'HD' },
        { width: 1920, height: 1080, name: 'Full HD' },
        { width: 2560, height: 1440, name: '2K' },
        { width: 3840, height: 2160, name: '4K' }
    ],
    
    effects: {
        shadow: {
            color: 'black',
            blur: 4,
            offsetX: 2,
            offsetY: 2
        },
        glow: {
            color: 'white',
            blur: 8
        },
        outline: {
            color: 'black',
            width: 2
        }
    }
};

const defaultConfig = {
    frameRate: sharpConfig.frameRate,
    maxFrames: sharpConfig.maxFrames,
    defaultWidth: sharpConfig.defaultWidth,
    defaultHeight: sharpConfig.defaultHeight,
    
    defaultFontSize: sharpConfig.defaultFontSize,
    defaultFontColor: sharpConfig.defaultFontColor,
    defaultOpacity: sharpConfig.defaultOpacity,
    defaultSpeed: sharpConfig.defaultSpeed,
    
    supportedFormats: sharpConfig.supportedFormats,
    outputFormats: sharpConfig.outputFormats,
    
    fonts: sharpConfig.fonts,
    
    batchSize: sharpConfig.batchSize,
    memoryLimit: sharpConfig.memoryLimit
};

module.exports = {
    sharpConfig,
    canvasConfig,
    defaultConfig
};
