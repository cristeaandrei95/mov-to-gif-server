# mov-to-gif-server

## Scope
I wanted to build an application that converts my screen recordings to gif animations for my Github pull requests.
This project requires it's client counterpart in order to work, and can be found [here](https://github.com/cristeaandrei95/mov-to-gif-client).

## Prerequisites
- [FFmpeg](http://ffmpeg.org/) [🐓🐓🐓🐓](http://en.wikipedia.org/wiki/FFmpeg#History) (`$ brew install ffmpeg`)
- [convert](http://www.imagemagick.org/script/convert.php), the famous [ImageMagick](http://www.imagemagick.org/) (`$ brew install imagemagick`)
- [pornel/giflossy](https://github.com/pornel/giflossy/releases), it's a [gifsicle](http://www.lcdf.org/gifsicle/) fork (waiting for [gifsicle#16](https://github.com/kohler/gifsicle/pull/16) to be merged) (`$ brew install giflossy`)

## Installation
`npm install`

## start
`npm start`
