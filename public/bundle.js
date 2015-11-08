(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var canvas = undefined,
    ctx = undefined;
var resizeDelay = 100;

var initialize = function initialize() {
  resizeCanvas();
  ctx = canvas.getContext('2d');
  //ctx.fillStyle = 'rgba(128, 100, 162, 0.5)';
  //ctx.fillRect(0, 0, canvas.width, canvas.height);

  var resizeTimer = undefined;
  window.addEventListener('resize', function (event) {
    if (resizeTimer !== false) {
      clearTimeout(resizeTimer);
    }
    resizeTimer = setTimeout(resizeCanvas, resizeDelay);
  });
};

var resizeCanvas = function resizeCanvas() {
  var header = document.getElementsByTagName('header')[0];
  canvas = document.getElementById('voronoi');
  if (!header || !canvas) {
    return;
  }
  canvas.width = header.clientWidth;
  canvas.height = header.clientHeight;
};

initialize();

},{}]},{},[1]);
