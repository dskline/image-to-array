/**
 * Created by klinetic on 6/21/17.
 */

export default class BrowserUtils {

  static async createCanvas(base64Image) {
    return new Promise((resolve) => {
      let img = new window.Image();
      img.onload = function onImageLoad() {
        let width = img.width, height = img.height;
        let canvas = document.createElement('canvas');

        canvas.width = width;
        canvas.height = height;

        let ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        resolve(ctx.getImageData(0, 0, width, height));
      };
      img.src = base64Image;
    });
  }
}
