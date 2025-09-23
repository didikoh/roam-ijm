import { Axis, Mesh, Space, TransformNode, type Scene } from "@babylonjs/core";
import { ame_types, AreaLabels } from "./amenities";

/** 让指定节点（或其下首个 Mesh）持续面向相机 */
export function enableBillboardPlot(
  scene: Scene,
  mode: number = Mesh.BILLBOARDMODE_Y
) {
  TransformNode.BillboardUseParentOrientation = true;
  const meshes = scene.transformNodes.filter((m) => m.name.includes("Label_"));
  if (meshes.length > 0) {
    meshes.forEach((mesh) => {
      mesh.rotate(Axis.X, Math.PI, Space.LOCAL);
      mesh.rotate(Axis.Y, 0, Space.LOCAL);
      // mesh.rotate(Axis.Z, -Math.PI, Space.LOCAL);
      //   node.bakeCurrentTransformIntoVertices();

      mesh.unfreezeWorldMatrix?.(); // 若之前冻结过
      mesh.billboardMode = mode;
    });
  } else {
    console.log("没有找到Plot节点");
  }
}

export function enableBillboardArea(
  scene: Scene,
  mode: number = Mesh.BILLBOARDMODE_Y
) {
  TransformNode.BillboardUseParentOrientation = true;
  const labels = AreaLabels;
  const meshes = scene.transformNodes.filter((m) => labels.includes(m.name));
  if (meshes.length > 0) {
    meshes.forEach((mesh) => {
      mesh.rotate(Axis.X, Math.PI, Space.LOCAL);
      // mesh.rotate(Axis.Y, -Math.PI, Space.LOCAL);
      // mesh.rotate(Axis.Z, -Math.PI, Space.LOCAL);
      //   node.bakeCurrentTransformIntoVertices();

      mesh.unfreezeWorldMatrix?.(); // 若之前冻结过
      mesh.billboardMode = mode;
    });
  } else {
    console.log("没有找到Area节点");
  }
}

export function enableBillboardAmenities(
  scene: Scene,
  mode: number = Mesh.BILLBOARDMODE_Y
) {
  TransformNode.BillboardUseParentOrientation = true;
  const meshes = scene.transformNodes.filter((m) => m.name.includes("Ame_"));
  console.log("Amenities Labels:", meshes.length);
  if (meshes.length > 0) {
    meshes.forEach((mesh) => {
      mesh.rotate(Axis.X, Math.PI, Space.LOCAL);
      // mesh.rotate(Axis.Y, -Math.PI, Space.LOCAL);
      // mesh.rotate(Axis.Z, -Math.PI, Space.LOCAL);
      //   node.bakeCurrentTransformIntoVertices();

      mesh.unfreezeWorldMatrix?.(); // 若之前冻结过
      mesh.billboardMode = mode;
    });
  } else {
    console.log("没有找到Amenities节点");
  }
}

export function setVisibleBillboardType(scene: Scene, type: string|null) {
  const typeMeshName = ame_types.find((t) => t.type === type)?.content || [];
  const meshes = scene.transformNodes.filter((m) => m.name.includes("Ame_"));
  if (meshes.length > 0) {
    meshes.forEach((mesh) => {
      if (type === "all") {
        mesh.setEnabled(true);
      } else if (type === "None" || type === null) {
        mesh.setEnabled(false);
      } else {
        if (typeMeshName.some((name: string) => mesh.name.includes(name))) {
          mesh.setEnabled(true);
        } else {
          mesh.setEnabled(false);
        }
      }
    });
  } else {
    console.log("没有找到节点");
  }
}
