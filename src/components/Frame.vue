<template>
  <section class="frames-tools-wrapper">
    <ul id="frame-list" class="frame-list">
     <!--  <li class="frame" draggable="true">
       <span>A</span>
      </li>
      <li class="frame" draggable="true">
        <span>B</span>
      </li> -->
    </ul>

    <!-- <ul id="frame-list" class="frame-list"></ul> -->
    <button id="add-frame-button" class="add-frame-button" @click="DragFunc()">
      <i class="fas fa-plus" style="color: white;font-size:2rem;margin-right: 10px"></i>Add new
      <br>frame
    </button>
  </section>
</template>

<script>
/* eslint-disable */
export default {
  name: 'Frame',
  props: {
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {};
  },
  mounted() {
    this.DragFunc();
    this.Frame();
  },
  methods: {
    DragFunc() {
      let dragSrcEl = null;

      function handleDragStart(e) {
        // Target (this) element is the source node.
        dragSrcEl = this;

        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.outerHTML);

        this.classList.add('dragElem');
      }
      function handleDragOver(e) {
        if (e.preventDefault) {
          e.preventDefault(); // Necessary. Allows us to drop.
        }
        this.classList.add('over');

        e.dataTransfer.dropEffect = 'move'; // See the section on the DataTransfer object.

        return false;
      }

      function handleDragEnter(e) {
        // this / e.target is the current hover target.
      }

      function handleDragLeave(e) {
        this.classList.remove('over'); // this / e.target is previous target element.
      }

      function handleDrop(e) {
        // this/e.target is current target element.

        if (e.stopPropagation) {
          e.stopPropagation(); // Stops some browsers from redirecting.
        }

        // Don't do anything if dropping the same column we're dragging.
        if (dragSrcEl != this) {
          this.parentNode.removeChild(dragSrcEl);
          let dropHTML = e.dataTransfer.getData('text/html');
          this.insertAdjacentHTML('beforebegin', dropHTML);
          let dropElem = this.previousSibling;
          addDnDHandlers(dropElem);
        }
        this.classList.remove('over');
        return false;
      }

      function handleDragEnd(e) {
        // this/e.target is the source node.
        this.classList.remove('over');

        /*[].forEach.call(cols, function (col) {
    col.classList.remove('over');
  });*/
      }

      function addDnDHandlers(elem) {
        elem.addEventListener('dragstart', handleDragStart, false);
        elem.addEventListener('dragenter', handleDragEnter, false);
        elem.addEventListener('dragover', handleDragOver, false);
        elem.addEventListener('dragleave', handleDragLeave, false);
        elem.addEventListener('drop', handleDrop, false);
        elem.addEventListener('dragend', handleDragEnd, false);
      }

      let cols = document.querySelectorAll('#frame-list li');
      [].forEach.call(cols, addDnDHandlers);
    },
    Frame() {
      const addFrameButton = document.querySelector('#add-frame-button');
      const framesList = document.querySelector('#frame-list');
      const mainCanvas = document.querySelector('#canvas');
      const previewCanvas = document.querySelector('#preview-canvas');
      const fpsInput = document.querySelector('#input-fps');
      const fpsOutput = document.querySelector('#output-fps');
      const storage = [];

      const fpsInputfunc = () => {
        fpsOutput.value = fpsInput.value;
        canvas.animationSpeed = 100 / fpsOutput.value;
      };

      const addFrameButtonfunc = () => {
        const frameIndex = document.querySelectorAll('.frame').length + 1;
        const img = mainCanvas.toDataURL();
        createFrame(frameIndex, img);

        const frames = document.querySelectorAll('.frame');
        for (let i = 0; i < frames.length; i += 1) {
          frames[i].addEventListener('click', frameChoose, false);
        }
        clearCanvas(mainCanvas.width,mainCanvas.height);
      };
      const frameChoose = function(e) {
        const frames = document.querySelectorAll(`.${e.target.className}`);
        for (const frame of frames) {
          frame.style.border = '3px solid gray';
        }
        document.querySelector(`#${e.target.id}`).style.border =
          '3px solid yellow';
        mainCanvas.style.backgroundImage = document.querySelector(
          `#${e.target.id}`,
        ).style.backgroundImage;
      };

      const canvas = {
        paintingAllowed: false,
        isDrawing: false,
        context: mainCanvas.getContext('2d'),
        previewContext: previewCanvas.getContext('2d'),
        animationSpeed: 100 / fpsOutput.value,
        order: 0,
      };
      fpsInput.addEventListener('input', fpsInputfunc);
      function updateFrames() {
        const framesNumbers = document.querySelectorAll('.frame-number');
        for (let i = 0; i < framesNumbers.length; i += 1) {
          framesNumbers[i].textContent = i + 1;
        }
        const frames = document.querySelectorAll('.frame');
        for (let i = 0; i < frames.length; i += 1) {
          frames[i].style.backgroundImage = storage[i];
        }
      }

      function deleteFrame(frame) {
        const frameIndex = frame.childNodes[0].childNodes[0].textContent - 1;
        storage.splice(frameIndex, 1);
        frame.remove();
        updateFrames();
      }

      function copyFrame(frame) {
        const frameIndex = frame.childNodes[0].childNodes[0].textContent - 1;
        const img = storage[frameIndex];
        storage.splice(frameIndex, 0, img);
        createFrame(frameIndex, img);
        updateFrames();
      }

      function DragFrame(frame) {
        let frameIndex = frame.childNodes[0].childNodes[0].textContent - 1;
        const img = storage[frameIndex];
        storage.splice(frameIndex - 2, 0, img);
        createFrame(frameIndex, img);
        //
        /* storage.splice(frameIndex, 1);
          frame.remove(); */

        //
        updateFrames();
      }

      function toggleFullScreen() {
        if (!document.fullscreenElement) {
          previewCanvas.requestFullscreen();
        } else if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }

      previewCanvas.addEventListener('click', () => {
        toggleFullScreen();
      });

      function clearCanvas(width,height) {
        canvas.context.clearRect(0, 0, width, height);
      }
      function createFrame(frameIndex, img) {
        const listItem = document.createElement('li');
        /* listItem.className = 'frame'; */
        listItem.setAttribute('draggable', true);
        framesList.appendChild(listItem);
        const frameDiv = document.createElement('div');
        frameDiv.className = 'frame';
        frameDiv.id = `frame${frameIndex}`;
        listItem.appendChild(frameDiv);

        const frameNumber = document.createElement('div');
        frameNumber.className = 'frame-detail frame-number';
        frameNumber.textContent = frameIndex;
        frameDiv.appendChild(frameNumber);

        const deleteFrameButton = document.createElement('div');
        deleteFrameButton.className = 'frame-detail frame-delete';
        deleteFrameButton.innerHTML = '<i class="fas fa-trash-alt">';
        deleteFrameButton.addEventListener('click', () => {
          deleteFrame(listItem);
        });
        frameDiv.appendChild(deleteFrameButton);

        const moveFrameButton = document.createElement('div');
        moveFrameButton.className = 'frame-detail frame-move';
        moveFrameButton.innerHTML = '<i class="fas fa-arrows-alt">';
        moveFrameButton.addEventListener('click', () => {
          DragFrame(listItem);
        });
        frameDiv.appendChild(moveFrameButton);

        const copyFrameButton = document.createElement('div');
        copyFrameButton.className = 'frame-detail frame-copy';
        copyFrameButton.innerHTML = '<i class="fas fa-copy">';
        copyFrameButton.addEventListener('click', () => {
          copyFrame(listItem);
        });
        frameDiv.appendChild(copyFrameButton);

        frameDiv.style.backgroundImage = `url(${img})`;
        storage.push(`url(${img})`);
      }

      addFrameButton.addEventListener('click', addFrameButtonfunc);

      function animate() {
        requestAnimationFrame(animate);
        previewCanvas.style.backgroundImage =
          storage[Math.round(canvas.order / canvas.animationSpeed)];
        if (canvas.order < storage.length * canvas.animationSpeed) {
          canvas.order += 1;
        } else {
          canvas.order = 0;
        }
      }
      animate();
    },
  },
};
</script>

