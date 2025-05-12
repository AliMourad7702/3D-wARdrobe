import React from 'react';
import { Canvas } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Suspense } from 'react';
import { OrbitControls } from '@react-three/drei';
import { useState, useRef, useEffect } from 'react';
import arButton from '../imgs/augmented-reality.png';
import { ARButton } from "three/examples/jsm/webxr/ARButton";
import * as THREE from "three";
import deleteButton from '../imgs/delete icon.png';
import Auth from "../Auth";
import api from '../api';
import { useLocation, useNavigate } from 'react-router-dom';



const Home = () => {
    const [clothings, setClothings] = useState([]);
    const [filteredClothings, setFilteredClothings] = useState([]);

    const [mannequins, setMannequins] = useState([]);
    const [mannequinPath, setMannequinPath] = useState("/models/Blender-Material/Male-Medium/bodyTypes/Male-Medium-bodyType.glb");
    const [mannequin, setMannequin] = useState(null);

    const [topPath, setTopPath] = useState("");
    const [top, setTop] = useState(null);
    const [correspTop, setCorrespTop] = useState({});

    const [bottomPath, setBottomPath] = useState("");
    const [bottom, setBottom] = useState(null);
    const [correspBottom, setCorrespBottom] = useState({});

    const [mannequinScaleX, setMannequinScaleX] = useState(1.91);
    const [mannequinScaleY, setMannequinScaleY] = useState(1.86);
    const [mannequinScaleZ, setMannequinScaleZ] = useState(1.85);

    const [topName, setTopName] = useState("");
    const [topScaleX, setTopScaleX] = useState(0);
    const [topScaleY, setTopScaleY] = useState(0);
    const [topScaleZ, setTopScaleZ] = useState(0);
    const [topPositionX, setTopPositionX] = useState(0);
    const [topPositionY, setTopPositionY] = useState(0);
    const [topPositionZ, setTopPositionZ] = useState(0);

    const [bottomName, setBottomName] = useState("");
    const [bottomScaleX, setBottomScaleX] = useState(0);
    const [bottomScaleY, setBottomScaleY] = useState(0);
    const [bottomScaleZ, setBottomScaleZ] = useState(0);
    const [bottomPositionX, setBottomPositionX] = useState(0);
    const [bottomPositionY, setBottomPositionY] = useState(0);
    const [bottomPositionZ, setBottomPositionZ] = useState(0);

    const [skinColor, setSkinColor] = useState("");

    const [height, setHeight] = useState(parseFloat(localStorage.getItem("height")));
    const [weight, setWeight] = useState(parseFloat(localStorage.getItem("weight")));
    const [bodyShape, setBodyShape] = useState(() => {
        if (parseFloat(localStorage.getItem("height")) > 0 && parseFloat(localStorage.getItem("weight")) > 0) {
            const bmi = parseFloat(localStorage.getItem("weight")) / ((parseFloat(localStorage.getItem("height")) / 100) * (parseFloat(localStorage.getItem("height")) / 100));

            localStorage.setItem("BMI", bmi);
            console.log("bmi: " + bmi);

            if (bmi >= 30) {
                return "XXXL";
            } else if (bmi >= 25) {
                return "XXL";
            } else if (bmi >= 23) {
                return "XL";
            } else if (bmi >= 21) {
                return "L";
            } else if (bmi >= 19) {
                return "M";
            } else {
                return "S";
            }
        } else {
            return "M"
        }
    });

    const [isActive1, setIsActive1] = useState(false);
    const [isActive2, setIsActive2] = useState(false);
    const [arActive, setArActive] = useState(false);

    const email = localStorage.getItem("email");
    const [isAuth, setIsAuth] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        fetchAllMannequins();
        fetchAllClothes();
        setIsAuth(Auth.isAuth)

        if (localStorage.getItem("topPath")) {
            setTopPath(localStorage.getItem("topPath"));
        }
        if (localStorage.getItem("topName")) {
            setTopName(localStorage.getItem("topName"));
        }
        if (localStorage.getItem("bottomPath")) {
            setBottomPath(localStorage.getItem("bottomPath"));
        }
        if (localStorage.getItem("bottomName")) {
            setBottomName(localStorage.getItem("bottomName"));
        }
        if (localStorage.getItem("mannequinPath")) {
            setMannequinPath(localStorage.getItem("mannequinPath"));
        }
        if (localStorage.getItem("skinColor")) {
            setSkinColor(localStorage.getItem("skinColor"));
        }
        if (localStorage.getItem("height")) {
            setHeight(parseFloat(localStorage.getItem("height")));
        }
        if (localStorage.getItem("weight")) {
            setWeight(parseFloat(localStorage.getItem("weight")));
        }
        // if (localStorage.getItem("bodyShape")) {
        //     setBodyShape(localStorage.getItem("bodyShape"));
        // }
        setBodyShape(bmiEffect(parseFloat(localStorage.getItem("height")), parseFloat(localStorage.getItem("weight"))))
        if (localStorage.getItem("mannequinScaleX")) {
            setMannequinScaleX(parseFloat(localStorage.getItem("mannequinScaleX")));
        }
        if (localStorage.getItem("mannequinScaleY")) {
            setMannequinScaleY(parseFloat(localStorage.getItem("mannequinScaleY")));
        }
        if (localStorage.getItem("mannequinScaleZ")) {
            setMannequinScaleZ(parseFloat(localStorage.getItem("mannequinScaleZ")));
        }
        if (localStorage.getItem("topScaleX")) {
            setTopScaleX(parseFloat(localStorage.getItem("topScaleX")));
        }
        if (localStorage.getItem("topScaleY")) {
            setTopScaleY(parseFloat(localStorage.getItem("topScaleY")));
        }
        if (localStorage.getItem("topScaleZ")) {
            setTopScaleZ(parseFloat(localStorage.getItem("topScaleZ")));
        }
        if (localStorage.getItem("topPositionX")) {
            setTopPositionX(parseFloat(localStorage.getItem("topPositionX")));
        }
        if (localStorage.getItem("topPositionY")) {
            setTopPositionY(parseFloat(localStorage.getItem("topPositionY")));
        }
        if (localStorage.getItem("topPositionZ")) {
            setTopPositionZ(parseFloat(localStorage.getItem("topPositionZ")));
        }
        if (localStorage.getItem("bottomScaleX")) {
            setBottomScaleX(parseFloat(localStorage.getItem("bottomScaleX")));
        }
        if (localStorage.getItem("bottomScaleY")) {
            setBottomScaleY(parseFloat(localStorage.getItem("bottomScaleY")));
        }
        if (localStorage.getItem("bottomScaleZ")) {
            setBottomScaleZ(parseFloat(localStorage.getItem("bottomScaleZ")));
        }
        if (localStorage.getItem("bottomPositionX")) {
            setBottomPositionX(parseFloat(localStorage.getItem("bottomPositionX")));
        }
        if (localStorage.getItem("bottomPositionY")) {
            setBottomPositionY(parseFloat(localStorage.getItem("bottomPositionY")));
        }
        if (localStorage.getItem("bottomPositionZ")) {
            setBottomPositionZ(parseFloat(localStorage.getItem("bottomPositionZ")));
        }
        filterByBodyShape();
        setCorrespTop({});
        setCorrespBottom({});

    }, []);

    useEffect(() => {
        setIsAuth(Auth.isAuth)
    }, [Auth.isAuth])

    const toggleMenu1 = () => {
        setIsActive1(!isActive1);
    };
    const toggleMenu2 = () => {
        setIsActive2(!isActive2);
    };

    const toggleAR = () => {
        setArActive(!arActive);
    };

    const fetchAllClothes = async () => {
        try {
            const response = await api.get("/clothings/fetchAll");
            if (!response) {
                console.error("Error fetching Clothes")
                return;
            }
            setClothings(response.data.clothing);
        } catch (error) {
            console.error(error.response.data.message);
        }
    };

    const fetchAllMannequins = async () => {
        try {
            const response = await api.get("/mannequins/fetchAll");
            if (!response) {
                console.error("Error fetching Mannequins")
                return;
            }
            setMannequins(response.data.mannequins);

        } catch (error) {
            console.error(error.response.data.message);
        }
    }

    const groupIntoRows = (clothes) => {
        let groups = [];
        for (let i = 0; i < clothes.length; i += 3) {
            groups.push(clothes.slice(i, i + 3));
        }
        return groups;
    };

    const filterByBodyShape = () => {

        if (mannequins && mannequins.length > 0) {
            handleMannequinClick(mannequins.filter(item => item.bodyShape === bodyShape)[0])
        }
        setFilteredClothings(clothings.filter(item => item.size === bodyShape));

        setCorrespTop(clothings.filter(item => item.size === bodyShape).filter(item => item.name === topName)[0]);
        setCorrespBottom(clothings.filter(item => item.size === bodyShape).filter(item => item.name === bottomName)[0]);
    };

    const setUserPreferences = async () => {
        if (email) {
            try {
                const response = await api.post(`/users/setPreferences/${email}`, {
                    mannequinPath,
                    topPath,
                    bottomPath,
                    skinColor,
                    mannequinScaleX,
                    mannequinScaleY,
                    mannequinScaleZ,
                    topScaleX,
                    topScaleY,
                    topScaleZ,
                    topPositionX,
                    topPositionY,
                    topPositionZ,
                    bottomScaleX,
                    bottomScaleY,
                    bottomScaleZ,
                    bottomPositionX,
                    bottomPositionY,
                    bottomPositionZ
                });
            } catch (error) {
                console.error(error.response.data.message);
            }
        }
    }

    const handleClear = () => {
        setTopPath("");
        localStorage.setItem("topPath", "");

        setBottomPath("");
        localStorage.setItem("bottomPath", "");
    }

    const handleClothesClick = (cloth) => {
        if (cloth.type === "top") {
            if (localStorage.getItem("topPath") !== cloth.path) {
                setTopName(cloth.name);
                setTopPath(cloth.path);
                localStorage.setItem("topPath", cloth.path);
                setTopScaleX(cloth.scaleX);
                setTopScaleY(cloth.scaleY);
                setTopScaleZ(cloth.scaleZ);

                setTopPositionX(cloth.positionX);
                setTopPositionY(cloth.positionY);
                setTopPositionZ(cloth.positionZ);

                localStorage.setItem("topName", cloth.name);
                localStorage.setItem("topScaleX", cloth.scaleX.toString());
                localStorage.setItem("topScaleY", cloth.scaleY.toString());
                localStorage.setItem("topScaleZ", cloth.scaleZ.toString());
                localStorage.setItem("topPositionX", cloth.positionX.toString());
                localStorage.setItem("topPositionY", cloth.positionY.toString());
                localStorage.setItem("topPositionZ", cloth.positionZ.toString());
            }
            else {
                setTopPath("");
                setTopName("");
                localStorage.setItem("topPath", "");
                localStorage.setItem("topName", "");
            }

        }
        else if (cloth.type === "bottom") {
            if (localStorage.getItem("bottomPath") !== cloth.path) {
                setBottomName(cloth.name);
                setBottomPath(cloth.path);
                localStorage.setItem("bottomPath", cloth.path);
                setBottomScaleX(cloth.scaleX);
                setBottomScaleY(cloth.scaleY);
                setBottomScaleZ(cloth.scaleZ);

                setBottomPositionX(cloth.positionX);
                setBottomPositionY(cloth.positionY);
                setBottomPositionZ(cloth.positionZ);

                localStorage.setItem("bottomName", cloth.name);
                localStorage.setItem("bottomScaleX", cloth.scaleX.toString());
                localStorage.setItem("bottomScaleY", cloth.scaleY.toString());
                localStorage.setItem("bottomScaleZ", cloth.scaleZ.toString());
                localStorage.setItem("bottomPositionX", cloth.positionX.toString());
                localStorage.setItem("bottomPositionY", cloth.positionY.toString());
                localStorage.setItem("bottomPositionZ", cloth.positionZ.toString());
            }
            else {
                setBottomPath("");
                setBottomName("");
                localStorage.setItem("bottomPath", "");
                localStorage.setItem("bottomName", "");
            }
        }
    };

    const handleMannequinClick = (mannequin) => {
        setMannequinPath(mannequin.path);
        localStorage.setItem("mannequinPath", mannequin.path);
        setMannequinScaleX(mannequin.scaleX);
        localStorage.setItem("mannequinScaleX", mannequin.scaleX);
        setMannequinScaleY(mannequin.scaleY);
        localStorage.setItem("mannequinScaleY", mannequin.scaleY);
        setMannequinScaleZ(mannequin.scaleZ);
        localStorage.setItem("mannequinScaleZ", mannequin.scaleZ);
        setBodyShape(mannequin.bodyShape);
    }

    const bmiEffect = (height, weight) => {
        if (height > 0 && weight > 0) {
            const bmi = weight / ((height / 100) * (height / 100));

            localStorage.setItem("BMI", bmi);
            console.log("height: " + height);
            console.log("weight: " + weight);
            console.log("bmi: " + bmi);

            if (bmi >= 30) {
                setBodyShape("XXXL");
                return "XXXL";
            } else if (bmi >= 25) {
                setBodyShape("XXL");
                return "XXL";
            } else if (bmi >= 23) {
                setBodyShape("XL");
                return "XL";
            } else if (bmi >= 21) {
                setBodyShape("L");
                return "L";
            } else if (bmi >= 19) {
                setBodyShape("M");
                return "M";
            } else {
                setBodyShape("S");
                return "S";
            }
        } else {
            setBodyShape("M");
            return "M"
        }
    }

    useEffect(() => {

        bmiEffect(height, weight);

    }, [weight, height])


    useEffect(() => {
        localStorage.setItem("skinColor", skinColor);
        localStorage.setItem("bodyShape", bodyShape);
        filterByBodyShape();

        if (mannequinPath !== "") {
            const loader = new GLTFLoader();
            loader.load(mannequinPath, (gltf) => {
                setMannequin(gltf.scene);
            })
            setUserPreferences();

        } else {
            setMannequin(null);
        }

        if (topPath !== "") {
            const loader = new GLTFLoader();
            loader.load(topPath, (gltf) => {
                setTop(gltf.scene);
            })
            setUserPreferences();
        } else {
            setTop(null);
        }

        if (bottomPath !== "") {
            const loader = new GLTFLoader();
            loader.load(bottomPath, (gltf) => {
                setBottom(gltf.scene);
            })
            setUserPreferences();
        } else {
            setBottom(null);
        }
        // setUserPreferences();
        // filterByBodyShape();
    }, [mannequinPath,
        topPath,
        bottomPath,
        skinColor,
        bodyShape,
        height,
        weight
    ])

    useEffect(() => {
        localStorage.setItem("bodyShape", bodyShape);
        filterByBodyShape();
    }, [bodyShape])

    useEffect(() => {
        filterByBodyShape();
    }, [clothings])

    useEffect(() => {
        if (top !== null && topPath !== "" && correspTop !== ({})) {
            setTopPath(correspTop.path);
            setTopScaleX(correspTop.scaleX);
            setTopScaleY(correspTop.scaleY);
            setTopScaleZ(correspTop.scaleZ);
            setTopPositionX(correspTop.positionX);
            setTopPositionY(correspTop.positionY);
            setTopPositionZ(correspTop.positionZ);

            localStorage.setItem("topPath", correspTop.path);
            localStorage.setItem("topScaleX", correspTop.scaleX.toString());
            localStorage.setItem("topScaleY", correspTop.scaleY.toString());
            localStorage.setItem("topScaleZ", correspTop.scaleZ.toString());
            localStorage.setItem("topPositionX", correspTop.positionX.toString());
            localStorage.setItem("topPositionY", correspTop.positionY.toString());
            localStorage.setItem("topPositionZ", correspTop.positionZ.toString());
        }
        if (bottom !== null && bottomPath !== "" && correspBottom !== ({})) {
            setBottomPath(correspBottom.path);
            setBottomScaleX(correspBottom.scaleX);
            setBottomScaleY(correspBottom.scaleY);
            setBottomScaleZ(correspBottom.scaleZ);
            setBottomPositionX(correspBottom.positionX);
            setBottomPositionY(correspBottom.positionY);
            setBottomPositionZ(correspBottom.positionZ);

            localStorage.setItem("bottomPath", correspBottom.path);
            localStorage.setItem("bottomScaleX", correspBottom.scaleX.toString());
            localStorage.setItem("bottomScaleY", correspBottom.scaleY.toString());
            localStorage.setItem("bottomScaleZ", correspBottom.scaleZ.toString());
            localStorage.setItem("bottomPositionX", correspBottom.positionX.toString());
            localStorage.setItem("bottomPositionY", correspBottom.positionY.toString());
            localStorage.setItem("bottomPositionZ", correspBottom.positionZ.toString());
        }
    }, [correspTop, correspBottom])


    useEffect(() => {
        if (mannequin) {
            mannequin.traverse((child) => {
                if (child.isMesh) {
                    child.material.color.set(skinColor);
                }
            });
            mannequin.scale.set(mannequinScaleX, mannequinScaleY, mannequinScaleZ);
            mannequin.position.set(0, -3.33, 0);
        }
    }, [mannequin, skinColor])

    useEffect(() => {
        if (top) {
            // top.scale.set(1.94, 1.8461, 1.99);
            top.scale.set(topScaleX, topScaleY, topScaleZ);
            // top.position.set(0.015, -3.37, 0.049);
            top.position.set(topPositionX, topPositionY, topPositionZ);

            if (topPath === "/models/Blender-Material/Male-Medium/Tops/Male-Medium-Tshirt.glb") {
                top.rotation.x = -0.04;
            }

            if (topPath === "/models/Blender-Material/Male-Large/Tops/Male-Large-Tshirt.glb") {
                top.rotation.z = -0.01
            }

            if (
                topPath === "/models/Blender-Material/Male-Small/Tops/Male-Small-Tshirt.glb" ||
                topPath === "/models/Blender-Material/Male-Medium/Tops/Male-Medium-Tshirt.glb" ||
                topPath === "/models/Blender-Material/Male-Large/Tops/Male-Large-Tshirt.glb" ||
                topPath === "/models/Blender-Material/Male-X-Large/Tops/Male-X-Large-Tshirt.glb" ||
                topPath === "/models/Blender-Material/Male-XX-Large/Tops/Male-XX-Large-Tshirt.glb" ||
                topPath === "/models/Blender-Material/Male-XXX-Large/Tops/Male-XXX-Large-Tshirt.glb"
            ) {
                top.traverse((child) => {
                    if (child.isMesh) {
                        child.material.color.set("grey");
                    }
                });
            }


            top.traverse((child) => {
                if (child.isMesh) {
                    child.material.metalness = 0;
                    child.material.roughness = 1;
                }
            });
        }
    }, [top])

    useEffect(() => {
        if (bottom) {
            // bottom.scale.set(1.915, 1.727, 2.02);
            bottom.scale.set(bottomScaleX, bottomScaleY, bottomScaleZ);
            // bottom.position.set(0.006, -3.05, -0.04);
            bottom.position.set(bottomPositionX, bottomPositionY, bottomPositionZ);

            bottom.traverse((child) => {
                if (child.isMesh) {
                    child.material.metalness = 0;
                    child.material.roughness = 1;
                }
            });
        }
    }, [bottom])

    const groupedClothes = groupIntoRows(filteredClothings);

    function AR() {
        const mannequinRef = useRef(null);
        const topRef = useRef(null);
        const bottomRef = useRef(null);
        const cameraRef = useRef(null);

        let mannequinAR = mannequin.clone();
        let topAR, bottomAR;
        if (top !== null) {
            topAR = top.clone();
        }
        if (bottom !== null) {
            bottomAR = bottom.clone();
        }

        useEffect(() => {
            let camera, scene, renderer, controller, arBtn;
            const container = document.createElement("div");

            if (arActive) {
                function init() {

                    document.body.appendChild(container);

                    scene = new THREE.Scene();

                    camera = new THREE.PerspectiveCamera(
                        70,
                        window.innerWidth / window.innerHeight,
                        0.01,
                        40
                    );
                    cameraRef.current = camera;

                    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
                    renderer.setPixelRatio(window.devicePixelRatio);
                    renderer.setSize(window.innerWidth, window.innerHeight);
                    renderer.xr.enabled = true;
                    container.appendChild(renderer.domElement);

                    var light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
                    light.position.set(0.5, 1, 0.25);
                    scene.add(light);


                    const newMannequinScale = new THREE.Vector3(mannequinScaleX / 3.5, mannequinScaleY / 3.5, mannequinScaleZ / 3.5);
                    const newTopScale = new THREE.Vector3(topScaleX / 3.5, topScaleY / 3.5, topScaleZ / 3.5);
                    const newTopPosition = new THREE.Vector3(topPositionX / 3.5, topPositionY / 3.5, (topPositionZ / 3.5) - 2.5);
                    const newBottomScale = new THREE.Vector3(bottomScaleX / 3.5, bottomScaleY / 3.5, (bottomScaleZ / 3.5));
                    const newBottomPosition = new THREE.Vector3(bottomPositionX / 3.5, bottomPositionY / 3.5, (bottomPositionZ / 3.5) - 2.5);


                    mannequinAR.scale.copy(newMannequinScale);
                    mannequinAR.position.set(0, -3.33 / 3.5, -2.5);
                    mannequinRef.current = mannequinAR;


                    if (topAR) {
                        topAR.scale.copy(newTopScale);
                        topAR.position.copy(newTopPosition);
                        topRef.current = topAR;
                    }

                    if (bottomAR) {
                        bottomAR.scale.copy(newBottomScale);
                        bottomAR.position.copy(newBottomPosition);
                        bottomRef.current = bottomAR;
                    }

                    controller = renderer.xr.getController(0);
                    controller.addEventListener('select', onSelect);
                    scene.add(controller);

                    arBtn = ARButton.createButton(renderer);
                    arBtn.style.backgroundColor = "green"
                    document.body.appendChild(arBtn);
                    setTimeout(function () {
                        document.body.removeChild(arBtn);
                        document.body.removeChild(container);
                        setArActive(false);
                    }, 3000);

                    window.addEventListener("resize", onWindowResize, false);

                }

                function onSelect() {
                    mannequinAR.applyMatrix4(controller.matrixWorld);
                    scene.add(mannequinAR);

                    if (topAR) {
                        topAR.applyMatrix4(controller.matrixWorld);
                        scene.add(topAR);
                    }

                    if (bottomAR) {
                        bottomAR.applyMatrix4(controller.matrixWorld);
                        scene.add(bottomAR);
                    }
                }

                function onWindowResize() {
                    camera.aspect = window.innerWidth / window.innerHeight;
                    camera.updateProjectionMatrix();

                    renderer.setSize(window.innerWidth, window.innerHeight);
                }

                function animate() {
                    renderer.setAnimationLoop(render);
                }

                function render() {
                    renderer.render(scene, camera);
                }

                init();
                animate();

                return () => {
                    window.removeEventListener("resize", onWindowResize, false);

                    if (renderer) {
                        const domElement = renderer.domElement;
                    }
                };
            }
            else if (!arActive) {
                if (document.body.contains(container)) {
                    document.body.removeChild(container);
                }
            }
        }, [arActive]);

        return null;
    }



    return (
        <>
            <div className='home-container'>
                <div className="Home">

                    {isAuth && (
                        <button className='ar-button'><img src={arButton} alt="" onClick={toggleAR} /></button>
                    )}
                    {arActive && (<AR />)}

                    <button className='delete-button' onClick={handleClear}><img src={deleteButton} alt="" /></button>
                    <div
                        className={`navigation ${isActive2 ? 'active' : ''} color`}
                        style={{ 'background': `${!isActive2 ? "url('/imgs/Skin_Color.png') center/cover, #98a1bec9" : "#98a1bec9"}`, 'display': !isAuth ? "none" : "flex" }}
                        onClick={() => { !isActive2 && toggleMenu2(); setIsActive1(false) }}
                    >
                        <span style={{ '--i': 0, '--x': -1, '--y': 0, 'backgroundColor': '#FFCD94' }}
                            onClick={() => setSkinColor('#FFCD94')}
                            className={skinColor === '#FFCD94' ? 'selected' : ''}
                        >
                        </span>

                        <span style={{ '--i': 1, '--x': 1, '--y': 0, 'backgroundColor': '#C68642' }}
                            onClick={() => setSkinColor('#C68642')}
                            className={skinColor === '#C68642' ? 'selected' : ''}
                        >
                        </span>

                        <span style={{ '--i': 2, '--x': 0, '--y': -1, 'backgroundColor': '#321B0F' }}
                            onClick={() => setSkinColor('#3a2317')}
                            className={skinColor === '#3a2317' ? 'selected' : ''}
                        >
                        </span>

                        <span style={{ '--i': 3, '--x': 0, '--y': 1, 'backgroundColor': '#FFCDA5' }}
                            onClick={() => setSkinColor('#FFCDA5')}
                            className={skinColor === '#FFCDA5' ? 'selected' : ''}
                        >
                        </span>

                        <span style={{ '--i': 7, '--x': -1, '--y': 1, 'backgroundColor': '#E0AC69' }}
                            onClick={() => setSkinColor('#E0AC69')}
                            className={skinColor === '#E0AC69' ? 'selected' : ''}
                        >
                        </span>

                        <span style={{ '--i': 8, '--x': 1, '--y': -1, 'backgroundColor': '#492816' }}
                            onClick={() => setSkinColor('#492816')}
                            className={skinColor === '#492816' ? 'selected' : ''}
                        >
                        </span>
                        <span style={{ '--i': 6, '--x': 0, '--y': 0, 'backgroundColor': 'red', 'fontSize': '40px' }} onClick={() => { isActive2 && toggleMenu2(); }}>
                            ×
                        </span>
                    </div>
                    <div
                        className={`navigation ${isActive1 ? 'active' : ''} size`}
                        style={{ 'background': `${!isActive1 ? "url('/imgs/Body_Shape.png') center/cover, #98a1bec9" : "#98a1bec9"}`, 'display': !isAuth ? "none" : "flex" }}
                        onClick={() => { !isActive1 && toggleMenu1(); setIsActive2(false) }}
                    >
                        {mannequins
                            .filter(item => item.bodyShape === 'S')
                            .map((item) => (<span
                                key={item._id}
                                style={{ '--i': 0, '--x': -1, '--y': 0 }}
                                onClick={() => handleMannequinClick(item)}
                                className={bodyShape === item.bodyShape ? 'selected' : ''}
                            >
                                {item.bodyShape}
                            </span>))}

                        {mannequins
                            .filter(item => item.bodyShape === 'XXXL')
                            .map((item) => (<span
                                key={item._id}
                                style={{ '--i': 1, '--x': 1, '--y': 0 }}
                                onClick={() => handleMannequinClick(item)}
                                className={bodyShape === item.bodyShape ? 'selected' : ''}
                            >
                                {item.bodyShape}
                            </span>))}

                        {mannequins
                            .filter(item => item.bodyShape === 'L')
                            .map((item) => (<span
                                key={item._id}
                                style={{ '--i': 2, '--x': 0, '--y': -1 }}
                                onClick={() => handleMannequinClick(item)}
                                className={bodyShape === item.bodyShape ? 'selected' : ''}
                            >
                                {item.bodyShape}
                            </span>))}

                        {mannequins
                            .filter(item => item.bodyShape === 'XL')
                            .map((item) => (<span
                                key={item._id}
                                style={{ '--i': 3, '--x': 0, '--y': 1 }}
                                onClick={() => handleMannequinClick(item)}
                                className={bodyShape === item.bodyShape ? 'selected' : ''}
                            >
                                {item.bodyShape}
                            </span>))}

                        {mannequins
                            .filter(item => item.bodyShape === 'XXL')
                            .map((item) => (<span
                                key={item._id}
                                style={{ '--i': 4, '--x': 1, '--y': 1 }}
                                onClick={() => handleMannequinClick(item)}
                                className={bodyShape === item.bodyShape ? 'selected' : ''}
                            >
                                {item.bodyShape}
                            </span>))}
                        {mannequins
                            .filter(item => item.bodyShape === 'M')
                            .map((item) => (<span
                                key={item._id}
                                style={{ '--i': 5, '--x': -1, '--y': -1 }}
                                onClick={() => handleMannequinClick(item)}
                                className={bodyShape === item.bodyShape ? 'selected' : ''}
                            >
                                {item.bodyShape}
                            </span>))}

                        <span style={{ '--i': 6, '--x': 0, '--y': 0, 'backgroundColor': 'red', 'fontSize': '40px' }}
                            onClick={() => { isActive1 && toggleMenu1(); }}
                        >
                            ×
                        </span>
                    </div>
                    <Canvas className='Home-Avatar' style={{ height: "550px" }} onClick={() => { isActive1 && toggleMenu1(); isActive2 && toggleMenu2(); }}>
                        <pointLight position={[0, 0, 25]} intensity={650} />
                        <pointLight position={[0, 0, -25]} intensity={650} />
                        <pointLight position={[25, 10, 0]} intensity={650} />
                        <pointLight position={[-25, 10, 0]} intensity={650} />
                        <OrbitControls />
                        <Suspense fallback={null}>
                            {mannequin && (<primitive object={mannequin} />)}
                            {top && (<primitive object={top} />)}
                            {bottom && (<primitive object={bottom} />)}
                        </Suspense>
                    </Canvas>
                    <div className="Home-Cloths">
                        {groupedClothes.map((group, index) => (
                            <div className="row" key={index}>
                                {group.map((item) => (
                                    <div
                                        className="Home-Cloths-box-row"
                                        key={item._id}
                                        onClick={() => handleClothesClick(item)}
                                    >
                                        <img src={item.thumbnailPath} alt="" />
                                        <p><b>{item.name}</b><br />
                                            {item.price}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div >
        </>

    );
};

export default Home;