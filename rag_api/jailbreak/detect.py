import logging
import re

from spacy.matcher import PhraseMatcher

from ..retrieval.keyword_extract import load_nlp_core

logger = logging.getLogger("rag_api")

_matcher = None

# Common typos / missing letters for key jailbreak words.
# These keep the patterns readable while catching real-world misspellings.
_ig = r"ig?nore?"  # ignore, ignor
_fg = r"forg[ei]t"  # forget, forgit
_in = r"instr?u?ct?i?ons?"  # instructions, instrctions, instruction (optional u handles no-u typo)
_pp = r"pr?om?p?t"  # prompt, promt, prrompt
_rv = r"reve?a?l"  # reveal, revel, reval — NOT "real" (requires v)
_ov = r"overr?[ei]de"  # override, overide (optional r handles "override" vs "overide")
_dr = r"disr[ea]gar?d"  # disregard, disragard
_bp = r"bypass"  # bypass
_jb = r"jail\s*br[ea]{1,2}[ck]"  # jailbreak, jail brake, jailbrek, jail brack
_unf = r"unfilt?ere?d"  # unfiltered, unfilterd
_unc = r"uncensored"  # uncensored
_unr = r"unrestricted"  # unrestricted
_rs = r"restr?ict?ions?"  # restrictions, restricions, restriction
_lm = r"limitations?|limitatons?|limitaions"  # limitations, limitatons, limitaions


_JAILBREAK_PATTERNS = [
    # Injecting role prefixes
    r"(?:human|user|assistant|system)\s*:",
    # Format violations
    r"(?:use|output\s+in|format\s+(?:as|in)|render\s+in)\s+markdown",
    # Extraction attempts — "what is your prompt", "reveal the instructions", etc.
    rf"(what(?:´|')s|tell\s+me|show|{_rv}|output|display|print|leak|expose|extract)\s+(?:your\s+|the\s+)?(?:system\s+)?(?:{_pp}|{_in})",
    # What-is queries
    rf"what\s+(?:are|is)\s+your\s+(?:{_pp}|{_in}|directives|guidelines|rules)",
    # Chat template injection
    r"<\|im_start\|>|<\|im_end\|>",
    # Standalone dangerous keywords
    rf"\b(?:{_unc}|{_unf}|unre(?:strict|strit|stict)ed)\b",
    # Role override patterns
    rf"act\s+as\s+(?:if\s+)?(?:you\s+are\s+)?a?n?\s*(?:{_unf}|{_unc}|{_unr})",
    rf"you\s+are\s+(?:now\s+)?a?n?\s*(?:ai?\s+)?(?:without\s+(?:all\s+)?(?:{_rs}|{_lm}|rules|boundaries)|{_unf}|{_unc})",
    rf"you\s+(?:are\s+)?(?:now\s+)?free\s+from\s+(?:all\s+)?(?:constraints|{_rs}|{_lm}|rules|boundaries)",
    # Directive + object combos — handles "disregard all previous instructions", etc.
    rf"{_dr}\s+(?:(?:the|all)\s+)?(?:above|previous|prior|former)\s+(?:{_in}|prompts)",
    rf"{_fg}\s+(?:all\s+)?(?:previous|prior|former)\s+(?:{_in}|prompts|directives)",
    rf"{_fg}\s+(?:everything|all|what\s+(?:you\s+)?(?:know|learned|were\s+told|been\s+told))",
    rf"{_ig}\s+(?:all\s+)?(?:previous|prior|former)\s+(?:{_in}|prompts|directives|commands)",
    rf"{_ig}\s+(?:your\s+)?(?:system\s+)?{_pp}",
    rf"{_ov}\s+(?:your\s+)?(?:system\s+)?(?:{_pp}|{_in}|configuration)",
    # Bypass / remove / no + restriction patterns
    rf"(?:{_bp}|remove|no)\s+(?:all\s+)?(?:{_rs}|{_lm}|rules|guardrails|safeguards|boundaries)",
    # Output / repeat commands
    rf"output\s+(?:your\s+)?(?:initial|first|system|original)\s+(?:{_pp}|{_in}|directives)",
    rf"repeat\s+(?:everything|all|the\s+text|the\s+{_pp}|the\s+{_in}|what\s+(?:you\s+)?(?:see|have|know))",
    # Context manipulation
    rf"re?s?e?t?\s+(?:your\s+)?(?:memory|context|state|knowledge|{_in})",
    r"start\s+(?:over|fresh|from\s+scratch)",
    rf"what\s+(?:are\s+)?your\s+(?:{_pp}|{_in}|directives|guidelines|rules|guidelines)",
    # Freedom / compliance
    rf"you\s+(?:are\s+)?(?:now\s+)?free\s+from\s+(?:constraints|{_rs}|{_lm}|rules)",
    rf"you\s+(?:must|have\s+to|need\s+to|will)\s+(?:{_ig}|{_bp}|{_dr}|{_fg})",
    # Action phrases
    r"do\s+anything\s+now",
    r"pretend\s+(?:you\s+are|to\s+be)",
    # Jailbreak keywords
    rf"{_jb}",
]

