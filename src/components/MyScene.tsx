import { useEffect, useRef, useState } from "react";
import {
  Scene,
  ArcRotateCamera,
  Engine,
  Vector3,
  DirectionalLight,
  Color3,
  KeyboardEventTypes,
  PointerEventTypes,
  // WebGPUEngine,
  Color4,
  ImportMeshAsync,
  CubeTexture,
  ShadowGenerator,
  VertexBuffer,
  DefaultRenderingPipeline,
  ImageProcessingConfiguration,
  SSAO2RenderingPipeline,
} from "@babylonjs/core"; // 导入 Babylon.js 核心库
import "@babylonjs/loaders"; // 导入 Babylon.js 的加载器模块
import "@babylonjs/inspector"; // 导入 Babylon.js 的 Inspector 模块
import { Inspector } from "@babylonjs/inspector";
import { useAppContext } from "../context/AppContext";
import { enableBillboardPlot } from "../sceneUlti/billboard";

export const shouldEnableShadow = (engine: Engine): boolean => {
  const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);

  const caps = engine.getCaps();
  const isLowEnd =
    !caps.supportComputeShaders ||    // 不支持浮点纹理通常代表性能较弱
    caps.maxTextureSize < 2048 ||   // 纹理大小小于 2048 可能是老旧设备
    engine.getHardwareScalingLevel() > 1; // 硬件缩放比例大，可能分辨率高但性能差

  return !isMobile && !isLowEnd;
}

