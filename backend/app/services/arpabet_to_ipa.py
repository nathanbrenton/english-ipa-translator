"""Convert ARPABET phonemes to a simple IPA representation."""

import re


STRESS_MARKS = {
    "1": "ˈ",
    "2": "ˌ",
    "0": "",
}


ARPABET_TO_IPA = {
    "AA": "ɑ",
    "AE": "æ",
    "AH": "ə",
    "AO": "ɔ",
    "AW": "aʊ",
    "AY": "aɪ",
    "B": "b",
    "CH": "tʃ",
    "D": "d",
    "DH": "ð",
    "EH": "ɛ",
    "ER": "ɝ",
    "EY": "eɪ",
    "F": "f",
    "G": "ɡ",
    "HH": "h",
    "IH": "ɪ",
    "IY": "iː",
    "JH": "dʒ",
    "K": "k",
    "L": "l",
    "M": "m",
    "N": "n",
    "NG": "ŋ",
    "OW": "oʊ",
    "OY": "ɔɪ",
    "P": "p",
    "R": "ɹ",
    "S": "s",
    "SH": "ʃ",
    "T": "t",
    "TH": "θ",
    "UH": "ʊ",
    "UW": "uː",
    "V": "v",
    "W": "w",
    "Y": "j",
    "Z": "z",
    "ZH": "ʒ",
}


def split_arpabet_stress(phoneme: str) -> tuple[str, str]:
    """Split an ARPABET phoneme into base phoneme and optional stress digit."""
    match = re.fullmatch(r"([A-Z]+)([012]?)", phoneme)
    if not match:
        return phoneme, ""

    base, stress = match.groups()
    return base, stress


def arpabet_to_ipa(phonemes: list[str]) -> str:
    """Convert a list of ARPABET phonemes into an IPA-like string."""
    ipa_parts: list[str] = []

    for phoneme in phonemes:
        base, stress = split_arpabet_stress(phoneme)
        ipa = ARPABET_TO_IPA.get(base, "")

        if not ipa:
            continue

        stress_mark = STRESS_MARKS.get(stress, "")
        ipa_parts.append(f"{stress_mark}{ipa}")

    return "".join(ipa_parts)
