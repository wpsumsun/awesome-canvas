/**
 * y = A sin(Bx + C) + D
 * 振幅A：控制波浪的高度
 * 周期B：控制波浪的宽度
 * 相移C：控制波浪的水平移动
 * 垂直位移D：控制水位的高度
 */

class Wave {
  constructor({
    canvasWidth,
    canvasHeight,
    waveWidth = 0.05,
    waveHeight= 6,
    xOffset = 0,
    speed = 0,
    colors = ['#DBB77A', '#BF8F3B'], // 波浪颜色
  }) {
    this.points = [];
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.xOffset = xOffset; // 水平位移 控制波浪滚动
    this.waveWidth = waveWidth;
    this.waveHeight = waveHeight;
    this.startX = 0;
    this.speed = speed; // 水平位移速度
    this.colors = colors;
    this.nowRange = 0;
  }
  
  getChartColor(ctx) {
    const radius = this.canvasWidth / 2;
    const grd = ctx.createLinearGradient(radius, radius, radius, this.canvasHeight);
    grd.addColorStop(0, this.colors[0]);
    grd.addColorStop(1, this.colors[1]);
    return grd;
  }
  
  draw(ctx) {
    ctx.save();
    
    const points = this.points;
    ctx.beginPath();
    for(let i = 0;i<points.length;i++) {
      const [x, y] = points[i];
      ctx.lineTo(x, y);
    }
    
    ctx.lineTo(this.canvasWidth, this.canvasHeight);
    ctx.lineTo(this.startX, this.canvasHeight);
    ctx.lineTo(points[0][0], points[0][1]);
    ctx.fillStyle = this.getChartColor(ctx);
    ctx.fill();
    
    ctx.restore();
  
    this.drawText(ctx);
  }
  
  update({ nowRange }) {
    this.nowRange = nowRange;
    this.points = [];
    const {
      startX, waveHeight, waveWidth, canvasWidth, canvasHeight, xOffset,
    } = this;
  
    for(let x = startX;x < startX + canvasWidth;x += 20/canvasWidth) {
      const y = waveHeight * Math.sin((x + startX) * waveWidth + xOffset);
      const yPoint = (1 - nowRange/100) * canvasHeight + y;
      this.points.push([x, yPoint]);
    }
    this.xOffset += this.speed;
  }
  
  drawText(ctx) {
    const size = this.canvasWidth / 5;
    ctx.font = 'bold ' + size + 'px Microsoft Yahei';
    let txt = this.nowRange + '%'
    ctx.fillStyle = '#f6b71e'
    ctx.textAlign = 'center'
    ctx.fillText(txt, this.canvasWidth / 2 + 2, this.canvasHeight / 2 + 5)
  }
}