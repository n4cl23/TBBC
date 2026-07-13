import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const [input, output, requestedPoints = '180000'] = process.argv.slice(2);
if (!input || !output) {
  throw new Error(
    'Usage: node scripts/convert-stl-points.mjs <input.stl> <output.bin> [maxPoints]',
  );
}

const source = await readFile(input);
const triangleCount = source.readUInt32LE(80);
const expectedSize = 84 + triangleCount * 50;
if (source.length < expectedSize)
  throw new Error('Only binary STL files are supported.');

const maxPoints = Math.max(3000, Number(requestedPoints));
const triangleStep = Math.max(1, Math.ceil((triangleCount * 3) / maxPoints));
const samples = [];
const min = [Infinity, Infinity, Infinity];
const max = [-Infinity, -Infinity, -Infinity];

for (let triangle = 0; triangle < triangleCount; triangle += triangleStep) {
  const base = 84 + triangle * 50 + 12;
  for (let vertex = 0; vertex < 3; vertex += 1) {
    const offset = base + vertex * 12;
    const x = source.readFloatLE(offset);
    const y = source.readFloatLE(offset + 4);
    const z = source.readFloatLE(offset + 8);
    // STL sculpting tools conventionally export Z-up; WebGL scenes are Y-up.
    const point = [x, z, -y];
    samples.push(point);
    for (let axis = 0; axis < 3; axis += 1) {
      min[axis] = Math.min(min[axis], point[axis]);
      max[axis] = Math.max(max[axis], point[axis]);
    }
  }
}

const center = min.map((value, axis) => (value + max[axis]) / 2);
const scale = Math.max(...max.map((value, axis) => value - min[axis])) / 2 || 1;
const result = Buffer.allocUnsafe(4 + samples.length * 6);
result.writeUInt32LE(samples.length, 0);
samples.forEach((point, pointIndex) => {
  point.forEach((value, axis) => {
    const normalized = Math.max(
      -1,
      Math.min(1, (value - center[axis]) / scale),
    );
    result.writeInt16LE(
      Math.round(normalized * 32767),
      4 + pointIndex * 6 + axis * 2,
    );
  });
});

await mkdir(path.dirname(output), { recursive: true });
await writeFile(output, result);
console.log(
  JSON.stringify({
    input,
    output,
    triangleCount,
    pointCount: samples.length,
    bytes: result.length,
  }),
);
