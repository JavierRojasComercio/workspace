import {
    _PATH_SkyboxTextures,
    _PATH_PlanetTextures,
    _PATH_Data,
    BABYLON_ParticleHelper_BaseAssetsUrl,
    BABYLON_Engine_ShadersRepository_BaseAssetsUrl
}
    from './modules/Globals.js';
import HexToBABYLONColor3 from './modules/Tools.js';
import Planets from './modules/Planets.js';
import CelestialSphere from './modules/CelestialSphere.js';





// Paths para autocompletado de funcoines
// Babylon
/// <reference path="./babylonjs/babylon.d.ts" />



// Variables globales
// Nombre de los archivos con los datos de los planteas y las estrellas
var _FILE_PlanetData = "planet-data-sun.json";
var _FILE_StarData = "star-data.json";
// Capa de depuración activa (0 o 1)
var debug = 0;
// Play/Stop animaciones (0 o 1)
var play = 1;
// Velocidad del paso del tiempo (0.1 - 2)
var velocity = 0.1;
// Color de la interfaz de usaurio (varía según blanco: neutral bélico: rojo, ciencia: verde, social: azul)
var colorGUI = "#FFFFFF";
var colorGUIBABYLONColor3 = HexToBABYLONColor3(colorGUI);
// Número de Estrellas (1-2000)
var starLimit = 20;
// Tamaño de visualización de las estrellas (1-2)
var starScale = 2;
// Distancia de la esfera de estrellas (1000-1500)
var radius = 1000;
// Ver constelaciones: bool
var showAsterisms = true;
// Ver titilar de estrellas: bool
var twinkleStars = true;




/**
 * Clase WebGL:
 * Agrupa el canvas, el engine, la escena y las interfaces de usario.
 */
