export default class App {
  constructor() {
    this.main_wrapper = document.querySelector(".main-wrapper");
    this.wrapper = document.querySelector(".wrapper");
    this.zoom_wrapper = document.querySelector(".zoom_wrapper active");
    this.canvas_wrapper = document.querySelector(".zoom_wrapper active .canvas-wrapper");
    this.canvas = document.querySelector(".zoom_wrapper active .canvas-wrapper .main-canvas");
  }
}
