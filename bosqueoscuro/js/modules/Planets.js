class Planets {
    constructor(scene, texturesPath, planetData) {
        this._scene = scene;
        this._textuesPath = texturesPath;
        this.list = [];
        this.belts = [];

        // Creo los planetas
        for (var planetIndex = 0; planetIndex < planetData.planets.planet.length; planetIndex++) {
            this.createPlanet(planetData.planets.planet[planetIndex])
        }

        // Creo los cinturones de asteroides
        for (var beltIndex = 0; beltIndex < planetData.planets.belt.length; beltIndex++) {
            this.createBelt(planetData.planets.belt[beltIndex])
        }
    }



    // Método createPlanet
    createPlanet(planet) {

        var internalPlanet = new BABYLON.Mesh.CreateSphere("planet_" + planet.name, planet.resolution, planet.size, this._scene);
        internalPlanet.position.x = planet.position.x;
        internalPlanet.position.y = planet.position.y;
        internalPlanet.position.z = planet.position.z;
        // Almaceno toda la info del planeta en .text.<idioma>
        internalPlanet.text = {};
        internalPlanet.text.es = planet;

        var internalPlanetMaterial = new BABYLON.StandardMaterial(planet.materialName, this._scene);
        internalPlanetMaterial.diffuseTexture = new BABYLON.Texture(this._textuesPath + planet.pathMaterial, this._scene);
        internalPlanetMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        internalPlanet.material = internalPlanetMaterial;
        internalPlanet.orbit = {
            radius: internalPlanet.position.x,
            speed: planet.speed,
            angle: 0
        };



        // Esfera de selección

        var sphere = BABYLON.Mesh.CreateSphere("sphere_" + planet.name, 16, planet.size + planet.size * 0.1, this._scene);
        sphere.parent = internalPlanet;


        var mat = new BABYLON.StandardMaterial("trama", this._scene);
        mat.wireframe = true;
        mat.emissiveColor = new BABYLON.Color3(1, 1, 1);
        mat.alpha = 0.2;
        sphere.material = mat;

        // Todo al renderingGroupId = 3 para que no se queden delante de todo
        sphere.renderingGroupId = 3;
        sphere.setEnabled(false);



        // Plano con datos

        let plane = BABYLON.Mesh.CreatePlane("plane_" + internalPlanet.text.es.name, 20);
        plane.parent = internalPlanet;
        plane.position.x = - internalPlanet.text.es.size * 2 - 1;

        let advancedTexture2 = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(plane);

        let panel2 = new BABYLON.GUI.StackPanel;
        panel2.top = "30px";
        advancedTexture2.addControl(panel2);

        let textblockSize = new BABYLON.GUI.TextBlock;
        textblockSize.height = "30px";
        textblockSize.fontSize = 30;
        textblockSize.color = "white";
        textblockSize.text += 'Tamaño: ' + internalPlanet.text.es.info.size;

        let textblockDistance = new BABYLON.GUI.TextBlock;
        textblockDistance.height = "30px";
        textblockDistance.fontSize = 30;
        textblockDistance.color = "white";
        textblockDistance.text += 'Dist: ' + internalPlanet.text.es.info.distance;

        let textblockRotation = new BABYLON.GUI.TextBlock;
        textblockRotation.height = "30px";
        textblockRotation.fontSize = 30;
        textblockRotation.color = "white";
        textblockRotation.text += 'Rotación: ' + internalPlanet.text.es.info.rotation;

        let textblockOrbit = new BABYLON.GUI.TextBlock;
        textblockOrbit.height = "30px";
        textblockOrbit.fontSize = 30;
        textblockOrbit.color = "white";
        textblockOrbit.text += 'Órbita: ' + internalPlanet.text.es.info.orbit;

        let textblockMoons = new BABYLON.GUI.TextBlock;
        textblockMoons.height = "30px";
        textblockMoons.fontSize = 30;
        textblockMoons.color = "white";
        textblockMoons.text += 'Lunas: ' + internalPlanet.text.es.info.moons;


        panel2.addControl(textblockSize);
        panel2.addControl(textblockDistance);
        panel2.addControl(textblockRotation);
        panel2.addControl(textblockOrbit);
        panel2.addControl(textblockMoons);

        // Todo al renderingGroupId = 3 para que no se queden delante de todo
        plane.renderingGroupId = 3;
        plane.setEnabled(false);



        // Botonera en esfera 3D

        var casillas = internalPlanet.text.es.size * 10 * 5;

        var manager = new BABYLON.GUI.GUI3DManager(this._scene);
        //var anchor = new BABYLON.TransformNode("");

        var panel = new BABYLON.GUI.SpherePanel("planet_options");
        panel.margin = 0.1;

        manager.addControl(panel);
        panel.linkToTransformNode(internalPlanet);
        panel.position.z = internalPlanet.text.es.size * 2;

        // Añadimos los botones
        var addButton = function () {
            let button = new BABYLON.GUI.HolographicButton("orientation");
            panel.addControl(button);

            button.text = "Button #" + panel.children.length;
            //button.renderingGroupId = 3;

            button.onPointerDownObservable.add(function () {
                //panel.dispose();
            })

        }

        panel.blockLayout = true;
        for (var index = 0; index < casillas; index++) {
            addButton();
        }
        panel.blockLayout = false;


        panel.notRenderable = true;



        // Discos de los planetas
        if (planet.disc) {
            var torus = BABYLON.Mesh.CreateTorus(planet.disc.name, planet.disc.diameter, planet.disc.thickness, planet.disc.tessellation, this._scene, false, BABYLON.Mesh.DEFAULTSIDE);
            var discMaterial = new BABYLON.StandardMaterial(planet.disc.materialName, this._scene);
            discMaterial.diffuseTexture = new BABYLON.Texture(this._textuesPath + planet.disc.pathMaterial, this._scene);
            discMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
            torus.position.z = 0;
            torus.scaling.y = 0.01;
            torus.parent = internalPlanet;
            torus.material = discMaterial;
            // Todo al renderingGroupId = 3 para que no se queden delante de todo
            torus.renderingGroupId = 3;
        }



        // Lunas de los planetas
        if (planet.moons) {
            for (let prop in planet.moons) {
                let moon = planet.moons[prop];
                let planetMoon = new BABYLON.Mesh.CreateSphere("moon_" + moon.name, moon.resolution, moon.size, this._scene);
                planetMoon.parent = internalPlanet;
                planetMoon.position.x = moon.position.x;
                planetMoon.position.y = moon.position.y;
                planetMoon.position.z = moon.position.z;
                let moonMaterial = new BABYLON.StandardMaterial(moon.materialName, this._scene);
                moonMaterial.diffuseTexture = new BABYLON.Texture(this._textuesPath + moon.pathMaterial, this._scene);
                moonMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
                planetMoon.material = moonMaterial;
                // Todo al renderingGroupId = 3 para que no se queden delante de todo
                planetMoon.renderingGroupId = 3;

                // Esfera de selección
                let sphere = BABYLON.Mesh.CreateSphere("sphere_moon" + moon.name, 16, moon.size + moon.size * 0.1, this._scene);
                sphere.parent = planetMoon;
                sphere.material = mat;
                // Todo al renderingGroupId = 3 para que no se queden delante de todo
                sphere.renderingGroupId = 3;
                sphere.setEnabled(false);
            }
        }

        // Todo al renderingGroupId = 3 para que no se queden delante de todo
        internalPlanet.renderingGroupId = 3;
        // planeta.showInfo = 0 si no está mostrando la info, 1 si lo está.
        internalPlanet.showInfo = 0;
        this.list.push(internalPlanet);

    };



    // Método createBelt
    createBelt(belt) {


        // Método auxiliar 
        function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1) + min) };
        let nb = 2e4;
        let myVertexFunction = function (particle, vertex, i) {
            vertex.x *= (Math.random() + .01) / getRandomInt(5, 10);
            vertex.y *= (Math.random() + .01) / getRandomInt(5, 10);
            vertex.z *= (Math.random() + .01) / getRandomInt(5, 10)
        };
        let myPositionFunction = function (particle, i, s) {
            let TWO_PI = Math.PI * 2;
            let angle = TWO_PI / nb;
            let x, y, z;
            x = getRandomInt(belt.minAsteroidRing, belt.maxAsteroidRing) * Math.sin(angle * i);
            z = getRandomInt(belt.minAsteroidRing, belt.maxAsteroidRing) * Math.cos(angle * i);
            particle.position.x = x;
            particle.position.y = z;
            particle.position.z = (Math.random() - .5) * 5;
            particle.scale.x = getRandomInt(5, 35) / belt.sizeAsteroid;
            particle.scale.y = getRandomInt(5, 35) / belt.sizeAsteroid;
            particle.scale.z = getRandomInt(5, 35) / belt.sizeAsteroid;
            particle.rotation.x = Math.random() * 3.15;
            particle.rotation.y = Math.random() * 3.15;
            particle.rotation.z = Math.random() * 1.5
        };
        let rock = BABYLON.Mesh.CreateSphere("s", .5, 16, this._scene);
        let rock_material = new BABYLON.StandardMaterial("rock_material", this._scene);
        rock_material.diffuseTexture = new BABYLON.Texture(this._textuesPath + belt.pathMaterial, this._scene);
        rock_material.diffuseTexture.uScale = 16;
        rock_material.diffuseTexture.vScale = 16;
        rock_material.backFaceCulling = false;
        let SPS = new BABYLON.SolidParticleSystem("SPS", this._scene, { updatable: false });
        SPS.addShape(rock, nb, { positionFunction: myPositionFunction, vertexFunction: myVertexFunction });
        let mesh = SPS.buildMesh();
        SPS.mesh.material = rock_material;
        SPS.mesh.rotation.y = 90;
        SPS.mesh.rotation.x = Math.PI / 2;
        rock.dispose();


        this.belts.push(SPS);

    };
}



export default Planets;