/**
 * Created by klinetic on 6/21/17.
 */
import Croppie from 'croppie';

export default class CropUtils {

  /**
   *
   * @param base64Image
   * @param croptions (I couldn't resist)
   *  JSON Object
   *  {
   *    xStart: (pixels)
   *    xEnd: (pixels)
   *    yStart: (pixels)
   *    yEnd: (pixels)
   *  }
   * @returns {Promise}
   *  A new, cropped base64 image
   */
  static async crop(base64Image, croptions) {
    return new Promise((resolve) => {
      let cropArea = document.createElement('div');
      cropArea.setAttribute('style', 'position: absolute; top: -9999px; left: -9999px;');
      cropArea.setAttribute('class', 'cropContainer');
      document.getElementsByTagName('body')[0].appendChild(cropArea);

      let cropTool = new Croppie(cropArea, {
        viewport: { width: croptions.xEnd - croptions.xStart, height: croptions.yEnd - croptions.yStart }
      });
      cropTool.bind({
        url: base64Image,
        points: [croptions.xStart, croptions.yStart, croptions.xEnd, croptions.yEnd]
      }, function() {
        resolve(cropTool.result('base64'));
        cropTool.destroy();
        document.getElementsByTagName('body')[0].removeChild(cropArea);
      });
    });
  }
}