<style>
.application-action-section {
  width: 10vw;
}

.frames-tools-wrapper {
  padding: 0px 10px;
  max-width: 150px;
}

::-webkit-scrollbar {
  display: none;
}

.frame-list {
  max-height: 70vh;
  padding: 0;
  overflow: scroll;
  cursor: move;
}

.frame-list > li {
  background-image: url(../assets/images/small.png);
  border-radius: 5px;
}

.frame {
  height: 130px;
  width: 130px;
  margin-bottom: 8px;
  border-width: 3px;
  border-color: #888888;
  border-style: solid;
  border-radius: 5px;
  color: transparent;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.frame:hover {
  border-color: white;
  color: white;
}

.frame-detail {
  height: 33px;
  width: 33px;
  padding: 5px;
  background-color: transparent;
  display: inline-block;
  border-radius: 3px;
  font-size: 23px;
  color: inherit;
}

.frame-number {
  margin: -2px 30px 30px -2px;
  font-weight: 900;
  color: white;
}

.frame-delete {
  margin: -2px -2px 30px 30px;
}

.frame-move {
  margin: 31px 30px -2px -2px;
}

.frame-copy {
  margin: 31px -2px -2px 30px;
}

.add-frame-button {
  height: 50px;
  width: 130px;
  padding: 5px;
  display: flex;
  margin-bottom: 10px;
  border-width: 3px;
  border-color: #888888;
  border-style: solid;
  border-radius: 5px;
  color: #2c3e50;
  font-size: 14px;
  background-color: #cfcfcf;
}

.add-frame-button:hover {
  border-color: #fffc50;
}
//
[draggable] {
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
}

/* #columns {
  position: relative;
  list-style-type: none;
  z-index: 3;
}

.column {
  width: 162px;
  padding-bottom: 5px;
  padding-top: 5px;
  text-align: center;
  cursor: move;
}

.column span {
  height: 20px;
  width: 150px;
  color: black;
  background-color: #ccc;
  padding: 5px;
  border-bottom: 1px solid #ddd;
  border-radius: 10px;
  border: 2px solid #666666;
}

.column.dragElem {
  //opacity: 0.4;
}
.column.over {
  //border: 2px dashed #000;
  border-top: 2px solid blue;
} */
/* #frame-list {
  position: relative;
  list-style-type: none;
  z-index: 3;
} */
/*
.frame {
  width: 162px;
  padding-bottom: 5px;
  padding-top: 5px;
  text-align: center;
  cursor: move;
}
*/
.frame.over {
  //border: 2px dashed #000;
  border-top: 20px solid blue;
}
</style>
