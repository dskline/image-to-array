/**
 * Created by klinetic on 6/21/17.
 */
import BrowserUtils from 'src/modules/browserUtils';
import ImageFinder from 'src/modules/imageFinder';
import CropUtils from 'src/modules/cropUtils';

class ImageToArray {

  constructor(base64Image, options = {}) {
    this.base64Image = base64Image;
    this.colorThreshold = options.colorThreshold || 20;
    this.minImageWidth = options.minImageWidth || 100;
    this.minImageHeight = options.minImageHeight || 50;
  }

  async split() {
    const canvas = await BrowserUtils.createCanvas(this.base64Image);
    const imageFinder = new ImageFinder(canvas, this.colorThreshold, this.minImageWidth, this.minImageHeight);
    const imageArray = imageFinder.search();

    let result = [];
    imageArray.forEach((i) => {
      result.push(CropUtils.crop(this.base64Image, i));
    });
    return Promise.all(result);
  }
}

module.exports = ImageToArray;
