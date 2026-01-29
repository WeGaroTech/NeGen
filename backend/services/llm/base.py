class BaseLLM:
    def generate(self, scheme: dict, question: str, domain: str) -> str:
        raise NotImplementedError("This method should be overridden by subclasses.")
