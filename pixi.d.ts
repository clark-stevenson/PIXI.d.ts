/**
 * Pixi V3 First Pass - a total mess
 * 
 */

declare class PIXI {

    static autoDetectRenderer(width: number, height: number, options?: PIXI.RendererOptions, noWebGL?: boolean): PIXI.WebGLRenderer | PIXI.CanvasRenderer;
    static VERSION: string;
    static PI_2: number;
    static RAD_TO_DEG: number;
    static DEG_TO_RAD: number;
    static RENDER_TYPE: {
        UNKNOWN: number;
        WEBGL: number;
        CANVAS: number;
    };
    static BLEND_MODES: {
        NORMAL: number;
        ADD: number;
        MULTIPLY: number;
        SCREEN: number;
        OVERLAY: number;
        DARKEN: number;
        LIGHTEN: number;
        COLOR_DODGE: number;
        COLOR_BURN: number;
        HARD_LIGHT: number;
        SOFT_LIGHT: number;
        DIFFERENCE: number;
        EXCLUSION: number;
        HUE: number;
        SATURATION: number;
        COLOR: number;
        LUMINOSITY: number;

    };
    static SCALE_MODES: {
        DEFAULT: number;
        LINEAR: number;
        NEAREST: number;
    };
    static RETINA_PREFIX: string;
    static RESOLUTION: number;
    static FILTER_RESOLUTION: number;
    static DEFAULT_RENDER_OPTIONS: {
        view: HTMLCanvasElement;
        resolution: number;
        antialias: boolean;
        forceFXAA: boolean;
        autoResize: boolean;
        transparent: boolean;
        backgroundColor: number;
        clearBeforeRender: boolean;
        preserveDrawingBuffer: boolean;
    };
    static SHAPES: {
        POLY: number;
        RECT: number;
        CIRC: number;
        ELIP: number;
        RREC: number;
    };
    static SPRITE_BATCH_SIZE: number;

}

declare module PIXI {

    export interface RendererOptions {

        view?: HTMLCanvasElement;
        transparent?: boolean
        antialias?: boolean;
        preserveDrawingBuffer?: boolean;
        resolution?: number;
        forceFXAA?: boolean;
        clearBeforeRendering?: boolean;

    }

    export class DisplayObject implements EventEmitter {

        position: Point;
        scale: Point;
        pivot: Point;
        rotation: number;
        alpha: number;
        visible: boolean;
        parent: Container;
        worldAlpha: number;
        worldTransform: Matrix;

        x: number;
        y: number;
        worldVisible: boolean;
        mask: Graphics;
        filters: AbstractFilter[];
        name: string;

        cacheAsBitmap: boolean;

        getBounds(matrix?: Matrix): Rectangle;
        getLocalBounds(): Rectangle;
        toGlobal(position: Point): Point;
        toLocal(position: Point, from?: DisplayObject): Point;
        generateTexture(renderer: CanvasRenderer | WebGLRenderer, resolution: number, scaleModel: number): Texture;
        destroy(): void;
        getChildByName(name: string): DisplayObject;
        getGlobalPosition(point: Point): Point;

    }

    export class Container extends DisplayObject {

        children: DisplayObject[];

        width: number;
        height: number;

        addChild(child: DisplayObject): DisplayObject;
        addChildAt(child: DisplayObject, index: number): DisplayObject;
        swapChildren(child: DisplayObject, child2: DisplayObject): void;
        getChildIndex(child: DisplayObject): number;
        setChildIndex(child: DisplayObject, index: number): void;
        getChildAt(index: number): DisplayObject;
        removeChild(child: DisplayObject): DisplayObject;
        removeChildAt(index: number): DisplayObject;
        removeChildren(beginIndex: number, endIndex?: number): DisplayObject[];
        generateTexture(renderer: CanvasRenderer | WebGLRenderer, resolution: number, scaleMode: number): Texture;
        getBounds(): Rectangle;
        getLocalBounds(): Rectangle;
        destroy(destroyChildren?: boolean): void;

    }

