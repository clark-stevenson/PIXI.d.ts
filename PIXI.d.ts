// Type definitions for PIXI 1.6.1 dev
// Project: https://github.com/GoodBoyDigital/pixi.js/

declare module PIXI {

    export var WEBGL_RENDERER: number;
    export var CANVAS_RENDERER: number;
    export var VERSION: string;

    export enum blendModes {

        NORMAL,
        ADD,
        MULTIPLY,
        SCREEN,
        OVERLAY,
        DARKEN,
        LIGHTEN,
        COLOR_DODGE,
        COLOR_BURN,
        HARD_LIGHT,
        SOFT_LIGHT,
        DIFFERENCE,
        EXCLUSION,
        HUE,
        SATURATION,
        COLOR,
        LUMINOSITY,

    }

    export enum scaleModes {

        DEFAULT,
        LINEAR,
        NEAREST

    }

    export var defaultRenderOptions: PixiRendererOptions;

    export var INTERACTION_REQUENCY: number;
    export var AUTO_PREVENT_DEFAULT: boolean;

    export var RAD_TO_DEG: number;
    export var DEG_TO_RAD: number;

    export var RETINA_PREFIX: string;

    export var BaseTextureCache: { [key: string]: BaseTexture }
    export var TextureCache: { [key: string]: Texture }

    export function rgb2hex(rgb: number[]): string;
    export function hex2rgb(hex: string): number[];

    export function autoDetectRenderer(width?: number, height?: number, options?: PixiRendererOptions): PixiRenderer;
    export function autoDetectRecommendedRenderer(width?: number, height?: number, options?: PixiRendererOptions): PixiRenderer;

    export function canUseNewCanvasBlendModes(): boolean;
    export function getNextPowerOfTwo(number: number): number;

    export function AjaxRequest(): XMLHttpRequest;


    export interface IEventCallback {
        (e?: IEvent): void
    }

    export interface IEvent {
        type: string;
        content: any;
    }

    export interface HitArea {
        contains(x: number, y: number): boolean;
    }

    export interface IInteractionDataCallback {
        (interactionData: InteractionData): void
    }

    export interface PixiRenderer {

        height: number;
        transparent: boolean;
        type: number;
        width: number;
        view: HTMLCanvasElement;

        render(stage: Stage): void;
        resize(width: number, height: number): void;

    }

    export interface PixiRendererOptions {

        antialias: boolean;
        clearBeforeRender: boolean;
        preserveDrawingBuffer: boolean;
        resolution: number;
        transparent: boolean;
        view: HTMLCanvasElement;

    }

    export interface BitmapTextStyle {

        font?: string;
        align?: string;
        tint?: string;

    }

    export interface TextStyle {

        align?: string;
        dropShadow?: boolean;
        dropShadowColor?: string;
        dropShadowAngle?: number;
        dropShadowDistance?: number;
        fill?: string;
        font?: string;
        stroke?: string;
        strokeThickness?: number;
        wordWrap?: boolean;
        wordWrapWidth?: number;

    }

    export interface Loader {

        load(): void;

    }

    export interface MaskData {

        alpha: number;
        worldTransform: number[];

    }

    export interface RenderSession {

        context: CanvasRenderingContext2D;
        maskManager: CanvasMaskManager;
        scaleMode: scaleModes;
        smoothProperty: string;
        roundPixels: boolean;

    }

    export interface ShaderAttribute {
        // TODO: Find signature of shader attributes
    }

    export interface FilterBlock {

        visible: boolean;
        renderable: boolean;

    }

    export class AbstractFilter {

        constructor(fragmentSrc: any, uniforms: any);

        dirty: boolean;
        padding: number;

    }

    export class AlphaMaskFilter extends AbstractFilter {

        constructor(texture: Texture);

        map: Texture;

        onTextureLoaded(): void;

    }

    export class AsciiFilter extends AbstractFilter {

        size: number;

    }

    export class AssetLoader extends EventTarget {

        constructor(assetURLs: string[], crossorigin: boolean);

