import { useMatcapTexture, Center, Text3D, OrbitControls } from '@react-three/drei'
import { MeshNormalMaterial } from 'three'
import { useRef, useEffect, useState } from 'react'
import { useFrame} from '@react-three/fiber'
import * as THREE from 'three'


const torusGeometry = new THREE.OctahedronGeometry(1,0)
const material = new THREE.MeshMatcapMaterial()
const material2 = new THREE.MeshMatcapMaterial()



export default function Graphics() 
{
    const donuts = useRef([])
    
    const [matcapTexture] = useMatcapTexture('161B1F_C7E0EC_90A5B3_7B8C9B', 256)
    const [matcapTexture2] = useMatcapTexture('8B892C_D4E856_475E2D_47360A', 256)

    useEffect(() => {
        matcapTexture.encoding = THREE.sRGBEncoding
        matcapTexture.needsUpdate = true
        material.matcap = matcapTexture
        material.needsUpdate = true
        matcapTexture2.encoding = THREE.sRGBEncoding
        matcapTexture2.needsUpdate = true
        material2.matcap = matcapTexture2
        material2.needsUpdate = true
    }, [])

    useFrame((state, delta) =>
    {
        for(const donut of donuts.current)
        {
            donut.rotation.y += delta * 0.5
        }
    })
   

    return <>


        <OrbitControls />


        <Center>
            <Text3D
                material={material}
                font='./fonts/helvetiker_regular.typeface.json'
                size={0.75}
                height={.2}
                curveSegments={12}
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
                material={material}
                font='./fonts/helvetiker_regular.typeface.json'
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
            {[...Array(200)].map((value, index) =>
                <mesh
                    ref={ (e) => donuts.current[index] = e}
                    key={index}
                    geometry={torusGeometry}
                    material={material2}
                    position={[
                        (Math.random() - 0.5) * 20,
                        (Math.random() - 0.5) * 20,
                        (Math.random() - 0.5) * 20,
                    ]}
                    scale={0.2 + Math.random() * 0.2}
                    rotation={[
                        Math.random() * Math.PI,
                        Math.random() * Math.PI,
                        0
                    ]}
                />
            )}



    </>
}