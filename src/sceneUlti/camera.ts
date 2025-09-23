import {
  ArcRotateCamera,
  Scene,
  Vector3,
  Animation,
  QuadraticEase,
  EasingFunction,
} from "@babylonjs/core";

export const createAnimation = ({
  animName,
  property,
  startValue,
  endValue,
  duration,
  mode,
}: any) => {
  const animation = new Animation(
    animName, // 动画名称
    property, // 动画属性
    60, // 帧率
    mode, // 动画类型
    Animation.ANIMATIONLOOPMODE_CONSTANT // 动画循环模式
  );

  animation.setKeys([
    { frame: 0, value: startValue }, // 起始值
    { frame: duration, value: endValue }, // 目标值
  ]);

  return animation;
};

export const resetCameraPos = (camera: ArcRotateCamera, scene: Scene) => {
  if (!camera || !scene) return;

  let end_alpha = 2.6; // 结束时的 alpha 值
  let end_beta = 1.2; // 结束时的 beta 值
  let end_radius = 150; // 结束时的 radius 值
  let end_target = new Vector3(-10, 14, -10);

  const animationDuration = 50; // 动画持续时间（帧数）
  console.log(camera.target);
  console.log(camera.alpha, camera.beta, camera.radius);

  const alphaAnimation = createAnimation({
    name: "reset_alpha",
    property: "alpha",
    startValue: camera.alpha,
    endValue: end_alpha,
    duration: animationDuration,
    mode: Animation.ANIMATIONTYPE_FLOAT,
  });
  const betaAnimation = createAnimation({
    name: "reset_beta",
    property: "beta",
    startValue: camera.beta,
    endValue: end_beta,
    duration: animationDuration,
    mode: Animation.ANIMATIONTYPE_FLOAT,
  });
  const radiusAnimation = createAnimation({
    name: "reset_radius",
    property: "radius",
    startValue: camera.radius,
    endValue: end_radius,
    duration: animationDuration,
    mode: Animation.ANIMATIONTYPE_FLOAT,
  });
  const targetAnimation = createAnimation({
    name: "reset_target",
    property: "target",
    startValue: camera.target,
    endValue: end_target,
    duration: animationDuration,
    mode: Animation.ANIMATIONTYPE_VECTOR3,
  });

  const easingFunction = new QuadraticEase(); // 创建二次缓动函数
  easingFunction.setEasingMode(EasingFunction.EASINGMODE_EASEIN); // 设置为由慢到快
  alphaAnimation.setEasingFunction(easingFunction);
  betaAnimation.setEasingFunction(easingFunction);
  radiusAnimation.setEasingFunction(easingFunction);
  targetAnimation.setEasingFunction(easingFunction);

  camera.animations = [
    alphaAnimation,
    betaAnimation,
    radiusAnimation,
    targetAnimation,
  ]; // 将动画应用到相机
  scene.beginAnimation(camera, 0, animationDuration, false); // 开始动画
};
