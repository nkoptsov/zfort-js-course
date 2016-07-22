
// Function
function myFn(x) {
  return x;
}


var person = {
  name: 'John',
  sayHi: function() { // Method
    return 'Hello, ' + this.name + '!';
  }
};

// Group together data and functionality
var musicPlayer = {
  currentSong: 'Blah blah',
  currentTime: 234,
  init: function(el) {
    this.element = el;
    // ...
  },
  play: function() {
    this.element.play();
    // ...
  },
  pause: function() {
    // ...
  },
  next: function() {
    // ...
  },
  prev: function() {
    // ...
  },
}
