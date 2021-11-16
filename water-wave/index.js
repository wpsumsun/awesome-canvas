class WaterWave {
   constructor ({
     canvasEl,
     rangeValue = 80,
   }) {
     const canvas = canvasEl;
     canvas.width = 300;
     canvas.height = 300;
     this.canvas = canvas;
     this.canvasWidth = canvas.width;
     this.canvasHeight = canvas.height;
     // RetinaRun(canvas);
     this.isDrawContainer = false;
     this.nowRange = 0;
     this.rangeValue = rangeValue; // 目标水位高度
     this.nowRangeValue = 0 // 初始水位高度
     this.wave1 = new Wave({
       canvasWidth: this.canvasWidth, // 轴长
       canvasHeight: this.canvasHeight, // 轴高
       waveWidth: 0.055, // 波浪宽度,数越小越宽
       waveHeight: 4, // 波浪高度,数越大越高
       colors: ['#F39C6B', '#A0563B'], // 波浪颜色
       xOffset: 0, // 初始偏移
       speed: 0.04, // 速度
     });
     this.wave2 = new Wave({
       canvasWidth: this.canvasWidth, // 轴长
       canvasHeight: this.canvasHeight, // 轴高
       waveWidth: 0.04, // 波浪宽度,数越小越宽
       waveHeight: 4, // 波浪高度,数越大越高
       colors: ['rgba(243, 156, 107, 0.48)', 'rgba(160, 86, 59, 0.48)'], // 波浪颜色
       xOffset: 2, // 初始偏移
       speed: 0.02, // 速度
     });
     this.draw();
   }
   
   draw() {
     const ctx = this.canvas.getContext("2d");
     ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
     if (!this.isDrawContainer) {
       this.drawContainer(ctx);
     }
     if (this.nowRangeValue < this.rangeValue) {
       this.nowRangeValue += 1;
     }
  
     if (this.nowRangeValue > this.rangeValue) {
       this.nowRangeValue -= 1;
     }
     
     this.wave1.update({ nowRange: this.nowRangeValue });
     this.wave1.draw(ctx);
     
     this.wave2.update({ nowRange: this.nowRangeValue });
     this.wave2.draw(ctx);
     
     requestAnimationFrame(this.draw.bind(this));
   }
  
  drawContainer(ctx) {
    const r = this.canvasWidth/2;
    const lineWidth = 4;
    const cr = r - lineWidth;
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = 'rgba(186, 165, 130, 0.3)';
    ctx.beginPath();
    ctx.arc(this.canvasWidth / 2, this.canvasHeight / 2, cr, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.clip();
    this.isDrawContainer = true;
  }
}