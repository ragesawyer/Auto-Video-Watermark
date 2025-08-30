const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');
const ProgressBar = require('progress');

class VideoWatermarker {
    constructor() {
        this.inputDir = '';
        this.outputDir = '';
        this.watermarkText = '@Fontur';
        this.fontSize = 24;
        this.fontColor = 'white';
        this.opacity = 0.7;
        this.speed = 2;
    }

    async initialize() {
        console.log(chalk.blue.bold('🎬 Video Watermarker - Fontur (Video Edition)'));
        console.log(chalk.gray('Videolara otomatik hareketli watermark ekleyen yazılım\n'));

        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'inputDir',
                message: 'Video dosyalarının bulunduğu klasör yolu:',
                default: './videos'
            },
            {
                type: 'input',
                name: 'outputDir',
                message: 'İşlenmiş videoların kaydedileceği klasör:',
                default: './output'
            },
            {
                type: 'input',
                name: 'watermarkText',
                message: 'Watermark olarak eklenecek yazı:',
                default: 'RageSawyer GitHub'
            },
            {
                type: 'number',
                name: 'fontSize',
                message: 'Yazı boyutu (pixel):',
                default: 15
            },
            {
                type: 'input',
                name: 'fontColor',
                message: 'Yazı rengi:',
                default: 'white'
            },
            {
                type: 'number',
                name: 'opacity',
                message: 'Şeffaflık (0.1 - 1.0):',
                default: 0.7,
                validate: (value) => value >= 0.1 && value <= 1.0 ? true : '0.1 ile 1.0 arasında olmalı'
            },
            {
                type: 'number',
                name: 'speed',
                message: 'Hareket hızı (1-5, 1=yavaş, 5=hızlı):',
                default: 3,
                validate: (value) => value >= 1 && value <= 5 ? true : '1 ile 5 arasında olmalı'
            }
        ]);

        this.inputDir = answers.inputDir;
        this.outputDir = answers.outputDir;
        this.watermarkText = answers.watermarkText;
        this.fontSize = answers.fontSize;
        this.fontColor = answers.fontColor;
        this.opacity = answers.opacity;
        this.speed = answers.speed;

        await fs.ensureDir(this.outputDir);
    }

    async getVideoFiles() {
        try {
            const files = await fs.readdir(this.inputDir);
            return files.filter(file => {
                const ext = path.extname(file).toLowerCase();
                return ['.mp4', '.avi', '.mov', '.mkv', '.wmv', '.flv'].includes(ext);
            });
        } catch (error) {
            console.error(chalk.red('❌ Video klasörü okunamadı:', error.message));
            return [];
        }
    }

    async getVideoDimensions(videoPath) {
        return new Promise((resolve, reject) => {
            const { spawn } = require('child_process');
            const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
            
            const ffmpeg = spawn(ffmpegPath, [
                '-i', videoPath,
                '-f', 'null',
                '-'
            ], { stdio: ['ignore', 'pipe', 'pipe'] });
            
            let stderr = '';
            ffmpeg.stderr.on('data', (data) => {
                stderr += data.toString();
            });
            
            ffmpeg.on('close', (code) => {
                const sizeMatch = stderr.match(/Stream.*Video.* (\d{2,4})x(\d{2,4})/);
                if (sizeMatch) {
                    const width = parseInt(sizeMatch[1]);
                    const height = parseInt(sizeMatch[2]);
                    resolve({ width, height });
                } else {
                    resolve({ width: 1920, height: 1080 });
                }
            });
            
            ffmpeg.on('error', (err) => {
                resolve({ width: 1920, height: 1080 });
            });
        });
    }

    calculateTextDimensions(text, fontSize) {
        const avgCharWidth = fontSize * 0.6;
        const textWidth = text.length * avgCharWidth;
        const textHeight = fontSize * 1.2;
        
        return {
            width: textWidth,
            height: textHeight
        };
    }

    generateWatermarkFilter(videoPath, dimensions) {
        return new Promise((resolve, reject) => {
            const { width, height } = dimensions;
            
            const textDimensions = this.calculateTextDimensions(this.watermarkText, this.fontSize);
            const textWidth = textDimensions.width;
            const textHeight = textDimensions.height;
            
            const speedX = this.speed * 0.2;
            const speedY = this.speed * 0.15;
            
            const safeAreaX = Math.min(width * 0.12, 80);
            const safeAreaY = Math.min(height * 0.08, 60);
            
            const centerX = width / 2;
            const centerY = height / 2;
            
            const moveX = `(sin(t*${speedX})*${safeAreaX}+${centerX})`;
            const moveY = `(cos(t*${speedY})*${safeAreaY}+${centerY})`;
            
            const safeMargin = 40;
            const minX = textWidth / 2 + safeMargin;
            const maxX = width - textWidth / 2 - safeMargin;
            const minY = textHeight + safeMargin;
            const maxY = height - safeMargin;
            
            const bounceX = `if(lt(${moveX},${minX}),${minX},if(gt(${moveX},${maxX}),${maxX},${moveX}))`;
            const bounceY = `if(lt(${moveY},${minY}),${minY},if(gt(${moveY},${maxY}),${maxY},${moveY}))`;
            
            const filter = `drawtext=text='${this.watermarkText}':fontsize=${this.fontSize}:fontcolor=${this.fontColor}@${this.opacity}:x='${bounceX}':y='${bounceY}'`;
            resolve(filter);
        });
    }

    async processVideo(videoFile, progressBar) {
        const inputPath = path.resolve(this.inputDir, videoFile);
        const outputFileName = `w_${videoFile}`;
        const outputPath = path.resolve(this.outputDir, outputFileName);
        
        try {
            await fs.ensureDir(this.outputDir);
            
            const shortInput = path.relative(process.cwd(), inputPath);
            const shortOutput = path.relative(process.cwd(), outputPath);
            console.log(chalk.gray(`📁 Giriş: ${shortInput}`));
            console.log(chalk.gray(`📁 Çıkış: ${shortOutput}`));
            
            const dimensions = await this.getVideoDimensions(inputPath);
            const watermarkFilter = await this.generateWatermarkFilter(inputPath, dimensions);
            
            return new Promise((resolve, reject) => {
                ffmpeg(inputPath)
                    .videoFilters(watermarkFilter)
                    .outputOptions([
                        '-c:v libx264',
                        '-preset ultrafast',
                        '-crf 23',
                        '-c:a copy'
                    ])
                    .on('progress', (progress) => {
                        if (progressBar) {
                            progressBar.tick(0, { 
                                current: videoFile,
                                percent: Math.round(progress.percent || 0)
                            });
                        }
                    })
                    .on('end', () => {
                        resolve(outputPath);
                    })
                    .on('error', (err) => {
                        reject(err);
                    })
                    .save(outputPath);
            });
        } catch (error) {
            throw new Error(`Video işlenirken hata: ${error.message}`);
        }
    }

    async processAllVideos() {
        const videoFiles = await this.getVideoFiles();
        
        if (videoFiles.length === 0) {
            console.log(chalk.yellow('⚠️  Video dosyası bulunamadı!'));
            return;
        }

        console.log(chalk.green(`✅ ${videoFiles.length} video dosyası bulundu`));
        console.log(chalk.blue(`📁 Giriş: ${this.inputDir}`));
        console.log(chalk.blue(`📁 Çıkış: ${this.outputDir}`));
        console.log(chalk.blue(`💧 Watermark: ${this.watermarkText}`));
        console.log(chalk.blue(`🎨 Boyut: ${this.fontSize}px, Renk: ${this.fontColor}, Şeffaflık: ${this.opacity}`));
        console.log(chalk.blue(`⚡ Hız: ${this.speed}\n`));

        const progressBar = new ProgressBar('İşleniyor [:bar] :current/:total :percent% :etas - :current', {
            complete: '█',
            incomplete: '░',
            width: 40,
            total: videoFiles.length
        });

        const results = [];
        let successCount = 0;
        let errorCount = 0;

        for (let i = 0; i < videoFiles.length; i++) {
            const videoFile = videoFiles[i];
            try {
                const outputPath = await this.processVideo(videoFile, progressBar);
                results.push({ file: videoFile, status: 'success', output: outputPath });
                successCount++;
                console.log(chalk.green(`✅ ${videoFile} işlendi`));
            } catch (error) {
                results.push({ file: videoFile, status: 'error', error: error.message });
                errorCount++;
                console.log(chalk.red(`❌ ${videoFile} hatası: ${error.message}`));
            }
        }

        console.log(chalk.bold('\n📊 İşlem Tamamlandı!'));
        console.log(chalk.green(`✅ Başarılı: ${successCount}`));
        console.log(chalk.red(`❌ Hatalı: ${errorCount}`));
        console.log(chalk.blue(`📁 Çıkış klasörü: ${this.outputDir}`));

        if (errorCount > 0) {
            console.log(chalk.yellow('\n⚠️  Hatalı dosyalar:'));
            results.filter(r => r.status === 'error').forEach(r => {
                console.log(chalk.red(`  - ${r.file}: ${r.error}`));
            });
        }

        console.log(chalk.blue('\n💡 Not: Bu versiyon gerçek video çıktısı oluşturur'));
        console.log(chalk.blue('   MP4 formatında watermark eklenmiş videolar'));
    }

    async run() {
        try {
            await this.initialize();
            await this.processAllVideos();
        } catch (error) {
            console.error(chalk.red('❌ Program hatası:', error.message));
        }
    }
}

const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const ffmpegPath = ffmpegInstaller.path;
const ffprobePath = ffmpegPath.replace('ffmpeg.exe', 'ffprobe.exe');

if (ffmpegPath) {
    ffmpeg.setFfmpegPath(ffmpegPath);
    ffmpeg.setFfprobePath(ffprobePath);
    console.log(chalk.green('✅ FFmpeg otomatik olarak bulundu ve ayarlandı'));
    console.log(chalk.blue(`📁 FFmpeg: ${ffmpegPath}`));
    console.log(chalk.blue(`📁 FFprobe: ${ffprobePath}`));
} else {
    console.error(chalk.red('❌ FFmpeg bulunamadı!'));
    process.exit(1);
}

const watermarker = new VideoWatermarker();
watermarker.run();
