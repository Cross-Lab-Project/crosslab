import pytest

from test_helper.no_reference_leaks import NoReferenceLeaks


def test_leak_object():
    l = []
    with pytest.raises(AssertionError):
        with NoReferenceLeaks():
            l.append("LEAKING")


def test_leak_no_object():
    l = []
    with NoReferenceLeaks():
        l.append("LEAKING")
        l.clear()


def test_leak_exception():
    l = []
    with pytest.raises(ValueError):
        with NoReferenceLeaks():
            l.append("LEAKING")
            raise ValueError("TEST")
