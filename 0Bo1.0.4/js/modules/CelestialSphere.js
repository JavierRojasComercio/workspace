var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var createLabel = function (lin, texto) {
    let advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("ui1");
    let label = new BABYLON.GUI.Rectangle("label for " + texto);
    label.background = "black";
    label.height = "30px";
    label.alpha = .5;
    label.width = "100px";
    label.cornerRadius = 5;
    label.thickness = 1;
    label.linkOffsetY = 30;
    advancedTexture.addControl(label);


    label.linkWithMesh(lin);

    //label._parentNode = lin;
    let text1 = new BABYLON.GUI.TextBlock;
    text1.text = texto;
    text1.color = "white";
    label.addControl(text1)
    label.onPointerDownObservable.add(function () {
        //setCameraOnPlanet(planets.list[counter]);
    })

    // Todo al renderingGroupId = 3 para que no se queden delante de todo
    label.renderingGroupId = 3;

};

var CelestialSphere = (function (_super) {
    __extends(CelestialSphere, _super);
    function CelestialSphere(name, scene, textuesPath, starData, radius, starLimit, starScale, showAsterisms, asterismColor, twinkleStars) {
        var _this = _super.call(this, name, scene) || this;
        _this._twinkleStars = true;
        _this._starData = starData;
        _this._radius = radius;
        _this._starLimit = starLimit;
        _this._starScale = starScale;
        _this._showAsterisms = showAsterisms;
        _this._asterismColor = asterismColor;
        _this._twinkleStars = twinkleStars;
        // Add empty celestial sphere mesh.
        var starMesh = new BABYLON.Mesh('starMesh', scene);
        starMesh.parent = _this;
        starMesh.alphaIndex = 20;
        // Mesh vertex data arrays.
        var positions = [];
        var indices = [];
        var colors = [];
        var uvs = [];
        var uvs2 = [];
        var vertexIndex = 0;
        var numberOfStars = Math.min(starData.rightAscension.length, _this._starLimit);
        // Populate vertex data arrays for each star.
        for (var starIndex = 0; starIndex < numberOfStars; starIndex++) {
            // Star celestial coordinates.
            var ra = _this._starData.rightAscension[starIndex]; // eastward in radians (around Y axis - yaw)
            var dec = _this._starData.declination[starIndex]; // north-south in radians (around X axis - pitch)
            // Star scale factor (based on apparent magnitude).
            var s = _this._starScaleFactor(starIndex);
            // Create star vertices around +Z axis & scale to size.
            var v1 = new BABYLON.Vector3(0.0 * s, 0.7 * s, _this._radius);
            var v2 = new BABYLON.Vector3(-0.5 * s, -0.3 * s, _this._radius);
            var v3 = new BABYLON.Vector3(0.5 * s, -0.3 * s, _this._radius);
            // Rotate vertices into position on celestial sphere.
            var rotationMatrix = BABYLON.Matrix.RotationYawPitchRoll(-ra, -dec, 0);
            v1 = BABYLON.Vector3.TransformCoordinates(v1, rotationMatrix);
            v2 = BABYLON.Vector3.TransformCoordinates(v2, rotationMatrix);
            v3 = BABYLON.Vector3.TransformCoordinates(v3, rotationMatrix);
            // Add vertex positions.
            positions.push(v1.x, v1.y, v1.z, v2.x, v2.y, v2.z, v3.x, v3.y, v3.z);
            // Add vertex color.
            var c_1 = _this._starColor(starIndex);
            colors.push(c_1.r, c_1.g, c_1.b, c_1.a, c_1.r, c_1.g, c_1.b, c_1.a, c_1.r, c_1.g, c_1.b, c_1.a);
            // Add star texture UV coordinates.
            uvs.push(0.5, 1.0, 0.0, 0.0, 1.0, 0.0);
            // Add 'twinkle' (noise) texture UV coordinates.
            var u = Math.random();
            var v = Math.random();
            uvs2.push(u, v, u, v, u, v);
            // Add indices.
            indices.push(vertexIndex, vertexIndex + 1, vertexIndex + 2);
            vertexIndex += 3;
        }
        // Create & assign vertex data to mesh.
        var vertexData = new BABYLON.VertexData();
        vertexData.positions = positions;
        vertexData.indices = indices;
        vertexData.colors = colors;
        vertexData.uvs = uvs;
        vertexData.uvs2 = uvs2;
        vertexData.applyToMesh(starMesh);
        // Create & assign star material.        
        var starMaterial = new BABYLON.StandardMaterial('starMaterial', scene);
        var opacityTexture = new BABYLON.Texture(textuesPath + 'star.png', scene);
        starMaterial.opacityTexture = opacityTexture;
        starMaterial.disableLighting = true;
        starMesh.material = starMaterial;




        /*
                var updateNormals = function() {
                    var pdata = starMesh.getVerticesData(BABYLON.VertexBuffer.PositionKind);
                    var ndata = starMesh.getVerticesData(BABYLON.VertexBuffer.NormalKind);
                
                    for (var p = 0; p < pdata.length; p += 3) {
                        var points = [
                            new BABYLON.Vector3(pdata[p],pdata[p+1],pdata[p+2]),
                            new BABYLON.Vector3(pdata[p]+ndata[p]*2,pdata[p+1]+ndata[p+1]*2,pdata[p+2]+ndata[p+2]*2)
                           ];
                        lines[p]=BABYLON.MeshBuilder.CreateLines("lines", {points:points, instance:lines[p]}, scene);
                    }
                };
        
                updateNormals();
        */

        // let's add the famous 'showNormals tool...

        var showNormals = function (mesh, size) {
            let aux = 0;
            var normals = mesh.getVerticesData(BABYLON.VertexBuffer.NormalKind);
            var positions = mesh.getVerticesData(BABYLON.VertexBuffer.PositionKind);
            var lineas = [];
            for (var i = 0; i < positions.length; i += 3) {

                var v1 = BABYLON.Vector3.FromArray(positions, i);
                var v2 = v1.clone().add(BABYLON.Vector3.FromArray(positions, i).scaleInPlace(size));
                lineas[i] = BABYLON.Mesh.CreateLines("" + i, [v1, v2], scene);

                lineas[i]._parentNode = mesh;
                lineas[i].setEnabled(false);

                //linea.linkWithMesh(mesh);
                if(aux % 3 == 0){
                    createLabel(lineas[i], "e" + aux );

                }

                aux = aux+1;
                /*
                let advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("ui1");
        
                let label = new BABYLON.GUI.Rectangle("label");
                label.background = "black";
                label.height = "30px";
                label.alpha = .5;
                label.width = "100px";
                label.cornerRadius = 5;
                label.thickness = 1;
                label.linkOffsetY = 30;
                advancedTexture.addControl(label);
                label.linkWithMesh(linea);
                let text1 = new BABYLON.GUI.TextBlock;
                text1.text = texto;
                text1.color = "white";
                label.addControl(text1)
        */


            }
        };

        showNormals(starMesh, 0.02);







        // Twinkle stars (simulate atmospheric turbulence).
        if (_this._twinkleStars) {
            var emissiveTexture_1 = new BABYLON.Texture(textuesPath + 'noise.png', scene);
            starMaterial.emissiveTexture = emissiveTexture_1;
            emissiveTexture_1.coordinatesIndex = 1; // uvs2            
            // Animate emissive texture to simulate star 'twinkle' effect.
            scene.registerBeforeRender(function () {
                emissiveTexture_1.uOffset += 0.008;
            });
        }
        else {
            starMaterial.emissiveColor = new BABYLON.Color3(1, 1, 1);
        }
        // Draw asterism lines.
        if (_this._showAsterisms) {
            var points_1 = [];
            for (var i = 0; i < _this._starData.asterismIndices.length; i++) {
                var starIndex = _this._starData.asterismIndices[i];
                if (starIndex != -1) {
                    // Compute star position.
                    var ra = _this._starData.rightAscension[starIndex];
                    var dec = _this._starData.declination[starIndex];
                    var x = _this._radius * Math.cos(dec) * Math.sin(ra);
                    var y = _this._radius * Math.sin(dec);
                    var z = _this._radius * Math.cos(dec) * Math.cos(ra);
                    points_1.push(new BABYLON.Vector3(-x, y, z));
                }
                else {
                    // Create lines.
                    var asterismLines = BABYLON.Mesh.CreateLines("asterismLines", points_1, scene);

                    asterismLines.color = _this._asterismColor;
                    asterismLines.parent = _this;
                    asterismLines.alphaIndex = 10;
                    // Clear points array.
                    points_1 = [];
                }
            }
        }
        // Draw helpers (celestial equator and axis).
        var helperColor = new BABYLON.Color3(1, 0, 0);
        // Draw celestial equator.
        var points = [];
        var steps = 100;
        for (var i = 0; i < steps + 1; i++) {
            var a = (Math.PI * 2 * i / steps);
            var x = Math.cos(a) * _this._radius;
            var y = 0;
            var z = Math.sin(a) * _this._radius;
            points.push(new BABYLON.Vector3(x, y, z));
        }
        radius += 20;
        //Array of paths to construct tube
        var c = 2 * Math.PI * radius;
        var h = c / 4 / 2;
        var myPath = [
            new BABYLON.Vector3(0, 0, h),
            new BABYLON.Vector3(0, 0, -h)
        ];
        //Create ribbon with updatable parameter set to true for later changes
        var tubeParentXform = new BABYLON.TransformNode('tubeParentXform', scene);
        var tubeChildXform = new BABYLON.TransformNode('tubeChildXform', scene);
        var tube = BABYLON.MeshBuilder.CreateTube("tube", { path: myPath, radius: radius, sideOrientation: BABYLON.Mesh.BACKSIDE, updatable: false }, scene);
        tube.alphaIndex = 0;
        var tubeTexture = new BABYLON.Texture(textuesPath + "milkyway.png", scene, true, false);
        tubeTexture.vScale = -1;
        tube.parent = tubeChildXform;
        tubeChildXform.parent = tubeParentXform;
        tube.rotate(new BABYLON.Vector3(0, 0, -1), 0.57);
        tubeChildXform.rotate(new BABYLON.Vector3(1, 0, 0), 0.48);
        tubeParentXform.rotate(new BABYLON.Vector3(0, -1, 0), 0.22);
        var tubeMaterial = new BABYLON.StandardMaterial("skyBox", scene);
        tubeMaterial.backFaceCulling = true;
        tubeMaterial.disableLighting = true;
        tubeMaterial.emissiveTexture = tubeTexture;
        tube.material = tubeMaterial;
        tube.material.alpha = 0.5;
        tubeParentXform.parent = _this;
        return _this;
    }
    /*
     *  Look-up star color using star's color index B-V.
     *
     *  See: https://en.wikipedia.org/wiki/Color_index
     *  Blue-white-red star color range from http://www.vendian.org/mncharity/dir3/starcolor/details.html
     */
    CelestialSphere.prototype._starColor = function (starIndex) {
        // Normalize star color fraction from colorIndexBV range of -0.4-2.0 to 0.0-1.0.
        var fraction = BABYLON.Scalar.Normalize(this._starData.colorIndexBV[starIndex], -0.4, 2.0);
        // Calculate star color index.
        var maxColorIndex = this._starData.color.length - 1;
        var colorIndex = Math.round(maxColorIndex * fraction);
        colorIndex = BABYLON.Scalar.Clamp(colorIndex, 0, maxColorIndex);
        // Look-up and return star color.
        var c = this._starData.color[colorIndex];
        return new BABYLON.Color4(c[0], c[1], c[2], 0);
    };
    /*
     *  Compute star scale factor based on apparent magnitude.
     */
    CelestialSphere.prototype._starScaleFactor = function (starIndex) {
        // Magnitude is counterintuitive - lower values are hgiher magnitudes!
        // "Lowest" magnitude in star data is 7.8, "highest" is -1.44 for Sirius.
        // So we need to invert these & ensure positive to get scale that approximates magnitude.
        return (8 - this._starData.apparentMagnitude[starIndex]) * this._starScale;
    };
    return CelestialSphere;
}(BABYLON.TransformNode));



export default CelestialSphere;