from services.translation.translator import geminiTranslator


# function to get translator instance
def get_translator():
    return geminiTranslator()
