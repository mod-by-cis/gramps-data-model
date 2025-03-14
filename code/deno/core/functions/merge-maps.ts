
export function mergeMaps<K, V1 extends Record<string, any>, V2 extends Record<string, any>, V3>(
  mapL: Map<K, V1>,
  mapR: Map<K, V2>,
  merger: (valueL: V1, valueR: V2) => V3
): Map<K, V3> {
  const resultMap = new Map<K, V3>();

  mapL.forEach((valueL, key) => {
    if (mapR.has(key)) {
      const valueR = mapR.get(key)!;
      resultMap.set(key, merger(valueL, valueR));
    }
  });

  return resultMap;
}

