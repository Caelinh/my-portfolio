import { useMatcapTexture, Center, Text3D, OrbitControls } from '@react-three/drei'
import { Camera, MeshNormalMaterial, Vector3 } from 'three'
import { useRef, useEffect, useState } from 'react'
import { useFrame, useThree} from '@react-three/fiber'
import * as THREE from 'three'


const octahedronGeometry = new THREE.OctahedronGeometry(1,0)
const torusGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)

const material = new THREE.MeshMatcapMaterial()
const material2 = new THREE.MeshMatcapMaterial()


export default function Graphics() 
{
    const diamonds = useRef([])
    const donuts = useRef([])
    const name = useRef()
    const title = useRef()

    const [matcapTexture] = useMatcapTexture('C7C7D7_4C4E5A_818393_6C6C74', 256)
    const [matcapTexture2] = useMatcapTexture('161B1F_C7E0EC_90A5B3_7B8C9B', 256)

    useEffect(() => {
        matcapTexture.encoding = THREE.sRGBEncoding
        matcapTexture.needsUpdate = true
        material.matcap = matcapTexture
        material.needsUpdate = true
        matcapTexture2.encoding = THREE.sRGBEncoding
        matcapTexture2.needsUpdate = true
        material2.matcap = matcapTexture2
        material2.needsUpdate = true
        
        name.current.geometry.computeBoundingBox();
        const boundingBox = name.current.geometry.boundingBox;
        const center = new THREE.Vector3();
        boundingBox.getCenter(center);
        name.current.geometry.translate(-center.x,-center.y,-center.z);
        name.current.position.set(center.x,center.y,center.z)
        
        title.current.geometry.computeBoundingBox();
        const boundingBox2 = title.current.geometry.boundingBox;
        const center2 = new THREE.Vector3();
        boundingBox2.getCenter(center2);
        title.current.geometry.translate(-center2.x,-center2.y,-center2.z);
        title.current.position.set(center2.x,center2.y,center2.z)
        
    }, [])

    const clock = new THREE.Clock()

    useFrame((state, delta) =>
    {
        const elapsedTime = clock.getElapsedTime()

        for(const diamond of diamonds.current)
        {
            diamond.rotation.y += delta * 0.05
            diamond.rotation.x += delta * 0.05

        }
        for(const donut of donuts.current)
        {
            donut.rotation.y += delta * 0.05
            donut.rotation.x += delta * 0.05

        }
        name.current.rotation.y = Math.sin(elapsedTime * .3) * .05
        title.current.rotation.y = Math.sin(elapsedTime * .3) * .05
        state.camera.position.y = Math.sin(elapsedTime * .5) * .1
        
    
        
    })

  
    return <>
        
        <Center>
            <Text3D
                ref={name}
                material={material}
                font='./fonts/Roboto_Mono_Regular.json'
                size={0.75}
                height={.2}
                curveSegments={10}
                bevelEnabled
                bevelThickness={0.02}
                bevelSize={0.02}
                bevelOffset={0}
                bevelSegments={5}

            >
                CAELIN HARGRAVE
            </Text3D>
        </Center>
        <Center position={[0,-1.2,0]}>
            <Text3D
                ref={title}
                material={material}
                font='./fonts/Roboto_Mono_Regular.json'
                size={0.75}
                height={.2}
                curveSegments={12}
                bevelEnabled
                bevelThickness={0.02}
                bevelSize={0.02}
                bevelOffset={0}
                bevelSegments={5}
                
            >
                Fullstack Developer
            </Text3D>
        </Center>
            {[...Array(300)].map((value, index) =>
                <mesh
                    ref={ (e) => diamonds.current[index] = e}
                    key={index}
                    geometry={octahedronGeometry}
                    material={material2}
                    position={[
                        (Math.random() - 0.5) * 50,
                        (Math.random() - 0.5) * 20,
                        (Math.random() - 0.5) * 20,
                    ]}
                    scale={0.2 + Math.random() * 0.05}
                    rotation={[
                        Math.random() * Math.PI,
                        Math.random() * Math.PI,
                        0
                    ]}
                />
            )}
            {[...Array(300)].map((value, index) =>
                <mesh
                    ref={ (e) => donuts.current[index] = e}
                    key={index}
                    geometry={torusGeometry}
                    material={material2}
                    position={[
                        (Math.random() - 0.5) * 50,
                        (Math.random() - 0.5) * 20,
                        (Math.random() - 0.5) * 20,
                    ]}
                    scale={0.2 + Math.random() * .3}
                    rotation={[
                        Math.random() * Math.PI,
                        Math.random() * Math.PI,
                        0
                    ]}
                />
            )}



    </>
}