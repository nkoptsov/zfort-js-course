var playerTmpl = require('./templates/player');
var defineUI = require('./ui_dom');

/* Exercise:
 * move `_renderPlaylist` method into a separate module `playlist_renderer.js`
 * import use `renderPlaylist` function in this module
 * (see how it is done with `ui_dom` module as an example)
 */

var audioPlayer = {

  _element: null,
  _isPlaying: false,
  _currentTrack: 0,

  _defineUI: defineUI,

  // _renderPlaylist: renderPlaylist,
  _renderPlaylist: function() {
    this._display.playlist.innerHTML = this._userData.playlist.map(function(track) {
      return '<li class="item">' + track.title + '</li>';
    }).join('');
  },

  init: function(audioElement, playlist) {

    this._userData = {};
    this._userData.playlist = playlist;

    this._handlePlaybackChange = this._handlePlaybackChange.bind(this);
    this._handleTimeChange = this._handleTimeChange.bind(this);
    this._handleNext = this._handleNext.bind(this);
    this._handlePrev = this._handlePrev.bind(this);

    this._element = audioElement;
    this._element.style.display = 'none';

    var playerUI = this._buildUI();
    var parent = this._element.parentNode;

    parent.insertBefore(playerUI, this._element);

    this._defineUI(parent.querySelector('.player'));

    this._renderPlaylist();

    this._setupEventListeners();

    this._setTrack(0);
  },
  _setTrack: function(idx) {
    this._currentTrack = idx;
    this._element.src = this._userData.playlist[idx].url;
    this._setTime(0);
  },
  _play: function() {
    this._element.play();
  },
  _pause: function() {
    this._element.pause();
  },
  _buildUI: function() {

    var container = document.createElement('div');

    container.innerHTML = playerTmpl;

    return container;
  },
  _setupEventListeners: function() {
    this._element.addEventListener('timeupdate', this._handleTimeChange, false);
    this._controls.playback.addEventListener('click', this._handlePlaybackChange, false);
    this._controls.next.addEventListener('click', this._handleNext, false);
    this._controls.prev.addEventListener('click', this._handlePrev, false);
  },
  _handlePlaybackChange: function() {
    if (this._isPlaying) {
      this._isPlaying = false;
      this._controls.playback.textContent = 'PLAY';
      this._pause();
    } else {
      this._isPlaying = true;
      this._controls.playback.textContent = 'PAUSE';
      this._play();
    }
  },
  _handleTimeChange: function() {
    var time = Math.floor(this._element.currentTime);

    this._setTime(time);
  },
  _setTime: function(time) {
    var minutes = Math.floor(time / 60);
    var seconds = time % 60;

    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    this._display.time.textContent = minutes + ':' + seconds;
  },
  _handleNext: function() {
    this._setTrack(this._currentTrack + 1);
    this._play();
  },
  _handlePrev: function() {
    this._setTrack(this._currentTrack - 1);
    this._play();
  }
};

window.audioPlayer = audioPlayer;
