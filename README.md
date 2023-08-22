# DʀᴀᴡAᴄʜᴀR
<p align=center><a href="https://1280px.github.io/drawachar"><img src="https://raw.githubusercontent.com/1280px/drawachar/master/README-img.gif"></a>
<br><i>Try it online, without installation!</i></p>

**DrawAchaR** is a simple Firefox MV2 add-on that allows to bind any symbol, word or text you want to some doodle, making it easy to access them when you need. It is powered by TensorFlow.js with KNN Classifier and MobileNet model.

<details><summary><b><i>A little backstory, if you're interested</i></b></summary>

***DAC (codename Toffee)** is my school graduation project, which I decided to finish and publish the code. Originally inspired by **Windows IME Pad**, the idea was to use a quick AI model which user can train by self-drawn examples, all running completely locally.*

*This was rather an experiment, as I was working with TensorFlow for the first time. Nonetheless, it was community ranked as the second-best project, right after real-time Python 3D objects classifier!*

*There were also a few attempts to make it based on [brain.js](https://github.com/BrainJS/brain.js) and [HanziLookupJS](https://github.com/gugray/HanziLookupJS), but in the end I decided to go with **TFJS+MN+KNN**, as it gives the best recognition quality, despite being a bit slower.*
</details>


### Limitations
- Due to usage of localStorage for storing data, max dataset size is only ~5 MB. This can be bypassed by either increasing LS quota in `about:config`, or using IndexedDB for storing data instead.
- I didn't find a reliable way to store MobileNet locally, so DAC has to fetch it every time it is loaded, making it impossible to use without Internet.


## Downloads
You can download the latest signed version of the add-on from AMO: https://addons.mozilla.org/firefox/addon/drawachar

Or, you can download the .XPI from [Releases page](https://github.com/1280px/drawachar/releases/latest) and install it as temporary add-on using `about:debugging`

I also made a few dataset presets, which you can try in both online and installed versions of DrawAchaR:

|<a href="https://github.com/1280px/drawachar/blob/main/examples/numbers_30.json"><img src="https://raw.githubusercontent.com/1280px/drawachar/master/examples/numbers_30-img.png"><br>Dataset&nbsp;1: handwritten digits, 0 to 9 (30&nbsp;examples)</a>|<a href="https://github.com/1280px/drawachar/blob/main/examples/ruscaphw_10.json"><img src="https://raw.githubusercontent.com/1280px/drawachar/master/examples/ruscaphw_10-img.png"><br>Dataset&nbsp;2: Russian alphabet, handwritten capitals (10&nbsp;examples)</a>|
|----|----|


## Used resources:
- https://www.webtips.dev/writing-your-very-first-neural-network-in-javascript (original classifier tutorial)
- https://medium.com/maria-machine/charlie-gerard-machine-learning-for-front-end-developers-with-tensorflowjs-9c908fbfa8ec (TFJS + KNN ML tutorial)
- https://npm.io/package/@tensorflow-models/knn-classifier (simple KNN documentation)
- http://jsfiddle.net/z372rv90 (canvas drawingpad code)
- And, of course, DuckDuckGo and StackOverflow. Thank you for all, wise strangers from the World Wide Web :)
