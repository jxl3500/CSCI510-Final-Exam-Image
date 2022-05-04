  'use strict';

  function gotKey (event) {

      var key = event.key;

      //  change object type
      if (key == 's') {
          nowShowing = 'Sphere';
          angles = sphere_angles;
      }
      if (key == 'c') {
          nowShowing = 'Cube';
          angles = cube_angles;
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
  