        assetURLs: string[];
        crossorigin: boolean;
        loadersByType: { [key: string]: Loader };

        load(): void;
        onComplete(): void;
        onProgress(): void;

    }

    export class AtlasLoader extends EventTarget {

        url: string;
        baseUrl: string;
        crossorigin: boolean;
        loaded: boolean;

        constructor(url: string, crossorigin: boolean);
        load(): void;

    }

    export class BaseTexture extends EventTarget {

        static fromImage(imageUrl: string, crossorigin?: boolean, scaleMode?: scaleModes): BaseTexture;
        static fromCanvas(canvas: HTMLCanvasElement, scaleMode?: scaleModes): BaseTexture;

        constructor(source: HTMLImageElement, scaleMode: scaleModes);
        constructor(source: HTMLCanvasElement, scaleMode: scaleModes);

        height: number;
        hasLoaded: boolean;
        id: number;
        premultipliedAlpha: boolean;
        resolution: number;
        scaleMode: scaleModes;
        source: HTMLImageElement;
        width: number;

        destroy(): void;
        updateSourceImage(newSrc: string): void;


    }

    export class BitmapFontLoader extends EventTarget {

        constructor(url: string, crossorigin: boolean);

        baseUrl: string;
        crossorigin: boolean;
        texture: Texture;
        url: string;

        load(): void;

    }

    export class BitmapText extends DisplayObjectContainer {

        static fonts: any;

        constructor(text: string, style: BitmapTextStyle);

        dirty: boolean;
        fontName: string;
        fontSize: number;
        textWidth: number;
        textHeight: number;
        tint: number;
        style: BitmapTextStyle;

        setText(text: string): void;
        setStyle(style: BitmapTextStyle): void;

    }

    export class BlurFilter extends AbstractFilter {

        blur: number;
        blurX: number;
        blurY: number;

    }

    export class BlurXFilter extends AbstractFilter {

        blur: number;

    }

    export class BlurYFilter extends AbstractFilter {

        blur: number;

    }

    export class CanvasMaskManager {

        pushMask(maskData: MaskData, renderSession: CanvasRenderingContext2D): void;
        popMask(renderSession: CanvasRenderingContext2D): void;

    }

    export class CanvasRenderer implements PixiRenderer {

        constructor(width?: number, height?: number, options?: PixiRendererOptions);

        clearBeforeRender: boolean;
        context: CanvasRenderingContext2D;
        count: number;
        height: number;
        maskManager: CanvasMaskManager;
        refresh: boolean;
        renderSession: RenderSession;
        resolution: number;
        transparent: boolean;
        type: number;
        view: HTMLCanvasElement;
        width: number;

        render(stage: Stage): void;
        resize(width: number, height: number): void;

    }

    export class CanvasTinter {

        static getTintedTexture(sprite: Sprite, color: number): HTMLCanvasElement;
        static tintWithMultiply(texture: Texture, color: number, canvas: HTMLCanvasElement): void;
        static tintWithOverlay(texture: Texture, color: number, canvas: HTMLCanvasElement): void;
        static tintWithPerPixel(texture: Texture, color: number, canvas: HTMLCanvasElement): void;
        static roundColor(color: number): void;

        static cacheStepsPerColorChannel: number;
        static convertTintToImage: boolean;
        static canUseMultiply: boolean;
        static tintMethod: any;

    }

    export class Circle implements HitArea {

        constructor(x: number, y: number, radius: number);

        x: number;
        y: number;
        radius: number;

        clone(): Circle;
        contains(x: number, y: number): boolean;
        getBounds(): Rectangle;

    }

    export class ColorMatrixFilter extends AbstractFilter {

        matrix: Matrix;

    }

    export class ColorStepFilter extends AbstractFilter {

        step: number;

    }

    export class CrossHatchFilter extends AbstractFilter {

        blur: number;

    }

    export class DisplacementFilter extends AbstractFilter {

        constructor(texture: Texture);

        map: Texture;
        offset: Point;
        scale: Point;

    }

    export class DotScreenFilter extends AbstractFilter {

        angle: number;
        scale: Point;

    }

