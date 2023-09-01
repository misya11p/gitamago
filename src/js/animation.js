const MAX_CONDITIONS = 3;

class User {
  constructor(skin, condition, field, skinSize, fps) {
    this.condition = condition; // condition. 0: dead, 1: normal, 2: fever
    this.fieldWidth = field.clientWidth - skinSize;
    this.fieldHeight = field.clientHeight - skinSize;
    this.fps = fps;

    this.element = document.createElement('img');
    field.appendChild(this.element);
    this.element.src = "skins/" + skin + "/" + condition + ".gif";
    this.state = "neutral" // move state. neutral, walk, jump
    this.element.style.position = "relative";
    this.element.style.width = skinSize + "px";
    this.element.style.height = skinSize + "px";

    this.x = parseInt(Math.floor(Math.random() * this.fieldWidth));
    this.y = 0;
    this.setPositon();
    this.count = 0;
    this.limit = 0;
  }

  setPositon() {
    this.element.style.left = this.x + "px";
    this.element.style.top = (this.fieldHeight - this.y) + "px";
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
    this.limit = this.fps * sec;
  }

  setWalk() {
    this.state = "walk";
    let power = Math.floor(Math.random() * 21) - 10; // -10 ~ 10
    this.speedX = parseInt(power * this.condition / MAX_CONDITIONS); // fit condition
    this.y = 0;
    let sec = Math.floor(Math.random() * 3) + 2;
    this.limit = this.fps * sec;
  }

  setJump() {
    this.state = "jump";
    this.limit = this.fps;
    let powerX = Math.floor(Math.random() * 21) - 10; // -10 ~ 10
    this.speedX = parseInt(powerX * this.condition / MAX_CONDITIONS); // fit condition
    let powerJump = Math.floor(Math.random() * 41) + 60;
    this.jumpPower = parseInt(powerJump * this.condition / MAX_CONDITIONS); // fit condition
    this.jumpHeight = () => {
      let t = this.count / this.limit;
      return (-4 * t**2 + 4 * t) * this.jumpPower;
    }
  }

  neutral() {
  }

  walk() {
    if (this.x + this.speedX > this.fieldWidth) {
      this.speedX = -Math.abs(this.speedX);
    } else if (this.x + this.speedX < 0) {
      this.speedX = Math.abs(this.speedX);
    }
    this.x += this.speedX;
    this.setPositon();
  }

  jump() {
    if (this.x + this.speedX > this.fieldWidth || this.x + this.speedX < 0) {
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
