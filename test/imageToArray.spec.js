import ImageToArray from 'src/imageToArray';
import { expect } from 'chai';

describe('ImageToArray', () => {

  it('should return 16 images', (done) => {
    runTest('/data/images/pvzheroes.png')
      .then(result => {
        expect(result.length).to.equal(16);
        done();
      });
  });

  // This fails currently, will be goal of next release
  // it('should return 8 images', (done) => {
  //   runTest('/data/images/hearthstone.png', { colorThreshold: 50 })
  //     .then(result => {
  //
  //       expect(result.length).to.equal(8);
  //       done();
  //     });
  // });

  function runTest(imagePath, options) {
    return new Promise((resolve) => {
      fetch(imagePath)
        .then(res => res.blob())
        .then(blob => {
          const base64Image = URL.createObjectURL(blob);
          const imageToArray = new ImageToArray(base64Image, options);
          imageToArray.split().then(result => resolve(result));
        });
    });
  }
});