    export class DisplayObject {

        alpha: number;
        buttonMode: boolean;
        cacheAsBitmap: boolean;
        defaultCursor: string;
        filterArea: Rectangle;
        filters: AbstractFilter[];
        hitArea: HitArea;
        interactive: boolean;
        mask: Graphics;
        parent: DisplayObjectContainer;
        pivot: Point;
        position: Point;
        renderable: boolean;
        rotation: number;
        scale: Point;
        stage: Stage;
        visible: boolean;
        worldAlpha: number;
        worldVisible: boolean;
        x: number;
        y: number;

        click(e: InteractionData): void;
        getBounds(matrix?: Matrix): Rectangle;
        getLocalBounds(): Rectangle;
        generateTexture(resolution: number, scaleMode: scaleModes, renderer: PixiRenderer): RenderTexture;
        mousedown(e: InteractionData): void;
        mouseout(e: InteractionData): void;
        mouseover(e: InteractionData): void;
        mouseup(e: InteractionData): void;
        mouseupoutside(e: InteractionData): void;
        rightclick(e: InteractionData): void;
        rightdown(e: InteractionData): void;
        rightup(e: InteractionData): void;
        rightupoutside(e: InteractionData): void;
        setStageReference(stage: Stage): void;
        tap(e: InteractionData): void;
        toGlobal(pos: Point): Point;
        toLocal(pos: Point, from: DisplayObject): Point;
        touchend(e: InteractionData): void;
        touchendoutside(e: InteractionData): void;
        touchstart(e: InteractionData): void;

    }

    export class DisplayObjectContainer extends DisplayObject {

        constructor();

        children: DisplayObject[];
        height: number;
        width: number;

        addChild(child: DisplayObject): void;
        addChildAt(child: DisplayObject, index: number): void;
        getChildAt(index: number): DisplayObject;
        getChildIndex(child: DisplayObject): number;
        removeChild(child: DisplayObject): DisplayObject;
        removeChildAt(index: number): DisplayObject;
        removeChildren(beginIndex?: number, endIndex?: number): DisplayObject[];
        removeStageReference(): void;
        setChildIndex(child: DisplayObject, index: number): void;

    }

    export class Ellipse implements HitArea {

        constructor(x: number, y: number, width: number, height: number);

        x: number;
        y: number;
        width: number;
        height: number;

        clone(): Ellipse;
        contains(x: number, y: number): boolean;
        getBounds(): Rectangle;

    }

    export class EventTarget {

        listeners: { [key: string]: IEventCallback[] };

        addEventListener(type: string, listener: IEventCallback): void;
        dispatchEvent(event: IEvent): void;
        removeAllEventListeners(type: string): void;
        removeEventListener(type: string, listener: IEventCallback): void;

    }

    export class FilterTexture {

        constructor(gl: WebGLRenderingContext, width: number, height: number, scaleMode: scaleModes);

        fragmentSrc: string[];
        frameBuffer: WebGLFramebuffer;
        gl: WebGLRenderingContext;
        program: WebGLProgram;
        scaleMode: scaleModes;

        clear(): void;
        resize(width: number, height: number): void;
        destroy(): void;

    }

    export class Graphics extends DisplayObjectContainer {

        bounds: Rectangle;
        blendMode: number;
        boundsPadding: number;
        fillAlpha: number;
        isMask: boolean;
        lineWidth: number;
        lineColor: string;
        tint: number;

