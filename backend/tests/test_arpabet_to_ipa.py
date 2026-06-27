from app.services.arpabet_to_ipa import arpabet_to_ipa, split_arpabet_stress


def test_split_arpabet_stress_with_primary_stress():
    assert split_arpabet_stress("IY1") == ("IY", "1")


def test_split_arpabet_stress_without_stress():
    assert split_arpabet_stress("D") == ("D", "")


def test_arpabet_to_ipa_converts_dream():
    assert arpabet_to_ipa(["D", "R", "IY1", "M"]) == "dɹˈiːm"


def test_arpabet_to_ipa_converts_thing():
    assert arpabet_to_ipa(["TH", "IH1", "NG"]) == "θˈɪŋ"
