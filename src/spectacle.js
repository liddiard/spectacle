export default class Spectacle {
  constructor(options) {
    this.defaultOptions = {
      scaleFactor: 1.2,
      wrapperClass: 'spectacle'
    };
    this.rotation = 0;
    this.options = Object.assign({}, this.defaultOptions, options);
    if (!this.options.hasOwnProperty('selector') {
      throw new Error('Spectacle constructor `options` object must be passed a CSS selector with property name `selector`.');
    }
    this.videos = document.querySelectorAll(this.options.selector);
    this.listener = document.addEventListener('deviceorientation', updateRotation);

    this.videos.forEach(video => {
      const wrapper = document.createElement('div');
      wrapper.className = this.options.wrapperClass;
      wrapper.appendChild(video);
    });
  }

  updateRotation(event) {
    this.rotation = event.alpha;
    this.videos.forEach(video => {
      video.style.transform = `rotate(${this.rotation}deg) scale(${this.options.scaleFactor})`;
    });
  }

  rebind() {
    this.videos = document.querySelectorAll(this.options.selector);
  }

  unbind() {
    document.removeEventListener('deviceorientation', this.listener);
  }
}