        arc(cx: number, cy: number, radius: number, startAngle: number, endAngle: number, anticlockwise: boolean): Graphics;
        arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): Graphics;
        beginFill(color: number, alpha?: number): void;
        bezierCurveTo(cpX: number, cpY: number, cpX2: number, cpY2: number, toX: number, toY: number): Graphics;
        clear(): void;
        destroyCachedSprite(): void;
        drawCircle(x: number, y: number, radius: number): void;
        drawEllipse(x: number, y: number, width: number, height: number): void;
        drawPath(path: any): void;
        drawRect(x: number, y: number, width: number, height: number): void;
        drawRoundedRect(x: number, y: number, width: number, height: number, radius: number): Graphics;
        endFill(): void;
        lineStyle(lineWidth: number, color: number, alpha: number): void;
        lineTo(x: number, y: number): void;
        moveTo(x: number, y: number): void;
        quadraticCurveTo(cpX: number, cpY: number, toX: number, toY: number): Graphics;
        updateBounds(): void;

    }

    export class GrayFilter extends AbstractFilter {

        gray: number;

    }

    export class ImageLoader extends EventTarget {

        constructor(url: string, crossorigin?: boolean);

        texture: Texture;

        load(): void;
        loadFramedSpriteSheet(frameWidth: number, frameHeight: number, textureName: string): void;

    }

    export class InteractionData {

        global: Point;
        target: Sprite;
        originalEvent: Event;

        getLocalPosition(displayObject: DisplayObject): Point;

    }

    export class InteractionManager {

        currentCursorStyle: string;
        mouse: InteractionData;
        mouseOut: boolean;
        mouseoverEnabled: boolean;
        pool: InteractionData[];
        resolution: number;
        stage: Stage;
        touchs: { [id: string]: InteractionData };

        constructor(stage: Stage);
    }

    export class InvertFilter extends AbstractFilter {

        invert: number;

    }

    export class JsonLoader extends EventTarget {

        constructor(url: string, crossorigin?: boolean);

        baseUrl: string;
        crossorigin: boolean;
        loaded: boolean;
        url: string;

        load(): void;

    }

    export class Matrix {

        a: number;
        b: number;
        c: number;
        d: number;
        tx: number;
        ty: number;

        apply(pos: Point, newPos: Point): Point;
        applyInverse(pos: Point, newPos: Point): Point;
        determineMatrixArrayType(): number[];
        rotate(angle: number): Matrix;
        fromArray(array: number[]): void;
        translate(x: number, y: number): Matrix;
        toArray(transpose: boolean): number[];
        scale(x: number, y: number): Matrix;


    }

    export class MovieClip extends Sprite {

        static fromFrames(frames: string[]): MovieClip;
        static fromImages(images: HTMLImageElement[]): HTMLImageElement;

        constructor(textures: Texture[]);

        animationSpeed: number;
        currentFrame: number;
        loop: boolean;
        playing: boolean;
        textures: Texture[];
        totalFrames: number;

        gotoAndPlay(frameNumber: number): void;
        gotoAndStop(frameNumber: number): void;
        onComplete(): void;
        play(): void;
        stop(): void;

    }

    export class NoiseFilter extends AbstractFilter {

        noise: number;

    }

    export class NormalMapFilter extends AbstractFilter {

        map: Texture;
        offset: Point;
        scale: Point;

    }

    export class PixelateFilter extends AbstractFilter {

        size: number;

    }

    export class PixiShader {

        constructor(gl: WebGLRenderingContext);

        defaultVertexSrc: string;
        fragmentSrc: string[];
        gl: WebGLRenderingContext;
        program: WebGLProgram;
        textureCount: number;
        attributes: ShaderAttribute[];

        destroy(): void;
        init(): void;
        initSampler2D(): void;
        initUniforms(): void;
        syncUniforms(): void;

    }

    export class Point {

        constructor(x?: number, y?: number);

        x: number;
        y: number;

        clone(): Point;
        set(x: number, y: number): void;

    }

    export class Polygon implements HitArea {

        constructor(points: Point[]);
        constructor(points: number[]);
        constructor(...points: Point[]);
        constructor(...points: number[]);

        points: Point[];

        clone(): Polygon;
        contains(x: number, y: number): boolean;

    }

    export class Rectangle implements HitArea {

        constructor(x?: number, y?: number, width?: number, height?: number);

        x: number;
        y: number;
        width: number;
        height: number;

        clone(): Rectangle;
        contains(x: number, y: number): boolean;

    }

    export class RGBSplitFilter extends AbstractFilter {

        angle: number;

    }

    export class Rope extends Strip {

        points: Point[];

        constructor(texture: Texture, points: Point[]);

        refresh(): void;
        setTexture(texture: Texture): void;

    }

    export class SepiaFilter extends AbstractFilter {

        sepia: number;

    }

    export class SmartBlurFilter extends AbstractFilter {

        blur: number;

    }

    export class Spine extends DisplayObjectContainer {

        constructor(url: string);

        createSprite(slot: any, descriptior: any): void;

    }

    export class Sprite extends DisplayObjectContainer {

        static fromFrame(frameId: string): Sprite;
        static fromImage(url: string, crossorigin?: boolean, scaleMode?: scaleModes): Sprite;

        constructor(texture: Texture);

        anchor: Point;
        blendMode: blendModes;
        texture: Texture;
        tint: number;

        setTexture(texture: Texture): void;

    }

    export class SpriteBatch extends DisplayObjectContainer {

        constructor(texture?: Texture);

        ready: boolean;
        textureThing: Texture;

        initWebGL(gl: WebGLRenderingContext): void;

    }

    export class SpriteSheetLoader extends EventTarget {

        constructor(url: string, crossorigin?: boolean);

        baseUrl: string;
        crossorigin: boolean;
        frames: any;
        texture: Texture;
        url: string;

        load(): void;

    }

    export class Stage extends DisplayObjectContainer {

        constructor(backgroundColor: number);

        interactionManager: InteractionManager;

        getMousePosition(): Point;
        setBackgroundColor(backgroundColor: number): void;
        setInteractionDelegate(domElement: HTMLElement): void;

    }

    export class Strip extends DisplayObjectContainer {

        constructor(texture: Texture);

        colors: number[];
        dirty: boolean;
        indices: number[];
        padding: number;
        texture: Texture;
        uvs: number[];
        vertices: number[];

    }

    export class Text extends Sprite {

        constructor(text: string, style?: TextStyle);

        context: CanvasRenderingContext2D;
        resolution: number;

        destroy(destroyTexture: boolean): void;
        setStyle(style: TextStyle): void;
        setText(text: string): void;

    }

    export class Texture extends EventTarget {

        static fromCanvas(canvas: HTMLCanvasElement, scaleMode?: scaleModes): Texture;
        static fromFrame(frameId: string): Texture;
        static fromImage(imageUrl: string, crossorigin?: boolean, scaleMode?: scaleModes): Texture;
        static addTextureToCache(texture: Texture, id: string): void;
        static removeTextureFromCache(id: string): Texture;

        constructor(baseTexture: BaseTexture, frame?: Rectangle);

        baseTexture: BaseTexture;
        crop: Rectangle;
        frame: Rectangle;
        height: number;
        noFrame: boolean;
        trim: Point;
        width: number;
        scope: Object;
        valid: boolean;

        destroy(destroyBase: boolean): void;
        setFrame(frame: Rectangle): void;

    }

    export class TilingSprite extends Sprite {

        constructor(texture: Texture, width: number, height: number);

        blendMode: number;
        texture: Texture;
        tint: number;
        tilePosition: Point;
        tileScale: Point;
        tileScaleOffset: Point;

        generateTilingTexture(forcePowerOfTwo: boolean): void;
        setTexture(texture: Texture): void;

    }

    export class TiltShiftFilter extends AbstractFilter {

        blur: number;
        gradientBlur: number;
        start: number;
        end: number;

    }

    export class TiltShiftXFilter extends AbstractFilter {

        blur: number;
        gradientBlur: number;
        start: number;
        end: number;

        updateDelta(): void;

    }

    export class TiltShiftYFilter extends AbstractFilter {

        blur: number;
        gradientBlur: number;
        start: number;
        end: number;

        updateDelta(): void;

    }

    export class TwistFilter extends AbstractFilter {

        angle: number;
        offset: Point;
        radius: number;

    }

    export class WebGLBlendModeManager {

        destroy(): void;
        setBlendMode(blendMode: number): boolean;

    }

    export class WebGLFastSpriteBatch {

        constructor(gl: WebGLRenderingContext);

        currentBatchSize: number;
        currentBaseTexture: any;
        currentBlendMode: number;
        renderSession: RenderSession;
        drawing: boolean;
        indexBuffer: any; //todo this is a WebGLBuffer?
        indices: number[];
        lastIndexCount: number;
        matrix: any;
        maxSize: number;
        shader: any;
        size: number;
        vertexBuffer: any; //todo this is a WebGLBuffer?
        vertices: number[];
        vertSize: number;

        end(): void;
        begin(spriteBatch: SpriteBatch, renderSession: RenderSession): void;
        flush(): void;
        render(spriteBatch: SpriteBatch): void;
        renderSprite(sprite: Sprite): void;
        setContext(gl: WebGLRenderingContext): void;
        start(): void;
        stop(): void;

    }

    export class WebGLFilterManager {

        constructor(gl: WebGLRenderingContext, transparent: boolean);

        filterStack: AbstractFilter[];
        transparent: boolean;
        offsetX: number;
        offsetY: number;

        applyFilterPass(filter: AbstractFilter, filterArea: Texture, width: number, height: number): void;
        begin(renderSession: RenderSession, buffer: ArrayBuffer): void;
        destroy(): void;
        initShaderBuffers(): void;
        popFilter(): void;
        pushFilter(filterBlock: FilterBlock): void;
        setContext(gl: WebGLRenderingContext): void;

    }

    export class WebGLGraphics {

    }

    export class WebGLMaskManager {

        constructor(gl: WebGLRenderingContext);

        destroy(): void;
        popMask(renderSession: RenderSession): void;
        pushMask(maskData: any[], renderSession: RenderSession): void;
        setContext(gl: WebGLRenderingContext): void;

    }

    export class WebGLRenderer implements PixiRenderer {

        static createWebGLTexture(texture: Texture, gl: WebGLRenderingContext): void;

        constructor(width?: number, height?: number, options?: PixiRendererOptions);

        contextLost: boolean;
        contextRestoreLost: boolean;
        height: number;
        gl: WebGLRenderingContext;
        preserveDrawingBuffer: boolean;
        resolution: number;
        transparent: boolean;
        type: number;
        view: HTMLCanvasElement;
        width: number;

        destroy(): void;
        render(stage: Stage): void;
        renderDisplayObject(displayObject: DisplayObject, projection: Point, buffer: WebGLBuffer): void;
        resize(width: number, height: number): void;

    }

    export class WebGLShaderManager {

        destroy(): void;
        setAttribs(attribs: ShaderAttribute[]): void;
        setContext(gl: WebGLRenderingContext): void;
        setShader(shader: WebGLShader): boolean;

    }

    export class WebGLStencilManager {

        constructor(gl: WebGLRenderingContext);

        stencilStack: any[];
        reverse: boolean;
        count: number;

        destroy(): void;
        setContext(gl: WebGLRenderingContext): void;

    }

    export class WebGLSpriteBatch {

        constructor(gl: WebGLRenderingContext);

        indices: number[];
        size: number;
        vertices: number[];
        vertSize: number;

        begin(renderSession: RenderSession): void;
        destroy(): void;
        end(): void;
        flush(): void;
        render(sprite: Sprite): void;
        renderBatch(texture: Texture, size: number, startIndex: number): void;
        renderTilingSprite(sprite: TilingSprite): void;
        setBlendMode(blendMode: blendModes): void;
        setContext(gl: WebGLRenderingContext): void;
        start(): void;
        stop(): void;

    }

    export class RenderTexture extends Texture {

        constructor(width?: number, height?: number, renderer?: PixiRenderer, scaleMode?: scaleModes, resolution?: number);

        frame: Rectangle;
        baseTexture: BaseTexture;
        renderer: PixiRenderer;
        resolution: number;

        clear(): void;
        resize(width: number, height: number, updateBase: boolean): void;
        render(displayObject: DisplayObject, position?: Point, clear?: boolean): void;

    }

}

declare function requestAnimFrame(): void;

declare module PIXI.PolyK {
    export function Triangulate(p: number[]): number[];
}