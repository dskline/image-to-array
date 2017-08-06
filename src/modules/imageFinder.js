/**
 * Created by klinetic on 6/21/17.
 */
export default class ImageFinder {

  constructor(canvas, colorThreshold, minImageWidth, minImageHeight) {
    this.canvas = canvas.data;
    this.height = canvas.height;
    this.width = canvas.width;
    this.minImageWidth = minImageWidth;
    this.minImageHeight = minImageHeight;
    this.colorThreshold = colorThreshold;
  }

  search() {
    let top = [], left = [], xLoc, yLoc, rgb, nextRGB;
    const yStop = this.height - this.minImageHeight, xStop = this.width - this.minImageWidth;

    // Get the margins from the top of the image
    for (xLoc = 0; xLoc < this.width; xLoc++) {
      yLoc = 0;
      nextRGB = this._getRGB(xLoc, 0);
      do {
        rgb = nextRGB;
        nextRGB = this._getRGB(xLoc, ++yLoc);
      } while (yLoc < yStop && this._colorsMatch(rgb, nextRGB));
      top.push(yLoc);
    }
    // Get the margins from the left side
    for (yLoc = 0; yLoc < this.height; yLoc++) {
      xLoc = 0;
      nextRGB = this._getRGB(0, yLoc);
      do {
        rgb = nextRGB;
        nextRGB = this._getRGB(++xLoc, yLoc);
      } while (xLoc < xStop && this._colorsMatch(rgb, nextRGB));
      left.push(xLoc);
    }
    // Find all images, assuming all are the same width and height (performance is better that way)
    let result = [], imgStartX, imgStartY, imgWidth, imgHeight;
    for (yLoc = 0; yLoc < yStop; yLoc++) {
      // Find the start of the images from the top
      if (imgStartY === undefined && left[yLoc] < xStop) {
        imgStartY = yLoc;
        if (imgHeight) {
          yLoc += imgHeight;
        }
      } else if (imgStartY && left[yLoc] === xStop) {
        if (imgHeight === undefined) {
          imgHeight = yLoc - imgStartY;
        }
        // Find each image within the Y bounds, and add it to result
        for (xLoc = 0; xLoc < xStop; xLoc++) {
          if (imgStartX === undefined && top[xLoc] < yStop) {
            imgStartX = xLoc;
            if (imgWidth) {
              xLoc += imgWidth;
            }
          } else if (imgWidth === undefined && imgStartX && top[xLoc] === yStop) {
            if (imgWidth === undefined) {
              imgWidth = xLoc - imgStartX;
            }
          }
          if (imgStartX && imgWidth) {
            result.push({ xStart: imgStartX, yStart: imgStartY, xEnd: imgWidth + imgStartX, yEnd: imgHeight + imgStartY });
            imgStartX = undefined;
          }
        }
        imgStartY = undefined; // Be able to find the start of the next image
      }
    }
    return result;
  }

  _getRGB(xLoc, yLoc) {
    let dataOffset = (yLoc * this.width * 4) + (xLoc * 4);
    return [this.canvas[dataOffset], this.canvas[dataOffset + 1], this.canvas[dataOffset + 2]];
  }

  _colorsMatch(rgb, rgb2) {
    let diff;
    for (let i = 0; i < 3; i++) {
      diff = rgb[i] - rgb2[i];
      if (diff > this.colorThreshold || diff < (-1 * this.colorThreshold)) {
        return false;
      }
    }
    return true;
  }
}
