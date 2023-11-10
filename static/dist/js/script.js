"use strict";

var darkButton = document.getElementById("dark"),
  lightButton = document.getElementById("light");
console.log("hi");
var setDarkMode = function setDarkMode() {
    document.querySelector("body").classList = "dark", localStorage.setItem("colorMode", "dark");
  },
  setLightMode = function setLightMode() {
    document.querySelector("body").classList = "light", localStorage.setItem("colorMode", "light");
  },
  colorModeFromLocalStorage = function colorModeFromLocalStorage() {
    return localStorage.getItem("colorMode");
  },
  colorModeFromPreferences = function colorModeFromPreferences() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  },
  loadAndUpdateColor = function loadAndUpdateColor() {
    "dark" == (localStorage.getItem("colorMode") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")) ? darkButton.click() : lightButton.click();
  },
  radioButtons = document.querySelectorAll(".toggle__wrapper input");
radioButtons.forEach(function (e) {
  e.addEventListener("click", function (e) {
    darkButton.checked ? (document.querySelector("body").classList = "dark", localStorage.setItem("colorMode", "dark")) : (document.querySelector("body").classList = "light", localStorage.setItem("colorMode", "light"));
  }), console.log("hi");
}), window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
  e.matches ? darkButton.click() : lightButton.click();
}), "dark" == (localStorage.getItem("colorMode") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")) ? darkButton.click() : lightButton.click();