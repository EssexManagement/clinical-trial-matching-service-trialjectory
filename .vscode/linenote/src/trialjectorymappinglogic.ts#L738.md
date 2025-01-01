Investigate why the comparison is using `<string>stage == "4"` instead of `<int>stage >= 4`.
This causes an unexpected behavior in TJ query where stage IV (not allowable) maps to "metastatic" while IVA,B,C don't map to "metastatic."
