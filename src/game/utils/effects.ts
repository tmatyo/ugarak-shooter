import { Scene } from "phaser";

export const createHeadParticles = (scene: Scene) => {
	return scene.add.particles(0, 0, "heads", {
		frame: ["szpeti", "en", "dagi", "yoko"],
		lifespan: 4000,
		speed: { min: 150, max: 250 },
		scale: { start: 0.2, end: 0 },
		gravityY: 150,
		blendMode: "multiply",
		emitting: false,
	});
};

export const createFlameParticles = (scene: Scene) => {
	return scene.add.particles(0, 0, "flares", {
		frame: "white",
		color: [0xfacc22, 0xf89800, 0xf83600, 0x9f0404],
		colorEase: "quad.out",
		lifespan: 2400,
		angle: { min: -100, max: -80 },
		scale: { start: 0.7, end: 0, ease: "sine.out" },
		speed: 100,
		advance: 2000,
		blendMode: "ADD",
	});
};

export const addRain = (scene: Scene) => {
	scene.add.particles(0, 0, "flares", {
		frame: "red",
		color: [0xff5555, 0xff2222, 0xcc0000],
		x: { min: 0, max: scene.scale.width },
		y: -20,
		lifespan: 3000,
		speedY: { min: 300, max: 350 },
		speedX: { min: -100, max: 50 },
		scale: { start: 0.05, end: 0.01 },
		quantity: 2,
		frequency: 50,
		angle: 120, // Slight angle for wind effect
		rotate: 0,
		blendMode: "ADD",
	});
};
