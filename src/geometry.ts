export interface vec2 {
    x: number;
    y: number;
}

export interface ray2 {
    pos: vec2;
    dir: vec2;
}

export interface rect2 {
    min: vec2;
    max: vec2;
}

namespace geom {
    export function createVec2(x: number, y: number): vec2 {
        return {x: x, y: y};
    }
    export function negate(v: vec2): vec2 {
        return {x: -v.x, y: -v.y};
    }
    export function add(a: vec2, b: vec2): vec2 {
        return {x: a.x + b.x, y: a.y + b.y};
    }
    export function subtract(a: vec2, b: vec2): vec2 {
        return {x: a.x - b.x, y: a.y - b.y};
    }
    export function multiply(v: vec2, s: number): vec2 {
        return {x: v.x * s, y: v.y * s};
    }
    export function divide(v: vec2, s: number): vec2 {
        return {x: v.x / s, y: v.y / s};
    }
    export function dot(a: vec2, b: vec2): number {
        return a.x * b.x + a.y * b.y;
    }
    export function cross(a: vec2, b: vec2): number {
        return a.x * b.y - b.x * a.y;
    }
    export function squaredMagnetude(v: vec2): number {
        return v.x * v.x + v.y * v.y;
    }
    export function magnetude(v: vec2): number {
        return Math.sqrt(squaredMagnetude(v));
    }
    export function squaredDistance(a: vec2, b: vec2): number {
        const x = b.x - a.x, y = b.y - a.y;
        return x * x + y * y;
    }
    export function distance(a: vec2, b: vec2): number {
        return Math.sqrt(squaredDistance(a, b));
    }
    export function normalize(v: vec2): vec2 {
        return divide(v, magnetude(v));
    }
    export function normal(v: vec2): vec2 {
        return normalize({x: v.y, y: -v.x});
    }
    export function areParallel(a: vec2, b: vec2): boolean {
        return Math.abs(cross(a, b)) < Number.EPSILON;
    }

    export function createRay2(x: number, y: number, vx: number, vy: number): ray2 {
        return {pos: createVec2(x, y), dir: createVec2(vx, vy)};
    }
    export function positionOnRay(r: ray2, t: number): vec2 {
        return {x: r.pos.x + r.dir.x * t, y: r.pos.y + r.dir.y * t};
    }
    export function tRayCollision(a: ray2, b: ray2): [number, number] | undefined {
        const vCross = cross(a.dir, b.dir);
        if (Math.abs(vCross) < Number.EPSILON)
            return undefined;
        const pDist = subtract(a.pos, b.pos);
        return [cross(pDist, b.dir) / vCross, -cross(negate(pDist), a.dir)];
    }
    export function posRayCollision(a: ray2, b: ray2): vec2 | undefined {
        const tValues = tRayCollision(a, b);
        if (tValues === undefined)
            return undefined;
        return positionOnRay(a, tValues[0]);
    }

    export function createRect2(minX: number, minY: number, maxX: number, maxY: number): rect2 {
        return {min: createVec2(minX, minY), max: createVec2(maxX, maxY)};
    }
    export function isPosInRect(pos: vec2, rect: rect2): boolean {
        return !(pos.x < rect.min.x || pos.x > rect.max.x || pos.y < rect.min.y || pos.y > rect.max.y);
    }
}