var WebGL = (function () {

    // Constructor
    function WebGL(canvasElement) {

        this._canvas = document.getElementById(canvasElement);
        this._engine = new BABYLON.Engine(this._canvas, true);
        this._scene;
        this._guiPanel = new BABYLON.GUI.StackPanel();

    }



    WebGL.prototype.createScene = function () {

        // Variable auxiliar para hacer referencia  al objeto WebGL en bloques menores (en cualquier contexto)
        var _this = this;

        // Inicializo la scene.
        this._scene = new BABYLON.Scene(this._engine);
        this._scene.clearColor = new BABYLON.Color4(0, 0, 0, 1.0);

        // Cierro el loader cuando acaba de cargar la escena 
        this._scene.executeWhenReady(function () {
            document.getElementById('loader').className += ' fadeOut';
        });

        // Muestro capa debug.
        if (debug == 1) this._scene.debugLayer.show();

        // Cámara
        var camera = new BABYLON.ArcRotateCamera('camera', 0, 0, 490, BABYLON.Vector3.Zero(), this._scene);
        camera.upperRadiusLimit = 490;
        camera.lowerRadiusLimit = 5;
        camera.attachControl(this._canvas);

        // Sol o la estrella correspondiente
        BABYLON.ParticleHelper.BaseAssetsUrl = BABYLON_ParticleHelper_BaseAssetsUrl;
        BABYLON.ParticleSystemSet.BaseAssetsUrl = BABYLON_ParticleHelper_BaseAssetsUrl;
        BABYLON.Engine.ShadersRepository = BABYLON_Engine_ShadersRepository_BaseAssetsUrl;

        var sun = BABYLON.ParticleHelper.CreateAsync("sun", this._scene).then((set) => {
            set.start();
        });



        // Luz que emite el sol y reflejos
        var sunlight = new BABYLON.PointLight("sun", BABYLON.Vector3.Zero(), this._scene);
        sunlight.intesity = 20;

        var lensFlareSystem = new BABYLON.LensFlareSystem("lensFlareSystem", sunlight, this._scene);
        lensFlareSystem.renderingGroupId = 3;
        var flare00 = new BABYLON.LensFlare(.1, 0, new BABYLON.Color3(1, 1, 1), BABYLON_Engine_ShadersRepository_BaseAssetsUrl + "Flare3.png", lensFlareSystem);
        var flare01 = new BABYLON.LensFlare(.4, .1, new BABYLON.Color3(1, 1, 1), BABYLON_Engine_ShadersRepository_BaseAssetsUrl + "Flare.png", lensFlareSystem);
        var flare02 = new BABYLON.LensFlare(.2, .2, new BABYLON.Color3(0.5, 0.5, 0.5), BABYLON_Engine_ShadersRepository_BaseAssetsUrl + "Flare.png", lensFlareSystem);
        var flare02 = new BABYLON.LensFlare(.1, .3, new BABYLON.Color3(0, 1, 1), BABYLON_Engine_ShadersRepository_BaseAssetsUrl + "Flare3.png", lensFlareSystem);
        var flare03 = new BABYLON.LensFlare(.3, .4, new BABYLON.Color3(1, 1, 1), BABYLON_Engine_ShadersRepository_BaseAssetsUrl + "Flare.png", lensFlareSystem);
        var flare05 = new BABYLON.LensFlare(.5, 1, new BABYLON.Color3(1, 1, 1), BABYLON_Engine_ShadersRepository_BaseAssetsUrl + "Flare2.png", lensFlareSystem);
        var flare05 = new BABYLON.LensFlare(.5, 1, new BABYLON.Color3(1, 1, 1), BABYLON_Engine_ShadersRepository_BaseAssetsUrl + "Flare.png", lensFlareSystem);
        var flare02 = new BABYLON.LensFlare(.1, 1.3, new BABYLON.Color3(1, 1, 1), BABYLON_Engine_ShadersRepository_BaseAssetsUrl + "Flare.png", lensFlareSystem);
        var flare03 = new BABYLON.LensFlare(.15, 1.4, new BABYLON.Color3(1, 1, 1), BABYLON_Engine_ShadersRepository_BaseAssetsUrl + "Flare.png", lensFlareSystem);
        var flare04 = new BABYLON.LensFlare(.05, 1.5, new BABYLON.Color3(0.5, 0.5, 0.5), BABYLON_Engine_ShadersRepository_BaseAssetsUrl + "Flare3.png", lensFlareSystem);




        // Planetas
        // Cargo y parseo planet-data.
        var planetsAssetsManager = new BABYLON.AssetsManager(this._scene);
        var planetsDataTask = planetsAssetsManager.addTextFileTask("planet-data", _PATH_Data + _FILE_PlanetData);
        var planetsData;
        var planets;

        // Hasta que no recibo la petición no pudedo manipular los planteas
        planetsDataTask.onSuccess = function (planetDataTask) {

            // Inicializo el objeto planetas
            planetsData = JSON.parse(planetDataTask.text);
            planets = new Planets(_this._scene, _PATH_PlanetTextures, planetsData);

            // Coloco las etiquetas de los planetas
            for (let counter = 0; counter < planets.list.length; counter++) {
                createLabel(planets.list[counter], counter);
            }

            // Hago invisibles las esferas con botones de los plantetas
            for (let counter = 0; counter <= planets.list.length - 1; counter++) {
                for (let prop in planets.list[counter]._children) {
                    let moon = planets.list[counter]._children[prop];
                    if (moon.name == "ContainerNode") {
                        moon.setEnabled(false);
                    }
                }
            }



            // Render loop
            _this._scene.beforeRender = function () {

                if (play != 0) {
                    // Rotación y traslación de los planetas
                    for (let counter = 0; counter <= planets.list.length - 1; counter++) {
                        planets.list[counter].position.x = planets.list[counter].orbit.radius * Math.sin(planets.list[counter].orbit.angle);
                        planets.list[counter].position.z = planets.list[counter].orbit.radius * Math.cos(planets.list[counter].orbit.angle);
                        planets.list[counter].orbit.angle += velocity * planets.list[counter].orbit.speed;
                        planets.list[counter].rotate(BABYLON.Axis.Y, velocity * 0.02, BABYLON.Space.LOCAL);
                    }
                    // Rotación de los cinturones de asteroides
                    for (let counter = 0; counter <= planets.belts.length - 1; counter++) {
                        planets.belts[counter].mesh.rotation.z = 0 / 1000;
                    }

                }

                // Mostrar reflejo del sol solo cuando tengamos el planeta en primera vista
                if (camera.radius < 5) {
                    lensFlareSystem.isEnabled = true;
                } else {
                    lensFlareSystem.isEnabled = false;
                }

            };

        };

        planetsAssetsManager.load();



        // Estrellas
        // Cargo y parseo star-data.
        var starsAssetsManager = new BABYLON.AssetsManager(this._scene);
        var starDataTask = starsAssetsManager.addTextFileTask("star-data", _PATH_Data + _FILE_StarData);
        var starData;
        var celestialSphere;

        // Hasta que no recibo la petición no pudedo manipular las estrellas
        starDataTask.onSuccess = function (starDataTask) {
            starData = JSON.parse(starDataTask.text);
            celestialSphere = new CelestialSphere("celestialSphere", _this._scene, _PATH_SkyboxTextures, starData, radius, starLimit, starScale, showAsterisms, colorGUIBABYLONColor3, twinkleStars);
        };
        starsAssetsManager.load();








        // Nubes
        //var fountain = new BABYLON.Mesh.CreateSphere("foutain", 24, 6, _this._scene);
        //const fountain = BABYLON.MeshBuilder.CreateSphere("foutain", {diameterX: 1, diameterY: 0.5, diameterZ: 0.5},  _this._scene);
        //var fountain = BABYLON.Mesh.CreateBox("foutain", .1, _this._scene);

        //fountain.position.x = 200;
        //fountain.visibility = 0;

        const fountain = BABYLON.MeshBuilder.CreateBox("box", {});
        fountain.position = new BABYLON.Vector3(getRandomInt(1,500), getRandomInt(1,500),getRandomInt(1,500));

        function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1) + min) };
        // Create a particle system
        var particleSystem;
        var useGPUVersion = false;

        var fogTexture = new BABYLON.Texture(BABYLON_Engine_ShadersRepository_BaseAssetsUrl +"fog.png", _this._scene);

        var createNewSystem = function () {
            if (particleSystem) {
                particleSystem.dispose();
            }

            if (useGPUVersion && BABYLON.GPUParticleSystem.IsSupported) {
                particleSystem = new BABYLON.GPUParticleSystem("particles", { capacity: 50000 }, _this._scene);
                particleSystem.activeParticleCount = 15000;
                particleSystem.manualEmitCount = particleSystem.activeParticleCount;
                particleSystem.minEmitBox = new BABYLON.Vector3(-50, 2, -50); // Starting all from
                particleSystem.maxEmitBox = new BABYLON.Vector3(50, 2, 50); // To..

            } else {
                particleSystem = new BABYLON.ParticleSystem("particles", 2500, _this._scene);
                particleSystem.manualEmitCount = particleSystem.getCapacity();
                particleSystem.minEmitBox = new BABYLON.Vector3(getRandomInt(1,25), getRandomInt(1,25), getRandomInt(1,25)); // Starting all from
                particleSystem.maxEmitBox = new BABYLON.Vector3(getRandomInt(1,25),getRandomInt(1,25),getRandomInt(1,25)); // To...
            }


            particleSystem.particleTexture = fogTexture.clone();
            particleSystem.emitter = fountain;

            //particleSystem.color1 = new BABYLON.Color4(0.8, 0.8, 0.8, 0.1);
            //particleSystem.color2 = new BABYLON.Color4(.95, .95, .95, 0.15);
            //particleSystem.colorDead = new BABYLON.Color4(0.9, 0.9, 0.9, 0.1);
            particleSystem.color1 = new BABYLON.Color4(getRandomInt(1,100)/100, getRandomInt(1,100)/100, getRandomInt(1,100)/100, 0.1);
            particleSystem.color2 = new BABYLON.Color4(getRandomInt(1,100)/100, getRandomInt(1,100)/100, getRandomInt(1,100)/100, 0.15);
            particleSystem.colorDead = new BABYLON.Color4(getRandomInt(1,100)/100, getRandomInt(1,100)/100, getRandomInt(1,100)/100, 0.1);
            particleSystem.minSize = 3.5;
            particleSystem.maxSize = 5.0;
            particleSystem.minLifeTime = Number.MAX_SAFE_INTEGER;
            particleSystem.emitRate = 400;
            particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_STANDARD;
            particleSystem.gravity = new BABYLON.Vector3(0, 0, 0);
            particleSystem.direction1 = new BABYLON.Vector3(1, 0, 0);
            particleSystem.direction2 = new BABYLON.Vector3(1, 0, 0);
            particleSystem.minAngularSpeed = -2;
            particleSystem.maxAngularSpeed = 2;
            particleSystem.minEmitPower = .5;
            particleSystem.maxEmitPower = 1;
            particleSystem.updateSpeed = 0.005;

            particleSystem.start();
        }

        createNewSystem();































        // GUI
        var guiControlWidth = "200px";
        var guiControlHeight = "40px";
        var guiColor = "white";
        var guiBackgroundColor = colorGUI;
        var guiPaddingSmall = "10px";
        var guiPaddingLarge = "20px";
        var guiFontSizeSmall = "15px";
        var guiFontSizeMedium = "18px";
        var guiFontSizeLarge = "22px";
        var guiAdvancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
        // Stack panel container.
        var guiPanel = new BABYLON.GUI.StackPanel();
        guiPanel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        guiPanel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        guiPanel.paddingTop = guiPaddingLarge;
        guiPanel.paddingRight = guiPaddingLarge;
        guiPanel.width = "220px";
        guiPanel.height = "900px";
        guiPanel.background = "#3338";
        guiAdvancedTexture.addControl(guiPanel);
        // Header - project title.
        var guiHeader = new BABYLON.GUI.TextBlock();
        guiHeader.text = "fps:<> ";
        guiHeader.fontSize = guiFontSizeLarge;
        guiHeader.height = guiControlHeight;
        guiHeader.color = guiColor;
        guiHeader.paddingTop = guiPaddingLarge;
        guiPanel.addControl(guiHeader);
        // Star limit slider label.
        var starLimitLabel = new BABYLON.GUI.TextBlock();
        starLimitLabel.text = "Number of stars: " + starLimit.toFixed(0);
        starLimitLabel.fontSize = guiFontSizeSmall;
        starLimitLabel.height = guiControlHeight;
        starLimitLabel.color = guiColor;
        starLimitLabel.paddingTop = guiPaddingLarge;
        guiPanel.addControl(starLimitLabel);
        // Star limit slider.
        var starLimitSlider = new BABYLON.GUI.Slider();
        starLimitSlider.minimum = 100;
        starLimitSlider.maximum = 5000;
        starLimitSlider.value = starLimit;
        starLimitSlider.width = guiControlWidth;
        starLimitSlider.height = "30px";
        starLimitSlider.thumbWidth = "15px";
        starLimitSlider.color = guiBackgroundColor;
        starLimitSlider.borderColor = guiColor;
        starLimitSlider.background = "black";
        starLimitSlider.paddingTop = "7px";
        starLimitSlider.paddingLeft = guiPaddingSmall;
        starLimitSlider.paddingRight = guiPaddingSmall;
        starLimitSlider.onValueChangedObservable.add(function (value) {
            starLimitLabel.text = "Number of stars: " + value.toFixed(0);
            starLimit = value;
        });
        guiPanel.addControl(starLimitSlider);
        // Star scale slider label.
        var starScaleLabel = new BABYLON.GUI.TextBlock();
        starScaleLabel.text = "Star scale: " + starScale.toFixed(1);
        starScaleLabel.fontSize = guiFontSizeSmall;
        starScaleLabel.height = guiControlHeight;
        starScaleLabel.color = guiColor;
        starScaleLabel.paddingTop = guiPaddingLarge;
        guiPanel.addControl(starScaleLabel);
        // Star scale slider.
        var starScaleSlider = new BABYLON.GUI.Slider();
        starScaleSlider.minimum = 0.1;
        starScaleSlider.maximum = 2.0;
        starScaleSlider.value = starScale;
        starScaleSlider.width = guiControlWidth;
        starScaleSlider.height = "30px";
        starScaleSlider.thumbWidth = "15px";
        starScaleSlider.color = guiBackgroundColor;
        starScaleSlider.borderColor = guiColor;
        starScaleSlider.background = "black";
        starScaleSlider.paddingTop = "7px";
        starScaleSlider.paddingLeft = guiPaddingSmall;
        starScaleSlider.paddingRight = guiPaddingSmall;
        starScaleSlider.onValueChangedObservable.add(function (value) {
            starScaleLabel.text = "Star scale: " + value.toFixed(1);
            starScale = value;
        });
        guiPanel.addControl(starScaleSlider);
        // Radius slider label.
        var radiusLabel = new BABYLON.GUI.TextBlock();
        radiusLabel.text = "Sphere radius: " + radius.toFixed(0);
        radiusLabel.fontSize = guiFontSizeSmall;
        radiusLabel.height = guiControlHeight;
        radiusLabel.color = guiColor;
        radiusLabel.paddingTop = guiPaddingLarge;
        guiPanel.addControl(radiusLabel);
        // Radius slider.
        var radiusSlider = new BABYLON.GUI.Slider();
        radiusSlider.minimum = 100;
        radiusSlider.maximum = 900;
        radiusSlider.value = radius;
        radiusSlider.width = guiControlWidth;
        radiusSlider.height = "30px";
        radiusSlider.thumbWidth = "15px";
        radiusSlider.color = guiBackgroundColor;
        radiusSlider.borderColor = guiColor;
        radiusSlider.background = "black";
        radiusSlider.paddingTop = "7px";
        radiusSlider.paddingLeft = guiPaddingSmall;
        radiusSlider.paddingRight = guiPaddingSmall;
        radiusSlider.onValueChangedObservable.add(function (value) {
            radiusLabel.text = "Sphere radius: " + value.toFixed(0);
            radius = value;
        });
        guiPanel.addControl(radiusSlider);
        // Twinkle stars checkbox.
        var twinkleCheckbox = new BABYLON.GUI.Checkbox();
        twinkleCheckbox.width = "20px";
        twinkleCheckbox.height = "20px";
        twinkleCheckbox.isChecked = twinkleStars;
        twinkleCheckbox.color = guiBackgroundColor;
        twinkleCheckbox.onIsCheckedChangedObservable.add(function (value) {
            twinkleStars = value;
        });
        // Twinkle stars checkbox header.
        var twinkleHeader = BABYLON.GUI.Control.AddHeader(twinkleCheckbox, " Twinkle stars", "180px", { isHorizontal: true, controlFirst: true });
        twinkleHeader.height = "60px";
        twinkleHeader.paddingLeft = "20px";
        twinkleHeader.fontSize = guiFontSizeSmall;
        twinkleHeader.paddingTop = guiPaddingLarge;
        twinkleHeader.color = guiColor;
        twinkleHeader.children[1].onPointerDownObservable.add(function () {
            twinkleCheckbox.isChecked = !twinkleCheckbox.isChecked;
        });
        guiPanel.addControl(twinkleHeader);
        // Show asterisms checkbox.
        var asterismsCheckbox = new BABYLON.GUI.Checkbox();
        asterismsCheckbox.width = "20px";
        asterismsCheckbox.height = "20px";
        asterismsCheckbox.isChecked = showAsterisms;
        asterismsCheckbox.color = guiBackgroundColor;
        asterismsCheckbox.onIsCheckedChangedObservable.add(function (value) {
            showAsterisms = value;
        });
        // Show asterisms checkbox header.
        var asterismsHeader = BABYLON.GUI.Control.AddHeader(asterismsCheckbox, " Show asterisms", "180px", { isHorizontal: true, controlFirst: true });
        asterismsHeader.height = "60px";
        asterismsHeader.paddingLeft = "20px";
        asterismsHeader.fontSize = guiFontSizeSmall;
        asterismsHeader.paddingTop = guiPaddingSmall;
        asterismsHeader.color = guiColor;
        asterismsHeader.children[1].onPointerDownObservable.add(function () {
            asterismsCheckbox.isChecked = !asterismsCheckbox.isChecked;
        });
        guiPanel.addControl(asterismsHeader);
        // Asterism color header.
        var asterismColorHeader = new BABYLON.GUI.TextBlock();
        asterismColorHeader.text = "Asterism color";
        asterismColorHeader.fontSize = guiFontSizeSmall;
        asterismColorHeader.height = guiControlHeight;
        asterismColorHeader.color = guiColor;
        guiPanel.addControl(asterismColorHeader);
        // Asterism color picker.
        var asterismColorPicker = new BABYLON.GUI.ColorPicker();
        asterismColorPicker.value = colorGUI;
        asterismColorPicker.height = guiControlWidth;
        asterismColorPicker.width = guiControlWidth;
        asterismColorPicker.paddingLeft = guiPaddingSmall;
        asterismColorPicker.paddingRight = guiPaddingSmall;
        asterismColorPicker.onValueChangedObservable.add(function (value) {
            asterismColor = value;
        });
        guiPanel.addControl(asterismColorPicker);
        var regenButton = BABYLON.GUI.Button.CreateSimpleButton("regenButton", "Regenerate!");
        regenButton.width = guiControlWidth;
        regenButton.height = "70px";
        regenButton.color = guiColor;
        regenButton.fontSize = guiFontSizeMedium;
        //button2.cornerRadius = 20;
        regenButton.background = guiBackgroundColor;
        regenButton.paddingLeft = guiPaddingLarge;
        regenButton.paddingRight = guiPaddingLarge;
        regenButton.paddingTop = guiPaddingSmall;
        regenButton.paddingBottom = guiPaddingLarge;
        regenButton.onPointerUpObservable.add(function () {
            celestialSphere.dispose();
            celestialSphere = new CelestialSphere("celestialSphere", _this._scene, starData, radius, starLimit, starScale, showAsterisms, asterismColor.clone(), twinkleStars);
        });
        guiPanel.addControl(regenButton);

        var fullscreenButton = BABYLON.GUI.Button.CreateSimpleButton("fullscreenButton", "Fullscreen");
        fullscreenButton.width = guiControlWidth;
        fullscreenButton.height = "70px";
        fullscreenButton.color = guiColor;
        fullscreenButton.fontSize = guiFontSizeMedium;
        //button2.cornerRadius = 20;
        fullscreenButton.background = guiBackgroundColor;
        fullscreenButton.paddingLeft = guiPaddingLarge;
        fullscreenButton.paddingRight = guiPaddingLarge;
        fullscreenButton.paddingTop = guiPaddingSmall;
        fullscreenButton.paddingBottom = guiPaddingLarge;
        var auxEngine = this._engine;

        fullscreenButton.onPointerUpObservable.add(function () {
            auxEngine.switchFullscreen(true);
        });
        guiPanel.addControl(fullscreenButton);

        this._guiPanel = guiPanel;




























        // INTERFAZ ///////////////////////////////////////////////////////////////////////////////

        // FUNCIONES AUXILIARES

        // Cámara para el sol
        function setCameraOnSun() {
            camera.setTarget(new BABYLON.Vector3(0, 0, 0));
            // Con sunBig
            //camera.lowerRadiusLimit = 100;
            //camera.radius = 100;
            camera.lowerRadiusLimit = 5;
            camera.radius = 5;
        }
        // Cámara para cada uno de los planetas !Ajuste de * 2 + 21  para que quede bien la vista de la info
        function setCameraOnPlanet(planet) {
            camera.setTarget(planet);
            camera.lowerRadiusLimit = planet.text.es.size + 1.2;
            camera.radius = planet.text.es.size + 24;
        }








        // INTERFAZ BABYLON /////////////////////////////////////////////////////////////////////////
        // Label con los nombres de los planetas
        var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("ui1");

        var createLabel = function (planet, counter) {

            let label = new BABYLON.GUI.Rectangle("label for " + planet.name);
            label.background = "black";
            label.color = colorGUI;
            label.height = "30px";
            label.alpha = .5;
            label.width = "100px";
            label.cornerRadius = 5;
            label.thickness = 1;
            label.linkOffsetY = 30;
            advancedTexture.addControl(label);
            label.linkWithMesh(planet);
            let text1 = new BABYLON.GUI.TextBlock;
            text1.text = planet.text.es.info.name;
            text1.color = colorGUI;
            label.addControl(text1)
            label.onPointerDownObservable.add(function () {
                setCameraOnPlanet(planets.list[counter]); //<<---Solo funciona una vez
            })

            // Todo al renderingGroupId = 3 para que no se queden delante de todo
            label.renderingGroupId = 3;

        };








        // Paneles que muestran la info de cada planeta
        function muestraInfoPlaneta(planet) {

            if (planet.showInfo == 0) {
                planet._children[0].setEnabled(true);
                // por ahora no enseño la info del planeta
                //planet._children[1].setEnabled(true);
                for (let prop in planet._children) {
                    let moon = planet._children[prop];
                    if (moon.name.split("_")[0] == "moon") {
                        moon._children[0].setEnabled(true);
                    }
                    if (moon.name == "ContainerNode") {
                        moon.setEnabled(true);

                    }
                }
                planet.showInfo = 1;

            } else {

                planet._children[0].setEnabled(false);
                // por ahora no enseño la info del planeta
                //planet._children[1].setEnabled(false);
                for (let prop in planet._children) {
                    let moon = planet._children[prop];
                    if (moon.name.split("_")[0] == "moon") {
                        moon._children[0].setEnabled(false);

                    }

                    if (moon.name == "ContainerNode") {
                        moon.setEnabled(false);

                    }
                }




                planet.showInfo = 0;
            }
        }
























        // EVENTOS ///////////////////////////////////////////////////////////////////////////////


        // EVENTOS DENTRO DEL CANVAS

        // clic en cualquier mesh
        // Si quiero hacer No pickable algún mesh PointerDown: <mesh>.isPickable = false;
        this._scene.onPointerDown = function (evt, pickResult) {

            // Si es la primera vez que hago clic centro la cámara
            if (pickResult.pickedMesh) {

                if (pickResult.pickedMesh.id == "tube") {
                    console.log("clic en estrellas");

                }



                if (pickResult.pickedMesh.id == "emitterSphere") {
                    setCameraOnSun();
                    /**
    
                                'Nombre: Sistema Solar';
                                'Size: 4.568 millones años luz';
                                'Distancia: a Kulper Cliff: 50 AU';
                                'Satélites: 470';
                                'Velocidad orbital: 220 km/s';
                                'Periodo orbital: 225–250 Millones de años';
                    */

                }

                if (pickResult.pickedMesh.id.split("_")[0] == "sphere") {
                    muestraInfoPlaneta(pickResult.pickedMesh._parentNode);
                }


                function indicePlanetName(name) {
                    for (let counter = 0; counter < planets.list.length; counter++) {
                        if (name == planets.list[counter].id) {
                            return counter
                        }
                    }
                }

                if (pickResult.pickedMesh.id.split("_")[0] == "planet") {
                    setCameraOnPlanet(planets.list[indicePlanetName(pickResult.pickedMesh.id)]);
                    muestraInfoPlaneta(planets.list[indicePlanetName(pickResult.pickedMesh.id)]);

                }

            }
        };



































        // Si es mobil, lo pongo a fullscreen << NO FUNCIONA, COMPROBAR
        if (this._engine.hostInformation.isMobile) this._engine.switchFullscreen(true)

        // Add default hemisphere light & camera that frames all above scene elements.
        //this._scene.createDefaultCameraOrLight(true, true, true);


        //var gl = new BABYLON.GlowLayer("glow", this._scene);
        //gl.intensity = 1;
    };


    WebGL.prototype.renderScene = function () {
        var _this = this;

        // Start render loop.
        var engine = this._engine;
        this._engine.runRenderLoop(function () {
            _this._scene.render();
        });
        // Add resize event listener.
        window.addEventListener('resize', function () {
            _this._engine.resize();
        });
    };

    return WebGL;

}());



// Método main
window.addEventListener('DOMContentLoaded', function () {
    // Inicializo el engine.
    var webgl = new WebGL('render-canvas');
    // Creo la scene.
    webgl.createScene();
    // Inicio el bucle de renderizado.
    webgl.renderScene();
});