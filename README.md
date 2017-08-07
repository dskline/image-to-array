[![npm version](https://badge.fury.io/js/image-to-array.svg)](https://badge.fury.io/js/image-to-array)
[![Build Status](https://travis-ci.org/dskline/image-to-array.svg?branch=master)](https://travis-ci.org/dskline/image-to-array)
[![Coverage Status](https://coveralls.io/repos/github/dskline/image-to-array/badge.svg?branch=master)](https://coveralls.io/github/dskline/image-to-array?branch=master)
[![Code Climate](https://codeclimate.com/github/dskline/image-to-array/badges/gpa.svg)](https://codeclimate.com/github/codeclimate/codeclimate)

# Image-to-Array.js

[![Greenkeeper badge](https://badges.greenkeeper.io/dskline/image-to-array.svg)](https://greenkeeper.io/)

A simple Javascript library that extracts an array of rectangular images from a single (large) image with a solid or 
gradient background.

This library only works via client-side javascript, as it requires a canvas object to analyze and transform the image.
Until there is a server-side alternative, you can use PhantomJS or another headless browser (which is what this project
uses to perform unit tests).


## Installation

You can add the library by downloading the raw javascript file from Releases and including it on your webpage.

Or if you're up to date with the times, you can install it with NPM:

```
npm install image-to-array
```

## Usage

Check out the `/examples` directory for quick HTML samples.

```
var imageToArray = new ImageToArray(base64Image);

imageToArray.split().then(function(result) {
  // result contains an array of cropped base64 images
  result.forEach(function(r) {
    var newImage = document.createElement('img');
    newImage.src = r;
    document.getElementsByTagName('body')[0].appendChild(newImage);
  });
});
```

## License

Mit License: [http://www.opensource.org/licenses/mit-license.php](http://www.opensource.org/licenses/mit-license.php)
