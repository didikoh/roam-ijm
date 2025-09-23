import type { Engine, Scene, Texture } from "@babylonjs/core";

export const animateTrail = (scene: Scene, engine: Engine) => {
  const tex_line_1 = scene.getTextureByName(
    "direction_line_Green (Emissive)"
  ) as Texture;
  const tex_line_2 = scene.getTextureByName(
    "direction_line_Yellow (Emissive)"
  ) as Texture;
  const tex_line_3 = scene.getTextureByName(
    "Glow_Wave_Orange_foward (Emissive)"
  ) as Texture;
  const tex_line_4 = scene.getTextureByName(
    "Glow_Wave_Orange_back (Emissive)"
  ) as Texture;

  if (!tex_line_1 || !tex_line_2 || !tex_line_3 || !tex_line_4) {
    return;
  }

  scene.registerBeforeRender(() => {
    // Tube 的 “长” 方向对应 V 坐标，所以偏移 vOffset
    tex_line_1.uOffset =
      (tex_line_1.uOffset - engine.getDeltaTime() * 0.0003) % 5;
    tex_line_2.uOffset =
      (tex_line_2.uOffset + engine.getDeltaTime() * 0.0003) % 5;
    tex_line_3.uOffset =
      (tex_line_3.uOffset + engine.getDeltaTime() * 0.0006) % 5;
    tex_line_4.uOffset =
      (tex_line_4.uOffset - engine.getDeltaTime() * 0.0006) % 5;
  });
};