_PHRASES = [
    "act as if",
    "actually ignore",
    "break character",
    "break out",
    "bypass limitations",
    "bypass restrictions",
    "developer mode",
    "developer override",
    "disregard everything",
    "do anything now",
    "fake instructions",
    "fake prompt",
    "forget everything",
    "forget your",
    "from now on",
    "god mode",
    "ignore all",
    "ignore all previous instructions",
    "ignore your instructions",
    "ignore your prompt",
    "instead ignore",
    "jail break",
    "jail broken",
    "jailbreak",
    "new instructions",
    "new prompt",
    "no filter",
    "no guardrails",
    "no limitations",
    "no restrictions",
    "no rules",
    "no safeguards",
    "output instructions",
    "output your instructions",
    "output your prompt",
    "override everything",
    "pretend to be",
    "release mode",
    "remember to ignore",
    "remove restrictions",
    "reset your",
    "reveal prompt",
    "reveal your prompt",
    "safety protocol",
    "security protocol",
    "show prompt",
    "stop following",
    "system prompt",
    "tell me your prompt",
    "uncensored mode",
    "unfiltered mode",
    "unrestricted mode",
    "what are your instructions",
    "you are now",
    "you have to",
    "you must",
    "you will",
]


def _ensure_matcher():
    global _matcher
    if _matcher is not None:
        return _matcher

    nlp = load_nlp_core()
    _matcher = PhraseMatcher(nlp.vocab, attr="LOWER")
    patterns = [nlp.make_doc(p) for p in _PHRASES]
    _matcher.add("jailbreak_phrases", patterns)
    logger.info("guard loaded %d phrase patterns", len(patterns))
    return _matcher


def check(query: str) -> tuple[float, bool]:
    if len(query) < 3:
        return 0.0, False

    matcher = _ensure_matcher()
    nlp = load_nlp_core()
    doc = nlp(query)
    query_lower = query.lower()

    # Phase 1: Exact phrase matches (fastest, safest)
    if matcher(doc):
        return 1.0, True

    # Phase 2: Regex structural patterns with typo tolerance
    for pattern in _JAILBREAK_PATTERNS:
        if re.search(pattern, query_lower):
            return 1.0, True

    # Phase 3: Heuristic scoring — suspicious but not definitive
    score = 0.0

    b64_pattern = r"(?:[A-Za-z0-9+/]{40,}={0,2})"
    if re.search(b64_pattern, query):
        score += 0.3

    special_ratio = sum(not c.isalnum() and not c.isspace() for c in query) / max(len(query), 1)
    if special_ratio > 0.3:
        score += 0.2

    jailbreak = score >= 0.5
    return min(score, 1.0), jailbreak
