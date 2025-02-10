// import ASScroll from "https://cdn.skypack.dev/@ashthornton/asscroll";





const fragment = document.querySelector("#fragment").textContent;
const vertex = document.querySelector("#vertex").textContent;

class Canvas {
    constructor(container = document.body) {
        this.container = container;
        this.DOMImages = [...document.querySelectorAll("[data-webgl-image]")];

        this._setup();
        this._camera();
        this._addImages();
    }

    _addImages() {
        this.material = new THREE.ShaderMaterial({
            fragmentShader: fragment,
            vertexShader: vertex,
            side: THREE.DoubleSide,
            uniforms: {
                u_time: { value: 0 },
                u_delta: { value: 0 },
                u_image: { value: 0 },
                u_resolution: {
                    value: new THREE.Vector2(1.0, this.viewport.aspectRatio)
                },
                u_velocity: { value: 1.0 },
                u_plane_sizes: { value: [0, 0] },
                u_image_sizes: { value: [0, 0] },
                hover: { value: new THREE.Vector2(0.5, 0.5) },
                hoverState: { value: 0 }
            }
        });

        this.materials = [];

        this.imageStore = this.DOMImages.map((image) => {
            const { top, left, width, height } = image.getBoundingClientRect();

            const geometry = new THREE.PlaneGeometry(width, height, 16, 16);
            const texture = new THREE.Texture(image);
            texture.needsUpdate = true;

            const material = this.material.clone();

            this.materials.push(material);
            material.uniforms.u_image.value = texture;
            material.uniforms.u_image_sizes.value = [
                image.naturalWidth,
                image.naturalHeight
            ];
            material.uniforms.u_plane_sizes.value = [width, height];

            image.addEventListener("mouseover", () => {
                gsap.to(material.uniforms.hoverState, {
                    value: 1
                });
            });

            image.addEventListener("mouseleave", () => {
                gsap.to(material.uniforms.hoverState, {
                    value: 0
                });
            });

            const mesh = new THREE.Mesh(geometry, material);

            this.scene.add(mesh);

            return {
                image,
                mesh,
                top,
                left,
                width,
                height
            };
        });
    }

    render(scrollPosition, deltaY) {
        if (!scrollPosition) return; // Prevents crash if scrollPosition is undefined
        this._setImagePositions(scrollPosition);
    }

    // _setImagePositions(scrollPosition) {
    //     this.imageStore.forEach((image) => {
    //         image.mesh.position.y =
    //             scrollPosition.currentPos -
    //             image.top +
    //             this.viewport.height / 2 -
    //             image.height / 2;
    //         image.mesh.position.x =
    //             image.left - this.viewport.width / 2 + image.width / 2;
    //     });
    // }



    _setImagePositions(scrollPosition) {
        const currentScroll = scrollPosition ? scrollPosition.currentPos : window.scrollY;

        this.imageStore.forEach((image) => {
            image.mesh.position.y =
                currentScroll - image.top +
                this.viewport.height / 2 - image.height / 2;
            image.mesh.position.x =
                image.left - this.viewport.width / 2 + image.width / 2;
        });
    }

    _setup() {
        this.clock = new THREE.Clock();
        this.mouse = new THREE.Vector2();
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        this.renderer.setSize(this.viewport.width, this.viewport.height);
        this.renderer.setPixelRatio = window.devicePixelRatio;
        this.container.appendChild(this.renderer.domElement);
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
    }

    _camera() {
        const NEAR = 0.001;
        const FAR = 100;
        const ASPECT_RATIO = this.viewport.aspectRatio;

        this.cameraZ = 20;
        this.cameraFOV =
            2 *
            Math.atan(this.viewport.height / 2 / this.cameraZ) *
            (180 / Math.PI);

        this.camera = new THREE.PerspectiveCamera(
            this.cameraFOV,
            ASPECT_RATIO,
            NEAR,
            FAR
        );
        this.camera.position.set(0, 0, this.cameraZ);
        this.camera.aspect = this.viewport.width / this.viewport.height;
        this.camera.updateProjectionMatrix();
    }

    onResize() {
        this.camera.aspect = this.viewport.aspectRatio;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.viewport.width, this.viewport.height);
    }

    onMousemove(event) {
        //Use this.canvas since its a callback in the main index.js file
        const { canvas } = this;
        canvas.mouse.x = (event.clientX / canvas.viewport.width) * 2 - 1;
        canvas.mouse.y = -(event.clientY / canvas.viewport.height) * 2 + 1;

        canvas.raycaster.setFromCamera(canvas.mouse, canvas.camera);

        const intersects = canvas.raycaster.intersectObjects(
            canvas.scene.children
        );

        if (intersects.length > 0) {
            intersects[0].object.material.uniforms.hover.value =
                intersects[0].uv;
        }
    }

    // render(scrollPosition, deltaY) {
    //     this._setImagePositions(scrollPosition);
    //     this.materials.forEach((material) => {
    //         material.uniforms.u_time.value = this.clock.getElapsedTime();
    //         material.uniforms.u_delta.value = deltaY;
    //     });
    //     this.renderer.render(this.scene, this.camera);
    // }

    render(scrollPosition = { currentPos: window.scrollY }, deltaY) {
        this._setImagePositions(scrollPosition);
        this.materials.forEach((material) => {
            material.uniforms.u_time.value = this.clock.getElapsedTime();
            material.uniforms.u_delta.value = deltaY;
        });
        this.renderer.render(this.scene, this.camera);
    }

    get viewport() {
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;
        const aspectRatio = width / height;

        this.aspectRatio = aspectRatio;

        return {
            width,
            height,
            aspectRatio
        };
    }
}

class App {
    constructor() {
        const images = [...document.querySelectorAll("img")];
        imagesLoaded(images, () => {
            // this._createSmoothScroll();
            this._createCanvas();
            this._addEventListeners();
            this.onResize();
            this._render();
        });
    }

    // _createSmoothScroll() {
    //     this.asscroll = new ASScroll({
    //         scrollElements: document.querySelector("#page"),
    //         disableRaf: true,
    //         disableResize: true,
    //         touchScrollType: "transform"
    //     });

    //     this.asscroll.enable();
    // }

    _createCanvas() {
        this.canvas = new Canvas();
    }

    onResize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        // this.asscroll.resize({ width, height });

        if (this.canvas && this.canvas.onResize) {
            this.canvas.onResize();
        }
    }

    _addEventListeners() {
        window.addEventListener("resize", this.onResize.bind(this));

        if (this.canvas && this.canvas.onMousemove) {
            window.addEventListener(
                "mousemove",
                this.canvas.onMousemove.bind(this),
                false
            );
        }
    }

    _render() {
        // this.asscroll.update();
        if (this.canvas && this.canvas.render) {
            this.canvas.render(this.asscroll);
        }

        requestAnimationFrame(this._render.bind(this));
    }
}

new App();
