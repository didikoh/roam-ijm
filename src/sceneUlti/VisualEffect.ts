import {
  HighlightLayer,
  Scene,
  Color3,
  Mesh,
  AbstractMesh,
  InstancedMesh,
} from "@babylonjs/core";

// Store highlight layers for hover and selection
let hoveredHighlightLayer: HighlightLayer | undefined;
let selectedHighlightLayer: HighlightLayer | undefined;

export function applyHighlightLayer(
  scene: Scene,
  target: AbstractMesh | string,
  type: "hover" | "selected",
  color = Color3.FromHexString("#FFD54F")
) {
  if( typeof target === "string") {
    const mesh = scene.getMeshByName(target);
    if(mesh) {
      target = mesh;
    } else {
      console.warn(`Mesh with name ${target} not found in scene.`);
      return;
    }
  }

  let hl: HighlightLayer | undefined;

  if (type === "hover") {
    if (hoveredHighlightLayer) {
      hoveredHighlightLayer.removeAllMeshes();
    } else {
      hoveredHighlightLayer = new HighlightLayer("hoverHL", scene, {
        blurHorizontalSize: 1.0,
        blurVerticalSize: 1.0,
      });
    }
    hl = hoveredHighlightLayer;
  } else {
    if (selectedHighlightLayer) {
      selectedHighlightLayer.removeAllMeshes();
    } else {
      selectedHighlightLayer = new HighlightLayer("selectedHL", scene, {
        blurHorizontalSize: 1.0,
        blurVerticalSize: 1.0,
      });
    }
    hl = selectedHighlightLayer;
  }

  if (target instanceof Mesh) {
    hl.addMesh(target, color);
    return hl;
  }

  if (target instanceof InstancedMesh) {
    hl.addMesh(target.sourceMesh, color);
    return hl;
  }

  // Other AbstractMesh types are ignored
}

export function clearHighlightLayer(type: "hover" | "selected") {
  if (type === "hover" && hoveredHighlightLayer) {
    hoveredHighlightLayer.removeAllMeshes();
  }
  if (type === "selected" && selectedHighlightLayer) {
    selectedHighlightLayer.removeAllMeshes();
  }
}