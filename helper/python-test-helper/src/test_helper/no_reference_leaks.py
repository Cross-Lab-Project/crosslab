import gc
import sys
from dataclasses import dataclass
from types import CodeType
from typing import Any, Dict, List


# Recursively expand slist's objects
# into olist, using seen to track
# already processed objects.
def _getr(slist, olist, seen):
    for e in slist:
        if id(e) in seen:
            continue
        seen[id(e)] = None
        olist.append(e)
        tl = gc.get_referents(e)
        if tl:
            _getr(tl, olist, seen)


# The public function.
def get_all_objects():
    """Return a list of all live Python
    objects, not including the list itself."""
    gcl = gc.get_objects()
    olist: List[Any] = []
    seen: Dict[int, None] = {}
    # Just in case:
    seen[id(gcl)] = None
    seen[id(olist)] = None
    seen[id(seen)] = None
    # _getr does the real work.
    _getr(gcl, olist, seen)
    return olist


@dataclass
class _ReferencedObject:
    obj: Any
    referrer: Any

    def _format(self, obj: Any) -> str:
        return f"{type(obj)}: {str(obj)}"

    def __str__(self):
        return f"Object: {self._format(self.obj)} referenced by {self._format(self.referrer)}"


def _getModule(obj: Any) -> str:
    if "__module__" not in dir(obj):
        return ""
    if obj.__module__ is None:
        return ""
    return obj.__module__


class NoReferenceLeaks:
    def __init__(self, namespace: str = ""):
        self._namespace = namespace

    def __enter__(self):
        self._enterObjects = get_all_objects()

    def __exit__(self, exc_type, exc_val, exc_tb):
        if exc_val is not None:
            raise exc_val
        gc.collect()
        exitObjects = get_all_objects()
        enterIds = set([id(o) for o in self._enterObjects])
        enterIds.add(id(self))
        leakedObjects = [
            obj
            for obj in exitObjects
            if sys.getrefcount(obj) > 4 and id(obj) not in enterIds
        ]
        referencedObjects: List[_ReferencedObject] = list()
        for obj in leakedObjects:
            for referrer in gc.get_referrers(obj):
                if id(referrer) == id(exitObjects) or id(referrer) == id(leakedObjects):
                    continue
                if (isinstance(obj, tuple) or isinstance(obj, list)) and (
                    any([isinstance(o, CodeType) for o in obj])
                    or any(
                        [
                            isinstance(o, str) and o.endswith("no_reference_leaks.py")
                            for o in obj
                        ]
                    )
                ):
                    continue
                if _getModule(referrer).startswith(self._namespace):
                    referencedObjects.append(_ReferencedObject(obj, referrer))
        assert len(referencedObjects) == 0, "Leaked objects: \n" + "\n".join(
            [str(o) for o in referencedObjects]
        )