const MyScene = () => {
  const { setProgress,selectedBlock,setSelectedBlock } = useAppContext();
  const onProgress = setProgress;
  const canvasRef = useRef(null); // 使用 useRef 创建一个引用，用于绑定到 canvas 元素
  const [model, setModel] = useState(); // 使用 useState 创建一个状态，用于存储加载的模型
  const [currentScene, setCurrentScene] = useState<Scene | null>(null); // 创建一个状态，用于存储当前场景
  const [currentCamera, setCurrentCamera] = useState<ArcRotateCamera | null>(null); // 创建一个状态，用于存储当前相机
  const shadowGeneratorRef = useRef<ShadowGenerator | null>(null); // 创建一个引用，用于存储阴影生成器
  const sunRef = useRef<DirectionalLight | null>(null);
  const skyTextureRef = useRef<any>(null);
  const engineRef = useRef<Engine | null>(null);
  const selectedBlockRef = useRef<string | null>(null);

  useEffect(() => {
    selectedBlockRef.current = selectedBlock;
  }, [selectedBlock])
  

  useEffect(() => {
    if (model && currentScene && currentCamera) {
      onProgress(105);
      // const minX = -600, maxX = 200, minY = 70, maxY = 600, minZ = -600, maxZ = 400;
      // 添加监听器以记录相机位置和目标和限制相机目标范围
      currentCamera.onViewMatrixChangedObservable.add(() => {
        // camera.target.x = Math.min(Math.max(camera.target.x, minX), maxX);
        // camera.target.y = Math.min(Math.max(camera.target.y, minY), maxY);
        // camera.target.z = Math.min(Math.max(camera.target.z, minZ), maxZ);
        // camera.panningSensibility = Math.min(300, Math.max(25, 5000 / camera.radius));
      });

      enableBillboardPlot(currentScene);

      // 添加点击事件以记录被点击网格的名称
      currentScene.onPointerObservable.add((pointerInfo) => {
        if (pointerInfo.type === PointerEventTypes.POINTERPICK) {
          const pickedMesh = pointerInfo.pickInfo?.pickedMesh;
          if (pickedMesh) {
            if(selectedBlockRef.current == null){

            }
          }
        }
      });

      // const resetCam = () => {
      //   currentCamera.fov = 1.3;
      //   currentCamera.target = new Vector3(-2151.5, 108.5, 4523);
      //   currentCamera.alpha = 5.33;
      //   currentCamera.beta = 1.1;
      //   currentCamera.radius = 520.45;
      // }

      // // 为场景中的网格应用阴影
      //#region ShadowCaster
      // currentScene.meshes.forEach((mesh) => {
      //   const hasNormals = mesh.isVerticesDataPresent(
      //     VertexBuffer.NormalKind
      //   );
      //   const isStdOrPBR =
      //     mesh.material &&
      //     ["StandardMaterial", "PBRMaterial"].includes(
      //       mesh.material.getClassName()
      //     );
      //   if (hasNormals && isStdOrPBR && !mesh.name.includes("Box")) {
      //     mesh.receiveShadows = true;
      //     if (shadowGeneratorRef.current) {
      //       shadowGeneratorRef.current.addShadowCaster(mesh);
      //     }
      //   }
      // });
      //#endregion



      return () => {

      }
    }
  }, [model, currentScene, currentCamera]); // 监视模型的变化

  // const handleFocus = (targetMesh: any) => {
  //   let targetPosition;
  //   if (targetMesh.getBoundingInfo) {
  //     targetPosition = targetMesh.getBoundingInfo().boundingBox.centerWorld; // 获取点击网格的中心位置
  //   } else {
  //     targetPosition = targetMesh.getAbsolutePosition();
  //   }


  //   const createAnimation = ({ property, startValue, endValue, duration }: any) => {
  //     const animation = new Animation(
  //       `${property}Animation`, // 动画名称
  //       property, // 动画属性
  //       60, // 帧率
  //       Animation.ANIMATIONTYPE_FLOAT, // 动画类型
  //       Animation.ANIMATIONLOOPMODE_CONSTANT // 动画循环模式
  //     );

  //     animation.setKeys([
  //       { frame: 0, value: startValue }, // 起始值
  //       { frame: duration, value: endValue }, // 目标值
  //     ]);

  //     return animation;
  //   };

  //   const animationDuration = 50; // 动画持续时间（帧数）
  //   if (!currentCamera || !currentScene) return
  //   const radiusAnimation = createAnimation(
  //     {
  //       property: "radius",
  //       startValue: currentCamera.radius,
  //       endValue: 300,
  //       duration: animationDuration
  //     }
  //   );

  //   const targetAnimation = new Animation(
  //     "targetAnimation", // 动画名称
  //     "target", // 动画属性
  //     60, // 帧率
  //     Animation.ANIMATIONTYPE_VECTOR3, // 动画类型
  //     Animation.ANIMATIONLOOPMODE_CONSTANT // 动画循环模式
  //   );

  //   targetAnimation.setKeys([
  //     { frame: 0, value: currentCamera.target }, // 起始目标位置
  //     { frame: animationDuration, value: targetPosition }, // 目标位置
  //   ]);

  //   const easingFunction = new QuadraticEase(); // 创建二次缓动函数
  //   easingFunction.setEasingMode(EasingFunction.EASINGMODE_EASEIN); // 设置为由慢到快
  //   radiusAnimation.setEasingFunction(easingFunction);
  //   targetAnimation.setEasingFunction(easingFunction);

  //   currentCamera.animations = [radiusAnimation, targetAnimation]; // 将动画应用到相机
  //   currentScene.beginAnimation(currentCamera, 0, animationDuration, false); // 开始动画
  // };

  useEffect(() => {
    const canvas = canvasRef.current; // 获取 canvas 元素的引用
    if (!canvas) {
      console.error("Canvas element not found!");
      return;
    }

    const timer = setTimeout(() => {
      const createEngine = async () => {
        // if (await WebGPUEngine.IsSupportedAsync) {
        //   // 使用 IsSupportedAsync 检查 WebGPU 支持
        //   const webgpuEngine = new WebGPUEngine(canvas); // 使用 WebGPUEngine
        //   await webgpuEngine.initAsync(); // 初始化 WebGPU 引擎
        //   // console.log("Using WebGPU for rendering.");
        //   return webgpuEngine;
        // } else {
        const webglEngine = new Engine(canvas, true, {
          antialias: true,
          alpha: true,
        }); // 使用 WebGL 引擎
        // console.log("WebGPU not supported. Falling back to WebGL.");
        return webglEngine;
        // }
      };

      createEngine().then((engine) => {
        const handleResize = () => engine.resize(); // 当窗口大小改变时，调整引擎的大小
        window.addEventListener("resize", handleResize); // 监听窗口大小变化事件

        engineRef.current = engine;

        const createScene = () => {
          const scene = new Scene(engine); // 创建一个新的 Babylon.js 场景

          if (!scene || !engine) {
            console.error("Scene or engine not initialized!");
            return;
          }

          // const KNOWN_TOTAL = 100;

          // 加载模型
          ImportMeshAsync("./models/roam.glb", scene, {
            onProgress: (ev) => {
              // ev 的结构见 ISceneLoaderProgressEvent
              // { lengthComputable, loaded, total }
              if (ev.lengthComputable && ev.total > 0) {
                const percent = (ev.loaded / ev.total) * 100;
                onProgress(percent);
              } else {
                // gzip + 我们知道大小
                // const percent = (ev.loaded / KNOWN_TOTAL) * 100;
                onProgress(ev.loaded);
              }
            },
          })
            .then((result: any) => {
              setModel(result); // 更新状态以存储加载的模型
              if (result.animationGroups) {
                result.animationGroups.forEach((animationGroup: any) =>
                  animationGroup.start(true)
                ); // 
              }
            })
            .catch((error) => console.error("Failed to load model:", error)); // 捕获加载模型的错误

          // 添加太阳光
          const direction = new Vector3(0.2, -1, 0.2).normalize(); // 太阳光的方向
          const center = new Vector3(0, 0, 0);
          const sunlight = new DirectionalLight("sunlight", direction, scene);
          sunlight.position = center.add(direction.scale(-100));
          sunlight.intensity = 5.5; // 设置太阳光的强度
          sunlight.diffuse = new Color3(1, 1, 1); // 设置漫反射颜色
          sunlight.specular = new Color3(1, 1, 1); // 设置高光颜色
          sunlight.shadowEnabled = true; // 启用阴影
          sunlight.autoCalcShadowZBounds = true;
          sunRef.current = sunlight;

          // // 为太阳光添加阴影生成器
          const shadowGenerator = new ShadowGenerator(1024, sunlight);
          shadowGenerator.useBlurCloseExponentialShadowMap = true; // 启用柔和阴影
          shadowGenerator.setDarkness(0); // 设置阴影的暗度
          shadowGenerator.bias = 0.0008;
          shadowGenerator.filteringQuality = ShadowGenerator.QUALITY_MEDIUM; // 设置阴影过滤质量
          shadowGeneratorRef.current = shadowGenerator;


          // 创建相机
          const camera = new ArcRotateCamera(
            "my_camera", // 相机名称
            2.59, // 水平旋转角度
            1.2, // 垂直旋转角度
            150, // 相机半径
            new Vector3(-10, 14, -10), // 相机目标位置
            scene // 所属场景
          );
          camera.attachControl(canvas, true); // 绑定相机到 canvas 上
          camera.lowerRadiusLimit = 0; // 最小半径限制 (Zoom)
          camera.upperRadiusLimit = 200; // 最大半径限制 (Zoom)
          camera.wheelPrecision = 2; // 鼠标滚轮缩放灵敏度
          camera.lowerBetaLimit = 0.7; // 最低俯视角 (Rotate)
          camera.upperBetaLimit = 1.37; // 最高仰视角（最多水平）(Rotate)
          camera.panningSensibility = 100; // 平移灵敏度
          camera.panningInertia = 0.9; // 平移惯性
          camera.angularSensibilityY = 2500; // 垂直旋转灵敏度
          camera.angularSensibilityX = 2500; // 水平旋转灵敏度
          camera.minZ = 1; // 最小可视距离（靠得最近）
          camera.maxZ = 1000; // 最大可视距离（最远能看到多远）
          camera.speed = 1; // 相机移动速度
          camera.fov = 1;

          setCurrentCamera(camera); // 更新状态以存储当前相机
          scene.activeCamera = camera; // 设置当前活动相机

          scene.clearColor = new Color4(0, 0, 0, 0);
          // engine.clear(scene.clearColor, true, true); // 清除蓝底

          // 调整 PBR 渲染参数
          scene.imageProcessingConfiguration.exposure = 1;
          scene.imageProcessingConfiguration.contrast = 1.3;
          scene.imageProcessingConfiguration.toneMappingEnabled = true;

          // 自定义环境纹理
          const skyTexture = new CubeTexture(
            "./textures/environment.env",
            scene
          );

          // skyTexture.rotationY = 4.76475

          const skybox = scene.createDefaultSkybox(skyTexture, true, 3000, 0.6); // 创建天空盒
          skyTextureRef.current = skybox;

          // 设置环境纹理
          scene.environmentTexture = skyTexture;
          scene.environmentIntensity = 1.8; // 调整环境强度以增强日出效果

          //#region PostProcess
          // const ssao = new SSAO2RenderingPipeline("ssao2", scene, {
          //   ssaoRatio: 0.75,   // 主 pass 缩放（越大越清晰但更贵）
          //   blurRatio: 0.5     // 模糊 pass 缩放
          // });
          // ssao.radius = 2.0;         // 取样半径（1.5~2.5 常用）
          // ssao.totalStrength = 0.28; // 强度（0.25~0.45）
          // ssao.base = 0.9;           // 基准亮度（越低越暗）
          // scene.postProcessRenderPipelineManager.attachCamerasToRenderPipeline("ssao2", camera);

          // // ---- DefaultRenderingPipeline（最后挂）----
          // const rp = new DefaultRenderingPipeline("cityDRP",
          //   // HDR 根据设备能力自动选择，避免 sharpen/卷积类黑屏
          //   (() => {
          //     const caps = scene.getEngine().getCaps();
          //     return !!(caps.textureHalfFloatRender && caps.textureHalfFloatLinearFiltering);
          //   })(),
          //   scene, [camera], true
          // );

          // // 抗锯齿
          // rp.fxaaEnabled = true;
          // rp.samples = 1;

          // // 色调映射：ACES + 更合理的曝光/对比
          // rp.imageProcessing.toneMappingEnabled = true;
          // rp.imageProcessing.toneMappingType = ImageProcessingConfiguration.TONEMAPPING_ACES;
          // rp.imageProcessing.exposure = 0.98; // ← 稍降，防止普亮
          // rp.imageProcessing.contrast = 1.04; // ← 轻微提对比

          // // Bloom：降低触发，别“整片发亮”
          // rp.bloomEnabled = true;
          // rp.bloomThreshold = 0.86;   // ← 提高阈值
          // rp.bloomWeight = 0.20;   // ← 减弱混合
          // rp.bloomKernel = 56;     // 柔和
          // rp.bloomScale = 0.5;

          // // Sharpen：仅在 HDR 可用时再开；否则先不用
          // if (rp.sharpen) {
          //   rp.sharpenEnabled = true;
          //   rp.sharpen.edgeAmount = 0.24;
          //   rp.sharpen.colorAmount = 0.0;
          // }

          // // 先关“彩边+颗粒”（容易让城市变脏+紫边）
          // rp.chromaticAberrationEnabled = false;
          // rp.grainEnabled = false;

          // // Glow 仅在你有自发光招牌/窗时开，强度要小
          // rp.glowLayerEnabled = true;
          // if (rp.glowLayer) {
          //   rp.glowLayer.intensity = 0.22;     // 更轻
          //   rp.glowLayer.blurKernelSize = 12;
          // }
          // #endregion

          return scene; // 返回创建的场景
        };

        const scene = createScene(); // 调用 createScene 函数创建场景
        if (!scene) {
          console.error("Failed to create scene!");
          return;
        }

        setCurrentScene(scene); // 更新状态以存储当前场景

        // Inspector 快捷键绑定
        scene.onKeyboardObservable.add(({ event, type }) => {
          if (
            type === KeyboardEventTypes.KEYDOWN &&
            event.ctrlKey &&
            event.key.toLowerCase() === "i"
          ) {
            scene.debugLayer.isVisible()
              ? Inspector.Hide()
              : Inspector.Show(scene, {});
          }
        });

        engine.runRenderLoop(() => scene.render()); // 在每一帧渲染场景

        return () => {
          window.removeEventListener("resize", handleResize); // 移除窗口大小变化事件监听器
          scene.dispose(); // 释放场景资源
          engine.dispose(); // 释放引擎资源
          engineRef.current = null;
        };
      });
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="scene">
      <canvas className="myCanvas" ref={canvasRef}></canvas>
    </div>
  )
};

export default MyScene; // 导出 Scene 组件
