import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { cn } from "@/lib/utils";

function MovingStars() {
	const count = 500;
	const mesh = useRef<THREE.InstancedMesh>(null);
	const dummy = useMemo(() => new THREE.Object3D(), []);

	const particles = useMemo(() => {
		const temp: Array<{ x: number; y: number; z: number }> = [];
		for (let i = 0; i < count; i++) {
			temp.push({
				x: THREE.MathUtils.randFloatSpread(20),
				y: THREE.MathUtils.randFloatSpread(20),
				z: THREE.MathUtils.randFloatSpread(20),
			});
		}
		return temp;
	}, [count]);

	useFrame((state) => {
		if (!mesh.current) return;
		const { x, y } = state.pointer;

		for (let i = 0; i < count; i++) {
			const particle = particles[i];
			particle.y -= 0.05;
			particle.x -= x * 0.02;
			particle.y -= y * 0.02;

			if (particle.y < -10) particle.y = 10;
			if (particle.x < -10) particle.x = 10;
			if (particle.x > 10) particle.x = -10;

			dummy.position.set(particle.x, particle.y, particle.z);
			dummy.scale.setScalar(Math.random() * 0.05 + 0.02);
			dummy.updateMatrix();
			mesh.current.setMatrixAt(i, dummy.matrix);
		}
		mesh.current.instanceMatrix.needsUpdate = true;
	});

	return (
		<instancedMesh ref={mesh} args={[undefined, undefined, count]}>
			<sphereGeometry args={[1, 6, 6]} />
			<meshBasicMaterial color="white" transparent opacity={0.8} />
		</instancedMesh>
	);
}

function RocketWithLogic() {
	const { scene } = useGLTF("/rocket.gltf");
	const group = useRef<THREE.Group>(null);
	const fireMesh = useRef<THREE.Mesh>(null);
	const fireMaterial = useRef<THREE.MeshBasicMaterial>(null);

	useEffect(() => {
		const bodyColor = new THREE.Color("#d7efff");
		const accentRed = new THREE.Color("#d6452d");
		const windowBlue = new THREE.Color("#1e60a8");

		scene.traverse((child) => {
			if (child instanceof THREE.Mesh) {
				const material = child.material as THREE.MeshStandardMaterial;
				if (material) {
					const name = `${child.name} ${material.name}`.toLowerCase();
					if (
						name.includes("window") ||
						name.includes("glass") ||
						name.includes("visor") ||
						name.includes("port") ||
						name.includes("circle")
					) {
						material.color = windowBlue;
					} else if (
						name.includes("fin") ||
						name.includes("wing") ||
						name.includes("nose") ||
						name.includes("tip") ||
						name.includes("accent") ||
						name.includes("trim")
					) {
						material.color = accentRed;
					} else {
						material.color = bodyColor;
					}

					material.emissive = new THREE.Color("#000000");
					material.emissiveIntensity = 0.0;
					material.metalness = 0.05;
					material.roughness = 0.4;
					material.needsUpdate = true;
				}
			}
		});
	}, [scene]);

	useFrame((state) => {
		if (!group.current) return;
		const { x, y } = state.pointer;
		const t = state.clock.getElapsedTime();

		group.current.position.x = THREE.MathUtils.lerp(
			group.current.position.x,
			x * 3.5,
			0.07,
		);
		group.current.position.y = THREE.MathUtils.lerp(
			group.current.position.y,
			y * 3.5,
			0.07,
		);
		group.current.rotation.z = THREE.MathUtils.lerp(
			group.current.rotation.z,
			-x * 0.6,
			0.1,
		);
		group.current.rotation.x = THREE.MathUtils.lerp(
			group.current.rotation.x,
			y + 0.3,
			0.1,
		);
		group.current.position.x += Math.sin(t * 60) * 0.01;

		const speed = Math.abs(x) + Math.abs(y);
		if (fireMesh.current) {
			fireMesh.current.scale.y = THREE.MathUtils.lerp(
				fireMesh.current.scale.y,
				1 + speed,
				0.1,
			);
		}
		if (fireMaterial.current) {
			fireMaterial.current.opacity = 0.5 + Math.random() * 0.5;
			fireMaterial.current.needsUpdate = true;
		}
	});

	return (
		<group ref={group}>
			<primitive object={scene} scale={1.8} />

			<mesh ref={fireMesh} position={[0, -1.3, 0]} rotation={[Math.PI, 0, 0]}>
				<coneGeometry args={[0.2, 1, 8]} />
				<meshBasicMaterial ref={fireMaterial} color="#ffcc33" transparent />
			</mesh>

			<pointLight
				position={[0, -1, 0]}
				intensity={15}
				color="#ff6600"
				distance={5}
			/>
		</group>
	);
}

type RocketShowcaseProps = {
	className?: string;
};

export default function RocketShowcase({ className }: RocketShowcaseProps) {
	return (
		<div
			className={cn(
				"relative w-full h-full overflow-hidden rounded-2xl border border-border/80 bg-black",
				className ?? "min-h-[320px]",
			)}
		>
			<Canvas className="h-full w-full" dpr={[1, 2]}>
				<color attach="background" args={["#000000"]} />
				<PerspectiveCamera makeDefault position={[0, 0, 10]} />

				<ambientLight intensity={0.55} />
				<pointLight position={[6, 8, 8]} intensity={2.2} color="#ffffff" />
				<pointLight position={[-8, 4, 6]} intensity={1.2} color="#ffffff" />
				<directionalLight
					position={[0, 6, 6]}
					intensity={1.1}
					color="#ffffff"
				/>

				<Suspense fallback={null}>
					<MovingStars />
					<RocketWithLogic />
				</Suspense>
			</Canvas>
		</div>
	);
}

useGLTF.preload("/rocket.gltf");
