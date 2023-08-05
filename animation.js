var field = document.getElementById("animation");
const SKIN_SIZE = 50;
const FIELD_WIDTH = field.clientWidth - SKIN_SIZE;
const FIELD_HEIGHT = field.clientHeight - SKIN_SIZE;
const FPS = 6;


class User {
  constructor(skin, condition) {
    this.condition = condition; // condition. 0: dead, 1: normal, 2: fever

    this.element = document.createElement('img');
    field.appendChild(this.element);
    this.element.src = "skins/" + skin + "/" + condition + ".gif";
    this.state = "neutral" // move state. neutral, walk, jump
    this.element.style.position = "relative";
    this.element.style.width = SKIN_SIZE + "px";
    this.element.style.height = SKIN_SIZE + "px";

    this.x = parseInt(Math.floor(Math.random() * FIELD_WIDTH));
    this.y = 0;
    this.setPositon();
    this.count = 0;
    this.limit = 0;
  }

  setPositon() {
    this.element.style.left = this.x + "px";
    this.element.style.top = (FIELD_HEIGHT - this.y) + "px";
  }

  reset() {
    let action = parseInt(Math.floor(Math.random() * 3));
    this.count = 0;
    switch (action) {
      case 0:
        this.setNeutral();
        break;
      case 1:
        this.setWalk();
        break;
      case 2:
        this.setJump();
        break;
    }
  }

  setNeutral() {
    this.state = "neutral";
    this.y = 0;
    let sec = Math.floor(Math.random() * 3) + 2;
    this.limit = FPS * sec;
  }

  setWalk() {
    this.state = "walk";
    this.speedX = parseInt(Math.floor(Math.random() * 11)) - 5; // -5 ~ 5
    this.speedX *= this.condition; // fit condition
    this.y = 0;
    let sec = Math.floor(Math.random() * 3) + 2;
    this.limit = FPS * sec;
  }

  setJump() {
    this.state = "jump";
    this.limit = FPS;
    this.speedX = parseInt(Math.floor(Math.random() * 11)) - 5; // -5 ~ 5
    this.speedX *= this.condition; // fit condition
    this.jumpPower = parseInt(Math.floor(Math.random() * 21)) + 30; // 30 ~ 50
    this.jumpPower *= this.condition; // fit condition
    this.jumpHeight = () => {
      let t = this.count / this.limit;
      return (-4 * t**2 + 4 * t) * this.jumpPower; 
    }
  }

  neutral() {
  }

  walk() {
    if (this.x + this.speedX > FIELD_WIDTH || this.x + this.speedX < 0) {
      this.speedX *= -1;
    }
    this.x += this.speedX;
    this.setPositon();
  }

  jump() {
    if (this.x + this.speedX > FIELD_WIDTH) {
      this.speedX = 0;
    }
    this.x += this.speedX;
    this.y = this.jumpHeight();
  }

  action() {
    switch (this.state) {
      case "walk":
        this.walk();
        break;
      case "jump":
        this.jump();
        break;
    }
  }

  update() {
    if (this.count > this.limit) {
      this.reset();
    }
    this.action()
    this.setPositon();
    this.count++;
  }
}

let user = new User("yellow", 2);
setInterval(() => {
  user.update();
}, 1000 / FPS);
