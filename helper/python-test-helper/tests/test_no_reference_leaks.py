import pytest

from test_helper.no_reference_leaks import NoReferenceLeaks


def test_leak_object():
    l = []
    with pytest.raises(AssertionError):
        with NoReferenceLeaks():
            leakingObject = {"leaking": "leaking string"}
            l.append(leakingObject)


def test_leak_no_object():
    l = []
    with NoReferenceLeaks():
        leakingObject = {"leaking": "leaking string"}
        l.append(leakingObject)
        l.clear()


def test_leak_exception():
    l = []
    with pytest.raises(ValueError):
        with NoReferenceLeaks():
            leakingObject = {"leaking": "leaking string"}
            l.append(leakingObject)
            raise ValueError("TEST")
