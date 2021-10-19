import { convert } from "../utils/convert";

describe("convert()", () => {
  it("should return a reordered array", () => {
    const data = [
      {
        name: "Alpha Festival",
        bands: [
          { name: "Band X", recordLabel: "Record Label 1" },
          { name: "Band C", recordLabel: "Record Label 2" },
        ],
      },
      {
        name: "Beta Festival",
        bands: [
          { name: "Unknown Band", recordLabel: "" },
          { name: "Band X", recordLabel: "Record Label 1" },
          { name: "Band Y", recordLabel: "Record Label 1" },
          { name: "Band A", recordLabel: "Record Label 2" },
          { name: "Band B", recordLabel: "Record Label 3" },
        ],
      },
      {
        name: "",
        bands: [{ name: "Band D", recordLabel: "Record Label 4" }],
      },
    ];

    const result = [
      {
        name: "Record Label 1",
        bands: [
          {
            name: "Band X",
            festivals: [{ name: "Alpha Festival" }, { name: "Beta Festival" }],
          },
          { name: "Band Y", festivals: [{ name: "Beta Festival" }] },
        ],
      },
      {
        name: "Record Label 2",
        bands: [
          { name: "Band A", festivals: [{ name: "Beta Festival" }] },
          { name: "Band C", festivals: [{ name: "Alpha Festival" }] },
        ],
      },
      {
        name: "Record Label 3",
        bands: [{ name: "Band B", festivals: [{ name: "Beta Festival" }] }],
      },
      {
        name: "Record Label 4",
        bands: [{ name: "Band D", festivals: [{ name: "" }] }],
      },
    ];
    expect(convert(data)).toStrictEqual(result);
  });
});
