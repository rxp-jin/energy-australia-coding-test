export const convert = (data) => {
  if (!data || data.length === 0) {
    return [];
  }

  const result = [];

  for (let i = 0; i < data.length; i++) {
    const { name: festivalName, bands } = data[i];

    if (!bands || bands.length === 0) continue;

    for (let j = 0; j < bands.length; j++) {
      const { name: bandName, recordLabel } = bands[j];
      if (!bandName || !recordLabel) continue;

      const labelIndex = result.findIndex(
        (label) => label.name === recordLabel
      );

      if (labelIndex >= 0 && result[labelIndex]) {
        const bandIndex = result[labelIndex].bands.findIndex(
          (band) => band.name === bandName
        );

        if (bandIndex >= 0 && result[labelIndex].bands[bandIndex]) {
          result[labelIndex].bands[bandIndex].festivals.push({
            name: festivalName,
          });

          continue;
        }

        result[labelIndex].bands.push({
          name: bandName,
          festivals: [{ name: festivalName }],
        });

        continue;
      }

      result.push({
        name: recordLabel,
        bands: [{ name: bandName, festivals: [{ name: festivalName }] }],
      });
    }
  }

  return reorder(result, "name");
};

const reorder = (arr, key) => {
  let l = arr.length;

  while (l--) {
    for (const property in arr[l]) {
      if (Array.isArray(arr[l][property])) {
        reorder(arr[l][property], key);
      }
    }
  }

  return arr.sort((a, b) => a[key].localeCompare(b[key]));
};
