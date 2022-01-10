<template>
  <div class="circle-ball-container">
    <div class="wrap">
      <div class="planet">
        <div class="ball-wrapper">
          <div class="ball"></div>
        </div>
      </div>
    </div>
    <div class="">3D</div>
    <div class="all-container">
      <div class="circle-ball-3d">
        <div class="circle-border"></div>
        <div class="center-block"></div>
        <div class="circle">
          <div class="ball-wrapper">
            <div class="ball"></div>
          </div>
          <div class="ball-wrapper-2">
            <div class="ball"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
</script>

<style scoped lang="scss">
.circle-ball-container {
  width: 1200px;
  margin: auto;
  padding: 100px 0 300px;
  * {
    box-sizing: border-box;
  }
  .wrap {
    @keyframes planet-rotate {
      0% {
        transform: scaleY(0.5) rotate(0);
      }
      100% {
        transform: scaleY(0.5) rotate(360deg);
      }
    }
    // 自转动画
    @keyframes self-rotate {
      0% {
        transform: rotate(0) scaleY(2);
      }
      100% {
        transform: rotate(-360deg) scaleY(2);
      }
    }
    // 自转动画
    @keyframes self-scale {
      0% {
        transform: scale(0.6);
      }
      50% {
        transform: scale(1);
      }
      100% {
        transform: scale(0.6);
      }
    }

    display: flex;
    background-image: linear-gradient(
      180deg,
      #020205 0%,
      #170f39 51%,
      #35247a 95%
    );
    width: 600px;
    height: 600px;
    align-items: center;
    justify-content: center;

    .planet {
      position: absolute;
      border: 2px solid #fff;
      transform-style: preserve-3d;
      width: 200px;
      height: 200px;
      transform: scaleY(0.5) rotateZ(45deg);
      border-radius: 50%;
      animation: planet-rotate 20s linear infinite;
      .ball-wrapper {
        position: absolute;
        left: calc(50% - 25px);
        top: -25px;
        animation: self-scale 20s linear infinite;
        .ball {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background-color: yellowgreen;
          transform: rotateZ(-45deg) scaleY(2);
          animation: self-rotate 20s linear infinite;
        }
      }
    }
  }
  .all-container {
    $xDeg: 60deg;
    position: relative;
    width: 500px;
    height: 500px;

    .circle-ball-3d {
      width: 100%;
      height: 100%;

      position: relative;
      // 加上改属性后，子元素的3d才有层级
      transform-style: preserve-3d;
      @keyframes circle-rotate {
        0% {
          transform: rotateX($xDeg) rotate(0);
        }
        100% {
          transform: rotateX($xDeg) rotate(-360deg);
        }
      }
      @keyframes ball-rotate {
        0% {
          transform: rotate(0) rotateX(-$xDeg) scale(0.6);
        }
        50% {
          transform: rotate(180deg) rotateX(-$xDeg) scale(1);
        }
        100% {
          transform: rotate(360deg) rotateX(-$xDeg) scale(0.6);
        }
      }
      @keyframes ball-rotate-2 {
        0% {
          transform: rotate(0) rotateX(-$xDeg) scale(0.8);
        }
        25% {
          transform: rotate(90deg) rotateX(-$xDeg) scale(1);
        }
        50% {
          transform: rotate(180deg) rotateX(-$xDeg) scale(0.8);
        }
        75% {
          transform: rotate(270deg) rotateX(-$xDeg) scale(0.6);
        }

        100% {
          transform: rotate(360deg) rotateX(-$xDeg) scale(0.8);
        }
      }
      .circle-border {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0px;
        left: 0px;
        border: 2px solid red;
        border-radius: 50%;
        transform-style: preserve-3d;
        transform: translateZ(-60px) rotateX($xDeg) rotate(0);
      }
      .center-block {
        // display: none;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        width: 200px;
        height: 500px;
        background-color: gray;
      }
      .circle {
        //   position: relative;
        width: 100%;
        height: 100%;
        //   border: 2px solid red;
        border-radius: 50%;
        transform-style: preserve-3d;
        transform: rotateX($xDeg) rotate(0);
        animation: circle-rotate 10s linear infinite;
        .ball-wrapper {
          position: absolute;
          transform-style: preserve-3d;
          // 移动到中间的原因是，矩形四个角的位置，无法3d贴上
          top: -50px;
          left: 250px-50px;

          .ball {
            width: 100px;
            height: 100px;
            background-color: aqua;
            border-radius: 50%;
            transform: rotate(0) rotateX(-$xDeg) scale(0.6);
            animation: ball-rotate 10s linear infinite;
          }
        }
        .ball-wrapper-2 {
          position: absolute;
          transform-style: preserve-3d;
          // 移动到中间的原因是，矩形四个角的位置，无法3d贴上
          left: -50px;
          top: 250px-50px;

          .ball {
            width: 100px;
            height: 100px;
            background-color: aqua;
            border-radius: 50%;
            transform: rotate(0) rotateX(-$xDeg) scale(0.8);
            animation: ball-rotate-2 10s linear infinite;
          }
        }
      }
    }
  }
}
</style>