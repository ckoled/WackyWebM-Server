# WackyWebM Server

[![Weblate project translated](https://img.shields.io/weblate/progress/wackywebm?server=https%3A%2F%2Ftranslate.kiaibot.com&style=for-the-badge)](https://translate.kiaibot.com/projects/wackywebm/wackywebm)
![GitHub contributors](https://img.shields.io/github/contributors/oirnoir/wackywebm?style=for-the-badge)
![GitHub Repo stars](https://img.shields.io/github/stars/oirnoir/wackywebm?style=for-the-badge)
[![Discord](https://img.shields.io/discord/1003791722574266488?style=for-the-badge)](https://discord.gg/wackywebm)


WackyWebM is a tool that allows you to create WebM video files with changing aspect ratios. This is a fork that creates an http server to wackify videos remotely.

If you're having issues, want to share your custom modes, or learn from the community join the Discord at the bottom of this readme.

## Running Server

### Locally

Follow steps to setup WackyWebM normally.

Build frontend with `npm run build`. Then
```
node server.js
```

### Docker

```
docker build . -t wackywebmserver
```
```
docker run --name wackywebmserver -d -p 8080:8080 wackywebmserver
```

### Calling

```
url: [API_BASE_PATH]/api/wackify
query: {
  mode: [default 'bounce']
  bitrate: [default '1M']
  tempo: [default 2]
  angle: [default 360]
  compression: [default 0]
  transparency: [default 1]
}
body: {
  file: [required]
  keyfile: [default null]
}
```
UI served at http://localhost:8080

[Hosted Demo](https://wackify.jarasicrabit.com)

## TODO
 - convert main to handler
 - keyfile
 - save as
 - validation

## WackyWebM
## Dependencies

- [NodeJS v16.6 or higher](https://nodejs.org/en/download/)
- [FFmpeg](https://ffmpeg.org/download.html)
- FFprobe (included with FFmpeg)
- Various NPM packages (simply run `npm i` in the project directory after installing node to install them automatically)
-  Or just [Docker](https://www.docker.com/products/docker-desktop/)

## NodeJS

To begin installation, you must install NodeJS first. You can find the NodeJS download [here.](https://nodejs.org/en/download)

Select your OS, and use the installer. After finished installing, click the `finish` button.

![image](https://user-images.githubusercontent.com/69131802/182696287-ae753806-0946-4742-9f73-2cb4d1ee78f2.png)

## FFmpeg

After installing NodeJS, you need to download FFmpeg next. To install FFmpeg you need to go to [this](https://ffmpeg.org) link and select the green Download button.

![image](https://user-images.githubusercontent.com/69131802/182697226-0a60be60-8a6d-433b-bc91-2627266f6058.png)

### Windows

To download FFmpeg for Windows, navigate to the Windows logo and select `Windows builds by BtbN` after that, it is recommended to select `ffmpeg-master-latest-win64-gpl-shared.zip`

Once downloaded, unzip the file and move it to somewhere safe.

Select that folder, then rename it to `ffmpeg`

![image](https://user-images.githubusercontent.com/69131802/182937764-c2a842b4-f96e-4b09-b9f4-ac8896b2d38e.png)

Copy the unzipped folder, direct to This PC, enter your C: drive and paste the `ffmpeg` folder in there.

![image](https://user-images.githubusercontent.com/69131802/182937173-231ae1dd-19b2-4551-9f9f-228cc353b0f8.png)

After moving the ffmpeg folder into your C: drive, open Command Prompt with administrator and run this: setx /m PATH "C:\ffmpeg\bin;%PATH%" (If, for some reason, you are unable to run Command Prompt with administrator permissions, you can hit the windows key, then type "edit environment variables for your account" and hit enter, then you need to click "Path", then click "Edit," then you click "New" and paste in "C:\ffmpeg\bin" and then make sure to click "Ok" in both windows).

Now, type in "ffmpeg" to the command prompt. If you get an error, you need to log out and log back in, run ffmpeg inside of the command prompt window once more, and if you do not get an error you're all set. If you still get an error, you can try restarting your computer, and typing "ffmpeg" into the command prompt again. If it still doesn't work, you can get help in #support in [this](https://discord.gg/TmyJfq49AP) discord server.

### MacOS

For MacOS users, refer to [this](https://bbc.github.io/bbcat-orchestration-docs/installation-mac-manual/) tutorial for FFmpeg installation.

### Linux

For Linux users, refer to [this](https://www.tecmint.com/install-ffmpeg-in-linux/) tutorial for FFmpeg installation.


## Modes

- `Bounce` (Default): The video bounces up and down.
- `Shutter`: The video bounces left to right.
- `Sporadic`: The video glitches and wobbles randomly.
- `Shrink`: The video shrinks vertically until it's just one pixel thin.
- `AudioBounce`: The video's vertical height changes relative to the current audio level verses the highest within the video.
- `AudioShutter`: The video's horizontal width changes relative to the current audio level verses the highest within the video.
- `Transparency`: Crops the video so that transparent pixels are excluded from the final result.
- `Keyframes`: The video's height and width change based on a number of keyframes outlined in the file given as an argument. The format is as follows:
  - Every line consists of 4 (or 3) comma-seperated values:
    - first, the time in the video of the keyframe; either one integer representing seconds, or two, seperated by any one of the characters `.`, `:` or `-`, where the first still represents seconds, and the second represents frames.
    - next, the width, then the height at that keyframe (in pixels)
    - finally, the interpolation with which to advance towards the next keyframe - currently, the following are supported:
      - `linear`: linearly interpolates towards the next keyframe. if the line only contains 3 values, this mode is implied, so it is not required to be written out every time.
      - `instant`: instantly sets the size to the given values
  - If it isn't overwritten, an implicit keyframe at 0 frames into the video is added with linear interpolation and the video's original size.
  - To use this mode, add `-k` with the path to your csv file.

Additionally, any 2 modes can be combined using a + symbol, like Bounce+Shutter. If one only specifies width, and one only specifies height, then those respective values are used. If there is a conflict, the value from the latter of the 2 modes is used (so Shrink+Bounce would result in the same effect as just Bounce)

## Support

If you encounter bugs, issues, or have recommendations, feel free to join the Discord [here.](https://discord.gg/TmyJfq49AP)
[![Discord Invite Widget](https://invidget.switchblade.xyz/EdrqJ6AMKF)](https://discord.gg/EdrqJ6AMKF)