    export class GraphicsData {

        constructor(lineWidth: number, lineColor: number, lineAlpha: number, fillColor: number, fillAlpha: number, fill: boolean, shape: Circle | Rectangle | Ellipse | Polygon);

        lineWidth: number;
        lineColor: number;
        lineAlpha: number;
        fillColor: number;
        fillAlpha: number;
        fill: boolean;
        shape: Circle | Rectangle | Ellipse | Polygon;
        type: number;

        clone(): GraphicsData;

        private _lineTint: number;
        private _fillTint: number;

    }

    export class Graphics extends Container {

        fillAlpha: number;
        lineWidth: number;
        lineColor: number;
        tint: number;
        blendMode: number;
        isMask: boolean;
        boundsPadding: number;

        clone(): Graphics;
        lineStyle(lineWidth?: number, color?: number, alpha?: number): Graphics;
        moveTo(x: number, y: number): Graphics;
        lineTo(x: number, y: number): Graphics;
        quadraticCurveTo(cpX: number, cpY: number, toX: number, toY: number): Graphics;
        bezierCurveTo(cpX: number, cpY: number, cpX2: number, cpY2: number, toX: number, toY: number): Graphics;
        arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): Graphics;
        arc(cx: number, cy: number, radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean): Graphics;
        beginFill(color: number, alpha: number): Graphics;
        endFill(): Graphics;
        drawRect(x: number, y: number, width: number, height: number): Graphics;
        drawRoundedRect(x: number, y: number, width: number, height: number, radius: number): Graphics;
        drawCircle(x: number, y: number, radius: number): Graphics;
        drawEllipse(x: number, y: number, width: number, height: number): Graphics;
        drawPolygon(path: Point[]): Graphics;
        clear(): Graphics;
        //todo 
        generateTexture(renderer: WebGLRenderer | CanvasRenderer, resolution?: number, scaleMode?: number): Texture;
        getBounds(matrix?: Matrix): Rectangle;
        containsPoint(point: Point): boolean;
        updateLocalBounds(): void;
        drawShape(shape: Circle | Rectangle | Ellipse | Polygon): GraphicsData;

    }


    //////////////////////////////////////////////////////////////////////////////
    ////////////////////////////RENDERER//////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////

    export interface GraphicsRenderer extends ObjectRenderer {

    }

    export interface WebGLGraphicsData {

    }

    export class SystemRenderer {

        constructor(system: string, width?: number, height?: number, options?: RendererOptions);

        type: number;
        width: number;
        height: number;
        view: HTMLCanvasElement;
        resolution: number;
        transparent: boolean;
        autoResize: boolean;
        blendModes: any;
        preserveDrawingBuffer: boolean;
        clearBeforeRender: boolean;

        backgroundColor: number;

        resize(width: number, height: number): void;
        destroy(removeView?: boolean): void;

    }

    export class WebGLRenderer extends SystemRenderer {

        constructor(width?: number, height?: number, options?: RendererOptions);

        drawCount: number;
        shaderManager: ShaderManager;
        maskManager: MaskManager;
        stencilManager: StencilManager;
        filterManager: FilterManager;
        blendModeManager: BlendModeManager;
        currentRenderTarget: RenderTarget;
        currentRenderer: ObjectRenderer;

        render(object: DisplayObject): void;
        renderDisplayObject(displayObject: DisplayObject, renderTarget: RenderTarget, clear?: boolean): void;
        setObjectRenderer(objectRenderer: ObjectRenderer): void;
        setRenderTarget(renderTarget: RenderTarget): void;
        resize(width: number, height: number): void;
        updateTexture(texture: BaseTexture | Texture): BaseTexture | Texture;
        destroyTexture(texture: BaseTexture | Texture): void;
        destroy(removeView?: boolean): void;

    }

    export class ObjectRenderer extends WebGLManager {

        constructor(renderer: WebGLRenderer);

        start(): void;
        stop(): void;
        flush(): void;
        render(object?: any): void;

    }

    export class Quad {

        gl: WebGLRenderingContext;
        vertices: number[];
        uvs: number[];
        colors: number[];
        indices: number[];
        vertexBuffer: WebGLBuffer;
        indexBuffer: WebGLBuffer;

        map(rect: Rectangle, rect2: Rectangle): void;
        upload(): void;

    }

    export class RenderTarget {

        constructor(gl: WebGLRenderingContext, width: number, height: number, scaleMode: number, resolution: number, root: boolean);

        gl: WebGLRenderingContext;
        frameBuffer: WebGLFramebuffer;
        texture: Texture;
        size: Rectangle;
        resolution: number;
        projectionMatrix: Matrix;
        transform: Matrix;
        frame: Rectangle;
        stencilBuffer: WebGLRenderbuffer;
        stencilMaskStack: StencilMaskStack;
        filterStack: any[];
        scaleMode: number;
        root: boolean;

        clear(bing?: boolean): void;
        attachStencilBuffer(): void;
        activate(): void;
        calculateProjection(protectionFrame: Matrix): void;
        resize(width: number, height: number): void;
        destroy(): void;

    }

    export class StencilMaskStack {

        stencilStack: any[];
        reverse: boolean;
        count: number;

    }

    export class AbstractFilter {

        constructor(vertexSrc: string | string[], fragmentSrc: string | string[], uniforms: any);

        padding: number;

        getShader(renderer: WebGLRenderer): Shader;
        applyFilter(renderer: WebGLRenderer, input: RenderTarget, output: RenderTarget, clear?: boolean): void;
        syncUniform(uniform: WebGLUniformLocation): void;
        //todo
        //apply(frameBuffer)

    }

    export class FXAAFilter extends AbstractFilter {

        applyFilter(renderer: WebGLRenderer, input: RenderTarget, output: RenderTarget): void;

    }

    export class SpriteMaskFilter extends AbstractFilter {

        constructor(sprite: Sprite);

        maskSprite: Sprite;
        maskMatrix: Matrix;

        applyFilter(renderer: WebGLRenderbuffer, input: RenderTarget, output: RenderTarget): void;
        map: Texture;
        offset: Point;

    }

    export class BlendModeManager extends WebGLManager {

    }

    export class FilterManager extends WebGLManager {

    }

    export class MaskManager extends WebGLManager {

    }

    export class ShaderManager extends WebGLManager {

    }

    export class StencilManager extends WebGLManager {

    }

    export class WebGLManager {

    }

    export class ComplexPrimitiveShader extends Shader {

    }

    export class PrimitiveShader extends Shader {

    }

    export class TextureShader extends Shader {

        constructor(shaderManager: ShaderManager, vertexSrc?: string, fragmentSrc?: string, customUniforms?: any, customAttributes?: any)

    }

    export class Shader {

        constructor(shaderManager: ShaderManager, vertexSrc: string, fragmentSrc: string, uniforms: any, attributes: any);

        uuid: number;
        gl: WebGLRenderingContext;
        shaderManager: ShaderManager;
        program: WebGLProgram;
        vertexSrc: string;
        fragmentSrc: string;

        init(): void;
        cachUniformLocations(keys: string): void;
        cacheAttributeLocations(keys: string): void;
        compile(): WebGLProgram;
        syncUniform(uniform: any): void;
        syncUniforms(): void;
        initSampler2D(uniform: any): void;
        destroy(): void;

    }

    export class CanvasRenderer extends SystemRenderer {

        constructor(width?: number, height?: number, options?: RendererOptions);

        type: number;
        context: CanvasRenderingContext2D;
        refresh: boolean;
        maskManager: CanvasMaskManager;
        roundPixels: boolean;
        currentScaleMode: number;
        currentBlendMode: number;
        smoothProperty: string;

        render(object: DisplayObject): void;
        destroy(removeView?: boolean): void;

    }

    export class CanvasBuffer {

        constructor(width: number, height: number);

        canvas: HTMLCanvasElement;
        context: CanvasRenderingContext2D;

        width: number;
        height: number;

        resize(width: number, height: number): void;
        destroy(): void;

    }

    export class CanvasGraphics {

        static renderGraphics(graphics: Graphics, context: CanvasRenderingContext2D): void;

    }

    export class CanvasMaskManager {

        pushMask(maskData: any, renderer: WebGLRenderer | CanvasRenderer): void;
        popMask(renderer: WebGLRenderer | CanvasRenderer): void;

    }

    export class CanvasTinter {

        static getTintedTexture(sprite: DisplayObject, color: number): HTMLCanvasElement;
        static tintWithMultiply(texture: Texture, color: number, canvas: HTMLDivElement): void;
        static tintWithOverlay(texture: Texture, color: number, canvas: HTMLCanvasElement): void;
        static tintWithPerPixel(texture: Texture, color: number, canvas: HTMLCanvasElement): void;
        static roundColor(color: number): number;
        static cacheStepsPerColorChannel: number;
        static convertTintToImage: boolean;
        static vanUseMultiply: boolean;
        static tintMethod: Function;

    }

    //////////////////////////////////////////////////////////////////////////////
    ////////////////////////////MATH//////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////

    export class Point {

        constructor(x?: number, y?: number);

        clone(): Point;
        copy(p: Point): void;
        equals(p: Point): boolean;
        set(x?: number, y?: number): void;

    }

    export class Matrix {

        a: number;
        b: number;
        c: number;
        d: number;
        tx: number;
        ty: number;

        fromArray(array: number[]): void;
        toArray(transpose?: boolean): number[];
        apply(pos: Point, newPos?: Point): Point;
        applyInverse(pos: Point, newPos?: Point): Point;
        translate(x: number, y: number): Matrix;
        scale(x: number, y: number): Matrix;
        rotate(angle: number): Matrix;
        append(matrix: Matrix): Matrix;
        prepend(matrix: Matrix): Matrix;
        invert(): Matrix;
        identity(): Matrix;
        clone(): Matrix;
        copy(matrix: Matrix): Matrix;

        static IDENTITY: Matrix;
        static TEMP_MATRIX: Matrix;

    }

    export class Circle {

        constructor(x?: number, y?: number, radius?: number);

        x: number;
        y: number;
        radius: number;
        type: number;

        clone(): Circle;
        contains(x: number, y: number): boolean;
        getBounds(): Rectangle;

    }

    export class Ellipse {

        constructor(x?: number, y?: number, width?: number, height?: number);

        x: number;
        y: number;
        width: number;
        height: number;
        type: number;

        clone(): Ellipse;
        contains(x: number, y: number): boolean;
        getBounds(): Rectangle;

    }

    export class Polygon {

        constructor(points: Point[]);
        constructor(points: number[]);
        constructor(...points: Point[]);
        constructor(...points: number[]);

        closed: boolean;
        points: number[];
        type: number;

        clone(): Polygon;
        contains(x: number, y: number): boolean;


    }

    export class Rectangle {

        constructor(x?: number, y?: number, width?: number, height?: number);

        x: number;
        y: number;
        width: number;
        height: number;
        type: number;

        static EMPTY: Rectangle;

        clone(): Rectangle;
        contains(x: number, y: number): boolean;

    }

    export class RoundedRectangle {

        constructor(x?: number, y?: number, width?: number, height?: number, radius?: number);

        x: number;
        y: number;
        width: number;
        height: number;
        radius: number;
        type: number;

        static EMPTY: Rectangle;

        clone(): Rectangle;
        contains(x: number, y: number): boolean;

    }

    //////////////////////////////////////////////////////////////////////////////
    ////////////////////////////PARTICLES/////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////

    export interface ParticleContainerProperties {

        scale?: any;
        position?: any;
        rotation?: number;
        uvs?: any;
        alpha?: number;
    }

    export class ParticleContainer extends Container {

        constructor(size?: number, properties?: ParticleContainerProperties);

        interactiveChildren: boolean;

        setProperties(properties: ParticleContainerProperties): void;
        addChildAt(child: DisplayObject, index: number): DisplayObject;
        removeChildAt(index: number): DisplayObject;

    }

    export interface ParticleBuffer {

    }

    export interface ParticleRenderer{

    }

    export interface ParticleShader {

    }

    //////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////SPRITE/////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////

    export interface SpriteRenderer {

    }

    export class Sprite extends Container {

        static fromFrame(frameId: string): Sprite;
        static fromImage(imageId: string, crossorigin?: boolean, scaleMode?: number): Sprite;

        constructor(texture: Texture);

        anchor: Point;
        tint: number;
        blendMode: number;
        shader: Shader;
        texture: Texture;
        
        width: number;
        height: number;

        getBounds(matrix?: Matrix): Rectangle;
        getLocalBounds(): Rectangle;
        containsPoint(point: Point): boolean;
        destroy(): void;
        
    }

    //////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////TEXT///////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////

    export interface TextStyle {

        font?: string;
        fill?: string | number;
        align?: string;
        stroke?: string | number;
        strokeThickness?: number;
        wordWrap?: boolean;
        wordWrapWidth?: number;
        lineHeight?: number;
        dropShadow?: boolean;
        dropShadowColor?: string;
        dropShadowAngle?: number;
        dropShadowDistance?: number;
        padding?: number;
        textBaseline?: string;
        lineJoin?: string;
        miterLimit?: number;

    }

    export class Text extends Sprite {

        constructor(text?: string, style?: TextStyle, resolution?: number);

        canvas: HTMLCanvasElement;
        context: CanvasRenderingContext2D;
        resolution: number;
        text: string;
        style: TextStyle;

        width: number;
        height: number;

        getBounds(matrix?: Matrix): Rectangle;
        destroy(destroyBaseTexture?: boolean): void;

    }


    //////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////TEXTURES///////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////

    export class BaseTexture {

        static fromImage(imageUrl: string, crossorigin?: boolean, scaleMode?: number): BaseTexture;
        static fromCanvas(canvas: HTMLCanvasElement, scaleMode?: number): BaseTexture;

        constructor(source: HTMLImageElement | HTMLCanvasElement, scaleMode?: number, resolution?: number);

        resolution: number;
        width: number;
        height: number;
        realWidth: number;
        realHeight: number;
        scaleMode: number;
        hasLoaded: boolean;
        isLoading: boolean;
        source: HTMLImageElement | HTMLCanvasElement;
        premultipliedAlpha: boolean;
        imageUrl: string;
        mipmap: boolean;

        update(): void;
        loadSource(source: HTMLImageElement | HTMLCanvasElement): void;
        destroy(): void;
        dispose(): void;
        updateSourceImage(newSrc: string): void;

    }

    export class RenderTexture extends Texture {

        constructor(renderer: CanvasRenderer | WebGLRenderer, width?: number, height?: number, scaleMode?: number, resolution?: number);

        width: number;
        height: number;
        resolution: number;
        renderer: CanvasRenderer | WebGLRenderer;
        valid: boolean;

        resize(width: number, height: number, updateBase?: boolean): void;
        clear(): void;
        destroy(): void;
        getImage(): HTMLImageElement;
        getBase64(): string;
        getCanvas(): HTMLCanvasElement;

    }

    export class Texture extends BaseTexture {

        static fromImage(imageUrl: string, crossOrigin?: boolean, scaleMode?: number): Texture;
        static fromFrame(frameId: string): Texture;
        static fromCanvas(canvas: HTMLCanvasElement, scaleMode?: number): Texture;
        static fromVideo(video: HTMLVideoElement, scaleMode?: number): Texture;
        static fromVideoUrl(videoUrl: string, scaleMode?: number): Texture;
        static addTextureToCache(texture: Texture, id: string): void;
        static removeTextureFromCache(id: string): Texture;

        constructor(baseTexture: BaseTexture, frame?: Rectangle, crop?: Rectangle, trim?: Rectangle, rotate?: boolean);

        noFrame: boolean;
        baseTexture: BaseTexture;
        trim: Rectangle;
        valid: boolean;
        requiresUpdate: boolean;
        width: number;
        height: number;
        crop: Rectangle;
        rotate: boolean;

        frame: Rectangle;

        update(): void;
        destroy(destroyBase?: boolean): void;
        clone(): Texture;

    }

    export class TextureUvs {

    }

    export class VideoBaseTexture extends BaseTexture {

        static fromVideo(video: HTMLVideoElement, scaleMode?: number): VideoBaseTexture;
        static fromUrl(videoSrc: string | any | string[]| any[]): VideoBaseTexture;

        constructor(source: HTMLVideoElement, scaleMode?: number);

        autoUpdate: boolean;

        destroy(): void;
 
    }

    //////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////UTILS/////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////

    export interface PluginTarget {

    }

    export class utils {

        static uuid(): number;
        static hex2rgb(hex: number, out?: number[]): number[];
        static hex2String(hex: number): string;
        static rbg2hex(rgb: Number[]): number;
        static canUseNewCanvasBlendModel(): boolean;
        static getNextPowerOfTwo(number: number): number;
        static isPowerOfTwo(width: number, height: number): boolean;
        static getResolutionOfUrl(url: string): boolean;
        static sayHello(type: string): void;
        static isWebGLSupported(): boolean;
        static TextureCache: any;
        static BaseTextureCache: any;

    }

    //////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////EXTRAS/////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////

    export interface BitmapTextStyle {

        font?: string | {

            name?: string;
            size?: number;

        };
        align?: string;
        tint?: number;

    }

    export class BitmapText extends Container {

        constructor(text: string, style?: BitmapTextStyle);

        textWidth: number;
        textHeight: number;
        maxWidth: number;
        dirty: boolean;

        tint: number;
        align: string;
        font: any;
        text: string;

    }

    export class MovieClip extends Sprite {

        static fromFrames(frame: string[]): MovieClip;
        static fromImages(images: string[]): MovieClip;

        constructor(textures: Texture[]);

        animationSpeed: number;
        loop: boolean;
        onComplete: () => void;
        currentFrame: number;
        playing: boolean;

        totalFrames: number;
        textures: Texture[];

        stop(): void;
        play(): void;
        gotoAndStop(frameName: number): void;
        gotoAndPlay(frameName: number): void;
        destroy(): void;

    }

    export class Ticker implements EventEmitter {

        active: boolean;
        deltaTime: number;
        timeElapsed: number;
        lastTime: number;
        speed: number;

        start(): void;
        stop(): void;

    }

    export class TilingSprite extends Sprite {

        //TODO
        //sprite contains these 
        //static fromFrame(frameId: string): Sprite;
        //static fromImage(imageId: string, crossorigin?: boolean, scaleMode?: number): Sprite;
        //but TilingSprite contains these = error
        //static fromFrame(frameId: string, width?: number, height?: number): TilingSprite;
        //static fromImage(imageId: string, width?: number, height?: number, crossorigin?: boolean, scaleMode?: number): TilingSprite;

        constructor(texture: Texture, width: number, height: number);

        tileScale: Point;
        tilePosition: Point;

        width: number;
        height: number;
        originalTexture: Texture;

        getBounds(): Rectangle;
        generateTilingTexture(renderer: WebGLRenderer | CanvasRenderer, texture: Texture, forcePowerOfTwo?: boolean);
        containsPoint(point: Point): boolean;
        destroy(): void;

    }

    //////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////FILTERS////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////

    export class AsciiFilter extends AbstractFilter {

        size: number;

    }

    export class BloomFilter extends AbstractFilter {

        blur: number;
        blurX: number;
        blurY: number;

    }

    export class BlurFilter extends AbstractFilter {

        blur: number;
        passes: number;
        blurX: number;
        blurY: number;

    }

    export class BlurXFilter extends AbstractFilter {

        passed: number;
        strength: number;
        blur: number;

    }

    export class BlurYFilter extends AbstractFilter {

        passed: number;
        strength: number;
        blur: number;

    }

    export class SmartBlurFilter extends AbstractFilter {

    }

    export class ColorMatrixFilter extends AbstractFilter {

        matrix: number[];

        brightness(b: number, multiply?: boolean): void;
        greyscale(scale: number, multiply?: boolean): void;
        blackAndWhite(multiply?: boolean): void;
        hue(rotation: number, multiply?: boolean): void;
        contrast(amount: number, multiply?: boolean): void;
        saturation(amount: number, multiply?: boolean): void;
        desaturate(multiply?: boolean): void;
        negative(multiply?: boolean): void;
        sepia(multiply?: boolean): void;
        technicolor(multiply?: boolean): void;
        polaroid(multiply?: boolean): void;
        toBGR(multiply?: boolean): void;
        kodachrome(multiply?: boolean): void;
        browni(multiply?: boolean): void;
        vintage(multiply?: boolean): void;
        colorTone(desaturation: number, toned: number, lightColor: string, darkColor: string, multiply?: boolean): void;
        night(intensity: number, multiply?: boolean): void;
        predator(amount: number, multiply?: boolean): void;
        lsd(multiply?: boolean): void;
        reset(): void;

    }

    export class ColorStepFilter extends AbstractFilter {

        step: number;
        
    }

    export class ConvolutionFilter extends AbstractFilter {

        constructor(matrix: number[], width: number, height: number);

        matrix: number[];
        width: number;
        height: number;

    }

    export class CrossHatchFilter extends AbstractFilter {

    }

    export class DisplacementFilter extends AbstractFilter {

        constructor(sprite: Texture);

        map: Texture;

    }

    export class DotScreenFilter extends AbstractFilter {

        scale: number;
        angle: number;

    }

    export class BlurYTintFilter extends AbstractFilter {

        blur: number;

    }

    export class DropShadowFilter extends AbstractFilter {

        blur: number;
        blurX: number;
        blurY: number;
        color: number;
        alpha: number;
        distance: number;
        angle: number;

    }

    export class GrayFilter extends AbstractFilter {

        gray: number;
        
    }

    export class InvertFilter extends AbstractFilter {

        invert: number;

    }

    export class NoiseFilter extends AbstractFilter {

        noise: number;

    }

    export class NormalMapFilter extends AbstractFilter {

        constructor(texture: Texture);

        map: Texture;
        scale: Point;
        offset: Point;

    }

    export class PixelateFilter extends AbstractFilter {

        size: Point;

    }

    export class RGBSplitFilter extends AbstractFilter {

        red: number;
        green: number;
        blue: number;

    }

    export class SepiaFilter extends AbstractFilter {

        sepia: number;

    }

    export class ShockwaveFilter extends AbstractFilter {

        center: number[];
        params: any;
        time: number;

    }

    export class TiltShiftAxisFilter extends AbstractFilter {

        blur: number;
        gradientBlur: number;
        start: number;
        end: number;

        updateDelta(): void;

    }

    export class TiltShiftFilter extends AbstractFilter {

        blur: number;
        gradientBlur: number;
        start: number;
        end: number;

    }

    export class TiltShiftXFilter extends AbstractFilter {

        updateDelta(): void;

    }

    export class TiltShiftYFilter extends AbstractFilter {

        updateDelta(): void;

    }

    export class TwistFilter extends AbstractFilter {

        offset: Point;
        radius: number;
        angle: number;

    }

    //////////////////////////////////////////////////////////////////////////////
    ///////////////////////////INTERACTION////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////

    export interface InteractionData {

        global: Point;
        target: DisplayObject;
        originalEvent: Event;

        getLocalPosition(displayObject: DisplayObject, point?: Point, globalPos?: Point): Point;

    }

    export interface InteractionManager {

        constructor(renderer: CanvasRenderer | WebGLRenderer, options?: { autoPreventDefault?: boolean; interactionFrequency?: boolean; });

        renderer: SystemRenderer;
        autoPreventDefault: boolean;
        interactionFrequency: number;
        mouse: InteractionData;
        eventData: {
            stopped: boolean;
            target: any;
            type: any;
            data: InteractionData;
        };
        interactiveDataPool: InteractionData[];
        onMouseUp: () => void;
        processMouseUp: () => void;
        onMouseDown: () => void;
        ProcessMouseDown: () => void;
        onMouseMove: () => void;
        processMouseMove: () => void;
        onMouseOut: () => void;
        processMouseOverOut: () => void;
        onTouchStart: () => void;
        processTouchStart: () => void;
        onTouchEnd: () => void;
        processTouchEnd: () => void;
        onTouchMove: () => void;
        processTouchMove: () => void;
        last: number;
        currentCursorString: string;
        resolution: number;

        interactive: boolean;
        buttonMode: boolean;
        interactiveChildren: boolean;
        defaultCursor: string;

        mapPositionToPoint(point: Point, x: number, y: number): void;
        processInteractive(point: Point, displayObject: Container | Sprite | TilingSprite | DisplayObject, func: Function, hitTest: boolean, interactive: boolean): boolean;
        destroy(): void;

    }

    //////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////LOADERS////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////
    //https://github.com/englercj/resource-loader/blob/master/src/Loader.js

    export interface LoaderOptions {

        crossOrigin?: boolean;
        loadType?: number;
        xhrType?: string;

    }

    export class Loader implements EventEmitter {

        constructor(baseUrl?: string, concurrency?: number);

        baseUrl: string;
        progress: number;
        loading: boolean;
        resources: any;

        add(name?: string, url?: string, options?: LoaderOptions, cb?: () => void): Loader;
        before(fn: Function): Loader;
        use(fn: Function): Loader;
        reset(): Loader;
        load(cb?: () => void): Loader;

    }

    export class Resource implements EventEmitter {

        static LOAD_TYPE: {
            XHR: number;
            IMAGE: number;
            AUDIO: number;
            VIDEO: number;
        };

        static XHR_READ_STATE: {
            UNSENT: number;
            OPENED: number;
            HEADERS_RECIEVED: number;
            LOADING: number;
            DONE: number;
        };

        static XHR_RESPONSE_TYPE: {
            DEFAULT: number;
            BUFFER: number;
            BLOB: number;
            DOCUMENT: number;
            JSON: number;
            TEXT: number;
        }

        constructor(name?: string, url?: string | string[], options?: LoaderOptions)

        name: string;
        url: string;
        data: any;
        crossOrigin: string;
        loadType: number;
        xhrType: string;
        error: Error;
        xhr: XMLHttpRequest;

        complete(): void;
        load(cb?: () => void): void;

    }

    //////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////MESH//////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////

    export class Mesh extends Container {

        static DRAW_MODES: {
            TRIANGLE_MESH: number;
            TRIANGLES: number;
        }

        constructor(texture: Texture, vertices?: number[], uvs?: number[], indices?: number[], drawMode?: number);

        texture: Texture;
        uvs: number[];
        vertices: number[];
        indices: number[];
        dirty: boolean;
        blendMode: number;
        canvasPadding: number;
        drawMode: number;

        getBounds(): Rectangle;

    }

    export class Rope extends Mesh {

        constructor(texture: Texture, points: Point[]);

        points: Point[];
        vertices: number[];
        uvs: number[];
        colors: number[];
        indices: number[];

        refresh(): void;

    }

    export interface MeshRenderer {

    }

    export interface StripShader extends Shader {

    }

    export interface EventEmitter {

        //addListener(event: string, fn: (EventTarget) => void, context

    }

}