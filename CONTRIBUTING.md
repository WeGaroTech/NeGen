# Contributing to NEGen

Thank you for your interest in contributing to NEGen!

NEGen is a regional language AI assistant focused on improving access to government, education, and health schemes across Northeast India. Community contributions help expand language support and improve system quality.

---

## Ways You Can Contribute

You can contribute by:

- Adding new regional language support
- Improving translation quality
- Improving backend performance
- Improving frontend experience
- Fixing bugs
- Improving documentation
- Adding or improving scheme information

---

## Contribution Workflow

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Commit changes
5. Push to your fork
6. Open a Pull Request

All pull requests are reviewed before merging.

---

## Adding New Language Support

Language contributions are highly encouraged.

### Step 1 — Create Language Folder

Create a new folder inside:
`backend/services/languages/`

Example:
`backend/services/languages/mizo/`

---

### Step 2 — Implement Translator

Create a file named:
`translator.py`

Example implementation:
```python
from services.languages.base import BaseTranslator

class MizoTranslator(BaseTranslator):

    def translate_to_english(self, text: str) -> str:
        pass

    def translate_to_local(self, text: str) -> str:
        pass
```

---

### Step 3 — Register Translator

Register your language in:
`backend/services/languages/registry.py`

Example:
```python
from services.languages.garo.translator import GaroTranslator
from services.languages.mizo.translator import MizoTranslator

def get_translator(language: str):
    language = language.lower()

    translators = {
        "garo": GaroTranslator,
        "mizo": MizoTranslator,  # Add new language here
    }

    if language not in translators:
        raise ValueError("Unsupported Language")

    return translators[language]()
```
To add a new language:

1. Create a translator module inside `backend/services/languages/`.
2. Import the translator in `registry.py`.
3. Add the language entry to the `translators` dictionary.

---

### Step 4 — Submit a Pull Request

Submit your changes for review.

---

## Translator Interface Reference

All translators must inherit from:

`backend/services/languages/base.py`

Interface:
```python
class BaseTranslator:
    def translate_to_english(self, text: str):
        raise NotImplementedError("This method should be overridden by subclasses.")

    def translate_to_local(self, text: str):
        raise NotImplementedError("This method should be overridden by subclasses.")
```

---

## Contribution Guidelines

Please ensure:

- Code is clean and readable
- No breaking changes are introduced
- Folder structure is maintained
- Documentation updated if required

---

## Reporting Bugs

If you find a bug:

1. Open an issue
2. Explain steps to reproduce
3. Suggest fixes if possible

---

## Feature Requests

Suggestions and improvements are welcome. Open an issue to discuss new features.

---

## Code of Conduct

Please be respectful and constructive in discussions.

---

## Maintainer Note

NEGen is currently maintained by **Blairex & Cheang**.  
Pull requests and contributions are reviewed before merging to maintain project quality.

---

Thank you for helping improve NEGen!
