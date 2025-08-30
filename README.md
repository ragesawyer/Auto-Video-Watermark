# 🎬 Video Watermarker - RAGESAWYER

[🇹🇷 Türkçe](#türkçe) | [🇺🇸 English](#english)

---

## 🇹🇷 Türkçe

Videolara otomatik olarak hareketli, şeffaf watermark ekler Node.js ile yazıldı.

### ✨ Özellikleri

- **Toplu İşlem**: Birden fazla video dosyasını tek seferde işler
- **Hareketli Watermark**: DVD yazısı gibi ekranın köşelerine çarparak hareket eder
- **Şeffaflık Kontrolü**: Watermark şeffaflığını ayarlayabilirsiniz
- **Çoklu Format Desteği**: MP4, AVI, MOV, MKV, WMV, FLV, WebM
- **Orijinal Kalite**: Video kalitesi korunur, sadece watermark eklenir
- **İlerleme Takibi**: Gerçek zamanlı işlem durumu gösterimi
- **Otomatik FFmpeg Bulma**: FFmpeg yolu otomatik olarak bulunur

### 🚀 Kurulum

#### 1. Gereksinimler

- **Node.js** (v14 veya üzeri): [https://nodejs.org](https://nodejs.org)
- **FFmpeg**: [https://ffmpeg.org/download.html](https://ffmpeg.org/download.html)

#### 2. FFmpeg Kurulumu (Windows)

**Kurulum:**
1. [FFmpeg Windows Builds](https://github.com/BtbN/FFmpeg-Builds/releases) adresinden indirin
2. ZIP dosyasını `C:\ffmpeg` klasörüne çıkartın
3. `C:\ffmpeg\bin` klasörünü Windows PATH'e ekleyin
4. Bilgisayarı yeniden başlatın

#### 3. Proje Kurulumu

**Linux için:**

```bash
# Projeyi klonlayın veya indirin
cd Kalsör Adı

# Bağımlılıkları yükleyin
npm install

# Programı başlatın
npm start
```

**Windows için:**
```bash
start.bat
```

### 📖 Kullanım

#### 1. Program Başlatma

```bash
npm start
# veya
node index.js
```

#### 2. Ayarları Yapılandırma

Program size şu soruları soracak:

- **Video Klasörü**: İşlenecek videoların bulunduğu klasör
- **Çıkış Klasörü**: İşlenmiş videoların kaydedileceği klasör
- **Watermark Yazısı**: Eklenmek istenen yazı (örn: "FONTUR")
- **Yazı Boyutu**: Pixel cinsinden yazı boyutu
- **Yazı Rengi**: Watermark rengi
- **Şeffaflık**: 0.1 (çok şeffaf) - 1.0 (opak) arası
- **Hareket Hızı**: 1 (yavaş) - 5 (hızlı) arası

#### 3. Örnek Kullanım

```
🎬 Video Watermarker - Fontur
Videolara otomatik hareketli watermark ekleyen yazılım

? Video dosyalarının bulunduğu klasör yolu: ./videos
? İşlenmiş videoların kaydedileceği klasör: ./output
? Watermark olarak eklenecek yazı: FONTUR
? Yazı boyutu (pixel): 48
? Yazı rengi: white
? Şeffaflık (0.1 - 1.0): 0.7
? Hareket hızı (1-5, 1=yavaş, 5=hızlı): 2

✅ 5 video dosyası bulundu
📁 Giriş: ./videos
📁 Çıkış: ./output
💧 Watermark: FONTUR
🎨 Boyut: 48px, Renk: white, Şeffaflık: 0.7
⚡ Hız: 2

İşleniyor [████████████████████████████████████████] 5/5 100% 0s - video5.mp4
✅ video1.mp4 işlendi
✅ video2.mp4 işlendi
✅ video3.mp4 işlendi
✅ video4.mp4 işlendi
✅ video5.mp4 işlendi

📊 İşlem Tamamlandı!
✅ Başarılı: 5
❌ Hatalı: 0
📁 Çıkış klasörü: ./output
```

### 🔧 Gelişmiş Ayarlar

#### Video İşleme Parametreleri

- **Codec**: H.264 (libx264)
- **Preset**: Medium (hız/kalite dengesi)
- **CRF**: 23 (kalite ayarı, düşük = yüksek kalite)
- **Audio**: Orijinal ses kopyalanır

#### Watermark Hareket Formülü

Watermark şu matematiksel formülle hareket eder:

```javascript
// X ekseni hareketi
moveX = sin(time * speed) * width * 0.3 + width * 0.5

// Y ekseni hareketi  
moveY = cos(time * speed * 0.7) * height * 0.3 + height * 0.5

// Köşelere çarpma efekti
bounceX = if(x < fontSize, fontSize, if(x > width - fontSize, width - fontSize, x))
bounceY = if(y < fontSize, fontSize, if(y > height - fontSize, height - fontSize, y))
```

### 📁 Klasör Yapısı

```
video-watermarker/
├── index.js          # Ana program
├── config.js         # Konfigürasyon
├── package.json      # Bağımlılıklar
├── README.md         # Bu dosya
├── videos/           # Giriş videoları (oluşturulacak)
└── output/           # İşlenmiş videolar (oluşturulacak)
```

### 🎯 Desteklenen Video Formatları

- **MP4** (.mp4) - En yaygın format
- **AVI** (.avi) - Eski format
- **MOV** (.mov) - Apple formatı
- **MKV** (.mkv) - Açık kaynak
- **WMV** (.wmv) - Windows Media
- **FLV** (.flv) - Flash Video
- **WebM** (.webm) - Web formatı

### ⚠️ Sorun Giderme

#### FFmpeg Bulunamadı Hatası

```
❌ FFmpeg bulunamadı! Lütfen FFmpeg'i yükleyin.
📥 FFmpeg indirme: https://ffmpeg.org/download.html
```

**Çözüm:**
1. FFmpeg'i indirin ve kurun
2. `C:\ffmpeg\bin` klasörünü PATH'e ekleyin
3. Bilgisayarı yeniden başlatın

#### Video İşleme Hatası

```
❌ video1.mp4 hatası: Video işlenirken hata: ...
```

**Çözüm:**
1. Video dosyasının bozuk olmadığından emin olun
2. FFmpeg'in güncel olduğundan emin olun
3. Disk alanının yeterli olduğundan emin olun

#### Performans Sorunları

- **Hızlı işlem için**: `videoPreset: 'ultrafast'` kullanın
- **Yüksek kalite için**: `videoCRF: 18` kullanın
- **Düşük boyut için**: `videoCRF: 28` kullanın

### 🚀 Geliştirme

#### Yeni Özellik Ekleme

```javascript
// Yeni watermark efekti eklemek için
class CustomWatermarker extends VideoWatermarker {
    generateWatermarkFilter(videoPath) {
        // Özel filtre mantığı
    }
}
```

#### Batch İşlem Optimizasyonu

```javascript
// Paralel işlem için
const promises = videoFiles.map(video => this.processVideo(video));
await Promise.all(promises);
```

### 📄 Lisans

MIT License - [Detaylar için LICENSE dosyasına bakın](LICENSE)

### 🤝 Katkıda Bulunun

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

### 📞 Destek

- **GitHub Issues**: [Proje sayfasında](https://github.com/ragesawyer/Auto-Video-Watermark/issues)
- **İnstagram**: [@emrerage](https://www.instagram.com/emrerage/)

---

## 🇺🇸 English

Automatically adds animated, transparent watermarks to videos. Written in Node.js.

### ✨ Features

- **Batch Processing**: Processes multiple video files at once
- **Animated Watermark**: Moves like DVD text, bouncing off screen corners
- **Transparency Control**: Adjustable watermark transparency
- **Multi-Format Support**: MP4, AVI, MOV, MKV, WMV, FLV, WebM
- **Original Quality**: Video quality is preserved, only watermark is added
- **Progress Tracking**: Real-time processing status display
- **Auto FFmpeg Detection**: FFmpeg path is automatically found

### 🚀 Installation

#### 1. Requirements

- **Node.js** (v14 or higher): [https://nodejs.org](https://nodejs.org)
- **FFmpeg**: [https://ffmpeg.org/download.html](https://ffmpeg.org/download.html)

#### 2. FFmpeg Installation (Windows)

**Installation:**
1. Download from [FFmpeg Windows Builds](https://github.com/BtbN/FFmpeg-Builds/releases)
2. Extract ZIP file to `C:\ffmpeg` folder
3. Add `C:\ffmpeg\bin` folder to Windows PATH
4. Restart computer

#### 3. Project Installation

**For Linux:**

```bash
# Clone or download project
cd Folder Name

# Install dependencies
npm install

# Start program
npm start
```

**For Windows:**
```bash
start.bat
```

### 📖 Usage

#### 1. Starting the Program

```bash
npm start
# or
node index.js
```

#### 2. Configuration Settings

The program will ask you these questions:

- **Video Folder**: Folder containing videos to be processed
- **Output Folder**: Folder where processed videos will be saved
- **Watermark Text**: Text to be added (e.g., "FONTUR")
- **Text Size**: Text size in pixels
- **Text Color**: Watermark color
- **Transparency**: Between 0.1 (very transparent) - 1.0 (opaque)
- **Movement Speed**: Between 1 (slow) - 5 (fast)

#### 3. Example Usage

```
🎬 Video Watermarker - Fontur
Software that automatically adds animated watermarks to videos

? Video files folder path: ./videos
? Output folder for processed videos: ./output
? Text to add as watermark: FONTUR
? Text size (pixels): 48
? Text color: white
? Transparency (0.1 - 1.0): 0.7
? Movement speed (1-5, 1=slow, 5=fast): 2

✅ 5 video files found
📁 Input: ./videos
📁 Output: ./output
💧 Watermark: FONTUR
🎨 Size: 48px, Color: white, Transparency: 0.7
⚡ Speed: 2

Processing [████████████████████████████████████████] 5/5 100% 0s - video5.mp4
✅ video1.mp4 processed
✅ video2.mp4 processed
✅ video3.mp4 processed
✅ video4.mp4 processed
✅ video5.mp4 processed

📊 Process Completed!
✅ Successful: 5
❌ Failed: 0
📁 Output folder: ./output
```

### 🔧 Advanced Settings

#### Video Processing Parameters

- **Codec**: H.264 (libx264)
- **Preset**: Medium (speed/quality balance)
- **CRF**: 23 (quality setting, lower = higher quality)
- **Audio**: Original audio is copied

#### Watermark Movement Formula

Watermark moves using this mathematical formula:

```javascript
// X-axis movement
moveX = sin(time * speed) * width * 0.3 + width * 0.5

// Y-axis movement  
moveY = cos(time * speed * 0.7) * height * 0.3 + height * 0.5

// Corner bounce effect
bounceX = if(x < fontSize, fontSize, if(x > width - fontSize, width - fontSize, x))
bounceY = if(y < fontSize, fontSize, if(y > height - fontSize, height - fontSize, y))
```

### 📁 Folder Structure

```
video-watermarker/
├── index.js          # Main program
├── config.js         # Configuration
├── package.json      # Dependencies
├── README.md         # This file
├── videos/           # Input videos (will be created)
└── output/           # Processed videos (will be created)
```

### 🎯 Supported Video Formats

- **MP4** (.mp4) - Most common format
- **AVI** (.avi) - Old format
- **MOV** (.mov) - Apple format
- **MKV** (.mkv) - Open source
- **WMV** (.wmv) - Windows Media
- **FLV** (.flv) - Flash Video
- **WebM** (.webm) - Web format

### ⚠️ Troubleshooting

#### FFmpeg Not Found Error

```
❌ FFmpeg not found! Please install FFmpeg.
📥 Download FFmpeg: https://ffmpeg.org/download.html
```

**Solution:**
1. Download and install FFmpeg
2. Add `C:\ffmpeg\bin` folder to PATH
3. Restart computer

#### Video Processing Error

```
❌ video1.mp4 error: Error while processing video: ...
```

**Solution:**
1. Ensure video file is not corrupted
2. Ensure FFmpeg is up to date
3. Ensure sufficient disk space

#### Performance Issues

- **For fast processing**: Use `videoPreset: 'ultrafast'`
- **For high quality**: Use `videoCRF: 18`
- **For small size**: Use `videoCRF: 28`

### 🚀 Development

#### Adding New Features

```javascript
// To add new watermark effects
class CustomWatermarker extends VideoWatermarker {
    generateWatermarkFilter(videoPath) {
        // Custom filter logic
    }
}
```

#### Batch Processing Optimization

```javascript
// For parallel processing
const promises = videoFiles.map(video => this.processVideo(video));
await Promise.all(promises);
```

### 📄 License

MIT License - [See LICENSE file for details](LICENSE)

### 🤝 Contributing

1. Fork the project
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### 📞 Support

- **GitHub Issues**: [On project page](https://github.com/ragesawyer/Auto-Video-Watermark/issues)
- **Instagram**: [@emrerage](https://www.instagram.com/emrerage/)

---

**Auto-Video-Watermark** - Make your videos look professional! 🎬✨

