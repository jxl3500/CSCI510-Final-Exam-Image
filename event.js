  'use strict';

  function gotKey (event) {

      var key = event.key;
      console.warn(key);
      //  change object type

      if (key == 't') {
          cur_x = 1;
      } if (key == 'r') {
          cur_x = 0;
      }


      //  incremental rotation
      if (key == 'x') angles[0] -= angleInc;
      if (key == 'y') angles[1] -= angleInc;
      if (key == 'z') angles[2] -= angleInc;
      if (key == 'X') angles[0] += angleInc;
      if (key == 'Y') angles[1] += angleInc;
      if (key == 'Z') angles[2] += angleInc;

      draw();
  }
  
