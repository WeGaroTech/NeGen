class BaseTranslator:
    def translate_to_english(self, text: str) -> str:
        raise NotImplementedError("This method should be overridden by subclasses.")

    def translate_to_local(self, text: str) -> str:
        raise NotImplementedError("This method should be overridden by subclasses.")
