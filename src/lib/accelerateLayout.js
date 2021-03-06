'use strict';

/*
 * The idea of this library is taken from https://github.com/jexp/cypher-utils, written by
 * Michael Hunger (github: jexp, twitter: @mesirii)
 */

module.exports = function(force, render) {
  var maxStepsPerTick = 100;
  var maxAnimationFramesPerSecond = 15;
  var maxComputeTime = 1000 / maxAnimationFramesPerSecond;
  var d3Tick = force.tick;

  force.tick = function() {
    var startTick = Date.now();
    var step = maxStepsPerTick;
    while (step-- && Date.now() - startTick < maxComputeTime) {
      if (d3Tick()) {
        maxStepsPerTick = 2;
        return true;
      }
    }
    if (render) {
      render();
    }
    return false;
  };

  return force.tick;
};
