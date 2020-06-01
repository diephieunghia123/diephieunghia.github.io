var processor = {
  timerCallback: function () {
      if (this.video.paused || this.video.ended) {
          return;
      }
      this.computeFrame();
      let self = this;
      setTimeout(function () {
          self.timerCallback();
      }, 25);
  },

  doLoad: function () {
      this.video = document.getElementById("video");
      this.c1 = document.getElementById("video2");
      this.ctx1 = this.c1.getContext("2d");
      let self = this;
      this.video.addEventListener("play", function () {
          self.width = self.video.width;
          self.height = self.video.height;
          self.timerCallback();
      }, false);
  },

  computeFrame: function () {
    this.ctx1.drawImage(this.video, 0, 0, this.width, this.height);
      var frame = this.ctx1.getImageData(0, 0, this.width, this.height);
      var sobelData = Sobel(frame);
      var sobelImageData = sobelData.toImageData();
      this.ctx1.putImageData(sobelImageData, 0, 0);
  }
};
processor.doLoad()